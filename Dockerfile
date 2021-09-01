FROM node:16.6.2

RUN mkdir /usr/src/discord
WORKDIR /usr/src/discord
COPY package.json /usr/src/discord/
RUN npm install
COPY . /usr/src/bot

CMD ["node", "index.js"]