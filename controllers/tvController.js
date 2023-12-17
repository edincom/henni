var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database : 'teve',
});

connection.connect(function(error) {if(error) console.log(error)});
let Television = require('../models/tvModels');


liste_tv = []

exports.tvList = function(req,res){
    if (liste_tv.length === 0) {
        connection.query('select * from television;', function (error, result) {
            if (error) console.log(error);
            const brandValues = result.map(item => item.Marque);
            const priceValues = result.map(item => item.Prix);
            const sizeValues = result.map(item => item.Taille);
            const dispoValues = result.map(item => item.Dispo);
            const boughtValues = result.map(item => item.Achetee);
            const fonctValues = result.map(item => item.Fonctionnelle);
            const brokenValues = result.map(item => item.Casse);
            for (let i = 0; i < brandValues.length; i++) {
                const television = new Television(priceValues[i], brandValues[i], sizeValues[i], dispoValues[i], boughtValues[i],fonctValues[i],brokenValues[i]);
                liste_tv.push(television);
            }
            res.render('home.ejs', { Marque: brandValues, Prix: priceValues, Taille: sizeValues, Disponibilité: dispoValues, Achetée: boughtValues, Fonctionnelle: fonctValues, Cassée: brandValues });
        });
    } else {
        res.render('home.ejs', {
            Marque: liste_tv.map(television => television.brand),
            Prix: liste_tv.map(television => television.price),
            Taille: liste_tv.map(television => television.size),
            Disponibilité: liste_tv.map(television => television.available),
            Achetée: liste_tv.map(television => television.bought),
            Fonctionelle: liste_tv.map(television => television.state),
            Cassée: liste_tv.map(television => television.broken)
        });
    }
}