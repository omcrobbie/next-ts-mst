import { types, SnapshotIn, Instance, SnapshotOut } from 'mobx-state-tree';

export const Store = types
  .model('Store', {
    lastUpdate: types.Date,
    light: false,
    started: false
  })
  .actions((self) => {
    let timer;
    return {
      start() {
        self.started = true;
        timer = setInterval(() => {
          // mobx-state-tree doesn't allow anonymous callbacks changing data
          // pass off to another action instead (need to cast self as any
          // because typescript doesn't yet know about the actions we're
          // adding to self here)
          (self as any).update();
        }, 1000);
      },
      update() {
        self.lastUpdate = new Date(Date.now());
        self.light = true;
      },
      stop() {
        clearInterval(timer);
      }
    }
  });

export type IStore = Instance<typeof Store>;
export type IStoreSnapshotIn = SnapshotIn<typeof Store>;
export type IStoreSnapshotOut = SnapshotOut<typeof Store>;