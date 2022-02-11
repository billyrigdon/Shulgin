#!/bin/bash
cd ../Frontend
npm install
npm run build
mv ./dist ../Backend/dist
cd ../Backend
go get
go build .
cd ..
docker build -t billyrigdoniii/shulgin:latest .