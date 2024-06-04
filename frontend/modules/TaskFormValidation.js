export default class TaskFormValidation {
    constructor() {
        this.form = document.querySelector('.task-form-validation');
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
        const title = document.querySelector('input[name="title"]');
        const description = document.querySelector('textarea[name="description"]');

        this.cleanError();

        if (title.value.length >= 50) {
            error = true;
            this.createErrorElement('O campo "Título" é muito longo.', title);
        }

        if (description.value.length >= 1000) {
            error = true;
            this.createErrorElement('O campo "Descrição" é muito longo.', description);
        }

        if (!error) element.submit();
    }

    createErrorElement(msg, field) {
        field.classList.add('is-invalid');
        const fieldName = field.name;
        const div = document.createElement('div');
        div.setAttribute('id', `${fieldName}Validation`);
        div.setAttribute('class', 'invalid-feedback');
        div.innerText = msg;
        const parentElement = field.parentElement;
        parentElement.appendChild(div);
    }

    cleanError() {
        const errorElement = document.querySelectorAll('.invalid-feedback');
        errorElement.forEach(val => {
            val.remove();
        });
    }
}