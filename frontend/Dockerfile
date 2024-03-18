FROM node:21 as build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY public/ public/
COPY src/ src/

RUN npm run build

FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]