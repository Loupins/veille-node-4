const express = require('express');
const app = express();
app.use(express.static('public'));
//=======================================================Route
app.get('/', (req, res) => {
	console.log('accueil')
	res.end('<h1>Accueil</h1>')
})