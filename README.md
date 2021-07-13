# Cheems

![favicon](https://user-images.githubusercontent.com/58972469/125454642-d4c910f3-fc39-4264-8b70-e85cfcc11172.png)

Cheems is an MS Teams clone made during Microsoft Engage 2021. It works on most
of the latest popular browsers and supports features like video conferencing,
chats, team formation. It was built while keeping the agile methodology of
software development in mind.

## Features

- Multiple user video conferencing using WebRTC with selective forwarding unit &
  media server.
- Multiple group formations to organise your meetings with in-built chat feature
  to discuss and retain important stuff.
- Stateless user authentication using JWT tokens.
- Chats built on websockets to converse on text.

## How Cheems works

Video calling in Cheems is powered by the OpenVidu media server. OpenVidu is a
high-level, open source, SFU media server based on Kurento. It uess WebRTC
framework to achieve multimedia features.

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

Cheems is based on the One Dark design system.

## Future plans/scopes

1. Material UI is being used as the design library for Cheems right now. It can
   be replaced with
   [Microsoft Fluent Design](https://www.microsoft.com/design/fluent/#/) to
   achieve better design consistency across the website and re-use design
   components.
2. File upload can be supported in teams, which would also enable recordings to
   be done on meetings.
3. A custom user profile page.
