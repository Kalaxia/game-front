FROM node:alpine

WORKDIR /srv/app

COPY . /srv/app
COPY docker-entrypoint.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh && chown root:root /entrypoint.sh \
    && npm i -g npm

ENTRYPOINT ["/entrypoint.sh"]