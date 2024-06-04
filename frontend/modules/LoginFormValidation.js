import validator from 'validator';

export default class loginFormValidation {
    constructor() {
        this.form = document.querySelector('.login-form-validation');
    }

    init() {
        if (this.form) this.events();
        return;
    }

    events() {
        document.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        });
    }

    validate(e) {
        let error = false;
        const element = e.target;
        const username = document.querySelector('input[name="username"]');
        const email = document.querySelector('input[name="email"]');
        const password = document.querySelector('input[name="password"]');

        if (username) this.cleanErrors(username);
        this.cleanErrors(email);
        this.cleanErrors(password);

        if (username && (username.value.length < 3 || username.value.length > 30)) {
            error = true;
            this.createErrorElement('O campo "Usuário" deve conter entre 3 e 30 caracteres.', username);
        }

        if (!validator.isEmail(email.value)) {
            error = true;
            this.createErrorElement('O campo "E-mail" é inválido.', email);
        }

        if (password.value.length < 6 || password.value.length > 50) {
            error = true;
            this.createErrorElement('O campo "Senha" deve conter entre 6 e 50 caracteres.', password);
        }

        if (!error) element.submit();
    }

    createErrorElement(msg, field) {
        const fieldName = field.name;
        field.classList.add('is-invalid');
        const div = document.createElement('div');
        div.setAttribute('id', `${fieldName}Validation`);
        div.setAttribute('class', 'invalid-feedback');
        div.innerText = msg;
        const parentElement = field.parentElement;
        parentElement.appendChild(div);
    }

    cleanErrors(field) {
        const errorElement = document.querySelectorAll('.invalid-feedback');
        errorElement.forEach(val => {
            val.remove();
        });


        if (field.classList.contains('is-invalid')) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        }
    }
}