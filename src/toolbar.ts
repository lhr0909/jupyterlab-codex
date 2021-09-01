import { IDisposable, DisposableDelegate } from '@lumino/disposable';
import { NotebookPanel, INotebookModel } from '@jupyterlab/notebook';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { DocumentRegistry } from '@jupyterlab/docregistry';
import { ToolbarButton } from '@jupyterlab/apputils';
import { LabIcon } from '@jupyterlab/ui-components';

import { CODEX_ICON } from './icon';
import {
  generateCodeInCell,
  getCodeCells,
  getCodeCellTextAsPrompt,
  ICodexConfig,
} from './codex';

export class CodexButtonExtension
  implements DocumentRegistry.IWidgetExtension<NotebookPanel, INotebookModel>
{
  private config: ICodexConfig | undefined;

  constructor(
    private readonly pluginId: string,
    private readonly settingRegistry: ISettingRegistry,
  ) {
    this.settingRegistry.load(this.pluginId).then(settings => {
      settings.changed.connect(this.updateConfig.bind(this));
      this.updateConfig(settings);
    });
  }

  createNew(
    widget: NotebookPanel,
    context: DocumentRegistry.IContext<INotebookModel>,
  ): void | IDisposable {
    const button = new ToolbarButton({
      tooltip: 'Codex It!',
      icon: new LabIcon({
        name: 'codex',
        svgstr: CODEX_ICON,
      }),
      onClick: async () => {
        const codeCells = getCodeCells(widget.content);
        const prompt = getCodeCellTextAsPrompt(codeCells);

        if (codeCells.length < 1) {
          return;
        }

        //get last code cell
        const lastCodeCell = codeCells[codeCells.length - 1];
        return generateCodeInCell(lastCodeCell, prompt, this.config);
      },
    });

    widget.toolbar.insertAfter('cellType', 'codex', button);

    return new DisposableDelegate(() => {
      button.dispose();
    });
  }

  private updateConfig(settings: ISettingRegistry.ISettings): void {
    this.config = settings.composite as unknown as ICodexConfig;
  }
}
