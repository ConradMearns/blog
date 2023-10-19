from sane import *
from sane import _Help as Help

import os
from subprocess import run
from glob import glob
from pathlib import Path

import shutil

SRC_DIR = "applications"
resume_template = Path('resume.tex')

output_prefix = 'ConradMearns-'

# defaults
resume_experience = Path('resume-experience.md')
resume_skills = Path('resume-skills.md')

sources = glob(f'{SRC_DIR}/*')


def generate_resume_code(label: str):
    label = str(label)
    (name, year, month, day) = label.split('-')
    first = name[0].upper()
    last = name[-1].upper()
    count = str(len(name[1:-1]))
    code = ''.join([first, count, last, '', year, month, day])
    return code

def texVar(var:str):
    return '{'+var+'}'

def build_resume(basename):
    # os.makedirs(basename, exist_ok=True)

    latex_commands = [
        f'\\def\\resumeBuild{texVar(generate_resume_code(str(basename)))}',
        f'\\input{texVar(str(resume_template))}',
    ]
    commands = [
        'pdflatex',
        '--shell-escape',
        # f'-output-directory={str(basename)}',
        f'-jobname={output_prefix}{str(generate_resume_code(str(basename)))}',
        f'"{" ".join(latex_commands)}"',
    ]
    command = ' '.join(commands)
    print(command)
    run(command, shell=True)


# Define a linking recipe
@recipe(
    hooks=['specific'],
    info='Build the generic Resume')
def default():
    run(f'pdflatex --shell-escape -jobname={output_prefix}Resume resume.tex', shell=True)



def make_recipe(folder):
    basename = os.path.basename(folder)

    folder_experience = (Path(folder)/resume_experience)
    if not folder_experience.exists():
        shutil.copyfile(resume_experience, folder_experience)

    folder_skills = (Path(folder)/resume_skills)
    if not folder_skills.exists():
        shutil.copyfile(resume_skills, folder_skills)

    folder_template = (Path(folder)/resume_template)
    shutil.copyfile(resume_template, folder_template)

    resume_file = f'{folder}/{output_prefix}{str(generate_resume_code(str(basename)))}.pdf'
    print(resume_file)
    resume_older_than_sources = (
        Help.file_condition(sources=[
            str(folder_experience), 
            str(folder_skills),
            str(folder_template)
        ], targets=[str(resume_file)]))

    @recipe(name=basename,
            conditions=[resume_older_than_sources],
            hooks=['specific'],
            info=f'Builds the specific \'{basename}\' resume as \'{generate_resume_code(basename)}\'')
    def compile():
        previous_dir = os.getcwd()
        os.chdir(folder)
        print(basename)
        build_resume(basename)
        os.chdir(previous_dir)
        # run(f'{CC} {COMPILE_FLAGS} -c {source_file} -o {obj_file}', shell=True)

for folder in sources:
    make_recipe(folder)


@recipe(hook_deps=['specific'],
        info='Builds all Resume targets.')
def all():
    pass

sane_run(default=None, cli=True)