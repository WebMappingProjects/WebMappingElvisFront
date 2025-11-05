FROM node:22.12.0

RUN mkdir /app
WORKDIR /app

VOLUME /tmp

RUN yarn add esbuild@0.25.4

COPY package*.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

EXPOSE 3070

CMD ["yarn", "dev"]