# Introduction

'Movies and Shows Tracker' is a simple website that is used to keep a track of users watched movies/shows or movies/shows they intend to watch. This website allows the user to:

1. Search and view movies and shows
2. Create and use an account
3. Rate and add review for movies and shows
4. Add movies to Watch Later list(later add it to watch list)

# Objectives

1. Make a strong foundation in database concepts, technology, and practice.
2. Demonstrate the use of concurrency and transactions in database.
3. Design and build database applications for real world problems.
4. Develop databse applications using front-end tools and back-end DBMS.
5. Implement, analyse and evaluate the project developed for the application

# Languagues used

### Core:

1. JavaScript
2. CSS
3. [MySQL](https://www.mysql.com/)

### Backend:

1. [Node.js](https://github.com/nodejs/node)

### Frameworks:

1. [Express](https://github.com/expressjs/express)
2. [React.js](https://github.com/facebook/create-react-app)

### Libraries:

1. [Bootstrap](https://getbootstrap.com/docs/4.0/getting-started/introduction/)
2. [Bootstrap Icons](https://icons.getbootstrap.com/)
3. [cryptr](https://github.com/MauriceButler/cryptr)
4. [mysql2](https://github.com/sidorares/node-mysql2)
5. [react-router-dom](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-dom)

### APIs:

1. [OMDb API](http://www.omdbapi.com/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Working

![Working](https://media.vlpt.us/post-images/jeff0720/91343f60-eb33-11e8-b115-5df0fc60ff3a/ngnix.png 'Working')

Website works on JS(React) and CSS in the port `http://localhost:3000`, whenever the webpage wants data it makes an http request to the node server running in `http://localhost:5000`, in the node server Express is used to handle the incoming requests and return the data in JSON format.
Node uses mysql2 to acess the database also running on the same machine as the Node, port 3306 is the default port for the MySQL connector, where we can query the database we need provided we have the user details with permission. mysql2 is used to handle the database queries and the rows received back are in array format and are parsed to JSON format and sent to the requesting page by the Express module.

# Installation

1. Git clone the repo to your desired directory
2. Make sure you have [Node.js](https://github.com/nodejs/node) and [MySQL](https://www.mysql.com/) in your system.
3. navigate to the cloned directory and run
   `npm install`
   this will install all the dependencies required for Node
4. cd into client directory `cd client` and run
   `npm install`
   this will intall all the dependencies required for webpage

**Make sure all the dependencies are installed for both node and client**

5. change the database connection and database as per your database in the **index.js** file.
6. to start node run `npm start` in the cloned directory
7. to start the website cd into the client directory `cd client` and run `npm start` in the cloned directory the website will be in `http://localhost:3000`

Enjoy :)
