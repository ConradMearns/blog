.PHONY: *

help:
	@echo
	@echo Showing Makfile Commands
	@echo ------------------------
	@grep -Pv '^\t' makefile

deploy:
	git pull
	hugo
	git add .
	git commit -m "WIP"
	git push

s:
	hugo server -D

new:
	@echo hugo new content/posts/new.md
	@echo code content/posts/new.md

view:
	firefox --new-window localhost:1313
	hugo server -D

drafts:
	hugo list drafts

notebook:
	jupyter-notebook notebooks/

jupyter-convert:
	jupyter nbconvert notebooks/*.ipynb --to markdown

# cat notebooks/JupyterTest.md >> content/posts/jupyter-test.md