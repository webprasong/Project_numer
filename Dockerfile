FROM node:14.16.0-alpine

WORKDIR /Project
COPY package.json ./
RUN npm install

COPY . ./
CMD ["npm","start"]
