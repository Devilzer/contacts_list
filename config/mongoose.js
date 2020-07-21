// require the library
const mongoose = require('mongoose');

//connect to database
mongoose.connect("mongodb://localhost/contactslist_db");

//acquire the connection(to check if it is connected)
const db = mongoose.connection;

//for error checking
db.on('error',console.error.bind(console,'error connecting to database'));

//sucess message handler
db.once('open',()=>{
    console.log("sucessfully  connected to the database");
});