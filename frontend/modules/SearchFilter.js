export default class SearchFilter {
    constructor() {
        this.tasks = document.querySelectorAll('.list-group-item');
    }

    init() {
        document.addEventListener('input', e => {
            const element = e.target;
            if (element.classList.contains('search-input')) this.filterContent(element.value);
        });
    }

    filterContent(searchValue) {
        for (let task of this.tasks) {
            if (task.dataset.taskTitle.toLowerCase().includes(searchValue.toLowerCase())) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    }
}