FROM node:14.16.0-alpine
STOPSIGNAL SIGINT
EXPOSE 8080

WORKDIR /app

RUN npm install -g @quasar/cli

# Importar antes sólo el package.json para no ejecutar el npm install
# cada vez que se cambia algo del código.
COPY package.json .
RUN npm install

COPY . .

RUN quasar build -m pwa

CMD ["quasar", "dev",  "-m", "pwa"]


# RUN quasar build
# CMD ["quasar", "dev"]


#FROM nginx:1.19.0-alpine
#COPY --from=build /app/dist/spa /usr/share/nginx/html
#COPY ./nginx.conf /etc/nginx/conf.d/default.conf

#CMD ["nginx", "-g", "daemon off;"]
