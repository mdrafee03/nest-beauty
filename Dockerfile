FROM node:alpine

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# start the app in development mode
CMD ["npm", "run", "start:dev"]

# start the app in production mode
# CMD ["npm", "run", "start:prod"]