FROM node:14.17.0

ARG http_proxy
ARG https_proxy

COPY package* .

RUN npm config set proxy ${http_proxy}
RUN npm config set https-proxy ${https_proxy}

RUN npm ci

COPY src/ /src/
COPY public/ /public/
