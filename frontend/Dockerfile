FROM node:14.16.0-alpine

WORKDIR /app

RUN npm install -g @quasar/cli
# Importar antes sólo el package.json para no ejecutar el npm install
# cada vez que se cambia algo del código.
COPY package.json .
RUN npm install

COPY . .

STOPSIGNAL SIGINT
EXPOSE 8080

CMD ["quasar", "dev"]
