require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const routes = require('./src/routes/routes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
// const helmet = require('helmet');
const csrf = require('csurf');
const { globalMiddleware, csrfMiddleware, checkCsrfError, getCurrentDate, checkStatusCode404 } = require('./src/middlewares/middlewares');
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() => {
        app.emit('done');
    })
    .catch(e => console.log(e));

// Middlaware para conseguir receber os dados do body da aplicação
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Setando a pasta public para usar os conteúdos que forem estáticos
app.use(express.static(path.resolve(__dirname, 'public')));
// Helmet
// app.use(helmet());
// sessionOptions
const sessionOptions = session({
    secret: process.env.SECRET,
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash());
// Ejs config
app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Csrf
app.use(csrf());
app.use(globalMiddleware);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(getCurrentDate);
// Rotas
app.use(routes);
app.use(checkStatusCode404);

app.on('done', () => {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`);
        console.log(`Servidor rodando na porta: ${port}`);
    });
});