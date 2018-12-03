FROM node:8
LABEL maintainer="inkyuhak@gmail.com"

COPY . /src

RUN cd /src; npm install

WORKDIR /src

EXPOSE 8080

CMD ["npm", "start"]
