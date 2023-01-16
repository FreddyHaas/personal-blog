# personal-blog

A blog platform with two separate frontends for blog readers and blog writers

[Live Demo]()

## Frontend

1. The reader frontend allows to read posts and comment

-> [Live Demo]()
-> see 'client-visitor' directory

2. The writer frontend allows authenticated users to create, edit and delete blog posts

-> [Live Demo]()
-> see 'client-author' directory

Built with:

- [React](https://reactjs.org/)
- [React Router](https://reactrouter.com/en/main)
- [Axios](https://axios-http.com/docs/intro)

## Backend

The backend provides RESTful APIs to the frontend. Authentication of users is handled via JSON Web Tokens.

Built with:

- [NodeJs](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [PassportJS](https://www.passportjs.org/)

-> see 'server' directory

---

Note: Currently all authenicated users can access all blog posts (for demonstration purposes)
