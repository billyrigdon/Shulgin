#!/bin/bash
cd ../Frontend
npm install
ng build
rm -r ../Backend/dist
mv ./dist/shulgin ../Backend/dist
cd ../Backend
go get
go build .
cd ..
docker build -t billyrigdoniii/shulgin:latest .
docker kill shulgin
docker rm shulgin
docker run -dit -p 8080:8080 --name shulgin billyrigdoniii/shulgin:latest
