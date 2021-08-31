
import json
from pathlib import Path
from traitlets import Unicode
from traitlets.config import Configurable

from ._version import __version__

HERE = Path(__file__).parent.resolve()

with (HERE / "labextension" / "package.json").open() as fid:
    data = json.load(fid)

def _jupyter_labextension_paths():
    return [{
        "src": "labextension",
        "dest": data["name"]
    }]



from .handlers import setup_handlers


def _jupyter_server_extension_points():
    return [{
        "module": "jupyterlab_codex"
    }]


# # https://github.com/jupyterlab/jupyterlab-git/blob/65f5ed844780c87f34a8155b6ff21f41b6adf179/jupyterlab_git/__init__.py#L24
# class JupyterLabCodex(Configurable):
#     """
#     Config options for the JupyterLab codex extension.
#     """

#     api_key = Unicode(help="API key for the OpenAI API")

def _load_jupyter_server_extension(server_app):
    """Registers the API handler to receive HTTP requests from the frontend extension.

    Parameters
    ----------
    server_app: jupyterlab.labapp.LabApp
        JupyterLab application instance
    """
    # config = JupyterLabCodex(config=server_app.config)
    # server_app.web_app.settings["openai"] = config
    setup_handlers(server_app.web_app)
    server_app.log.info("Registered HelloWorld extension at URL path /jupyterlab-codex")

# For backward compatibility with notebook server - useful for Binder/JupyterHub
load_jupyter_server_extension = _load_jupyter_server_extension

