# Blockbuster

### Introduction

90's videoclub API rest using nodejs, express, mongoose and mongodb. It has been built using MVC pattern. Basic CRUD operations are implemented.

### Authentication :key:

Some Blockbuster's endpoints can be used without registration or token.

#### How to register?

`/signin` endpoint allows user to signin in the app. After this, the user will be able to get a token, gaining access to new app features.
To register, user should include in body request an `email` and a `username` as follows:

```
{
    "username":"documentation",
    "email":"documentation@blockbuster.com"
}
```

Default user will have _user_ role. Users with _admin_ role can only be created using a user with admin role created previously. See below.

#### Getting a token

After registration, user will be able to obtain an individual token by accessing to `/auth` endpoint and adding `username` and `email` as in signin. This action should return something like:

```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRvY3VtZW50YXRpb24iLCJlbWFpbCI6ImRvY3VtZW50YXRpb25AYmxvY2tidXN0ZXIuY29tIiwiaWF0IjoxNjE3MTAwMjg0fQ.lBiH9zM3wdP4BgiFQxKOZcW43p4Tm3NySRwjy_ULjlc"
}
```

This token should be include in header request.

### Movies

`/movie` endpoint can be used without registration and token.

#### GET /movie/

It returns a JSON object with all movies available in database. An example of the JSON object returned:

```
{
    "_id": "605b64a9f0f9462918e51957",
        "title": "Blade Runner",
        "year": 1982,
        "available": true,
        "cast": [
            "Harrison Ford",
            "Sean Young",
            "Daryl Hannah",
            "Rutger Hauer"
        ]
    }
```

#### GET /movie/searchId/[id]

If you know the movie id, you can return the JSON object directly.

```
http://localhost:3000/movie/searchId/605b64a9f0f9462918e51957
```

#### GET /movie/searchTitle/[query]

You can perform search actions based on title.

```
http://localhost:3000/movie/searchTitle/matrix
```

#### GET /movie/searchPerformer/[query]

You can perform search actions based on cast.

```
http://localhost:3000/movie/searchPerformer/ford
```

### Tools

- [nodejs](https://nodejs.org/en/) - JavaScript runtime
- [express](http://expressjs.com/) - nodejs backend framework
- [mongodb](https://www.mongodb.com/) - database
- [mongoose](https://mongoosejs.com/) - object modelling tool

### Tools used during app development

- [visual studio code](https://code.visualstudio.com/)
- [postman](https://www.postman.com/)
- [robo3t](https://robomongo.org/) - GUI for mongodb
- [compass](https://www.mongodb.com/products/compass) - GUI for mongodb

### Author

Rubén Fernández Santos

```

```
