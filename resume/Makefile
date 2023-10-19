RESUME=resume.tex
MD=*.md

default:
	pdflatex --shell-escape resume.tex


APPLICATIONS = ./applications
folders: $(APPLICATIONS)/*
	@echo $^

GR: 
	mkdir -p GR-staging
	pdflatex --shell-escape -output-directory=GR-staging -jobname=resume.GR-staging "\def\resumeBuild{GR-staging} \input{$(RESUME)}"

watch:
	@while true; do inotifywait $(RESUME) $(MD); sleep 0.01; make GR; done