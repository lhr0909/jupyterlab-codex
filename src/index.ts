import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin,
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { requestAPI } from './handler';

/**
 * Initialization data for the jupyterlab-codex extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-codex:plugin',
  autoStart: true,
  optional: [ISettingRegistry],
  activate: (
    app: JupyterFrontEnd,
    settingRegistry: ISettingRegistry | null,
  ) => {
    console.log('JupyterLab extension jupyterlab-codex is activated!');

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('jupyterlab-codex settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error(
            'Failed to load settings for jupyterlab-codex.',
            reason,
          );
        });
    }

    requestAPI<any>('completion')
      .then(data => {
        console.log(data);
      })
      .catch(reason => {
        console.error(
          `The jupyterlab_codex server extension appears to be missing.\n${reason}`,
        );
      });
  },
};

export default plugin;
