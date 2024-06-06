import formatDate from './formatDate';
import Filter from './Filter';
import SearchFilter from './SearchFilter';
export default class Pagination {
    constructor() {
        this.pagination = document.querySelector('.pagination');
        this.navPagination = document.querySelector('.navPagination');
        this.divTasks = document.querySelector('.list-group');
        this.index = 1;
        this.itemsPerPage = 9;
        this.filter = new Filter();
        this.filter.init();
        this.tasks = this.filter.getFilteredTasks();
        this.searchFilter = new SearchFilter();
        this.searchFilter.init();
        this.numberOfPageLinks = Math.ceil(Number(this.tasks.length / this.itemsPerPage));
    }

    init() {
        formatDate();
        this.events();
        this.createPagination();
        this.filterContent();
        this.cleanEmptyDiv();
    }

    events() {
        document.addEventListener('filterApplied', () => {
            if (this.searchFilter.getResearchedTasks()) {
                this.tasks = this.filter.getResearchedTasks();
                this.numberOfPageLinks = Math.ceil(Number(this.tasks.length / this.itemsPerPage));
                this.index = 1;
                this.createPagination();
                this.filterContent();
                return;
            }

            this.tasks = this.filter.getFilteredTasks();
            this.numberOfPageLinks = Math.ceil(Number(this.tasks.length / this.itemsPerPage));
            this.index = 1;
            this.createPagination();
            this.filterContent();
        });

        document.addEventListener('filterRemoved', () => {
            this.tasks = this.filter.getFilteredTasks();
            this.numberOfPageLinks = Math.ceil(Number(this.tasks.length / this.itemsPerPage));
            this.index = 1;
            this.createPagination();
            this.filterContent();
        });

        document.addEventListener('click', e => {
            const element = e.target;
            if (element.classList.contains('page-link')) {
                this.index = element.innerText;
                this.filterContent();
            }
        });

        document.addEventListener('searchFilterStart', () => {
            if (this.searchFilter.getResearchedTasks()) {
                this.tasks = this.searchFilter.getResearchedTasks();
                this.numberOfPageLinks = Math.ceil(Number(this.tasks.length / this.itemsPerPage));
                this.index = 1;
                this.createPagination();
                this.filterContent();
            }
        });
    }

    filterContent() {
        let tasksArray = this.tasks;

        this.tasks.forEach((value) => {
            value.remove();
        });

        for (let i = 0; i < this.numberOfPageLinks; i++) {
            if (Number(this.index) === i + 1) {
                let start = 0;
                if (i === 0) {
                    start = 0;
                } else {
                    start = ((i + 1) * this.itemsPerPage) - this.itemsPerPage;
                }
                let end = (i + 1) * this.itemsPerPage;
                tasksArray = tasksArray.slice(start, end);
            }
        }

        tasksArray.forEach((value) => {
            this.divTasks.appendChild(value);
        });
    }

    createPagination() {
        this.clearPagination();

        this.createPageLink(this.numberOfPageLinks, this.pagination);
    }

    createPageLink(numberOfPageLinks, parentElement) {
        for (let i = 0; i < numberOfPageLinks; i++) {
            const li = document.createElement('li');
            li.classList.add('page-item');
            const a = document.createElement('a');
            a.classList.add('page-link');
            a.innerText = i + 1;
            li.appendChild(a);
            parentElement.appendChild(li);
        }
    }

    clearPagination() {
        while (this.pagination && (this.pagination.firstChild)) {
            this.pagination.removeChild(this.pagination.firstChild);
        }
    }

    cleanEmptyDiv() {
        for (let div of document.querySelectorAll('.list-group')) {
            if (div.children.length === 0) div.remove();
        }
    }
}