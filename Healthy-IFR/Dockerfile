# The tag here should match the Meteor version of your app, per .meteor/release
FROM geoffreybooth/meteor-base:2.8.0


# Copy app package.json and package-lock.json into container
COPY ./app/package*.json $APP_SOURCE_FOLDER/
# COPY ./package*.json $APP_SOURCE_FOLDER/

RUN bash $SCRIPTS_FOLDER/build-app-npm-dependencies.sh

# Copy app source into container
COPY ./app $APP_SOURCE_FOLDER/ 
# COPY . $APP_SOURCE_FOLDER/

RUN bash $SCRIPTS_FOLDER/build-meteor-bundle.sh

# Use the specific version of Node expected by your Meteor release, per https://docs.meteor.com/changelog.html; this is expected for Meteor 2.11.0
FROM node:14.21.3-alpine
# FROM node:14.20.1-alpine
# FROM node:7-alpine



ENV APP_BUNDLE_FOLDER /opt/bundle
ENV SCRIPTS_FOLDER /docker

# Runtime dependencies; if your dependencies need compilation (native modules such as bcrypt) or you are using Meteor <1.8.1, use app-with-native-dependencies.dockerfile instead
RUN apk --no-cache add \
		bash \
		ca-certificates\
		g++ \ 
		make \
		python3

# Copy in entrypoint
COPY --from=0 $SCRIPTS_FOLDER $SCRIPTS_FOLDER/

# Copy in app bundle
COPY --from=0 $APP_BUNDLE_FOLDER/bundle $APP_BUNDLE_FOLDER/bundle/

RUN bash $SCRIPTS_FOLDER/build-meteor-npm-dependencies.sh --build-from-source

# # Start app
# ENTRYPOINT ["/docker/entrypoint.sh"]

# CMD ["node", "main.js"]

# Start another Docker stage, so that the final image doesn’t contain the layer with the build dependencies
# See previous FROM line; this must match
FROM node:14.21.3-alpine
# FROM node:7-alpine
# RUN apk add g++ make python

ENV APP_BUNDLE_FOLDER /opt/bundle
ENV SCRIPTS_FOLDER /docker

# Install OS runtime dependencies
RUN apk --no-cache add \
	bash \
	ca-certificates


# COPY ./app/server/requirements.txt ./opt/bundle/bundle/programs/server/

#dit
# ENV PYTHONUNBUFFERED=1
# RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
# RUN python3 -m ensurepip
# RUN pip3 install --no-cache --upgrade pip setuptools
# RUN pip3 install --no-cache-dir --upgrade pip \
#   && pip3 install --no-cache-dir -r ./opt/bundle/bundle/programs/server/requirements.txt
# RUN pip3 install numpy
# RUN pip3 install torch torchvision -f https://download.pytorch.org/whl/torch_stable.html



# COPY ./app/server/python.py ./opt/bundle/bundle/programs/server/
# COPY ./app/server/model.pth ./opt/bundle/bundle/programs/server/

# Copy in entrypoint with the built and installed dependencies from the previous image
COPY --from=1 $SCRIPTS_FOLDER $SCRIPTS_FOLDER/

# Copy in app bundle with the built and installed dependencies from the previous image
COPY --from=1 $APP_BUNDLE_FOLDER/bundle $APP_BUNDLE_FOLDER/bundle/

# Start app
# RUN apk add --update python make g++\
#    && rm -rf /var/cache/apk/*
# RUN npm install

ENTRYPOINT ["/docker/entrypoint.sh"]


CMD ["node", "main.js"]






# FROM node:6.9
# FROM node:14.20.1-alpine

# ENV METEOR_ALLOW_SUPERUSER=true
# ENV ROOT_URL="http://localhost:3000"

# RUN curl "https://install.meteor.com/" | sh

# COPY . /usr/src/app
# WORKDIR /usr/src/app

# RUN chmod -R 700 /usr/src/APP/.meteor/local
# RUN meteor npm install

# EXPOSE 3000
# CMD ["npm", "start"]
