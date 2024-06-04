exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) {
        return res.status(500).render('errorPage');
    }
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash('errors', 'Você precisa fazer login.');
        req.session.save(() => res.redirect('/'));
        return;
    }
    next();
};

exports.checkStatusCode404 = (req, res, next) => {
    res.status(404).render('errorPage');
};

exports.getCurrentDate = (req, res, next) => {
    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    const date = new Date();
    const day = String(date.getDate());
    const month = date.getMonth();
    const year = String(date.getFullYear());

    const currentDate = day + ' de ' + months[month] + ', ' + year;
    res.locals.currentDate = currentDate;

    const currentYear = year;
    res.locals.currentYear = currentYear;

    const currentHour = date.getHours();
    res.locals.currentHour = Number(currentHour);

    next();
};