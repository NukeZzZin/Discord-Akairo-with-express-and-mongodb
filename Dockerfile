FROM node:16.6.2

RUN mkdir /usr/src/discord/
WORKDIR /usr/src/discord/
COPY package.json /usr/src/discord/
RUN yarn
RUN yarn tsc
EXPOSE 8000
COPY . /usr/src/discord/
COPY . /usr/src/discord/

CMD ["node", "index.js"]
