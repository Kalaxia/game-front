#!/bin/sh
npm install

if [ "$NODE_ENV" == "production" ]
then
    npm run prod
else
    npm run dev
fi

exec "$@"