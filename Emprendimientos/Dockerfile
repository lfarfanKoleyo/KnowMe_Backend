FROM node:latest
WORKDIR /usr/src/app
COPY ./app/package*.json ./
RUN npm install
COPY ./app .
EXPOSE 3001
CMD [ "npm", "run", "dev" ]