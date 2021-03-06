# BlockTensor

[![Travis Build status](https://travis-ci.org/yunik1004/BlockTensor.svg?branch=master)](https://travis-ci.org/yunik1004/BlockTensor) [![AppVeyor Build Status](https://ci.appveyor.com/api/projects/status/dh9x31n45t7neiu6/branch/master?svg=true)](https://ci.appveyor.com/project/yunik1004/blocktensor) [![Docker Build Status](https://img.shields.io/docker/build/yunik1004/blocktensor.svg)](https://hub.docker.com/r/yunik1004/blocktensor) [![CircleCI Build Status](https://circleci.com/gh/yunik1004/BlockTensor/tree/master.svg?style=svg)](https://circleci.com/gh/yunik1004/BlockTensor/tree/master)

> 2018 Fall Semestor CS408 Project

## Build with NPM

### Dependencies
- NPM

### Debug
You need at least two shell to run the application.

For the frontend server,
```bash
$ cd frontend
$ npm run dev
```

For the backend server,
```bash
$ cd backend
$ DEBUG=backend*
$ npm run dev
```

### Release
You need only one shell to run the application.

```bash
$ cd frontend
$ npm run build
$ cd ../backend
$ npm start
```

## Build with Docker

### Dependencies
- Docker


### Debug
```bash
$ docker-compose -f docker-compose-dev.yml up -d
```

### Release
```bash
$ docker-compose up -d
```
