include .env

build:
	sudo docker buildx build -t "grigandal625/at-krl-editor-front:latest" .
start:
	sudo docker run --name at-krl-editor-front -d -p "${PORT}:${PORT}" --env-file .env grigandal625/at-krl-editor-front:latest
stop:
	if sudo docker kill at-krl-editor-front; then echo "killed"; fi
	if sudo docker container rm at-krl-editor-front; then echo "removed"; fi
push:
	sudo docker push grigandal625/at-krl-editor-front:latest