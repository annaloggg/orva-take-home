# Use an official node.js runtime as a parent image
# image is like a snapshot of a separate instruction sheet
# takes a snapshot of for example our node.js environment and adds it to our docker env

FROM node:22-slim

# set the working directory in the container
WORKDIR /app

RUN apt-get update -y && apt-get install -y openssl

# Copy the package.json and the package-lock.json files to the computer
COPY package*.json .

# install the dependencies
RUN npm install

# copy the rest of the application code
# docker can cache everything above and then just rebuild the image from the
# changed source code (instead of re-installing deps, etc.)
# this is why we first copy the package.json and THEN our source code
# Copy prisma schema first
COPY prisma/ ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application code
COPY . .

# expose the port that the app runs on
# open this port to incoming network requests from whatever source
# without this line our docker env would be isolated
EXPOSE 3001

# define the command to run your application
CMD ["npm", "start"]

# done :>
# so now if you run this you dont actually have to install postgress on you device
# instead it is installed to docker container !