Kalaxia game front
==================

[![Coverage Status](https://coveralls.io/repos/github/Kalaxia/game-front/badge.svg?branch=develop)](https://coveralls.io/github/Kalaxia/game-front?branch=develop)

This project contains the Kalaxia game front engine.

Setup
------

The project must be cloned under ``./volumes/app`` in the game Docker repository folder.

```
cd volumes
git clone git@github.com:Kalaxia/game-front.git app
```

You just have to clone it in the right place and the Nginx container shall directly use the files.

There is a configuration file that you must copy.

```
cd app
cp config/config.dist.js config/config.js
```

The default values are the right ones for a local environment.

Now your app is ready to go !
