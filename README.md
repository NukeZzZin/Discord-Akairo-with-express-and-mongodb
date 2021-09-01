## Installation
### Prerequisites
- Install the [NodeJs](https://nodejs.org/en/).
- Install the [Yarn](https://yarnpkg.com).
- Add locales environments in `.env`.
- Install Node Dependencies : `yarn`.
### Running 
```
// for develop use
yarn dev
// for build/start use
yarn build
yarn start
// for start on docker
docker build -t discord .
 docker run -dp 3000:3000 discord
