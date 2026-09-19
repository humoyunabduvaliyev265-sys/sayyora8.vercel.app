export type CelestialType = 'star' | 'terrestrial' | 'gas_giant' | 'ice_giant' | 'dwarf' | 'exoplanet';

export interface InternalLayer {
  nameUz: string;
  nameEn: string;
  depth: string;
  descriptionUz: string;
  color: string;
}

export interface MoonInfo {
  name: string;
  diameterKm: number;
  descriptionUz: string;
}

export interface SpaceMission {
  name: string;
  year: string;
  agency: string;
  descriptionUz: string;
}

export interface RealPhoto {
  titleUz: string;
  source: string;
  imageUrl: string;
  descriptionUz: string;
}

export interface GeologicalLandmark {
  id: string;
  nameUz: string;
  typeUz: string; // 'Vulqon' | 'Kanyon' | 'Krater' | 'Bo\'ron' | 'Muzlik' | 'Dengiz' | 'Qit\'a'
  coords: { x: number; y: number }; // percentage on planet view (0-100%)
  sizeKm?: string;
  descriptionUz: string;
  realPhotoUrl: string;
}

export type TelescopeFilter = 'natural' | 'infrared' | 'radar' | 'night';
export type AppViewMode = 'telescope' | 'space3d';

export interface CelestialBodyData {
  id: string;
  nameUz: string;
  nameEn: string;
  type: CelestialType;
  typeLabelUz: string;
  taglineUz: string;
  descriptionUz: string;
  diameterKm: number;
  massKg: string;
  distanceFromSunAu: number;
  distanceFromSunKm: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  avgTempC: number;
  minTempC?: number;
  maxTempC?: number;
  moonsCount: number;
  moonsList: MoonInfo[];
  gravityMps2: number;
  atmosphereCompositionUz: string[];
  funFactsUz: string[];
  missions: SpaceMission[];
  internalLayers: InternalLayer[];
  
  // Real Photography & Observatory Telemetry
  realImageUrl: string;
  infraredImageUrl?: string;
  radarImageUrl?: string;
  nightImageUrl?: string;
  realPhotos: RealPhoto[];
  landmarks: GeologicalLandmark[];
  lightTravelTimeSun: string;
  lightTravelTimeEarth: string;
  apparentMagnitude: string;
  
  // 3D & Visual Rendering configuration
  visual: {
    baseRadius: number;
    distanceAuVisual: number;
    realDistanceScale: number;
    orbitSpeed: number;
    rotationSpeed: number;
    axialTiltDeg: number;
    color: string;
    hasRings?: boolean;
    ringInnerRadius?: number;
    ringOuterRadius?: number;
    ringColor?: string;
    hasAtmosphereGlow?: boolean;
    atmosphereColor?: string;
    isEmissive?: boolean;
    emissiveColor?: string;
    emissiveIntensity?: number;
    hasClouds?: boolean;
    cloudsSpeed?: number;
  };
}

export type ViewCategory = 'all' | 'terrestrial' | 'gas' | 'dwarf' | 'exoplanets';
export type ScaleMode = 'visual' | 'logarithmic';
