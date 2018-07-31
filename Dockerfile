FROM node:10.7.0

MAINTAINER Michael Kirlin

RUN apt-get update

RUN mkdir /code
WORKDIR /code
COPY . /code/

RUN npm i -g npm
RUN npm install
RUN npm rebuild node-sass

ENTRYPOINT ["./docker-entrypoint.sh"]
