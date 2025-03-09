build:
	sudo docker buildx build -t "ailab/at-krl-front:alpha" .
start:
	sudo docker run --name at-krl -d -p 5555:5555 ailab/at-krl-front:alpha 
stop:
	if sudo docker kill at-krl; then echo "killed"; fi
	if sudo docker container rm at-krl; then echo "removed"; fi