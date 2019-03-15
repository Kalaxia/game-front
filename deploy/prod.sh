#!/bin/sh
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker tag kalaxia/front:latest kalaxia/front:"$TRAVIS_TAG"
docker push kalaxia/front:latest
docker push kalaxia/front:"$TRAVIS_TAG"