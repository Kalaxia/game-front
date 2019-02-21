#!/bin/sh
npx npmc@latest install
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