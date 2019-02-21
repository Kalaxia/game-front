FROM node:lts-alpine

WORKDIR /srv/app

ENV HOST 0.0.0.0

COPY . /srv/app
COPY docker-entrypoint.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh && chown root:root /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]