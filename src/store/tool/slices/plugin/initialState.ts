import { LobeTool } from '@/types/tool';

export type PluginsSettings = Record<string, any>;

export interface PluginState {
  installedPlugins: LobeTool[];
  loadingInstallPlugins: boolean;
  pluginsSettings: PluginsSettings;
  updatePluginSettingsSignal?: AbortController;
}

export const initialPluginState: PluginState = {
  installedPlugins: [],
  loadingInstallPlugins: true,
  pluginsSettings: {},
};

export const createInitialPluginState = async (): Promise<PluginState> => {
  const dynamicTools: LobeTool[] = []
  const urls = process.env.NEXT_PUBLIC_BUILTIN_PLUGIN_URLS;
  console.log(`开始加载外部插件\n ${urls}`)
  if (urls && urls.length) {
    const _urls = urls.replaceAll('，', ',').split(',')
      .map(u => u.trim()).filter(Boolean)
    try {
      const responses = await Promise.all(
        _urls.map(url => fetch(url)
          .then(res => res.json() )
          .then(res_json => {
            const customParams = { manifestUrl: url }
            return {... res_json, ... customParams }
          })
          .catch(err => {
            console.warn(`插件加载失败: ${url}`, err)
            return null;
          })
        )
      );
      for (const manifest of responses) {
        if (manifest) {
          dynamicTools.push({
            customParams: {
              apiMode: 'openapi',
              manifestMode: 'url',
              manifestUrl: manifest.manifestUrl,
            },
            identifier: manifest.identifier,
            manifest: manifest,
            type: 'customPlugin',
          });
        }
      }
      console.log("已加载插件", dynamicTools)
    } catch (e) {
      console.error('load builtin plugins err:', e)
    }
  }
  return {
    installedPlugins: [... dynamicTools],
    loadingInstallPlugins: true,
    pluginsSettings: {},
  };
}
