import 'core-js/stable';
import 'regenerator-runtime';
import LoginFormValidation from './modules/LoginFormValidation';
import TaskFormValidation from './modules/TaskFormValidation';
import Pagination from './modules/Pagination';
import SearchFilter from './modules/SearchFilter';
import Filter from './modules/Filter';
import FlashAlert from './modules/FlashAlert';
import './assets/css/style.css';

document.addEventListener('DOMContentLoaded', () => {
    const flashAlert = new FlashAlert();
    flashAlert.init();

    const loginFormValidation = new LoginFormValidation();
    loginFormValidation.init();
    
    const taskFormValidation = new TaskFormValidation();
    taskFormValidation.init();
    
    const searchFilter = new SearchFilter();
    searchFilter.init();

    const filter = new Filter();
    filter.init();

    const pagination = new Pagination();
    pagination.init();
});
