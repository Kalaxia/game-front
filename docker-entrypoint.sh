#!/bin/sh
npm install

if [ "$NODE_ENV" == "production" ]
then
    npm run build && npm run start
else
    npm run dev
fi