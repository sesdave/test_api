FROM node:16.13.0

WORKDIR /src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 6006 
CMD [ "npm", "start" ]
