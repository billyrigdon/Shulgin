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
docker build -t billyrigdoniii/shulgin:1.1.1
docker push billyrigdoniii/shulgin:1.1.1
