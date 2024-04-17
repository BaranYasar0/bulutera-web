FROM node:16-alpine
ARG WEB_DOMAIN
WORKDIR /app
COPY ./fund ./fund
COPY ./component ./component
COPY ./package-fund.json ./package.json
COPY ./yarn.lock ./yarn.lock

RUN yarn install --legacy-peer-deps
RUN yarn install
RUN yarn global add serve

WORKDIR /app/fund
RUN npm run build

CMD serve -l 8087 -s dist
EXPOSE 8087