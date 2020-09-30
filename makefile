default:
	git pull
	hugo
	git add .
	git commit -m "WIP"
	git push