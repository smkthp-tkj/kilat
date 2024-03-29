FROM node:16.18-alpine3.15 

WORKDIR /app

COPY ./package.json .

RUN npm install --omit=dev

COPY . .

ENV NODE_ENV production

CMD [ "npm", "start" ]
