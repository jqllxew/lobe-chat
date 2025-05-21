import { BuiltinToolState, initialBuiltinToolState } from './slices/builtin';
import { CustomPluginState, initialCustomPluginState } from './slices/customPlugin';
import { PluginState, initialPluginState, createInitialPluginState } from './slices/plugin';
import { PluginStoreState, initialPluginStoreState } from './slices/store';

export type ToolStoreState = PluginState & CustomPluginState & PluginStoreState & BuiltinToolState;

export const initialState: ToolStoreState = {
  ...initialPluginState,
  ...initialCustomPluginState,
  ...initialPluginStoreState,
  ...initialBuiltinToolState,
};

export const createInitialToolStoreState = async (): Promise<ToolStoreState> => {
  const _initialPluginState = await createInitialPluginState();
  return {
    ..._initialPluginState,
    ...initialCustomPluginState,
    ...initialPluginStoreState,
    ...initialBuiltinToolState,
  };
};
