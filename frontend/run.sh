docker build . -t paula/app_quasar
docker run --rm --name client -p 8080:80 -it paula/app_quasar