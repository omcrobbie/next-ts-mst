import { applySnapshot } from "mobx-state-tree";
import { Store, IStore } from './models';
import { createContext } from 'react';

let store: IStore;

const initStore = (isServer, snapshot = null) => {
  if (isServer) {
    store = Store.create({ lastUpdate: Date.now() });
  }
  if (store as any === null) {
    store = Store.create({ lastUpdate: Date.now() });
  }
  if (snapshot) {
    applySnapshot(store, snapshot);
  }
  return store;
};

export const getStore = () => {
  return createContext(store);
}
export default initStore;
