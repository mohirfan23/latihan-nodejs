const express = require('express');
const fs = require('fs');
const app = express();
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials/');
app.use(express.static(__dirname + '/public'));
app.set('view engine','hbs');

app.use((req,res,next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;

	console.log(log);
	
	fs.appendFile('server.log', log + '\n');
	
	next()
})

hbs.registerHelper('getTahun',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('bigText',(text)=>{
	return text.toUpperCase();
});

app.get('/', (req, res) =>{
	res.render('home.hbs',{
		pagetTitle:'Home page',
		message:'Welcome to my website'
	});
});


app.get('/about', (req, res) =>{
	res.render('about.hbs',{
		pagetTitle:'About Page'
	});
});

app.listen(3000,()=>{
	console.log('Server run in port 3000');
});