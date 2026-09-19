import React, { useState } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
  EyeOff,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Search,
  Sliders,
  HelpCircle,
  Telescope,
  Globe,
} from 'lucide-react';
import { ScaleMode, ViewCategory, CelestialBodyData, AppViewMode } from '../types';
import { spaceAudio } from '../utils/spaceAudio';

interface ControlsOverlayProps {
  appMode: AppViewMode;
  onSetAppMode: (mode: AppViewMode) => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetView: () => void;
  showOrbits: boolean;
  onToggleOrbits: () => void;
  showLabels: boolean;
  onToggleLabels: () => void;
  simulationSpeed: number;
  onSetSimulationSpeed: (speed: number) => void;
  isPaused: boolean;
  onTogglePause: () => void;
  scaleMode: ScaleMode;
  onSetScaleMode: (mode: ScaleMode) => void;
  activeCategory: ViewCategory;
  onSelectCategory: (cat: ViewCategory) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchResults: CelestialBodyData[];
  onSelectBody: (b: CelestialBodyData) => void;
  simulatedDays: number;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  appMode,
  onSetAppMode,
  onZoomIn,
  onZoomOut,
  onResetView,
  showOrbits,
  onToggleOrbits,
  showLabels,
  onToggleLabels,
  simulationSpeed,
  onSetSimulationSpeed,
  isPaused,
  onTogglePause,
  scaleMode,
  onSetScaleMode,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectBody,
  simulatedDays,
}) => {
  const [isMuted, setIsMuted] = useState(spaceAudio.getMuted());
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const handleAudioToggle = () => {
    const muted = spaceAudio.toggleMute();
    setIsMuted(muted);
  };

  const speedOptions = [0.5, 1, 5, 20, 100];

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-30 px-4 py-3 bg-gradient-to-b from-slate-950/95 via-slate-950/75 to-transparent backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3 pointer-events-none">
        {/* Title & Brand */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-amber-500 flex items-center justify-center shadow-lg shadow-cyan-500/20 border border-cyan-400/30">
            <span className="text-white text-lg font-black">🪐</span>
          </div>
          <div>
            <h1 className="text-base md:text-lg font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-amber-200">
              KOINOT VA SAYYORALAR OBSERVATORIYASI
            </h1>
            <div className="text-[11px] text-slate-400 font-medium">
              NASA va xalqaro kosmik agentliklarning real fotosuratlari va teleskopik tahlili
            </div>
          </div>
        </div>

        {/* Center: Real Observatory vs 3D Space Switcher */}
        <div className="flex items-center p-1 bg-slate-900/90 backdrop-blur-md rounded-2xl border border-cyan-500/30 shadow-xl pointer-events-auto">
          <button
            id="btn-mode-real-observatory"
            onClick={() => {
              spaceAudio.playSelectSound();
              onSetAppMode('telescope');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              appMode === 'telescope'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Telescope className="w-3.5 h-3.5" />
            <span>🛰️ Haqiqiy Observatoriya</span>
          </button>
          <button
            id="btn-mode-space3d"
            onClick={() => {
              spaceAudio.playSelectSound();
              onSetAppMode('space3d');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              appMode === 'space3d'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>🌌 3D Orbita</span>
          </button>
        </div>

        {/* Category Filter Pills & Search */}
        <div className="flex items-center gap-2 pointer-events-auto flex-wrap justify-center">
          {/* Category Tabs */}
          <div className="flex p-1 bg-slate-900/80 backdrop-blur-md rounded-xl border border-slate-700/60 shadow-lg text-xs">
            <button
              onClick={() => onSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Barchasi
            </button>
            <button
              onClick={() => onSelectCategory('terrestrial')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'terrestrial'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Qoyatosh
            </button>
            <button
              onClick={() => onSelectCategory('gas')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'gas'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Gaz gigantlari
            </button>
            <button
              onClick={() => onSelectCategory('dwarf')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === 'dwarf'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Mitti
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative">
            <div className="flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-xl px-2.5 py-1.5 shadow-lg">
              <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setShowSearchDropdown(true);
                }}
                onFocus={() => setShowSearchDropdown(true)}
                placeholder="Sayyora qidirish..."
                className="bg-transparent text-xs text-slate-100 placeholder-slate-400 focus:outline-none w-28 md:w-36"
              />
            </div>

            {/* Search Dropdown Results */}
            {showSearchDropdown && searchQuery.trim().length > 0 && (
              <div className="absolute right-0 mt-1.5 w-52 bg-slate-900/95 backdrop-blur-xl border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden z-40 max-h-60 overflow-y-auto">
                {searchResults.length === 0 ? (
                  <div className="p-3 text-xs text-slate-400 text-center">Topilmadi</div>
                ) : (
                  searchResults.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => {
                        onSelectBody(b);
                        setShowSearchDropdown(false);
                        onSearchChange('');
                      }}
                      className="w-full px-3 py-2 text-left hover:bg-slate-800/80 flex items-center justify-between transition-colors border-b border-slate-800/60 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: b.visual.color }}
                        />
                        <span className="text-xs font-semibold text-slate-100">{b.nameUz}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {b.distanceFromSunAu} AU
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Audio Ambient Toggle */}
          <button
            id="btn-toggle-sound"
            onClick={handleAudioToggle}
            title={isMuted ? "Kosmik ovozni yoqish" : "Ovozni o'chirish"}
            className={`p-2 rounded-xl backdrop-blur-md border shadow-lg transition-all ${
              !isMuted
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50 shadow-cyan-500/20'
                : 'bg-slate-900/80 text-slate-400 border-slate-700/60 hover:text-slate-200'
            }`}
          >
            {!isMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Help Button */}
          <button
            id="btn-help-modal"
            onClick={() => setShowHelpModal(true)}
            title="Qo'llanma va boshqaruv"
            className="p-2 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-slate-400 hover:text-slate-200 shadow-lg transition-all"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Floating 3D Navigation Controls (only in 3D Mode) */}
      {appMode === 'space3d' && (
        <>
          <div className="absolute left-4 top-24 z-20 flex flex-col gap-2 pointer-events-auto">
            <div className="p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl flex flex-col gap-1 text-slate-200">
              <button
                id="btn-camera-zoom-in"
                onClick={onZoomIn}
                title="Yaqinlashtirish (Zoom In)"
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-300 hover:text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                id="btn-camera-zoom-out"
                onClick={onZoomOut}
                title="Uzoqlashtirish (Zoom Out)"
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-300 hover:text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-full h-px bg-slate-800 my-0.5" />
              <button
                id="btn-camera-reset"
                onClick={onResetView}
                title="Quyosh tizimini to'liq ko'rish (Reset)"
                className="p-2 hover:bg-slate-800 rounded-xl transition-colors text-slate-300 hover:text-cyan-300"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Visibility Toggles */}
            <div className="p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl flex flex-col gap-1 text-slate-200">
              <button
                id="btn-toggle-orbits"
                onClick={onToggleOrbits}
                title={showOrbits ? "Orbita izlarini yashirish" : "Orbita izlarini ko'rsatish"}
                className={`p-2 rounded-xl transition-colors ${
                  showOrbits
                    ? 'bg-cyan-600/30 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                {showOrbits ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </button>
              <button
                id="btn-toggle-labels"
                onClick={onToggleLabels}
                title={showLabels ? "Sayyora nomlarini yashirish" : "Sayyora nomlarini ko'rsatish"}
                className={`px-2 py-1.5 text-[10px] font-bold rounded-xl transition-colors flex items-center justify-center ${
                  showLabels
                    ? 'bg-amber-600/30 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                ABC
              </button>
            </div>

            {/* Scale Mode Switcher */}
            <div className="p-1.5 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-xl flex flex-col gap-1">
              <button
                id="btn-scale-visual"
                onClick={() => onSetScaleMode('visual')}
                title="Qulay ko'rgazmali masshtab"
                className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                  scaleMode === 'visual'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Ko'rgazmali
              </button>
              <button
                id="btn-scale-logarithmic"
                onClick={() => onSetScaleMode('logarithmic')}
                title="Logarifmik real masofa masshtabi"
                className={`px-2 py-1 text-[10px] font-medium rounded-lg transition-colors ${
                  scaleMode === 'logarithmic'
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Haqiqiy
              </button>
            </div>
          </div>

          {/* Floating Bottom-Left Time Simulator Controller */}
          <div className="absolute left-4 bottom-24 z-20 pointer-events-auto">
            <div className="p-2 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-700/60 shadow-2xl flex items-center gap-2 text-slate-200">
              <button
                id="btn-toggle-play-pause"
                onClick={onTogglePause}
                className={`p-2 rounded-xl transition-colors ${
                  isPaused
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-cyan-600/40 text-cyan-300 hover:bg-cyan-600/60'
                }`}
                title={isPaused ? "Davom ettirish" : "To'xtatib turish"}
              >
                {isPaused ? <Play className="w-4 h-4 fill-current" /> : <Pause className="w-4 h-4" />}
              </button>

              {/* Speed Presets */}
              <div className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
                {speedOptions.map((spd) => (
                  <button
                    key={spd}
                    onClick={() => onSetSimulationSpeed(spd)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-mono font-semibold transition-all ${
                      simulationSpeed === spd && !isPaused
                        ? 'bg-cyan-500 text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>

              <div className="hidden sm:block pl-2 border-l border-slate-800 pr-1">
                <div className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">
                  Simulyatsiya kuni
                </div>
                <div className="text-xs font-mono font-bold text-cyan-300">
                  +{Math.floor(simulatedDays)} kun
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Interactive Guide / Help Modal */}
      {showHelpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="max-w-md w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 shadow-2xl text-slate-200 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sliders className="w-5 h-5 text-cyan-400" />
                <span>Haqiqiy Observatoriya va Boshqaruv</span>
              </h3>
              <button
                onClick={() => setShowHelpModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex gap-3">
                <span className="text-lg">🛰️</span>
                <div>
                  <strong className="text-white block mb-0.5">Haqiqiy Observatoriya Rejimi</strong>
                  NASA va xalqaro fazoviy missiyalarning haqiqiy fotosuratlari, Perseverance, Cassini va Hubble zondi tasvirlari hamda yuzadagi nuqtalar.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex gap-3">
                <span className="text-lg">🔍</span>
                <div>
                  <strong className="text-white block mb-0.5">Yuzani Yaqindan O'rganish (Deep Zoom)</strong>
                  Chapdagi (+) va (-) tugmalari yoki sichqoncha g'ildiragi orqali sayyora yuzasini 12 barobargacha chuqur yaqinlashtirib, krater va kanyonlarni ko'rishingiz mumkin.
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex gap-3">
                <span className="text-lg">📍</span>
                <div>
                  <strong className="text-white block mb-0.5">Geologik Nuqtalar (Pins)</strong>
                  Sayyora yuzasida yonib turgan ko'k doiralarni bosing (masalan, Marsdagi Olimp tog'i yoki Oyga inson qadami qo'yilgan Osoyishtalik dengizi).
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 flex gap-3">
                <span className="text-lg">🌌</span>
                <div>
                  <strong className="text-white block mb-0.5">3D Orbita Rejimiga O'tish</strong>
                  Yuqori paneldagi "3D Orbita" tugmasi orqali butun Quyosh tizimining orbital harakatini 3D fazoda kuzatishingiz mumkin.
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs tracking-wider transition-all"
            >
              Tushunarli, boshladik!
            </button>
          </div>
        </div>
      )}
    </>
  );
};
