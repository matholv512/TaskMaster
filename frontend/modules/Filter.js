export default class FilterContent {
    constructor() {
        this.select = document.querySelector('select[name="filter"]');
        this.tasks = document.querySelectorAll('.list-group-item');
        this.filteredTasks = Array.from(this.tasks);
        this.filterSpan = document.querySelector('.filter-span')
    }

    init() {
        if (!this.eventsBound) {
            this.events();
            this.eventsBound = true;
        }
    }

    events() {
        if (!this.select) return;
        let selectedElement;
        this.select.addEventListener('change', e => {
            selectedElement = e.target;
        });

        document.addEventListener('click', e => {
            if (!selectedElement) return;
            if (e.target.classList.contains('filter-button')) {
                this.filter(selectedElement);
                document.dispatchEvent(new CustomEvent('filterApplied'));
            }

            if (e.target.classList.contains('removeFilter')) {
                e.target.remove();
                this.filteredTasks = Array.from(this.tasks);
                for (let task of this.tasks) {
                    task.style.display = 'block';
                }
                document.dispatchEvent(new CustomEvent('filterRemoved'));
            }
        });

        document.addEventListener('filterApplied', () => {
            this.removeFilter = document.querySelector('.removeFilter');
            if (!this.removeFilter) this.createRemoveFilter();
            return;
        });
    }

    filter(element) {
        this.filteredTasks = [];
        for (let task of this.tasks) {
            if (element.value === 'lowPriority' && task.dataset.taskPriority === 'Baixa' ||
                element.value === 'mediumPriority' && task.dataset.taskPriority === 'Média' ||
                element.value === 'highPriority' && task.dataset.taskPriority === 'Alta' ||
                element.value === 'default') {
                task.style.display = 'block';
                this.filteredTasks.push(task);
            } else {
                task.style.display = 'none';
            }
        }
    }

    createRemoveFilter() {
        const button = document.createElement('button');
        button.classList.add('btn-close', 'm-1', 'removeFilter');
        this.filterSpan.insertAdjacentElement('afterend', button);
    }

    getFilteredTasks() {
        return this.filteredTasks;
    }
}