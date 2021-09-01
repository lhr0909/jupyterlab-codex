import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { CodexButtonExtension } from './toolbar';

/**
 * Initialization data for the jupyterlab-codex extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-codex:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: async (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null,
  ) => {
    try {
      console.log('JupyterLab extension jupyterlab-codex is activated!');

      if (!settingRegistry) {
        throw new Error('No setting registry');
      }

      app.docRegistry.addWidgetExtension(
        'Notebook',
        new CodexButtonExtension(plugin.id, settingRegistry),
      );
    } catch (err) {
      console.error('Failed to load settings for jupyterlab-codex.', err);
    }
  },
};

export default plugin;
