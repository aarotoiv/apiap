FROM node:14

WORKDIR /api

COPY /api/package.json .

RUN npm install

COPY /api .

EXPOSE 3000

CMD [ "npm", "start" ]