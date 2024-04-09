# Server

## Mongodb with pictures

> [node-js-upload-image-mongodb](https://github.com/bezkoder/node-js-upload-image-mongodb) .
> [upload/store images in MongoDB](https://www.bezkoder.com/node-js-upload-store-images-mongodb/) .

- Project Setup: `npm install`
- Run: `node src/server.js`

> [Mongodb and VScode](https://code.visualstudio.com/docs/azure/mongodb)

## schema

user: - authority:
{0: "普通用户",
1: "管理员",
2: "超级管理员"} - user.\_id - username - password - figure: picture.\_id - [notes]: note.\_id
note: - note.\_id - title - content - [pictures]: picture.\_id
picture: - picture.\_id
