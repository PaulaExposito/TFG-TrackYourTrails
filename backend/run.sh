docker build ./backend -t paula/app_node
docker run --rm --name server -p 3000:3000 -it paula/app_node