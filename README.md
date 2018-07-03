# We-R-Next Generation Web

## What this is
This is part of the We-R-Next-Generation web application. It is written in JavaScript using the Vue framework and deployed to Amazon Web Service's S3 service as a static site. This single-page application utilizes the backend API written in Ruby with the Sinatra library.

## Standing up a local version of the application for development
- Install [docker][1] and start it locally.
- Clone this repository and the [we-r-next-generation repo][2].
- Navigate to the we-r-next-generation directory at the command line and run `docker-compose up`. This will pull images for MongoDB, Ruby, and Node, build the backend and frontend apps, and stand up three containers.
- Once you have this running, the frontend will be accessible on localhost:8080 and the backend will be accessible on localhost:4567.
- Both of those containers will be linked to their respective source directories and will be running with hot reloading.

[1]: https://www.docker.com/community-edition
[2]: https://github.com/the-difference-engine/we-r-next-generation

## Deploying the application
- This application is deployed to [AWS' S3 service][3] as a static site. The deployment process is automated using CircleCI. 

[3]: https://aws.amazon.com/s3/
