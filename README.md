# personal-blog

A blog platform with two separate frontends for blog readers and blog writers

## Frontend

1. The reader frontend allows to read posts and add comments

[Live Demo](https://personal-blog-visitor.web.app/)

2. The writer frontend allows authenticated users to create, edit, delete and publish/unpublish blog posts

[Live Demo](https://personal-blog-author.web.app/)

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

---

Note: Currently all authenicated users can access all blog posts (for demonstration purposes)
