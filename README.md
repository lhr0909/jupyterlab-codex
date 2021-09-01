# jupyterlab_codex

![Github Actions Status](https://github.com/lhr0909/jupyterlab-codex/workflows/Build/badge.svg)

JupyterLab extension that unlocks the power of OpenAI's Codex Model.

This extension is pre-built extension available on [PyPI](https://pypi.org/project/jupyterlab-codex/) named `jupyterlab-codex`
## Requirements

* JupyterLab >= 3.0

## Install

To install the extension, execute:

```bash
pip install jupyterlab-codex
```

## Uninstall

To remove the extension, execute:

```bash
pip uninstall jupyterlab-codex
```

## How to Use

After installing, you can find the extension settings in `Settings -> Advanced Settings Editor` and you can add your API keys and adjust the completion settings there.

You will find a hexagon icon on the toolbar of a notebook. Once you click with an active code cell, it will send the content of the cell to the Codex Model and set up the completion.

You can also send more than one cell by selecting the code cells and clicking the toolbar button. The completion will be added to the last selected code cell.

## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_codex directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Server extension must be manually installed in develop mode
jupyter server extension enable jupyterlab_codex
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

By default, the `jlpm run build` command generates the source maps for this extension to make it easier to debug using the browser dev tools. To also generate source maps for the JupyterLab core extensions, you can run the following command:

```bash
jupyter lab build --minimize=False
```

### Development uninstall

```bash
# Server extension must be manually disabled in develop mode
jupyter server extension disable jupyterlab_codex
pip uninstall jupyterlab_codex
```

In development mode, you will also need to remove the symlink created by `jupyter labextension develop`
command. To find its location, you can run `jupyter labextension list` to figure out where the `labextensions`
folder is located. Then you can remove the symlink named `jupyterlab-codex` within that folder.

### Packaging the extension

See [RELEASE](RELEASE.md)
