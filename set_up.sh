# docker 
mvn clean
cd server
docker-compose up -d
cd ../client
npm install && npm run build
cd ..
