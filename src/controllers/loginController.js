const Auth = require('../services/AuthService');

exports.index = (req, res) => {
    if (req.session.user) return res.status(200).render('home');
    return res.status(200).render('login');
};

exports.login = async (req, res) => {
    try {
        const login = new Auth(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Você entrou no sistema.');
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('/');
        });
    } catch (e) {
        console.log(e);
        return res.status(500).render('errorPage');
    }
};

exports.logout = (req, res) => {
    try {
        req.session.destroy();
        res.redirect('/');
    } catch(e) {
        console.log(e);
        return res.status(500).render('errorPage');
    }
}