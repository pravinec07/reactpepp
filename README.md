# Pepper Reloaded

# Setup

- clone repository
- run yarn in root folder
- yarn run start:writer for writer panel
- yarn run start:editor for editor panel

## Docker Guidelines

### To Run the writer React Dashboard with Docker:

- yarn && yarn build:writer

- docker build -t writer/dashboard -f ./packages/writer/Dockerfile .
- docker run -it -p 8080:80 writer/dashboard
- Open http://localhost:8080/
