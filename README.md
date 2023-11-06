# Different ways to add security and authentication in nodejs

commonjs + ts

# Compatible Versions:

### Node

- v19.7.0

### Typescript

- 5.2.2

# 1-ssl-tls

Use ssl/tls connections, It helps in mitigating man in the middle attack.

### Install

```bash
npm run install-1
```

### run in dev mode

```bash
npm run dev-1
```

- All routes run with HTTPS as protocol,
- Although it is being run in dev/localhost environment with self generated certificates, browser will giver error, as it won't be able to verify our certificate with CA.

# 2-api-keys

### Install

```bash
npm run install-2
```

### run in dev mode

```bash
npm run dev-2
```

- API keys ar generally used for
  - **Project Identification** ⇒ Used to identify project that’s making call to API or SDK. When a API key is created, it is associated with a project.
  - **Project Authorization** ⇒ Check whether the calling app has been granted access to call the API or SDK.
- When we create any project to use google services(google map), google provides api-key for that project.

# 3-jwt

### Install

```bash
npm run install-3
```

### run in dev mode

```bash
npm run dev-3
```

- It is a part of Token based authentication.
  - We make request to the server with our credentials.
  - Server returns token if the credentials are true.
  - This token is added to every API request and authentication is done based on this token.
- JWT is one of the format of that token. It has 3 parts
  - **header**.**payload**.**signature**
  - **header** => defines which algo we are using for signing this algorithm.
  - **payload** => defines which the payload we want to keep in token.
  - **signature** => defines signature that is created after signing the payload.
- When the server receives the token it extracts the payload and resigns it and compares that signature with the signature received.

# 4-oauth [PENDING]

### Install

```bash
npm run install-4
```

### run in dev mode

```bash
npm run dev-4
```

# 5-session [Server Side Session]

### Install

```bash
npm run install-5
```

### run in dev mode

```bash
npm run dev-5
```

- We create a session on server.
- We save the `session_id` of that server on **database** and map it with **user** for which this session is created.
- We set this `session_id` in cookies.
- For every request we make a database lookup for session_id(received in cookies) to get the user so as to perform the requested operation on behalf of that user.

# 6-cookies [Client Side Session]

### Install

```bash
npm run install-6
```

### run in dev mode

```bash
npm run dev-6
```

- We encode the user data.
- We sign the encoded payload(user data)
- Standard format of signed cookies is **s:**.**payload**.**signature**
  - **s** => shows it is a signed cookie.
  - **payload** => encoded payload we are using for client side session.
  - **signature** => defines signature that is created after signing the payload.
- When the server receives the signed cookie it extracts the payload and resigns it and compares that signature with the signature received.
