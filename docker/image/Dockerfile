FROM python:3

ARG SECRET_PASSPHRASE
ARG FIREBASE_SDK_ADMIN
ARG FIREBASE_SDK_WEB

ENV FLASK_APP="wsgi:create_wsgi()"

RUN mkdir -p /srv/app
WORKDIR /srv/app

COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./ .

RUN gpg --quiet --batch --yes --decrypt  \
			--passphrase="$SECRET_PASSPHRASE" \
			--output "./src/config/$FIREBASE_SDK_ADMIN" \
			"./src/config/$FIREBASE_SDK_ADMIN.gpg"

RUN gpg --quiet --batch --yes --decrypt  \
			--passphrase="$SECRET_PASSPHRASE" \
			--output "./src/config/$FIREBASE_SDK_WEB" \
			"./src/config/$FIREBASE_SDK_WEB.gpg"

# Added scripts to path OS
COPY ./scripts/seed.sh /usr/local/bin/seed
COPY  ./scripts/db.sh /usr/local/bin/db

COPY ./docker/image/entrypoint.sh .

ENTRYPOINT "./entrypoint.sh"
