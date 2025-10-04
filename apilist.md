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

  



- `STATUS` -> `ignored`,`interested`,`accepted`,`rejected`

