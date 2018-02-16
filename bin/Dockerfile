FROM node:6.9.1-alpine
MAINTAINER nome-responsavel-projeto@oi.net.br

USER root

# set default workdir
RUN mkdir -p /usr/src/nome-projeto
#TODO descomentar e substituir pelo que foi informado no "()"
# WORKDIR /usr/src/(ADICIONAR AQUI O NOME DO PROJETO)

# configure npm on nexus cache repository
#RUN npm config set registry http://dadhx01.interno:8081/repository/npm-group/

# install app dependencies
#TODO descomentar e substituir pelo que foi informado no "()"
#COPY . /usr/src/(ADICIONAR AQUI O NOME DO PROJETO/)

RUN npm install 

# install test tools
RUN npm install -g http-server

ADD index.html ./index.html

# expose app port and run
EXPOSE 8080
CMD ["http-server", "-s"]