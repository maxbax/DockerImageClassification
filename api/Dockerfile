FROM python:3.8

ARG http_proxy
ARG https_proxy

RUN mkdir /api

WORKDIR /api
COPY requirements.txt /api/requirements.txt

RUN pip install --proxy ${http_proxy} --upgrade pip && \
    pip install --proxy ${https_proxy} -r requirements.txt

COPY *.py .
