const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
    var now = new Date().toString();
    var log = `${now}: ${request.method} ${request.url}`;
    console.log(log);
    fs.appendFile('server.log', log + "\n", (err) => {
        if (err) {
            console.log('Unable to append to file.');
        }
    });
    next();
});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (request, response) => {
    response.render('home.hbs', {
        page_title: 'Home page'
    });
});

app.get('/about', (request, response) => {
    response.render('about.hbs', {
        page_title: 'About page'
    });
})

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 300');
});