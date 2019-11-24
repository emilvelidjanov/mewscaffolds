# mewscaffolds
A web application for designing MEW scaffolds.

# Local setup
# Front end
# Make sure to replace "mewscaffolds-api.herokuapp.com" in "mew-data.service.ts" with "localhost:8080"
REQUIRES: Node.js, npm
cd angularclient
npm install
ng serve --open

# Back end
# Make sure to replace "mewscaffolds.herokuapp.com" in "PrintController.java" and "ChartController.java" with "localhost:4200"
REQUIRES: maven
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