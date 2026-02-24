"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import type {
  MeasurementProfile,
  Measurements,
  CustomizationConfig,
  DarziShareData,
  BodyType,
  FitType,
} from "@/lib/types";
import { DEFAULT_MEASUREMENTS, DEFAULT_CUSTOMIZATION } from "@/lib/types";

interface MeasurementContextValue {
  profiles: MeasurementProfile[];
  activeProfileId: string | null;
  activeProfile: MeasurementProfile | null;
  customization: CustomizationConfig;
  setCustomization: (config: CustomizationConfig) => void;
  updateCustomization: (partial: Partial<CustomizationConfig>) => void;
  createProfile: (
    name: string,
    nameUr: string,
    measurements: Measurements,
    bodyType: BodyType,
    fitPreference: FitType
  ) => string;
  updateProfile: (id: string, updates: Partial<MeasurementProfile>) => void;
  deleteProfile: (id: string) => void;
  setActiveProfile: (id: string | null) => void;
  generateShareData: (profileId: string) => DarziShareData | null;
  shareLinks: DarziShareData[];
}

const MeasurementContext = createContext<MeasurementContextValue | null>(null);

const SAMPLE_PROFILES: MeasurementProfile[] = [
  {
    id: "profile-self",
    name: "My Sizes",
    nameUr: "میرے ناپ",
    measurements: {
      bust: 36,
      waist: 30,
      hip: 38,
      shoulder: 15,
      armLength: 23,
      kameezLength: 40,
      trouserLength: 38,
      trouserWaist: 30,
      unit: "inches",
    },
    bodyType: "average",
    fitPreference: "semi-fitted",
    notes: "",
    createdAt: new Date("2025-01-15"),
    updatedAt: new Date("2025-01-15"),
  },
];

export function MeasurementProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profiles, setProfiles] = useState<MeasurementProfile[]>(SAMPLE_PROFILES);
  const [activeProfileId, setActiveProfileId] = useState<string | null>(
    "profile-self"
  );
  const [customization, setCustomization] = useState<CustomizationConfig>(
    DEFAULT_CUSTOMIZATION
  );
  const [shareLinks, setShareLinks] = useState<DarziShareData[]>([]);

  const activeProfile =
    profiles.find((p) => p.id === activeProfileId) ?? null;

  const updateCustomization = useCallback(
    (partial: Partial<CustomizationConfig>) => {
      setCustomization((prev) => ({ ...prev, ...partial }));
    },
    []
  );

  const createProfile = useCallback(
    (
      name: string,
      nameUr: string,
      measurements: Measurements,
      bodyType: BodyType,
      fitPreference: FitType
    ): string => {
      const id = "profile-" + Date.now();
      const now = new Date();
      setProfiles((prev) => [
        ...prev,
        {
          id,
          name,
          nameUr,
          measurements,
          bodyType,
          fitPreference,
          createdAt: now,
          updatedAt: now,
        },
      ]);
      setActiveProfileId(id);
      return id;
    },
    []
  );

  const updateProfile = useCallback(
    (id: string, updates: Partial<MeasurementProfile>) => {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, ...updates, updatedAt: new Date() } : p
        )
      );
    },
    []
  );

  const deleteProfile = useCallback(
    (id: string) => {
      setProfiles((prev) => prev.filter((p) => p.id !== id));
      if (activeProfileId === id) {
        setActiveProfileId(null);
      }
    },
    [activeProfileId]
  );

  const setActiveProfile = useCallback((id: string | null) => {
    setActiveProfileId(id);
  }, []);

  const generateShareData = useCallback(
    (profileId: string): DarziShareData | null => {
      const profile = profiles.find((p) => p.id === profileId);
      if (!profile) return null;

      const shareCode =
        "BR-" +
        Math.random().toString(36).substring(2, 8).toUpperCase();
      const now = new Date();
      const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

      const data: DarziShareData = {
        profileName: profile.name,
        measurements: profile.measurements,
        customization,
        shareCode,
        createdAt: now,
        expiresAt: expires,
      };

      setShareLinks((prev) => [...prev, data]);
      return data;
    },
    [profiles, customization]
  );

  return (
    <MeasurementContext.Provider
      value={{
        profiles,
        activeProfileId,
        activeProfile,
        customization,
        setCustomization,
        updateCustomization,
        createProfile,
        updateProfile,
        deleteProfile,
        setActiveProfile,
        generateShareData,
        shareLinks,
      }}
    >
      {children}
    </MeasurementContext.Provider>
  );
}

export function useMeasurement() {
  const ctx = useContext(MeasurementContext);
  if (!ctx)
    throw new Error(
      "useMeasurement must be used within MeasurementProvider"
    );
  return ctx;
}
