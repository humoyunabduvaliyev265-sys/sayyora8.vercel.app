import React, { useState } from 'react';
import { CelestialBodyData } from '../types';
import {
  X,
  Compass,
  Thermometer,
  RotateCw,
  Orbit,
  Weight,
  Layers,
  Sparkles,
  Rocket,
  CircleDot,
  Scale,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

interface PlanetInfoPanelProps {
  body: CelestialBodyData;
  onClose: () => void;
  onCompare: (body: CelestialBodyData) => void;
  onZoomIn: () => void;
  onSelectNext: () => void;
  onSelectPrev: () => void;
}

type TabType = 'overview' | 'structure' | 'moons' | 'facts' | 'missions';

export const PlanetInfoPanel: React.FC<PlanetInfoPanelProps> = ({
  body,
  onClose,
  onCompare,
  onZoomIn,
  onSelectNext,
  onSelectPrev,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div
      id="planet-info-panel"
      className="absolute top-16 right-4 bottom-24 w-[420px] max-w-[calc(100vw-32px)] z-30 flex flex-col bg-slate-900/85 backdrop-blur-xl border border-slate-700/60 rounded-2xl shadow-2xl text-slate-100 overflow-hidden transition-all duration-300 animate-in fade-in slide-in-from-right-8"
    >
      {/* Header with Visual Glow */}
      <div className="relative p-5 pb-4 border-b border-slate-800 bg-gradient-to-b from-slate-800/40 to-transparent">
        {/* Glow accent */}
        <div
          className="absolute -top-10 -right-10 w-36 h-36 rounded-full blur-3xl opacity-30 pointer-events-none"
          style={{ backgroundColor: body.visual.color }}
        />

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full shadow-md animate-pulse"
              style={{ backgroundColor: body.visual.color }}
            />
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800/90 text-cyan-400 border border-cyan-500/30 tracking-wide uppercase">
              {body.typeLabelUz}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              id="btn-prev-planet"
              onClick={onSelectPrev}
              title="Oldingi sayyora"
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              id="btn-next-planet"
              onClick={onSelectNext}
              title="Keyingi sayyora"
              className="p-1.5 text-slate-400 hover:text-slate-100 hover:bg-slate-800/70 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              id="btn-close-info-panel"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/70 rounded-lg transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">{body.nameUz}</h2>
          <span className="text-sm text-slate-400 font-medium">({body.nameEn})</span>
        </div>

        <p className="text-xs text-slate-300 mt-1 line-clamp-2 leading-relaxed font-normal">
          {body.taglineUz}
        </p>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-2 mt-3 pt-1">
          <button
            id="btn-zoom-in-planet"
            onClick={onZoomIn}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-200 border border-cyan-500/40 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
          >
            <ZoomIn className="w-3.5 h-3.5" />
            <span>Yaqinlashtirish</span>
          </button>

          {body.id !== 'earth' && (
            <button
              id="btn-compare-earth"
              onClick={() => onCompare(body)}
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-500/40 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-95"
            >
              <Scale className="w-3.5 h-3.5" />
              <span>Yer bilan solishtirish</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-900/60 px-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'overview'
              ? 'border-cyan-400 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Sharh</span>
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'structure'
              ? 'border-cyan-400 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Tuzilishi</span>
        </button>
        {body.moonsCount > 0 && (
          <button
            onClick={() => setActiveTab('moons')}
            className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'moons'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            <span>Yo'ldoshlar ({body.moonsCount})</span>
          </button>
        )}
        <button
          onClick={() => setActiveTab('facts')}
          className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'facts'
              ? 'border-cyan-400 text-cyan-400 font-semibold'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Faktlar</span>
        </button>
        {body.missions.length > 0 && (
          <button
            onClick={() => setActiveTab('missions')}
            className={`flex-1 py-2 text-xs font-medium border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'missions'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>Missiyalar</span>
          </button>
        )}
      </div>

      {/* Tab Contents (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-normal">
        {/* 1. OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <p className="text-slate-300 leading-relaxed text-[13px]">
              {body.descriptionUz}
            </p>

            {/* Quick Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Orbit className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Quyoshdan masofa</span>
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {body.distanceFromSunAu === 0 ? 'Markaz' : `${body.distanceFromSunAu} AU`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {body.distanceFromSunKm === 0 ? '0 km' : `~${body.distanceFromSunKm.toLocaleString()} km`}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  <span>O'rtacha harorat</span>
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {body.avgTempC > 0 ? `+${body.avgTempC}°C` : `${body.avgTempC}°C`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {body.minTempC !== undefined && body.maxTempC !== undefined
                    ? `${body.minTempC}° dan ${body.maxTempC}°C gacha`
                    : 'Barqaror'}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <RotateCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Aylanish davri (Yil)</span>
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {body.orbitalPeriodDays === 0
                    ? 'Markaziy yulduz'
                    : body.orbitalPeriodDays >= 365
                    ? `${(body.orbitalPeriodDays / 365.25).toFixed(1)} yil`
                    : `${body.orbitalPeriodDays} kun`}
                </div>
                <div className="text-[10px] text-slate-400">Quyosh atrofida to'liq orbitasi</div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Compass className="w-3.5 h-3.5 text-purple-400" />
                  <span>Bir kun uzunligi</span>
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {Math.abs(body.rotationPeriodHours) >= 24
                    ? `${(Math.abs(body.rotationPeriodHours) / 24).toFixed(1)} kun`
                    : `${Math.abs(body.rotationPeriodHours).toFixed(1)} soat`}
                </div>
                <div className="text-[10px] text-slate-400">
                  {body.rotationPeriodHours < 0 ? 'Teskari (retrograd)' : "O'z o'qi atrofida"}
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <CircleDot className="w-3.5 h-3.5 text-blue-400" />
                  <span>Ekvatorial diametr</span>
                </div>
                <div className="text-sm font-bold text-slate-100">
                  {body.diameterKm.toLocaleString()} km
                </div>
                <div className="text-[10px] text-slate-400">
                  {(body.diameterKm / 12742).toFixed(2)}x Yer o'lchami
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50">
                <div className="flex items-center gap-1.5 text-slate-400 mb-1">
                  <Weight className="w-3.5 h-3.5 text-rose-400" />
                  <span>Gravitatsiya (tortishish)</span>
                </div>
                <div className="text-sm font-bold text-slate-100">{body.gravityMps2} m/s²</div>
                <div className="text-[10px] text-slate-400">
                  {(body.gravityMps2 / 9.81).toFixed(2)}g (Yerga nisbatan)
                </div>
              </div>
            </div>

            {/* Atmosphere Details */}
            {body.atmosphereCompositionUz.length > 0 && (
              <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/40">
                <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                  Atmosfera tarkibi
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {body.atmosphereCompositionUz.map((elem, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-[11px] border border-slate-700"
                    >
                      {elem}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. INTERNAL STRUCTURE */}
        {activeTab === 'structure' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              {body.nameUz}ning qatlamli ichki anatomiyasi
            </h4>

            {/* Visual concentric layers preview */}
            <div className="relative p-3 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center justify-center min-h-[140px] overflow-hidden">
              <div className="relative w-28 h-28 flex items-center justify-center">
                {body.internalLayers.map((layer, idx) => {
                  const sizePct = 100 - (idx / body.internalLayers.length) * 65;
                  return (
                    <div
                      key={idx}
                      className="absolute rounded-full border shadow-inner flex items-center justify-center transition-transform hover:scale-105"
                      style={{
                        width: `${sizePct}%`,
                        height: `${sizePct}%`,
                        backgroundColor: layer.color,
                        borderColor: 'rgba(255,255,255,0.2)',
                        opacity: 0.85,
                        zIndex: body.internalLayers.length - idx,
                      }}
                      title={`${layer.nameUz}: ${layer.depth}`}
                    />
                  );
                })}
              </div>
              <div className="ml-4 text-xs text-slate-400 space-y-1">
                <div className="font-semibold text-slate-200">Qatlamlar:</div>
                {body.internalLayers.map((layer, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                      style={{ backgroundColor: layer.color }}
                    />
                    <span className="text-[11px] truncate text-slate-300">{layer.nameUz}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Layer Cards */}
            <div className="space-y-2">
              {body.internalLayers.map((layer, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: layer.color }}
                      />
                      <span className="font-semibold text-slate-100 text-xs">{layer.nameUz}</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-700/80 text-cyan-300 font-mono">
                      {layer.depth}
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {layer.descriptionUz}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. MOONS */}
        {activeTab === 'moons' && (
          <div className="space-y-3">
            <div className="text-xs text-slate-300 font-medium">
              Sayyora atrofida jami{' '}
              <strong className="text-cyan-400 font-bold">{body.moonsCount} ta</strong> tabiiy
              yo'ldosh aniqlangan.
            </div>

            <div className="space-y-2">
              {body.moonsList.map((moon, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-100 text-xs">{moon.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Ø {moon.diameterKm.toLocaleString()} km
                    </span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {moon.descriptionUz}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. FACTS */}
        {activeTab === 'facts' && (
          <div className="space-y-2.5">
            {body.funFactsUz.map((fact, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 flex gap-3 items-start"
              >
                <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  {i + 1}
                </div>
                <p className="text-slate-200 text-xs leading-relaxed">{fact}</p>
              </div>
            ))}
          </div>
        )}

        {/* 5. MISSIONS */}
        {activeTab === 'missions' && (
          <div className="space-y-3">
            {body.missions.map((mission, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Rocket className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="font-bold text-slate-100 text-xs">{mission.name}</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-800/40">
                    {mission.year}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  Tashkilot: {mission.agency}
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {mission.descriptionUz}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
