#!/bin/sh
yarn install

if [ "$NODE_ENV" == "production" ]
then
    yarn run build && yarn run start
elif [ "$NODE_ENV" == "test" ]
then
    yarn run test
else
    yarn run dev
fi