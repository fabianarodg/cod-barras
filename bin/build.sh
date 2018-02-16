#!/bin/bash

if [ "$NODE_ENV" == "" ]; then
    NODE_ENV=development
fi

if [ "$BUILD_NUMBER" == "" ]; then
    BUILD_NUMBER=01
fi

echo 'Parameters:'
echo 'NODE_ENV: '$NODE_ENV
echo 'BUILD_NUMBER: '$BUILD_NUMBER
echo 'IMAGE_NAME: '$IMAGE_NAME
echo 'CONTAINER_NAME: '$CONTAINER_NAME
echo 'PWD: '$PWD

echo 'builds:Cleanup'

sudo rm -rf $PWD/dist
sudo rm -rf $PWD/release

NODE_ENV=$NODE_ENV npm run build
chmod 777 $PWD/dist

echo 'build:Archive'
mkdir -p ./release


echo 'Diretorio a ser zipado: '$PWD
cd $PWD/dist && tar -zcvf ../release/$BUILD_NUMBER.tar.gz .