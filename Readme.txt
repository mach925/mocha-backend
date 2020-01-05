[Project Structure]
+ Root
  + bin					// create and run node js server
  + certs				// ssl certification files
  + src					// Source code
    + config				// configuration files for app, database etc.
    + constants				// constants like errors etc
    + controllers			// response to client side by interacting with services
    + middleware			// middlewares for router, controller. including authentication, database, uploader etc
    + models				// collections for mongodb.
    + routes				// defines apis and matches with controller
    + services				// services for notification, transaction, etc.
    + tests				// scripts for unit test
  - app.js				// main app module.

 

[Release & Deploy]
 - Disable hot-loading
  What is hot-loading? It means to restart service whenever project are modified.
  How to disable : 


