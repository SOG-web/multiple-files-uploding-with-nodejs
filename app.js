const express = require('express');
const path = require('path');
const {create} = require('express-handlebars')
const routes = require('././server/routes/routes');
const connect = require('././server/database/database');

const app = express();

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials'),
});

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

// connect to the database
connect();

app.use('/', routes);

app.listen(3000, () => {
  console.log('Server app listening on port 3000!');
});

