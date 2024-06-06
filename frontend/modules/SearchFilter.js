import Filter from './Filter';
export default class SearchFilter {
    constructor() {
        this.tasks = document.querySelectorAll('.list-group-item');
        this.filter = new Filter();
        this.filter.init();
        this.searchValue = null;
    }

    init() {
        document.addEventListener('input', e => {
            const element = e.target;
            if (element.classList.contains('search-input')) {
                this.searchValue = element.value;
                this.filterContent(this.searchValue);
                document.dispatchEvent(new CustomEvent('searchFilterStart'))
            }
        });

        document.addEventListener('filterRemoved', () => {
            this.searchInput = document.querySelector('.search-input');
            this.searchInput.value = null;
            this.searchValue = null;
        });

        document.addEventListener('filterApplied', () => {
            if (this.searchValue) {
                this.filterContent(this.searchValue);
            }
        });
    }

    filterContent(searchValue) {
        this.researchedTasks = [];

        const filteredTasks = this.filter.getFilteredTasks();
        const tasksToFilter = filteredTasks ? filteredTasks : this.tasks;

        for (let task of tasksToFilter) {
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