FROM python:latest-alpine

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./ .

CMD ["flask", "run", "--host=0.0.0.0"]
