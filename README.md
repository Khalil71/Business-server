# Business Server

## Getting Started

### Prerequisites

What you need to install

```
node.js
```

```
mongoDB
```

### Installing dependencies

```
$ npm i
```

To run the server

```
$ npm run start
```

### Testing

To run all tests

```
$ npm run test
```

To run companies tests

```
$ npm run test-comp
```

To run workspaces tests

```
$ npm run test-work
```

To run users tests

```
$ npm run test-user
```

## APIs

Server runs on http://localhost:3000/

### Companies APIs

### Get all companies

GET companies/

### Get one company

params: (displayName: required)

GET companies/:displayName

### Add company

body: (displayName: required)

POST companies/

### Update company

params: (displayName: required) --- body: (newDisplayName: required)

PATCH companies/:displayName

### Workspaces APIs

### Add workspace

params: (companyDisplayName: required) --- body: (workspaceDispalyName: required)

POST companies/:companyDisplayName/workspaces

### Update workspace

params: (companyDisplayName: required, workspaceDispalyName: required) --- body: (newWorkspaceDispalyName: required)

PATCH companies/:companyDisplayName/workspaces/:workspaceDispalyName

### Users APIs

### Add user

params: (companyDisplayName: required, workspaceDispalyName: required) --- body: (email: required, role: required)

POST companies/:companyDisplayName/workspaces/:workspaceDispalyName/users

### Update user

params: (companyDisplayName: required, workspaceDispalyName: required) --- body: (email: required, newRole: required, newEmail: required)

PATCH companies/:companyDisplayName/workspaces/:workspaceDispalyName/users

### Remove user

params: (companyDisplayName: required, workspaceDispalyName: required) --- body: (email: required)

PATCH companies/:companyDisplayName/workspaces/:workspaceDispalyName/users

## Author

* **Mohamed Hegab** - _Github link_ - [Khalil71](https://github.com/Khalil71)
