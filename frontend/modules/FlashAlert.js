export default class FlashAlert {
    constructor() {
        this.alertRow = document.querySelector('.alertRow');
        this.progressBar = document.querySelector('.progress-bar');
        this.count = 0;
        this.time = 5000;
    }

    init() {
        this.removeAlertRow();
        this.events();
    }

    events() {
        document.addEventListener('click', e => {
            const element = e.target;
            if (element.classList.contains('removeMessage')) {
                element.remove();
                this.alertRow.remove();
                this.progressBar.remove();
            }
        });
    }

    removeAlertRow() {
        if (this.alertRow) {
            this.progressBar.style.width = "0%";
            const interval = setInterval(() => {
                this.count++;
                this.progressBar.style.width = `${this.count}%`;
                if (this.count >= 100) {
                    clearInterval(interval);
                    return;
                }
            }, (((this.time * 1) / 100) - 1));
            setTimeout(() => {
                this.alertRow.remove();
            }, this.time);
        }
    }
}
