FROM node:10
LABEL maintainer="inkyuhak@gmail.com"

COPY . /src

RUN cd /src/frontend; npm install; npm run build
RUN cd /src/backend; DEBUG=backend:*; npm install --production

WORKDIR /src/backend

EXPOSE 3000

CMD ["npm", "start"]
