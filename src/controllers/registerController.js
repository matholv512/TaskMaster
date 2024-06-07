const Auth = require('../services/AuthService');

exports.index = (req, res) => {
    res.status(200).render('register');
};

exports.register = async(req, res) => {
    try {
        const login = new Auth(req.body);
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors);
            req.session.save(function() {
                return res.redirect('back');
            });
            return;
        }

        req.flash('success', 'Usuário cadastrado com sucesso.');
        req.session.save(function() {
            return res.redirect('/');
        });
    } catch(e) {
        console.log(e);
        return res.status(500).render('errorPage');
    }
}