import {
  applySnapshot,
  Instance,
  onSnapshot,
  SnapshotIn,
  SnapshotOut,
  types,
} from 'mobx-state-tree';
import { useMemo } from 'react';

const LOCALSTORAGE_KEY = 'cq-weather_cities';

const CitiesStore = types
  .model({
    cities: types.map(types.string),
  })
  .actions((self) => {
    const addToCities = (id: any, name: any) => {
      if (!self.cities.has(id)) {
        self.cities.set(id, name);
      }
    };
    const removeFromCities = (id: any) => {
      self.cities.delete(id);
    };
    const clearCities = () => {
      self.cities.clear();
    };
    return { addToCities, removeFromCities, clearCities };
  });

export type ICitiesStore = Instance<typeof CitiesStore>;
export type ICitiesStoreSnapshotIn = SnapshotIn<typeof CitiesStore>;
export type ICitiesStoreSnapshotOut = SnapshotOut<typeof CitiesStore>;

let store: ICitiesStore | undefined;

export function initializeCitiesStore(snapshot = null) {
  const snapshotFromLocalStorage = localStorage.getItem(LOCALSTORAGE_KEY);
  if (!store && !snapshot && snapshotFromLocalStorage) {
    snapshot = JSON.parse(snapshotFromLocalStorage);
  }

  const _store = store ?? CitiesStore.create();

  // If your page has Next.js data fetching methods that use a Mobx store, it will
  // get hydrated here, check `pages/ssg.tsx` and `pages/ssr.tsx` for more details
  if (snapshot) {
    applySnapshot(_store, snapshot);
  }
  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  onSnapshot(store, (snapshot) => {
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(snapshot));
  });

  return store;
}

export function useCitiesStore(initialState?: any) {
  return useMemo(() => initializeCitiesStore(initialState), [initialState]);
}
