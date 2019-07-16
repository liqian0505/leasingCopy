# docker 
mvn clean
cd server
sudo apt install docker.io
sudo apt install docker-compose
docker-compose up -d && docker ps
cd ../client
# npm install && npm run build
cd ..
