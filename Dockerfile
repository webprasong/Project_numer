FROM node:14.16.0-alpine as nginxx_build

WORKDIR /Project
COPY package.json ./
RUN npm install

COPY . ./

RUN npm run build

FROM nginx:1.16.0-alpine
COPY --from=nginxx_build /Project/build /usr/share/nginx/html
EXPOSE 80
CMD [ "nginx","-g","daemon off;"]
