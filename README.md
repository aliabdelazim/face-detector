# face-detector

## Description

This is a face detector solution utilizing microservice architecture. The solution is based on the following technologies:

- Node.js
- Express
- Docker
- Kubernetes
- RabbitMQ
- MongoDB
- AWS S3
- AWS Rekognition

## Architecture

The solution is based on microservice architecture. the diagram in the main directory shows the architecture of the solution.  
diagram file: `faces-detection-diagram.drawio.png`

### microservices

this solution is composed of the following microservices:

1. api-gateway: this is the entry point of the solution. it is responsible for routing the requests to the appropriate microservice.
2. auth: this microservice is responsible for user authentication.
3. uploader: this microservice is responsible for uploading images to S3, saving the image metadata in MongoDB and sending the image to the `IMAGES` queue in RabbitMQ.
4. extractor: this microservice is responsible for extracting faces from images available in the `IMAGES` queue using AWS Rekognition, saving the extracted faces in MongoDB.

## How to run

### Prerequisites

- Docker
- Kubernetes
- KubeCtl

### Steps to run in kubernetes

1. Clone the repository
2. run npm install in the following directories:
   - /api-gateway
   - /auth
   - /extractor
   - /uploader
3. run `docker-compose build` in the main directory
4. run `kubeCtl apply -f kubernetes` in the main directory

### Steps to run with docker compose

prerequisites:

- configured AWS CLI credentials with access to S3 and Rekognition
- public S3 bucket with the name `now-money` in the region `ap-south-1`

1. Clone the repository
2. run npm install in the following directories:
   - /api-gateway
   - /auth
   - /extractor
   - /uploader
3. run docker compose build in the main directory
4. run docker compose up in the main directory

## How to use

You can use the postman collection in the main directory to test the solution.  
collection name: `now-money-faces-extractor.postman_collection.json`  
The solution exposes a REST API with the following endpoints:

- POST /auth/signup
- POST /auth/login
- POST /uploader/upload
- GET /uploader/images
- GET /uploader/images/:id

### POST /auth/signup

This endpoint is used to create a new user. The request body should contain the following fields:

- name
- email
- password

### POST /auth/login

This endpoint is used to login a user. The request body should contain the following fields:

- email
- password

### POST /uploader/upload

This endpoint is used to upload an image. The request body of type form-data should contain the following fields:

- image
- description

### GET /uploader/images

This endpoint is used to get all images uploaded by the user.

### GET /uploader/images/:id

This endpoint is used to get a specific image uploaded by the user along with the extracted faces.
