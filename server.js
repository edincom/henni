let express = require('express');
let app =express();   // instancier le serveur
app.use(express.urlencoded({extended:false}));

let router = require('./route');
const { userFormAdd } = require('./controllers/tvController');
app.use('/', router);

app.listen(3000, function(){
    console.log("Server is running on port 3000")
});

app.use(express.static('public'));