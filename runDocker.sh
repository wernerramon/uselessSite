#!/bin/bash
set -e

echo "###############################"
echo "# Stop all containers"
echo "###############################"
docker stop $(docker ps -q) 2>/dev/null || echo "No containers running."

echo "###############################"
echo "# Remove all containers"
echo "###############################"

docker rm $(docker ps -aq) 2>/dev/null || echo "No containers found."

echo "###############################"
echo "# Remove all images"
echo "###############################"

docker rmi -f $(docker images -q) 2>/dev/null || echo "No Images found."

echo "###############################"
echo "# Rebuild backend"
echo "###############################"
cd backend
docker build -t useless-site-backend .
docker run -d --network host useless-site-backend
cd ..

echo "###############################"
echo "# Rebuild frontend"
echo "###############################"
cd frontend
docker build -t frontend .
docker run -d -p 80:80 frontend

cd ..

echo "###############################"
echo "# Finished!"
echo "###############################"
