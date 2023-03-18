// //require the library
// const mongoose = require('mongoose');

//connect to the database
// mongoose.connect('mongodb://localhost/contact_list_db');
// mongoose.connect('mongodb://localhost:27017/contact_list_db', { useNewUrlParser: true });

// mongoose.connect(connectionString,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

//acquire the connection(to check if it's successful)
// const db = mongoose.connection;

//error
// db.on('error',function(err) { console.log(err.message); });



//up and running then print the message
// db.once('open', function() {
  
//     console.log("Successfully connected to the database");

// });



const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contact_list_db')
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error(err.message);
  });
