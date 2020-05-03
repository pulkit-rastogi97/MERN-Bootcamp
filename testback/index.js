const express = require("express");

// Express.js server initilization
const app = express();


//Port no. , we will make the express.js server listen on this port
const port = 8000;


/**
 * 
 *  Route of the application
 * 
 * @argument req : HttpRequest Object
 * @argument res : HttpResponse Object
 * 
 * (req,res) : callback function ; expecting request and response.
 *  () => {} : 99% it means we are expecting a response back from callback method
 *  () => () : we just need to execute the statements inside the method
 *  () =>    : if there is one statement we can simply write the statement as well.
 * 
 *  Here, "/" represents the root. means if somebody will access the service 
 *  running on port : 8000 directly. He will see whatever is returned
 *  as a response inside the callback method. 
 *  e.g., localhost:8000 will print "Home Page" on the screen.
 * 
 */
app.get("/", (req, res) => {
    return res.send("Home Page");
});


/**
 *  Login Route
 */
app.get("/login", (req, res) => {
    return res.send("You are visiting login route");
});

/**
 *  SignOut Route
 */
app.get("/signout", (req, res) => {
    return res.send("You are signed out.");
});

/**
 *  Pulkit Route
 */
app.get("/pulkit", (req, res) => {
    return res.send("Pulkit tries to be more productive");
});

/**
 *  Another way to create a route
 */
// First create a function
const admin = (req, res) => {
    return res.send("this is admin dashboard");
}

//Then create a route.
// app.get("/admin", admin);

//create a middleware : next should be there in parameters
const isAdmin = (req, res, next) => {
    console.log("isAdmin is running"); 
    next();  // for middleware : forInstance here we will get error next() is not defined.
} 
//Now where comes the middleware. : Route defination changes.
app.get("/admin", isAdmin, admin);

//Explaination : We can craft code that if isAdmin is true then only next()
// will be returned otherwise, we stop the request.


/**
 *  For Practice : another middleware to be added as isLoggedIn
 *  const isLoggedIn = (req, res, next) => {
 *      console.log("The user is logged in");
 *      next();
 *  }
 * 
 *  Then we can change the route as 
 *  app.get("/admin", isLoggedIn, isAdmin, admin);
 * 
 */


/**
 *  Here, we are implementing the listener for the server.
 *  Our express.js server will listen on the port 8000.
 *  Callback method is implemented to check whether the server is up or not.
 * 
 */
app.listen(port, () => {
    console.log("Server is up and running ... ");
});


