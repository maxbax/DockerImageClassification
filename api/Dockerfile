FROM python:3.8

ARG proxy_username
ARG proxy_password
ARG proxy_host
ARG proxy_port

RUN mkdir /backend

WORKDIR /backend
COPY requirements.txt /backend/requirements.txt

RUN pip install --proxy http://${proxy_username}:${proxy_password}@${proxy_host}:${proxy_port} --upgrade pip && \
    pip install --proxy http://${proxy_username}:${proxy_password}@${proxy_host}:${proxy_port} -r requirements.txt

COPY . .
