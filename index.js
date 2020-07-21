const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const Contact = require('./models/Contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static("assets"));


//update home page with contacts
app.get('/',function(req,res){

    Contact.find({},(err,contact)=>{
        if(err){
            console.log("error in adding fetching contact");
        }
        return res.render('home',{
            title:"Contacts List",
            contacts_list : contact
        });
    });
});



//adding contact...
app.post('/create_contact',(req,res)=>{
    // contactList.push(req.body);
    // return res.redirect("/");
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },(err,newContact)=>{
        if(err){
            console.log("error in creating contact");
            return;
        }
        console.log(">>>",newContact);
        return res.redirect("/");
    });
});


//deleting contact..
app.get('/delete_contact/:id',(req,res)=>{
    // let name = req.params.name;
    // let indexToDelete = contactList.findIndex(contact => contact.name==name);
    // contactList.splice(indexToDelete,1);
    let id = req.params.id;
    Contact.findByIdAndDelete(id,(err)=>{
        if(err){
            console.log("error in deleting contact",err);
            return;
        }
        return res.redirect("/");
    });
});


app.listen(port,(error)=>{
    if(error){
        console.log("there is an error in running the server",error);
    }
    console.log("The server is up and running on port",port);
});