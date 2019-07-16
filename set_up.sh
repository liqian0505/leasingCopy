# docker 
sudo apt-get update
sudo apt-get install docker 
sudo apt-get install docker-compose
sudo apt-get install node

mvn clean
cd server
docker-compose up -d
cd ../client
npm install && npm run build
cd ..
mvn package