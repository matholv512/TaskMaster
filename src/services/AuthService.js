const LoginModel = require('../models/userModel.js');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

class Auth {
    constructor(body) {
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async login() {
        this.validate();

        if (this.errors.length > 0) return;

        this.user = await LoginModel.findOne({ email: this.body.email });

        if (!this.user) {
            this.errors.push('Usuário ou senha incorretos.');
            return;
        }

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Usuário ou senha incorretos.');
            this.user = null;
            return;
        }
    }

    async register() {
        this.validate();

        if (this.errors.length > 0) return;

        await this.userExists();

        if (this.errors.length > 0) return;

        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
    }

    async userExists() {
        this.user = await LoginModel.findOne({ email: this.body.email });
        if (this.user) this.errors.push('Esse e-mail já existe.');
    }

    validate() {
        this.cleanUp();

        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido.');

        if (this.body.password.length < 6 || this.body.password.length > 50) this.errors.push('A senha precisa ter entre 6 e 50 caracteres.');
    }

    cleanUp() {
        for (let key in this.body) {
            if (typeof this.body[key] !== 'string') {
                this.body[key] = '';
            }
        }

        this.body = {
            username: this.body.username,
            email: this.body.email,
            password: this.body.password
        }
    }
}

module.exports = Auth;