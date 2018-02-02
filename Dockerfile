FROM node:9

RUN yarn global add nodemon flow-bin eslint lerna jest webpack

RUN mkdir /app
WORKDIR /app

VOLUME /app

ENTRYPOINT bash