# mewscaffolds
A web application for designing MEW scaffolds.

# Local setup front end
REQUIRES: Node.js, npm
Make sure to replace "mewscaffolds-api.herokuapp.com" in "mew-data.service.ts" with "localhost:8080"
cd angularclient
npm install
ng serve --open

# Local setup back end
REQUIRES: maven
Make sure to replace "mewscaffolds.herokuapp.com" in "PrintController.java" and "ChartController.java" with "localhost:4200"
cd springboot
mvn clean install
mvn spring-boot:run

# Heroku deployment
heroku login -i
cd angularclient | springboot
git init
heroku git:remote -a mewscaffolds | mewscaffolds-api
git add .
git commit -m "message"
git push heroku master
