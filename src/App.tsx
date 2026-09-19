import { useState, useMemo, useEffect } from 'react';
import { CELESTIAL_BODIES } from './data/planets';
import { CelestialBodyData, ScaleMode, ViewCategory, AppViewMode } from './types';
import { SolarSystem3D } from './components/SolarSystem3D';
import { RealObservatoryView } from './components/RealObservatoryView';
import { PlanetInfoPanel } from './components/PlanetInfoPanel';
import { PlanetCompareModal } from './components/PlanetCompareModal';
import { ControlsOverlay } from './components/ControlsOverlay';
import { PlanetSelectorBar } from './components/PlanetSelectorBar';

export default function App() {
  // Default to 'telescope' (Real Space Observatory mode) per user request: "3d emas real qilib ber"
  const [appMode, setAppMode] = useState<AppViewMode>('telescope');
  
  // Default selected planet to Mars or Earth so user sees immediate real photography
  const [selectedBody, setSelectedBody] = useState<CelestialBodyData | null>(
    () => CELESTIAL_BODIES.find((b) => b.id === 'mars') || CELESTIAL_BODIES[4]
  );
  
  const [comparingBody, setComparingBody] = useState<CelestialBodyData | null>(null);
  const [activeCategory, setActiveCategory] = useState<ViewCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 3D & Time Controls
  const [simulationSpeed, setSimulationSpeed] = useState<number>(1);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [scaleMode, setScaleMode] = useState<ScaleMode>('visual');
  const [showOrbits, setShowOrbits] = useState<boolean>(true);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [zoomLevelDelta, setZoomLevelDelta] = useState<number>(0);
  const [resetViewTrigger, setResetViewTrigger] = useState<number>(0);

  // Time simulation day tracker
  const [simulatedDays, setSimulatedDays] = useState<number>(0);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setSimulatedDays((prev) => prev + 0.15 * simulationSpeed);
    }, 100);
    return () => clearInterval(interval);
  }, [isPaused, simulationSpeed]);

  // Find Earth reference
  const earthBody = useMemo(() => {
    return CELESTIAL_BODIES.find((b) => b.id === 'earth') || CELESTIAL_BODIES[3];
  }, []);

  // Filter bodies by category
  const filteredBodies = useMemo(() => {
    return CELESTIAL_BODIES.filter((body) => {
      if (activeCategory === 'terrestrial') return body.type === 'terrestrial';
      if (activeCategory === 'gas') return body.type === 'gas_giant' || body.type === 'ice_giant';
      if (activeCategory === 'dwarf') return body.type === 'dwarf';
      return true; // 'all'
    });
  }, [activeCategory]);

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return CELESTIAL_BODIES.filter(
      (b) =>
        b.nameUz.toLowerCase().includes(q) ||
        b.nameEn.toLowerCase().includes(q) ||
        b.descriptionUz.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Navigation between planets
  const handleSelectNext = () => {
    if (!selectedBody) {
      setSelectedBody(CELESTIAL_BODIES[1]);
      return;
    }
    const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBody.id);
    const nextIndex = (currentIndex + 1) % CELESTIAL_BODIES.length;
    setSelectedBody(CELESTIAL_BODIES[nextIndex]);
  };

  const handleSelectPrev = () => {
    if (!selectedBody) {
      setSelectedBody(CELESTIAL_BODIES[CELESTIAL_BODIES.length - 1]);
      return;
    }
    const currentIndex = CELESTIAL_BODIES.findIndex((b) => b.id === selectedBody.id);
    const prevIndex = (currentIndex - 1 + CELESTIAL_BODIES.length) % CELESTIAL_BODIES.length;
    setSelectedBody(CELESTIAL_BODIES[prevIndex]);
  };

  const handleZoomIn = () => {
    setZoomLevelDelta((prev) => prev + 1);
  };

  const handleZoomOut = () => {
    setZoomLevelDelta((prev) => prev - 1);
  };

  const handleResetView = () => {
    setSelectedBody(null);
    setResetViewTrigger((prev) => prev + 1);
  };

  const currentDisplayBody = selectedBody || CELESTIAL_BODIES[3]; // Earth fallback

  return (
    <main
      id="app-cosmos-explorer-root"
      className="relative w-screen h-screen overflow-hidden bg-slate-950 text-slate-100 font-sans"
    >
      {/* View Mode 1: Real Space Observatory & Deep Surface Zoom (Photorealistic NASA photography) */}
      {appMode === 'telescope' ? (
        <RealObservatoryView
          body={currentDisplayBody}
          onOpenComparison={(b) => setComparingBody(b)}
        />
      ) : (
        /* View Mode 2: 3D Solar System & Universe Canvas */
        <SolarSystem3D
          celestialBodies={CELESTIAL_BODIES}
          selectedBody={selectedBody}
          onSelectBody={(body) => setSelectedBody(body)}
          simulationSpeed={simulationSpeed}
          isPaused={isPaused}
          scaleMode={scaleMode}
          showOrbits={showOrbits}
          showLabels={showLabels}
          zoomLevelDelta={zoomLevelDelta}
          onResetViewTrigger={resetViewTrigger}
        />
      )}

      {/* Top Bar, Floating Camera Controls & Mode Selector */}
      <ControlsOverlay
        appMode={appMode}
        onSetAppMode={(mode) => setAppMode(mode)}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onResetView={handleResetView}
        showOrbits={showOrbits}
        onToggleOrbits={() => setShowOrbits((prev) => !prev)}
        showLabels={showLabels}
        onToggleLabels={() => setShowLabels((prev) => !prev)}
        simulationSpeed={simulationSpeed}
        onSetSimulationSpeed={(spd) => {
          setSimulationSpeed(spd);
          setIsPaused(false);
        }}
        isPaused={isPaused}
        onTogglePause={() => setIsPaused((prev) => !prev)}
        scaleMode={scaleMode}
        onSetScaleMode={(mode) => setScaleMode(mode)}
        activeCategory={activeCategory}
        onSelectCategory={(cat) => setActiveCategory(cat)}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        searchResults={searchResults}
        onSelectBody={(b) => setSelectedBody(b)}
        simulatedDays={simulatedDays}
      />

      {/* Selected Planet Details Panel (HUD) - shown in 3D mode */}
      {appMode === 'space3d' && selectedBody && (
        <PlanetInfoPanel
          body={selectedBody}
          onClose={() => setSelectedBody(null)}
          onCompare={(body) => setComparingBody(body)}
          onZoomIn={handleZoomIn}
          onSelectNext={handleSelectNext}
          onSelectPrev={handleSelectPrev}
        />
      )}

      {/* Side-by-Side Comparison with Earth Modal */}
      {comparingBody && (
        <PlanetCompareModal
          body={comparingBody}
          earth={earthBody}
          onClose={() => setComparingBody(null)}
        />
      )}

      {/* Bottom Planet Carousel Dock */}
      <PlanetSelectorBar
        bodies={filteredBodies}
        selectedBody={currentDisplayBody}
        onSelectBody={(body) => setSelectedBody(body)}
      />
    </main>
  );
}
