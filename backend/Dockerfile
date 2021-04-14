FROM node:15.13.0-alpine
RUN apk update
RUN apk --update add git less openssh && \
    rm -rf /var/lib/apt/lists/* && \
    rm /var/cache/apk/*

WORKDIR /app
COPY . .
COPY ../package.json .
RUN npm install

EXPOSE 3000
CMD ["node", "app.mjs"]

