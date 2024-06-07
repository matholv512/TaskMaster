const Auth = require('../services/AuthService');

exports.index = (req, res) => {
    res.status(200).render('register');
};

exports.register = async(req, res) => {
    try {
        const register = new Auth(req.body);
        await register.register();

        if (register.errors.length > 0) {
            req.flash('errors', register.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }

        const login = new Auth(req.body);
        await login.login();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function () {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Cadastrado com sucesso.');
        req.session.user = login.user;
        req.session.save(function() {
            return res.redirect('/');
        });
    } catch(e) {
        console.log(e);
        return res.status(500).render('errorPage');
    }
}