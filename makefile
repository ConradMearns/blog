deploy:
	git pull
	hugo
	git add .
	git commit -m "WIP"
	git push

s:
	hugo server -D

view:
	firefox --new-window localhost:1313
	hugo server -D