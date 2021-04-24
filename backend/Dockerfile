FROM node:15.13.0-alpine

WORKDIR /app

# Importar antes sólo el package.json para no ejecutar el npm install
# cada vez que se cambia algo del código.
COPY package.json .
RUN npm install

COPY . .

STOPSIGNAL SIGINT
EXPOSE 3000

CMD ["node", "app.mjs"]
