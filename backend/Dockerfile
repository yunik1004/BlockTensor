FROM node:10
LABEL maintainer="inkyuhak@gmail.com"

COPY . /src

RUN cd /src; DEBUG=backend:*; npm install

WORKDIR /src

EXPOSE 3000

CMD ["npm", "start"]
