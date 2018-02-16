#!/bin/bash

if [ "$BUILD_NUMBER" == "" ]; then
    exit 2
fi

if [ "$PORT" == "" ]; then
    PORT=8085  #ADICIONAR AQUI A PORTA QUE IRÁ UTILIZAR
fi

IMAGE_NAME=nginx:alpine
CONTAINER_NAME=nome-projeto #COLOCAR NOME DO PROJETO

echo 'Cleanup'
rm -rf ./release/$BUILD_NUMBER
sudo docker rm -f $CONTAINER_NAME || echo 'Nenhum container a ser removido'

echo 'Run'
mkdir -p $PWD/release/$BUILD_NUMBER
tar -zxvf ./release/$BUILD_NUMBER.tar.gz -C $PWD/release/$BUILD_NUMBER
#sudo docker run -dit --name $CONTAINER_NAME -p $PORT:80 -v $PWD/release/$BUILD_NUMBER:/usr/local/apache2/htdocs/ $IMAGE_NAME

sudo docker run --name $CONTAINER_NAME -p $PORT:80 -v $PWD/release/$BUILD_NUMBER:/usr/share/nginx/html:ro $IMAGE_NAME
