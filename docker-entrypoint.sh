#!/bin/sh
npm install
mkdir .nuxt
chmod -R 777 .nuxt

if [ "$NODE_ENV" == "prod" ]
then
    npm run build
    npm run start
elif [ "$NODE_ENV" == "test" ]
then
    npm run test
    npm run coveralls
else
    npm run dev
fi

exec "$@"