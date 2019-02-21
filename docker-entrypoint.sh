#!/bin/sh
npm -v
npm install

if [ "$NODE_ENV" == "production" ]
then
    npm run build && npm run start
elif [ "$NODE_ENV" == "test" ]
then
    npm run test
else
    npm run dev
fi