docker build . -t paula/app_quasar
docker run --rm --name client -p 8080:8080 -it paula/app_quasar