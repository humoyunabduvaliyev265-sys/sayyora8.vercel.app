import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Camera,
  Layers,
  Compass,
  Clock,
  Radio,
  ExternalLink,
  ChevronRight,
  Info,
  Maximize,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { CelestialBodyData, GeologicalLandmark, TelescopeFilter } from '../types';
import { spaceAudio } from '../utils/spaceAudio';

interface RealObservatoryViewProps {
  body: CelestialBodyData;
  onSelectLandmark?: (landmark: GeologicalLandmark) => void;
  onOpenComparison: (body: CelestialBodyData) => void;
}

export const RealObservatoryView: React.FC<RealObservatoryViewProps> = ({
  body,
  onOpenComparison,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [activeFilter, setActiveFilter] = useState<TelescopeFilter>('natural');
  const [selectedLandmark, setSelectedLandmark] = useState<GeologicalLandmark | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [showLandmarkPins, setShowLandmarkPins] = useState<boolean>(true);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  // Slow realistic rotation
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setRotationAngle((prev) => (prev + 0.1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Reset zoom & pan when body changes
  useEffect(() => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedLandmark(null);
    setActivePhotoIndex(null);
    setActiveFilter('natural');
    setRotationAngle(0);
  }, [body.id]);

  const handleZoomIn = () => {
    spaceAudio.playClickSound();
    setZoomLevel((prev) => Math.min(prev * 1.5, 12));
  };

  const handleZoomOut = () => {
    spaceAudio.playClickSound();
    setZoomLevel((prev) => {
      const next = prev / 1.5;
      if (next <= 1) {
        setPanOffset({ x: 0, y: 0 });
        return 1;
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    spaceAudio.playClickSound();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
    setSelectedLandmark(null);
  };

  // Mouse pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPanOffset({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleLandmarkClick = (lm: GeologicalLandmark) => {
    spaceAudio.playSelectSound();
    setSelectedLandmark(lm);
    setIsAutoRotating(false);
    // Smoothly focus on landmark
    setZoomLevel(3.5);
    const targetX = (50 - lm.coords.x) * 4;
    const targetY = (50 - lm.coords.y) * 4;
    setPanOffset({ x: targetX, y: targetY });
  };

  // Determine current display image based on active filter
  const getCurrentImageUrl = () => {
    if (activeFilter === 'infrared' && body.infraredImageUrl) {
      return body.infraredImageUrl;
    }
    if (activeFilter === 'radar' && body.radarImageUrl) {
      return body.radarImageUrl;
    }
    if (activeFilter === 'night' && body.nightImageUrl) {
      return body.nightImageUrl;
    }
    return body.realImageUrl;
  };

  return (
    <div
      id="real-observatory-container"
      className="relative w-full h-full flex flex-col md:flex-row overflow-hidden select-none bg-slate-950"
    >
      {/* Center/Left Main Telescope Viewport */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative flex-1 h-full flex items-center justify-center overflow-hidden cursor-${
          zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
        }`}
      >
        {/* Deep Space Background with Stars */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black pointer-events-none" />

        {/* Telescope Reticle HUD Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-25 flex items-center justify-center">
          <div className="w-[85vw] h-[85vw] max-w-[650px] max-h-[650px] rounded-full border border-cyan-500/40 border-dashed" />
          <div className="absolute w-[60vw] h-[60vw] max-w-[450px] max-h-[450px] rounded-full border border-cyan-400/20" />
          <div className="absolute w-full h-px bg-cyan-400/20" />
          <div className="absolute h-full w-px bg-cyan-400/20" />
        </div>

        {/* Live Telescope HUD Telemetry Data (Top Left) */}
        <div className="absolute top-16 left-6 z-10 pointer-events-none space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[11px] font-mono tracking-widest text-emerald-400 uppercase font-bold">
              OPTICAL OBSERVATORY TELEMETRY
            </span>
          </div>
          <div className="text-xs font-mono text-cyan-200/90 font-medium">
            NISHON: <span className="font-bold text-white uppercase">{body.nameUz}</span> ({body.nameEn})
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            MASOFA: {body.distanceFromSunKm ? `${(body.distanceFromSunKm / 1e6).toFixed(1)} mln km` : 'Markaz'}
          </div>
          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>Yorug'lik kechikishi: </span>
            <span className="text-amber-300 font-bold">{body.lightTravelTimeSun}</span>
          </div>
          <div className="text-[11px] font-mono text-slate-400">
            Kattalashtirish darajasi: <span className="text-cyan-300 font-bold">{zoomLevel.toFixed(1)}x</span>
          </div>
        </div>

        {/* Real Celestial Body Sphere & Surface Inspection */}
        <div
          className="relative transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          }}
        >
          {/* Planetary Glow / Atmosphere halo */}
          <div
            className="absolute rounded-full pointer-events-none blur-2xl opacity-40 transition-all duration-500"
            style={{
              width: '420px',
              height: '420px',
              backgroundColor: body.visual.color,
            }}
          />

          {/* Real Photographic Planet Container */}
          <div
            className="relative rounded-full shadow-2xl overflow-hidden border border-white/10"
            style={{
              width: '380px',
              height: '380px',
              boxShadow: `0 0 60px ${body.visual.color}33, inset -40px -30px 60px rgba(0,0,0,0.85)`,
            }}
          >
            {/* Real NASA Satellite Photo */}
            <img
              src={getCurrentImageUrl()}
              alt={body.nameUz}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out"
              style={{
                transform: `rotate(${rotationAngle}deg)`,
                filter:
                  activeFilter === 'infrared'
                    ? 'contrast(1.3) hue-rotate(90deg) saturate(1.8)'
                    : activeFilter === 'radar'
                    ? 'contrast(1.5) grayscale(0.6) sepia(0.8)'
                    : 'none',
              }}
            />

            {/* Day/Night Real Shadow Terminator */}
            <div
              className="absolute inset-0 pointer-events-none rounded-full"
              style={{
                background:
                  body.id === 'sun'
                    ? 'none'
                    : 'linear-gradient(105deg, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0.98) 100%)',
              }}
            />

            {/* Real Surface Geological Landmark Markers */}
            {showLandmarkPins &&
              body.landmarks.map((lm) => (
                <button
                  key={lm.id}
                  id={`landmark-pin-${lm.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLandmarkClick(lm);
                  }}
                  className={`absolute z-20 group -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 ${
                    selectedLandmark?.id === lm.id ? 'scale-125' : ''
                  }`}
                  style={{
                    left: `${lm.coords.x}%`,
                    top: `${lm.coords.y}%`,
                  }}
                  title={lm.nameUz}
                >
                  <span className="relative flex h-5 w-5 items-center justify-center">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-cyan-500 border-2 border-white shadow-lg shadow-cyan-500/50" />
                  </span>

                  {/* Pin label popup */}
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded-md bg-slate-900/90 border border-cyan-500/50 text-[10px] font-bold text-cyan-200 whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity">
                    {lm.nameUz}
                  </span>
                </button>
              ))}
          </div>
        </div>

        {/* Floating Zoom & Observation Action Controls */}
        <div className="absolute left-6 bottom-24 z-20 flex flex-col gap-2 pointer-events-auto">
          <div className="p-1.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-2xl flex flex-col gap-1 text-slate-200">
            <button
              id="btn-real-zoom-in"
              onClick={handleZoomIn}
              title="Yuzani chuqur yaqinlashtirish (Zoom In)"
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-200 hover:text-white"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              id="btn-real-zoom-out"
              onClick={handleZoomOut}
              title="Uzoqlashtirish (Zoom Out)"
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-200 hover:text-white"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <div className="w-full h-px bg-slate-800 my-0.5" />
            <button
              id="btn-real-reset-zoom"
              onClick={handleResetZoom}
              title="Kattalashtirishni asliga qaytarish"
              className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-400 hover:text-cyan-300"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Toggle Landmarks & Auto-rotation */}
          <div className="p-1.5 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-2xl flex flex-col gap-1 text-slate-200">
            <button
              onClick={() => setShowLandmarkPins((prev) => !prev)}
              title={showLandmarkPins ? "Nuqtalarni yashirish" : "Yuzadagi diqqatga sazovor nuqtalarni ko'rsatish"}
              className={`p-2 rounded-xl transition-all ${
                showLandmarkPins
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Compass className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsAutoRotating((prev) => !prev)}
              title={isAutoRotating ? "Aylanishni to'xtatish" : "Sekin aylantirish"}
              className={`p-2 rounded-xl transition-all ${
                isAutoRotating
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Filter Selector (Visible, Infrared, Radar, Night) */}
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/90 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl">
            <button
              onClick={() => {
                spaceAudio.playClickSound();
                setActiveFilter('natural');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === 'natural'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tabiiy Rang</span>
            </button>

            {body.infraredImageUrl && (
              <button
                onClick={() => {
                  spaceAudio.playClickSound();
                  setActiveFilter('infrared');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeFilter === 'infrared'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Infraqizil</span>
              </button>
            )}

            {body.radarImageUrl && (
              <button
                onClick={() => {
                  spaceAudio.playClickSound();
                  setActiveFilter('radar');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeFilter === 'radar'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Radio className="w-3.5 h-3.5" />
                <span>Radar Relyef</span>
              </button>
            )}

            {body.nightImageUrl && (
              <button
                onClick={() => {
                  spaceAudio.playClickSound();
                  setActiveFilter('night');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeFilter === 'night'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Tungi Chiroqlar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar: Real Surface Landmarks & NASA Rover Photo Gallery */}
      <div className="w-full md:w-96 lg:w-[420px] h-auto md:h-full bg-slate-900/90 backdrop-blur-2xl border-t md:border-t-0 md:border-l border-slate-800 flex flex-col z-30 overflow-y-auto">
        {/* Header with Planet Title */}
        <div className="p-4 border-b border-slate-800/80 sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 flex items-center justify-between">
          <div>
            <div className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
              REAL KOSMIK HUJJATLAR
            </div>
            <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
              <span>{body.nameUz}</span>
              <span className="text-xs font-normal text-slate-400">({body.nameEn})</span>
            </h2>
          </div>

          <button
            onClick={() => onOpenComparison(body)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 text-xs font-bold transition-all shadow-md"
          >
            Yer bilan solishtirish
          </button>
        </div>

        {/* Selected Landmark Details Card (if clicked) */}
        {selectedLandmark && (
          <div className="m-4 p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 shadow-xl space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  {selectedLandmark.typeUz}
                </span>
                <h3 className="text-base font-bold text-white mt-1">
                  {selectedLandmark.nameUz}
                </h3>
                {selectedLandmark.sizeKm && (
                  <div className="text-xs font-mono text-cyan-300">
                    O'lchami: {selectedLandmark.sizeKm}
                  </div>
                )}
              </div>
              <button
                onClick={() => setSelectedLandmark(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {selectedLandmark.descriptionUz}
            </p>

            {selectedLandmark.realPhotoUrl && (
              <div className="rounded-xl overflow-hidden border border-slate-700 relative">
                <img
                  src={selectedLandmark.realPhotoUrl}
                  alt={selectedLandmark.nameUz}
                  referrerPolicy="no-referrer"
                  className="w-full h-36 object-cover"
                />
                <div className="absolute bottom-0 inset-x-0 p-1.5 bg-black/70 text-[9px] text-slate-300 font-mono">
                  Haqiqiy zond tasviri
                </div>
              </div>
            )}
          </div>
        )}

        {/* Real Surface Geological Landmarks Section */}
        <div className="p-4 space-y-3 border-b border-slate-800/80">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-cyan-400" />
              <span>Haqiqiy Yuzadagi Joylar ({body.landmarks.length})</span>
            </h3>
            <span className="text-[10px] text-slate-500 font-mono">Yaqindan ko'rish uchun bosing</span>
          </div>

          <div className="space-y-2">
            {body.landmarks.map((lm) => (
              <button
                key={lm.id}
                onClick={() => handleLandmarkClick(lm)}
                className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                  selectedLandmark?.id === lm.id
                    ? 'bg-cyan-900/40 border-cyan-400 shadow-md'
                    : 'bg-slate-800/50 border-slate-700/60 hover:bg-slate-800 hover:border-slate-600'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-slate-100">{lm.nameUz}</div>
                  <div className="text-[10px] text-slate-400">{lm.typeUz} {lm.sizeKm ? `• ${lm.sizeKm}` : ''}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-cyan-400 shrink-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Real Spacecraft & Rover Photos Gallery Section */}
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Camera className="w-3.5 h-3.5 text-amber-400" />
              <span>NASA & ESA Haqiqiy Fotosuratlari</span>
            </h3>
          </div>

          <div className="space-y-3">
            {body.realPhotos.map((photo, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-800/60 border border-slate-700/80 overflow-hidden shadow-lg group"
              >
                <div
                  className="relative cursor-pointer overflow-hidden"
                  onClick={() => setActivePhotoIndex(index)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.titleUz}
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[9px] font-mono text-cyan-300 border border-white/10">
                    {photo.source}
                  </div>
                </div>
                <div className="p-3 space-y-1">
                  <h4 className="text-xs font-bold text-white">{photo.titleUz}</h4>
                  <p className="text-[11px] text-slate-300 leading-relaxed">{photo.descriptionUz}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Quick Facts */}
        <div className="p-4 border-t border-slate-800/80 space-y-2 mt-auto">
          <div className="text-[10px] uppercase tracking-wider font-bold text-slate-400">
            Muhim Ilmiy Ko'rsatkichlar
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="text-[10px] text-slate-500">Diametr</div>
              <div className="font-bold text-white">{body.diameterKm.toLocaleString()} km</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="text-[10px] text-slate-500">O'rtacha Harorat</div>
              <div className="font-bold text-cyan-300">{body.avgTempC} °C</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="text-[10px] text-slate-500">Gravitatsiya</div>
              <div className="font-bold text-amber-300">{body.gravityMps2} m/s²</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="text-[10px] text-slate-500">Sutka Davomiyligi</div>
              <div className="font-bold text-white">{body.rotationPeriodHours} soat</div>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Photo Modal if clicked */}
      {activePhotoIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={() => setActivePhotoIndex(null)}
        >
          <div
            className="max-w-3xl w-full bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={body.realPhotos[activePhotoIndex].imageUrl}
                alt={body.realPhotos[activePhotoIndex].titleUz}
                referrerPolicy="no-referrer"
                className="w-full max-h-[70vh] object-contain bg-black"
              />
              <button
                onClick={() => setActivePhotoIndex(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 text-white hover:bg-black text-sm"
              >
                ✕
              </button>
            </div>
            <div className="p-4 space-y-1">
              <div className="text-[10px] font-mono text-cyan-400">
                {body.realPhotos[activePhotoIndex].source}
              </div>
              <h3 className="text-base font-bold text-white">
                {body.realPhotos[activePhotoIndex].titleUz}
              </h3>
              <p className="text-xs text-slate-300">
                {body.realPhotos[activePhotoIndex].descriptionUz}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
