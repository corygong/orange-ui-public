FROM node:12.2.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY packeage.json /app/package.json
RUN npm install
COPY . /app
RUN npm run build

FROM nginx:1.15.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]