import { Cell, CodeCell } from '@jupyterlab/cells';
import { Notebook } from '@jupyterlab/notebook';

import { requestAPI } from './handler';

export interface ICodexConfig {
  api_key: string;
  engine: string;
  max_tokens: number;
  temperature: number;
  displayLineTimeout: number;
  stop: string[];
}

export function getCodeCells(notebook: Notebook): CodeCell[] {
  const codeCells: CodeCell[] = [];
  notebook.widgets.forEach((cell: Cell) => {
    if (cell.model.type === 'code' && notebook.isSelectedOrActive(cell)) {
      codeCells.push(cell as CodeCell);
    }
  });

  return codeCells;
}

export function getCodeCellTextAsPrompt(codeCells: CodeCell[]): string {
  return codeCells.map((cell: CodeCell) => cell.model.value.text).join('\n');
}

export async function generateCodeInCell(
  codeCell: CodeCell,
  prompt: string,
  config?: ICodexConfig,
): Promise<void> {
  try {
    if (!config) {
      throw new Error('Codex config is not defined');
    }

    const payload = Object.assign({}, config, {
      prompt,
    });

    console.log(payload);

    const data = await requestAPI<any>('completion', {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    console.log(data);

    if (data.choices && data.choices.length > 0) {
      const texts = data.choices[0].text.split('\n');
      for (const text of texts) {
        codeCell.model.value.text += text;
        codeCell.model.value.text += '\n';
        // sleep displayLineTimeout ms
        await new Promise(resolve =>
          setTimeout(resolve, config.displayLineTimeout),
        );
      }
    }
  } catch (error) {
    console.error(
      `The jupyterlab_codex server extension appears to be missing.\n${error}`,
    );
  }
}
