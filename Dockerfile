FROM node:10.1.0

MAINTAINER Michael Kirlin

RUN apt-get update

RUN mkdir /code
WORKDIR /code
COPY . /code/

RUN npm install -g npm
RUN npm install
RUN npm rebuild node-sass

ENTRYPOINT ["./docker-entrypoint.sh"]
