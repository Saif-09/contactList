const express = require('express');
const port = 7000;
const path = require('path');
const db = require('./config/mongoose'); //db is a new variable which is storing connection information in the "db"
const Contact = require('./models/contact')
const app = express();

app.set('view engine', 'ejs');//a view engine is a software component that allows you to dynamically generate HTML markup by combining templates and data.
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());
app.use(express.static('assets'));

// var contactList = [
//     {
//         name: 'John',
//         phone: '9689676'
//     },
//     {
//         name: 'Mary',
//         phone: '9680000'
//     },
//     {
//         name: 'Mike',
//         phone: '9689343'
//     }
// ]
//Example of passing string params

// app.get('/delete-contact/:params',(req,res)=>{
//     console.log(req.params);
// })





app.get('/', function (req, res) {
    // console.log(req);
    Contact.find({})
        .then(contacts => {
            return res.render('home', {
                title: "my contact list",
                contact_List: contacts
            });
        })
        .catch(err => {
            console.log(err);
            return;
        });


});


//Route for a POST request to create a new contact in a contact list application. When the route is triggered, the function defined with function(req, res) is executed.
app.post('/createContact', function (req, res) {
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // return res.redirect('/');

    // contactList.push(req.body);
    // return res.redirect('back');

    // Contact.create({
    //     name: req.body.name,
    //     phone: req.body.phone
    // }, function (err, newContact) {
    //     if (err) {
    //         console.log('error in creating Contact list', err);
    //         return;
    //     }
    //     console.log('*****', newContact);
    //     res.redirect('back');
    //     this code is used to create a new contact in a contact list application and save the contact data to a MongoDB database using Mongoose.
    // });

    //I have to remove callback and write funtion using promises because callbacks connot be used in model anymore
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
        .then(newContact => {
            console.log('*****', newContact);
            res.redirect('back');
        })
        .catch(err => {
            console.log('error in creating Contact list', err);
            return;
        });
    //this code is used to create a new contact in a contact list application and save the contact data to a MongoDB database using Mongoose.
});

//for deleting contact
app.get('/delete-contact/', (req, res) => {
    //get the query from the url
    let id = req.query.id;
    //find the contact in the db using id and delete it.
    Contact.findByIdAndRemove(id)
        .then(contact => {
            if (!contact) {
                console.log('Contact not found');
                return res.redirect('back');
            }
            console.log('Successfully deleted:', contact);
            return res.redirect('back');
        })
        .catch(err => {
            console.log('error in deleting contact', err);
            return res.redirect('back');
        });


});




app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } console.log("Working", port);
});