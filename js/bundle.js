/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((module) => {

function calculator() {
    const result = document.querySelector(`.calculating__result span`);

    let sex, height, weight, age, ratio;

    if (localStorage.getItem(`sex`)) {
         sex = localStorage.getItem(`sex`);
    } else {
        sex = `female`;
        localStorage.setItem(`sex`, `female`);
    }

    if (localStorage.getItem(`ratio`)) {
        ratio = localStorage.getItem(`ratio`);
   } else {
       ratio = 1.375;
       localStorage.setItem(`ratio`, 1.375);
   }
    

   function initLocalSetting(selector, activeClass) {
    const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass)
            if(elem.getAttribute(`id`) === localStorage.getItem(`sex`)) {
                elem.classList.add(activeClass)
            }

            if (elem.getAttribute(`data-ratio`) === localStorage.getItem(`ratio`)) {
                elem.classList.add(activeClass);
            }
        })
   }

   initLocalSetting(`#gender div`, `calculating__choose-item_active`);
   initLocalSetting(`.calculating__choose_big div`, `calculating__choose-item_active`);

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = `0`;
            return;
        }

        if (sex === `female`) {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function getStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener(`click`, () => {
            let e = event.target;
            if (e.getAttribute(`data-ratio`)) {
                ratio = +e.getAttribute(`data-ratio`);
                localStorage.setItem(`ratio`, e.getAttribute(`data-ratio`))
            } else {
                sex = e.getAttribute(`id`)
                localStorage.setItem(`sex`, e.getAttribute(`id`));
            }

            elements.forEach(elem => {
                elem.classList.remove(activeClass);
            })

            e.classList.add(activeClass);

            calcTotal();
            });
        });

    }
    getStaticInfo(`#gender div`, `calculating__choose-item_active`);
    getStaticInfo(`.calculating__choose_big div`, `calculating__choose-item_active`);


    function getDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener(`input`, () => {

            if (input.value.match(/\D/g)) {
                input.style.border = `2px solid red`
            } else {
                input.style.border = `none`
            };

            switch(input.getAttribute(`id`)) {
                case `height`:
                    height = +input.value;
                    break;
                case `weight`:
                    weight = +input.value;
                    break;
                case `age`:
                    age = +input.value;
                    break; 

            }
            
        });

        calcTotal();
    }

    getDynamicInfo(`#height`);
    getDynamicInfo(`#weight`);
    getDynamicInfo(`#age`);
}

module.exports = calculator;

/***/ }),

/***/ "./js/modules/modals.js":
/*!******************************!*\
  !*** ./js/modules/modals.js ***!
  \******************************/
/***/ ((module) => {

function modals() {
    const modalTrigger = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalCloseBtn = document.querySelector('[data-close]');

function openModal() {
  modal.classList.add('show');
  modal.classList.remove('hide');
  document.body.style.overflow = `hidden`;
  clearInterval(modalTimerId);
  }


modalTrigger.forEach(btn => {
  btn.addEventListener(`click`, openModal)
})

function closeModal () {
  modal.classList.add('hide');
  modal.classList.remove('show');
  document.body.style.overflow = ``;
}

modalCloseBtn.addEventListener(`click`, closeModal)


modal.addEventListener(`click`, (e) => {
  if (e.target === modal) {
      closeModal()
  }
})

document.addEventListener(`keydown`, (e) => {
  if (e.code === `Escape`&& modal.classList.contains(`show`)) {
      closeModal();
  }
});

const modalTimerId = setTimeout(openModal, 30000);

function showModalByScroll() {
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1) {
      openModal();
      window.removeEventListener(`scroll`, showModalByScroll);
  }
}

window.addEventListener(`scroll`, showModalByScroll);
}

module.exports = modals;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((module) => {

function slider() {
    let slideIndex = 1;
    const slides = document.querySelectorAll('.offer__slide'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current');

    showSlides(slideIndex);

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
    } else {
        total.textContent = slides.length;
    }

    function showSlides(n) {
        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        slides[slideIndex - 1].style.display = 'block'; 
        
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }

    function plusSlides (n) {
        showSlides(slideIndex += n);
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

}

module.exports = slider;

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((module) => {

function tabs() {
    const tabs = document.querySelectorAll(`.tabheader__item`),
          tabsContent= document.querySelectorAll(`.tabcontent`),
          tabsParent = document.querySelector(`.tabheader__items`);

          function hideContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });
            tabs.forEach( item => {
                item.classList.remove(`tabheader__item_active`);
            });
          }

          function showContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add(`tabheader__item_active`);
          }

          hideContent();
          showContent(0);

        tabsParent.addEventListener(`click`, (event) => {
            let target = event.target;

            if (target && target.classList.contains(`tabheader__item`)) {
                tabs.forEach((item, i) => {
                    if (target === item) {
                        hideContent();
                        showContent(i);     
                    }
                })
            }
        })
}

module.exports = tabs;



/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((module) => {

function timer() {
    const deadline = '2022-12-31';

        function getTimeRemaining(endtime) {
            const t = Date.parse(endtime) - Date.parse(new Date);
            let days = Math.floor(t / (1000 * 60 * 60 * 24));
            let hours = Math.floor((t / (1000 * 60 * 60) % 24));
            let minutes = Math.floor((t / 1000 / 60) % 60);
            let seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }


    function getZero(n) {
        if (n >= 0 && n < 10) {
            return `0${n}`;
        } else {
            return n;
        }
    }


    function setTime(selector, endtime) {
        const timer = document.querySelector(selector);
              days = timer.querySelector(`#days`),
              hours = timer.querySelector(`#hours`),
              minutes = timer.querySelector(`#minutes`),
              seconds = timer.querySelector(`#seconds`);
              timeInterval = setInterval(updateClock, 1000);


            updateClock();     


        function updateClock() {
            const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval)
            }
        }
    }

    setTime(`.timer`, deadline)
}

module.exports = timer;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
window.addEventListener(`DOMContentLoaded`,() => {
    
    const tabs = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
    const modals = __webpack_require__(/*! ./modules/modals */ "./js/modules/modals.js");
    const slider = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
    const timer = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
    const calculator = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");

    tabs();
    modals();
    slider();
    timer();
    calculator();

    new WOW().init();

});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map