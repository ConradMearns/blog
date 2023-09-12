import obsidiantools.api as otools

from pathlib import Path

import typer
cli = typer.Typer()

import json

from flask import Flask
from flask import send_file
from flask_cors import CORS, cross_origin
app = Flask(__name__)
# cors = CORS(app)
cors = CORS(app, origins=['http://localhost:4321', 'https://conrads.website'])
# cors = CORS(cli, resources={r"/list/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'

path = None

def propogate_public(vault):
    def set_public(note):
        if note not in vault.front_matter_index:
            return
        fm = vault.get_front_matter(note)
        if 'public' not in fm:
            vault._front_matter_index[note]['public'] = True
            print('Set public', note)
            for emb in vault.get_embedded_files(note):
                set_public(emb)
            
    for note, fm in vault.front_matter_index.items():
        if 'public' in fm and fm['public']:
            for emb in vault.get_embedded_files(note):
                set_public(emb)
    return vault

@app.route('/list/<folder>')
def list_folder(folder):
    global path
    vault = otools.Vault(path).connect(attachments=True).gather()
    vault = propogate_public((vault))
    # data = [k for k, v in vault.md_file_index.items() if folder in str(v)]
    data = {k: vault.get_front_matter(k) for k, v in vault.md_file_index.items() if folder in str(v)}
    return data

@app.route('/get/<path:data>')
def get_data(data):
    global path
    vault = otools.Vault(path).connect(attachments=True).gather()
    vault = propogate_public((vault))

    if data in vault.md_file_index:
        print('found', data)
        return vault.get_source_text(data)

    if data in vault.media_file_index:
        print('found', data)
        data_filepath = vault.get_media_file_metadata().loc[[data]].to_dict('list')['abs_filepath'][0]
        return send_file(data_filepath)

    print('something else...')
    return {}



@cli.command()
def serve(
    # path: Path,
    debug: bool = False,
    ):
    global path
    path = Path('/home/conrad/blog-content')
    assert path.exists()

    # vault = otools.Vault(path).connect(attachments=True).gather()

    app.run(debug=debug)










@cli.command() 
def test():
    path = Path('/home/conrad/blog-content')

    vault = otools.Vault(path).connect(attachments=True).gather()

    # vault.md_file_index

    # vault.front_matter_index

    # vault.embedded_files_index

    # vault.get_source_text('2023-09-10') # text
    # vault.get_front_matter('2023-09-10') # dict

    # # Daily Notes
    # {k: v for k, v in vault.md_file_index.items() if 'Daily' in str(v)}
    # # Logs
    # {k: v for k, v in vault.md_file_index.items() if 'Logs' in str(v)}

if __name__ == "__main__":
    cli()