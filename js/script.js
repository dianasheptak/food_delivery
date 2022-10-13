window.addEventListener(`DOMContentLoaded`,() => {
    
    const tabs = require('./modules/tabs');
    const modals = require('./modules/modals');
    const slider = require('./modules/slider');
    const timer = require('./modules/timer');
    const calculator = require('./modules/calculator');

    tabs();
    modals();
    slider();
    timer();
    calculator();

});