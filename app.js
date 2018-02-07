const express = require('express');
const app = express();
app.use(express.static('public'));
let identifiant = 3;

const transforme_en_tableau = (collection) => {
	let html = "<head><meta charset='utf-8'></head><body><table><tr><th>Nom</th><th>Prénom</th><th>Téléphone</th><th>Courriel</th><th>ID</th></tr>";
	for(elm of collection) {
		html += "<tr>";
		for(p in elm) {
			html += "<td>" + elm[p] + "</td>";
		}
		html += "</tr>";
	}
	html += "</table></body>";
	return html;
}
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
	identifiant++;
	// on utilise l'objet req.query pour récupérer les données GET
	reponse = {
		prenom:req.query.prenom,
		nom:req.query.nom,
		telephone:req.query.telephone,
		courriel:req.query.courriel,
		id:identifiant
	};
	console.log(reponse);
	fs.appendFile('public/data/membres.txt', "," + JSON.stringify(reponse), function (err) {
		if (err) throw err;
		console.log("Sauvegardé")
	});
	res.end("Membre ajouté avec succès");
})

//=======================================================Route /html/membres.html
app.get('/membres', function (req, res) {
	const fs = require("fs");
	fs.readFile('public/data/membres.txt', "utf8", function (err, data) {
		let collection = JSON.parse("[" + data + "]");
		res.end(transforme_en_tableau(collection));
	});
})

var server = app.listen(8081, function () {
	var host = server.address().address
	var port = server.address().port
 
	console.log("Exemple l'application écoute sur http://%s:%s", host, port)
})