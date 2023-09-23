import { create } from 'zustand';
import { Nullable } from '../utils/types';

export type Measurement = {
  id: string;
  bust: string;
  waist: string;
  hip: string;
  back: string;
  cleavage: string;
  arm: string;
  sleeve: string;
  crotch: string;
  bustHeight: string;
  bodyLength: string;
  skirtLength: string;
  pantsLength: string;
};

type DraftMeasurement = Partial<Nullable<Measurement>>;

export const useMeasurement = create<DraftMeasurement>((set) => ({
  id: null,
  bust: '0',
  waist: '0',
  hip: '0',
  back: '0',
  cleavage: '0',
  arm: '0',
  sleeve: '0',
  crotch: '0',
  bustHeight: '0',
  bodyLength: '0',
  skirtLength: '0',
  pantsLength: '0',
  // actions
  setBust: (bust: string) => set(() => ({ bust })),
  setWaist: (waist: string) => set(() => ({ waist })),
  setHip: (hip: string) => set(() => ({ hip })),
  setBack: (back: string) => set(() => ({ back })),
  setCleavage: (cleavage: string) => set(() => ({ cleavage })),
  setArm: (arm: string) => set(() => ({ arm })),
  setSleeve: (sleeve: string) => set(() => ({ sleeve })),
  setCrotch: (crotch: string) => set(() => ({ crotch })),
  setBustHeight: (bustHeight: string) => set(() => ({ bustHeight })),
  setBodyLength: (bodyLength: string) => set(() => ({ bodyLength })),
  setSkirtLength: (skirtLength: string) => set(() => ({ skirtLength })),
  setPantsLength: (pantsLength: string) => set(() => ({ pantsLength }))
}));

export const useMeasurements = create<{ measurements: DraftMeasurement[] }>((set) => ({
  measurements: [],
  // actions
  setMeasurements: (measurements: DraftMeasurement[]) => {
    set(() => ({ measurements }));
  },
  addMeasurement: (measurement: DraftMeasurement) => {
    set(({ measurements }) => ({
      measurements: [...measurements, measurement]
    }));
  },
  updateMeasurement: (measurement: DraftMeasurement) => {
    set(({ measurements }) => ({
      measurements: measurements.map((m) => (m.id === measurement.id ? measurement : m))
    }));
  },
  removeMeasurement: (id: Measurement['id']) => {
    set(({ measurements }) => ({
      measurements: measurements.filter((measurement) => measurement.id !== id)
    }));
  }
}));
