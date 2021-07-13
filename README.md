# Cheems

![favicon](https://user-images.githubusercontent.com/58972469/125454642-d4c910f3-fc39-4264-8b70-e85cfcc11172.png)

Cheems is an MS Teams clone made during Microsoft Engage 2021. It works on most
of the latest browsers and supports features like video conferencing,
group chats, and team formation. 
Cheems was built, keeping the agile methodology of
software development in mind. The work was done in series of sprints

## Features

- Multiple user video conferencing using WebRTC with selective forwarding unit &
  media server.
- Support for screen sharing, muting participants and chats in the meetings
- Multiple group formations to organise your meetings with in-built chat feature
  to discuss and retain important stuff.
- Stateless user authentication using JWT tokens.
- Chats, because you don't need a video call everytime :)

## How Cheems works

### Video calling
Video calling in Cheems is powered by the OpenVidu media server. OpenVidu is a
high-level, open source, SFU media server based on Kurento. It uess WebRTC
framework to achieve multimedia features.
Each user connects to the SFU through a WebRTC connection, and all the video stream data exchange takes place through OpenVidu.
Individual users send their streams to the server and in return get other users streams from it.
The structure of the frontend components of the video call can be seen in the following diagrams.
![image](https://user-images.githubusercontent.com/58972469/125505344-1055eb4f-88ed-4f59-9de3-4ede92a179ba.png)


### Chats
Chats in the application happen through simple websockets connections. The same procedure is followed for group chats too.

### Authentication
User authentication in cheems is done through JSON Web Tokens which enable the server to have a stateless method of authentication

## Setup Instructions

**Note:** You need to have an openvidu instance deployed on the cloud for
accessing its API. For more details on its deployment, go to:
https://docs.openvidu.io/en/2.18.0/deployment/

1. After cloning the repository, run `npm install` at the root of the project to
   install all the dependencies. The project directory structure has been made
   in such a way that a single `package.json` exists for both the frontend and
   backend. This makes it easier to setup the application.
2. Create an environment file named `.env` and paste these lines in it. You may
   replace the variable values with their corresponding expected values to load
   them into the environment.

```
JWT_SECRET=<jwt-secret>
SERVER_URL=<your-openvidu-server-url>
SERVER_SECRET=<your-openvidu-server-secret>
REACT_APP_SERVER_URL=<your-openvidu-server-url>
REACT_APP_SERVER_SECRET=<your-openvidu-server-secret>
```

3. Run `npm run dev` to start the development servers for Express and React.
4. Go to http://localhost:3000/ to see the home page of the website.

## Design System

Cheems is based on the One Dark design system. The color palette used for the website is:
<br>
![color_reference](https://user-images.githubusercontent.com/58972469/125503031-2d04d474-0901-4b71-8142-f71e7dc41158.png)

The exact color codes used in for the design is as follows:
```
 +---------------------------------------------+
" |  Color Name  |         RGB        |   Hex   |
" |--------------+--------------------+---------|
" | Black        | rgb(40, 44, 52)    | #282c34 |
" |--------------+--------------------+---------|
" | White        | rgb(171, 178, 191) | #abb2bf |
" |--------------+--------------------+---------|
" | Light Red    | rgb(224, 108, 117) | #e06c75 |
" |--------------+--------------------+---------|
" | Dark Red     | rgb(190, 80, 70)   | #be5046 |
" |--------------+--------------------+---------|
" | Green        | rgb(152, 195, 121) | #98c379 |
" |--------------+--------------------+---------|
" | Light Yellow | rgb(229, 192, 123) | #e5c07b |
" |--------------+--------------------+---------|
" | Dark Yellow  | rgb(209, 154, 102) | #d19a66 |
" |--------------+--------------------+---------|
" | Blue         | rgb(97, 175, 239)  | #61afef |
" |--------------+--------------------+---------|
" | Magenta      | rgb(198, 120, 221) | #c678dd |
" |--------------+--------------------+---------|
" | Cyan         | rgb(86, 182, 194)  | #56b6c2 |
" |--------------+--------------------+---------|
" | Gutter Grey  | rgb(76, 82, 99)    | #4b5263 |
" |--------------+--------------------+---------|
" | Comment Grey | rgb(92, 99, 112)   | #5c6370 |
" +---------------------------------------------+
```

## Future plans/scopes

1. Material UI is being used as the design library for Cheems right now. It can
   be replaced with
   [Microsoft Fluent Design](https://www.microsoft.com/design/fluent/#/) to
   achieve better design consistency across the website and re-use design
   components.
2. File upload can be supported in teams, which would also enable recordings to
   be done on meetings.
3. A custom user profile page.
