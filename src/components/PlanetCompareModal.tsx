import React from 'react';
import { CelestialBodyData } from '../types';
import { X, Scale } from 'lucide-react';

interface PlanetCompareModalProps {
  body: CelestialBodyData;
  earth: CelestialBodyData;
  onClose: () => void;
}

export const PlanetCompareModal: React.FC<PlanetCompareModalProps> = ({
  body,
  earth,
  onClose,
}) => {
  // Relative diameter scale for circular visual display
  const maxDiam = Math.max(earth.diameterKm, body.diameterKm);
  const earthCircleSize = Math.max(28, (earth.diameterKm / maxDiam) * 140);
  const bodyCircleSize = Math.max(28, (body.diameterKm / maxDiam) * 140);

  const metrics = [
    {
      label: 'Ekvatorial Diametr',
      earthVal: `${earth.diameterKm.toLocaleString()} km`,
      bodyVal: `${body.diameterKm.toLocaleString()} km`,
      ratio: (body.diameterKm / earth.diameterKm).toFixed(2) + 'x',
      ratioLabel: body.diameterKm > earth.diameterKm ? "Yerdan kattaroq" : "Yerdan kichikroq",
    },
    {
      label: 'Sirt Gravitatsiyasi',
      earthVal: `${earth.gravityMps2} m/s² (1.0g)`,
      bodyVal: `${body.gravityMps2} m/s² (${(body.gravityMps2 / 9.81).toFixed(2)}g)`,
      ratio: (body.gravityMps2 / earth.gravityMps2).toFixed(2) + 'x',
      ratioLabel: body.gravityMps2 > earth.gravityMps2 ? "Kuchliroq tortishish" : "Yengilroq tortishish",
    },
    {
      label: "O'rtacha Sirt Harorati",
      earthVal: `+${earth.avgTempC}°C`,
      bodyVal: `${body.avgTempC > 0 ? '+' : ''}${body.avgTempC}°C`,
      ratio: `${body.avgTempC - earth.avgTempC > 0 ? '+' : ''}${body.avgTempC - earth.avgTempC}°C`,
      ratioLabel: 'Farq',
    },
    {
      label: 'Quyoshdan Masofa',
      earthVal: '1.0 AU (149.6 mln km)',
      bodyVal: `${body.distanceFromSunAu} AU`,
      ratio: (body.distanceFromSunAu / 1.0).toFixed(2) + 'x',
      ratioLabel: body.distanceFromSunAu > 1 ? "Uzoqroqda" : "Yaqinroqda",
    },
    {
      label: 'Yil Davomiyligi (Orbital davr)',
      earthVal: '365.25 kun (1 yil)',
      bodyVal:
        body.orbitalPeriodDays >= 365
          ? `${(body.orbitalPeriodDays / 365.25).toFixed(1)} yil (${body.orbitalPeriodDays} kun)`
          : `${body.orbitalPeriodDays} kun`,
      ratio: (body.orbitalPeriodDays / 365.25).toFixed(2) + 'x',
      ratioLabel: 'Yer yiliga nisbatan',
    },
    {
      label: 'Bir Sutka Uzunligi',
      earthVal: '23.9 soat (1 kun)',
      bodyVal:
        Math.abs(body.rotationPeriodHours) >= 24
          ? `${(Math.abs(body.rotationPeriodHours) / 24).toFixed(1)} kun`
          : `${Math.abs(body.rotationPeriodHours).toFixed(1)} soat`,
      ratio: (Math.abs(body.rotationPeriodHours) / 23.93).toFixed(2) + 'x',
      ratioLabel: 'Yer kuniga nisbatan',
    },
    {
      label: "Tabiiy Yo'ldoshlar soni",
      earthVal: '1 ta (Oy)',
      bodyVal: `${body.moonsCount} ta`,
      ratio: body.moonsCount.toString(),
      ratioLabel: 'Jami yo\'ldosh',
    },
  ];

  return (
    <div
      id="planet-compare-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="planet-compare-modal-content"
        className="w-full max-w-2xl bg-slate-900/95 border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 max-h-[90vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">
              Yer va {body.nameUz} sayyoralari taqqoslashi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Visual Relative Scale Section */}
        <div className="py-6 px-4 my-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-around">
          {/* Earth */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-36 flex items-center justify-center">
              <div
                className="rounded-full shadow-lg border border-cyan-400/40 transition-all duration-300"
                style={{
                  width: `${earthCircleSize}px`,
                  height: `${earthCircleSize}px`,
                  backgroundColor: '#2b6cb0',
                  boxShadow: '0 0 20px rgba(43, 108, 176, 0.4)',
                }}
              />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">Yer (Earth)</div>
              <div className="text-xs text-slate-400">Ø 12,742 km</div>
            </div>
          </div>

          <div className="text-slate-600 font-mono text-xl font-bold">VS</div>

          {/* Selected Body */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-36 flex items-center justify-center">
              <div
                className="rounded-full shadow-lg border transition-all duration-300"
                style={{
                  width: `${bodyCircleSize}px`,
                  height: `${bodyCircleSize}px`,
                  backgroundColor: body.visual.color,
                  borderColor: 'rgba(255,255,255,0.3)',
                  boxShadow: `0 0 20px ${body.visual.color}55`,
                }}
              />
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-white">{body.nameUz}</div>
              <div className="text-xs text-slate-400">Ø {body.diameterKm.toLocaleString()} km</div>
            </div>
          </div>
        </div>

        {/* Metrics Table */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-2.5">
          {metrics.map((m, i) => (
            <div
              key={i}
              className="p-3 rounded-xl bg-slate-800/40 border border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
            >
              <div className="text-xs font-medium text-slate-300 min-w-[170px]">
                {m.label}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 flex-1 text-xs">
                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-cyan-400 uppercase tracking-wider font-semibold">
                    Yer
                  </div>
                  <div className="text-slate-200 font-mono">{m.earthVal}</div>
                </div>

                <div className="text-left sm:text-right">
                  <div className="text-[10px] text-amber-400 uppercase tracking-wider font-semibold">
                    {body.nameUz}
                  </div>
                  <div className="text-slate-100 font-mono font-bold">{m.bodyVal}</div>
                </div>

                <div className="text-right min-w-[70px] px-2 py-1 rounded bg-slate-800 border border-slate-700 font-mono text-cyan-300 text-xs font-semibold">
                  {m.ratio}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
