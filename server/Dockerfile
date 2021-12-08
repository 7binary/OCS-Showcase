FROM node:14

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
COPY .env.docker .env
RUN yarn build
COPY src/config/ocs_athletes.db dist/config/ocs_athletes.db
EXPOSE 5000

CMD ["yarn", "start:prod"]
