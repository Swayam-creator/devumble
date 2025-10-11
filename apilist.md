## API LIST
- `Authentication` 
  - POST -> /Signup
  - POST -> /Signin
  - POST -> /Logout
- `Profile` 
  - GET ->/profile/view
  - PATCH ->/profile/edit
  - PATCH ->/profile/password

- `PROJECTS`
  - GET -> /projects/view
  - POST -> /projects/addProject
  - DELETE ->/projects/deleteProject
  - PATCH -> /projects/updateProject

- `HYPE` 
  - GET -> /projects/hyped  

- `Connection request`
  - POST /request/send/interested/:userId
  - POST /request/send/ignored/:userId

- `Recieving request`
  - POST /request/review/accept/:requestId
  - POST /request/review/reject/:requestId

- `user router`
  - GET /user/request/recieved
  - GET /user/connections
  - GET /user/feed - to display user based on preferences 
  

- `Postman Collections`
  [Click here](https://dexterous-devs.postman.co/workspace/Devumble~ff5f8cf5-9589-4a79-b308-b2112b29b158/collection/31772699-e52a7d22-a3e4-4870-bc73-5491ffa91322?action=share&creator=31772699)

- `STATUS` -> `ignored`,`interested`,`accepted`,`rejected`

