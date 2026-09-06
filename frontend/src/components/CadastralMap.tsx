import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { CADASTRE_DATA, findCadastralParcel, normalizeSurveyToken } from '../data/cadastreGeoJson';
import { Search, Eye, ShieldAlert, Maximize2, ArrowLeft } from 'lucide-react';

interface CadastralMapProps {
  selectedSurvey?: string;
  onSelectParcel?: (surveyNo: string, hissaNo: string) => void;
  highlightStatus?: 'LOW_RISK' | 'MODERATE_RISK' | 'HIGH_RISK';
  isCitizenView?: boolean;
  onBack?: () => void;
}

export const CadastralMap: React.FC<CadastralMapProps> = ({
  selectedSurvey = '',
  onSelectParcel,
  isCitizenView = false,
  onBack,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const geojsonLayerRef = useRef<L.GeoJSON | null>(null);

  const [activeParcel, setActiveParcel] = useState<any>(null);
  const [basemap, setBasemap] = useState<'carto' | 'satellite'>('carto');
  const [searchQuery, setSearchQuery] = useState('');
  const [showProhibitedZones, setShowProhibitedZones] = useState(true);
  const [parcelLookupMessage, setParcelLookupMessage] = useState<string>('');

  // Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [12.7224, 77.2814],
        zoom: 17,
        zoomControl: false,
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);

      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Add Tile Layer
    if (basemap === 'carto') {
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap &copy; CARTO &bull; DILRMP Cadastre',
        maxZoom: 20,
      }).addTo(map);
    } else {
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri World Imagery &bull; Bhuvan / ISRO',
        maxZoom: 19,
      }).addTo(map);
    }

    // Render Cadastral GeoJSON
    if (geojsonLayerRef.current) {
      map.removeLayer(geojsonLayerRef.current);
    }

    const geoLayer = L.geoJSON(CADASTRE_DATA as any, {
      filter: (feature) => {
        if (!showProhibitedZones && feature.properties?.type === 'PROHIBITED_ZONE') {
          return false;
        }
        return true;
      },
      style: (feature) => {
        const props = feature?.properties || {};

        if (props.type === 'PROHIBITED_ZONE') {
          if (props.category?.includes('Waterbody')) {
            return {
              color: '#0284c7',
              weight: 2,
              fillColor: '#38bdf8',
              fillOpacity: 0.45,
              dashArray: '4, 4',
            };
          }
          return {
            color: '#16a34a',
            weight: 2,
            fillColor: '#22c55e',
            fillOpacity: 0.35,
            dashArray: '5, 5',
          };
        }

        const isCurrentSelected =
          props.display_survey === selectedSurvey ||
          `${props.survey_no}/${props.hissa_no}` === selectedSurvey;

        if (props.risk_level === 'HIGH_RISK' || props.has_dispute) {
          return {
            color: isCurrentSelected ? '#f43f5e' : '#e11d48',
            weight: isCurrentSelected ? 4 : 2,
            fillColor: '#f43f5e',
            fillOpacity: isCurrentSelected ? 0.65 : 0.4,
          };
        }

        if (props.status === 'AREA_MISMATCH') {
          return {
            color: isCurrentSelected ? '#f59e0b' : '#d97706',
            weight: isCurrentSelected ? 4 : 2,
            fillColor: '#fbbf24',
            fillOpacity: isCurrentSelected ? 0.6 : 0.35,
          };
        }

        // Clean parcel
        return {
          color: isCurrentSelected ? '#10b981' : '#059669',
          weight: isCurrentSelected ? 4 : 2,
          fillColor: '#34d399',
          fillOpacity: isCurrentSelected ? 0.6 : 0.3,
        };
      },
      onEachFeature: (feature, layer) => {
        const props = feature.properties || {};

        if (props.type === 'PROHIBITED_ZONE') {
          layer.bindTooltip(`<b>${props.name}</b><br><span class="text-xs">${props.legal_act}</span>`, {
            sticky: true,
          });
          return;
        }

        const isCurrentSelected =
          props.display_survey === selectedSurvey ||
          `${props.survey_no}/${props.hissa_no}` === selectedSurvey;

        // Tooltip
        if (isCitizenView && !isCurrentSelected) {
          layer.bindTooltip(
            `<div class="p-1 text-xs">
              <strong style="color:#1b4d3e">Survey No. ${props.display_survey}</strong><br/>
              <span style="color:#7a9184">Adjacent Boundary Parcel</span>
            </div>`,
            { sticky: true }
          );
        } else {
          layer.bindTooltip(
            `<div class="p-1 text-xs">
              <strong style="color:#1b4d3e">Survey No. ${props.display_survey}</strong><br/>
              <span>Khatedar: ${props.khatedar_name}</span><br/>
              <span>Extent: ${props.extent_acres}A ${props.extent_guntas}G</span>
            </div>`,
            { sticky: true }
          );
        }

        // Click handler
        layer.on('click', () => {
          if (isCitizenView && !isCurrentSelected) {
            return; // Protect neighbor privacy in citizen view
          }
          setActiveParcel(props);
          if (onSelectParcel) {
            onSelectParcel(props.survey_no, (props.hissa_no || '0').toString());
          }
        });
      },
    }).addTo(map);

    geojsonLayerRef.current = geoLayer;

    // If selectedSurvey provided, auto-select details and zoom
    const matched = findCadastralParcel(selectedSurvey);
    if (matched) {
      setActiveParcel(matched.properties);
      setParcelLookupMessage('');
      if (isCitizenView && matched.geometry?.coordinates?.[0]) {
        const geom = matched.geometry.coordinates[0];
        const bounds = L.latLngBounds(geom.map((coord: any) => [coord[1], coord[0]]));
        map.fitBounds(bounds, { maxZoom: 18, padding: [60, 60] });
      }
    } else if (selectedSurvey) {
      setActiveParcel(null);
      setParcelLookupMessage(`Cadastral parcel data unavailable for Survey ${selectedSurvey}.`);
    } else {
      setActiveParcel(null);
      setParcelLookupMessage('No cadastral parcel selected.');
    }
  }, [basemap, selectedSurvey, showProhibitedZones, isCitizenView]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim() || !mapInstanceRef.current) return;

    const matched = findCadastralParcel(searchQuery.trim());

    if (matched) {
      setActiveParcel(matched.properties);
      setParcelLookupMessage('');
      if (onSelectParcel) {
        onSelectParcel((matched.properties.survey_no || '0').toString(), (matched.properties.hissa_no || '0').toString());
      }
      const geom = matched.geometry.coordinates[0];
      const bounds = L.latLngBounds(geom.map((coord: any) => [coord[1], coord[0]]));
      mapInstanceRef.current.fitBounds(bounds, { maxZoom: 18, padding: [40, 40] });
    } else {
      setActiveParcel(null);
      setParcelLookupMessage(`Cadastral parcel data unavailable for Survey ${searchQuery.trim()}.`);
      alert(`Cadastral parcel data unavailable for Survey ${searchQuery.trim()}.`);
    }
  };

  const centerDefault = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([12.7224, 77.2814], 17);
    }
  };

  return (
    <div className="relative w-full h-[640px] rounded-2xl overflow-hidden border border-line shadow-[0_16px_40px_rgba(18,53,44,0.12)] bg-sand flex flex-col">
      {/* Top Map Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-[1000] flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1.5 rounded-xl border border-line bg-paper-raised/95 px-3 py-1.5 text-xs font-semibold text-forest-deep shadow-xl transition hover:bg-sage-mist"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Go Back</span>
            </button>
          )}
        </div>

        {/* Search Bar (Officer) vs Validated Parcel Indicator (Citizen) */}
        {!isCitizenView ? (
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-paper-raised/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-line shadow-xl pointer-events-auto"
          >
            <Search className="w-4 h-4 text-ink-faint mr-2" />
            <input
              type="text"
              placeholder="Search Survey No (e.g. 42/1, 88/2, 104) or ULPIN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs text-ink placeholder-ink-faint focus:outline-none w-56 sm:w-72"
            />
            <button
              type="submit"
              className="ml-2 px-2.5 py-1 bg-forest hover:bg-forest-mid text-[11px] font-semibold text-white rounded-lg transition"
            >
              Locate
            </button>
          </form>
        ) : (
          <div className="flex items-center bg-paper-raised/95 backdrop-blur-md px-4 py-2 rounded-xl border border-line shadow-xl pointer-events-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-forest mr-2 animate-pulse" />
            <span className="text-xs font-bold text-forest-deep">
              Validated Parcel: Survey No. {selectedSurvey}
            </span>
            <span className="mx-2 text-ink-faint text-xs">•</span>
            <span className="text-[11px] text-ink-muted">Mayaganahalli Village</span>
          </div>
        )}

        {/* Layer Controls */}
        <div className="flex items-center space-x-2 pointer-events-auto">
          <div className="bg-paper-raised/95 backdrop-blur-md p-1 rounded-xl border border-line shadow-xl flex items-center space-x-1">
            <button
              onClick={() => setBasemap('carto')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                basemap === 'carto'
                  ? 'bg-forest text-white'
                  : 'text-ink-muted hover:text-forest-deep'
              }`}
            >
              Cadastre Vector
            </button>
            <button
              onClick={() => setBasemap('satellite')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                basemap === 'satellite'
                  ? 'bg-forest text-white'
                  : 'text-ink-muted hover:text-forest-deep'
              }`}
            >
              Bhuvan Satellite
            </button>
          </div>

          <button
            onClick={() => setShowProhibitedZones(!showProhibitedZones)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border backdrop-blur-md shadow-xl flex items-center space-x-1.5 transition ${
              showProhibitedZones
                ? 'bg-sage-mist/95 border-forest-mid text-forest'
                : 'bg-paper-raised/80 border-line text-ink-faint'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Sec 22A Zones</span>
          </button>

          <button
            onClick={centerDefault}
            className="p-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-300 border border-slate-700 shadow-xl transition"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full flex-1" />

      {/* Bottom Floating Parcel Inspector Card */}
      {!activeParcel && parcelLookupMessage && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[1000] bg-amber-950/95 border border-amber-700 rounded-2xl p-3 text-xs text-amber-200 shadow-xl">
          <div className="flex items-start gap-2">
            <ShieldAlert className="w-4 h-4 mt-0.5 text-amber-300 shrink-0" />
            <span>{parcelLookupMessage}</span>
          </div>
        </div>
      )}

      {activeParcel && (
        <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-[1000] bg-slate-900/95 backdrop-blur-md border border-slate-700 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  activeParcel.risk_level === 'HIGH_RISK'
                    ? 'bg-rose-500 animate-ping'
                    : activeParcel.status === 'AREA_MISMATCH'
                    ? 'bg-amber-400'
                    : 'bg-emerald-400'
                }`}
              />
              <h3 className="font-bold text-white text-base">
                Survey No. {activeParcel.display_survey}
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 font-mono">
                {activeParcel.village}
              </span>
            </div>
            <span
              className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                activeParcel.risk_level === 'HIGH_RISK'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                  : activeParcel.status === 'AREA_MISMATCH'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
              }`}
            >
              {activeParcel.risk_level === 'HIGH_RISK'
                ? 'CRITICAL ALERT'
                : activeParcel.status === 'AREA_MISMATCH'
                ? 'AREA MISMATCH'
                : 'CLEAR TITLE'}
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Registered Khatedar</span>
              <span className="font-semibold text-slate-200 truncate block">
                {activeParcel.khatedar_name}
              </span>
              <span className="text-slate-400 text-[10px] truncate block">
                {activeParcel.father_name}
              </span>
            </div>

            <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800">
              <span className="text-slate-500 block text-[10px]">Cadastral Extent</span>
              <span className="font-semibold text-emerald-400">
                {activeParcel.extent_acres}A {activeParcel.extent_guntas}G
              </span>
              <span className="text-slate-400 text-[10px] block">
                ({activeParcel.extent_sq_meters?.toLocaleString()} sq.m)
              </span>
            </div>
          </div>

          {/* ULPIN and Encumbrance */}
          <div className="mt-2.5 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
            <div className="flex items-center space-x-1.5 text-slate-400 font-mono">
              <span className="text-slate-500">ULPIN:</span>
              <span className="text-slate-300 font-semibold">{activeParcel.ulpin}</span>
            </div>
            <span
              className={`font-medium ${
                activeParcel.has_dispute ? 'text-rose-400' : 'text-emerald-400'
              }`}
            >
              {activeParcel.has_dispute ? 'Active Dispute' : 'Nil Encumbrance'}
            </span>
          </div>

          {/* Dispute Warning Notice if applicable */}
          {activeParcel.dispute_reason && (
            <div className="mt-2.5 p-2 bg-rose-950/50 border border-rose-800/60 rounded-xl text-xs text-rose-200 flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <p className="text-[11px] leading-tight">{activeParcel.dispute_reason}</p>
            </div>
          )}
        </div>
      )}

      {/* Legend Badge in Bottom Right */}
      <div className="absolute bottom-4 right-4 z-[1000] hidden md:block bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 text-[11px] shadow-xl space-y-1.5">
        <span className="font-semibold text-slate-400 block text-[10px] uppercase tracking-wider">
          Cadastre Legend
        </span>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded bg-emerald-500/60 border border-emerald-400" />
          <span>Validated Parcel (Clear Title)</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded bg-rose-500/60 border border-rose-400" />
          <span>Disputed / Encroached Parcel</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded bg-amber-500/60 border border-amber-400" />
          <span>Area Discrepancy Parcel</span>
        </div>
        <div className="flex items-center space-x-2 text-slate-300">
          <span className="w-3 h-3 rounded bg-sky-500/50 border border-dashed border-sky-400" />
          <span>Section 22A Waterbody Buffer</span>
        </div>
      </div>
    </div>
  );
};
