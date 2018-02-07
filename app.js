const express = require('express');
const app = express();
app.use(express.static('public'));

//=======================================================Route /html/formulaire.html
app.get('/formulaire', function (req, res) {
	console.log(__dirname);
	res.sendFile( __dirname + "/public/html/" + "formulaire.html" );
})
//=======================================================Route
app.get('/', (req, res) => {
	console.log('accueil')
	res.end('<h1>Accueil</h1>')
})

//=======================================================Route /traiter_get
app.get('/traiter_get', function (req, res) {
 	// Preparer l'output en format JSON
	console.log('la route /traiter_get')
	const fs = require('fs');
	// on utilise l'objet req.query pour récupérer les données GET
	reponse = {
		prenom:req.query.prenom,
		nom:req.query.nom,
		telephone:req.query.telephone,
		courriel:req.query.courriel
	};
	console.log(reponse);
	fs.appendFile('public/data/membres.txt', "," + JSON.stringify(reponse), function (err) {
		if (err) throw err;
		console.log("Sauvegardé")
	});
	res.end("/membres");
})

//=======================================================Route /html/membres.html
app.get('/membres', function (req, res) {
	
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
 
	console.log("Exemple l'application écoute sur http://%s:%s", host, port)
})