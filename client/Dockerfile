FROM node:14.17.0

ARG proxy_username
ARG proxy_password
ARG proxy_host
ARG proxy_port

RUN mkdir /frontend
WORKDIR /frontend

COPY package.json /frontend/package.json

RUN npm config set proxy http://${proxy_username}:${proxy_password}@${proxy_host}:${proxy_port}
RUN npm config set https-proxy http://${proxy_username}:${proxy_password}@${proxy_host}:${proxy_port}

RUN npm install
