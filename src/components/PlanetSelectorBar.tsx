import React, { useRef } from 'react';
import { CelestialBodyData } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { spaceAudio } from '../utils/spaceAudio';

interface PlanetSelectorBarProps {
  bodies: CelestialBodyData[];
  selectedBody: CelestialBodyData | null;
  onSelectBody: (body: CelestialBodyData) => void;
}

export const PlanetSelectorBar: React.FC<PlanetSelectorBarProps> = ({
  bodies,
  selectedBody,
  onSelectBody,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div
      id="planet-selector-bar-dock"
      className="absolute bottom-3 left-0 right-0 z-20 px-4 pointer-events-none flex justify-center"
    >
      <div className="relative max-w-5xl w-full flex items-center bg-slate-950/85 backdrop-blur-xl border border-slate-800/80 rounded-2xl p-2 shadow-2xl pointer-events-auto">
        {/* Scroll Left Button */}
        <button
          onClick={() => scroll('left')}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors hidden sm:block shrink-0"
          title="Chapga surish"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Scrollable Planets List */}
        <div
          ref={scrollRef}
          className="flex-1 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth px-1 py-1"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {bodies.map((body) => {
            const isSelected = selectedBody?.id === body.id;

            return (
              <button
                key={body.id}
                id={`btn-select-${body.id}`}
                onClick={() => {
                  spaceAudio.playClickSound();
                  onSelectBody(body);
                }}
                className={`group relative flex items-center gap-2.5 px-3 py-1.5 rounded-xl shrink-0 transition-all duration-200 border text-left ${
                  isSelected
                    ? 'bg-slate-800 border-cyan-400/80 shadow-lg shadow-cyan-500/20 scale-[1.03]'
                    : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-800/60 hover:border-slate-700'
                }`}
              >
                {/* 2D Planet Representation Sphere */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`w-6 h-6 rounded-full shadow-inner transition-transform group-hover:scale-110 ${
                      isSelected ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-slate-950' : ''
                    }`}
                    style={{
                      backgroundColor: body.visual.color,
                      boxShadow: isSelected
                        ? `0 0 12px ${body.visual.color}`
                        : `0 0 4px ${body.visual.color}88`,
                    }}
                  />
                  {body.visual.hasRings && (
                    <div
                      className="absolute w-9 h-2 rounded-full border border-amber-200/50 -rotate-12 pointer-events-none"
                    />
                  )}
                </div>

                {/* Name & Quick Metric */}
                <div className="flex flex-col">
                  <span
                    className={`text-xs font-bold leading-tight transition-colors ${
                      isSelected ? 'text-cyan-300' : 'text-slate-200 group-hover:text-white'
                    }`}
                  >
                    {body.nameUz}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono leading-tight">
                    {body.distanceFromSunAu === 0 ? 'Markaz' : `${body.distanceFromSunAu} AU`}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Scroll Right Button */}
        <button
          onClick={() => scroll('right')}
          className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors hidden sm:block shrink-0"
          title="O'ngga surish"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
