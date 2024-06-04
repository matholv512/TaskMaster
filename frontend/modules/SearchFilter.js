import Filter from './Filter';
export default class SearchFilter {
    constructor() {
        this.tasks = document.querySelectorAll('.list-group-item');
        this.filter = new Filter();
        this.filter.init();
    }

    init() {
        document.addEventListener('input', e => {
            const element = e.target;
            if (element.classList.contains('search-input')) {
                this.filterContent(element.value);
                document.dispatchEvent(new CustomEvent('searchFilterStart'))
            }
        });
    }

    filterContent(searchValue) {
        this.researchedTasks = [];

        if (this.filter.getFilteredTasks()) {
            for (let task of this.filter.getFilteredTasks()) {
                if (task.dataset.taskTitle.toLowerCase().includes(searchValue.toLowerCase())) {
                    task.style.display = 'block';
                    this.researchedTasks.push(task);
                } else {
                    task.style.display = 'none';
                }
            }
            return;
        }
        for (let task of this.tasks) {
            if (task.dataset.taskTitle.toLowerCase().includes(searchValue.toLowerCase())) {
                task.style.display = 'block';
                this.researchedTasks.push(task);
            } else {
                task.style.display = 'none';
            }
        }
    }

    getResearchedTasks() {
        return this.researchedTasks;
    }
}