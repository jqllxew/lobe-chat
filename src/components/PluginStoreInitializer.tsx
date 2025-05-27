'use client';

import { useEffect } from 'react';
import { createInitialToolStoreState } from '@/store/tool/initialState';
import { useToolStore } from '@/store/tool';

export default function PluginStoreInitializer() {
  useEffect(() => {
    (async () => {
      setTimeout(async () => {
        const asyncState = await createInitialToolStoreState();
        useToolStore.setState((prev) => ({
          ...prev,
          ...asyncState,
          storeLoaded: true,
        }));
      }, 2000)
    })();
  }, []);
  return null;
}
