/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-20
 */

module.exports = function scriptQueue(fn) {
    window.addEventListener('load', function executeQueuedFunction() {
        if (document.documentElement.classList.contains('-no-script')) {
            document.documentElement.classList.remove('-no-script');
        }
        fn();
    });
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-20
 */

module.exports = function element(sel, context) {
    context = context || document;

    return Array.prototype.slice.call(context.querySelectorAll(sel));
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-01-29
 */

/* global window, document */

__webpack_require__(0)(function singleArticle() {
    var currentArticle,
        previousArticle,
        element = __webpack_require__(1);

    function doScrollSpy() {
        var scrollOffset = window.scrollY || document.documentElement.scrollTop;

        previousArticle = null;
        currentArticle = null;

        element('.single-article')
            .forEach(function articleScrollspy(article) {
                if (article.classList.contains('-current')) {
                    previousArticle = article;
                }
                if (article.offsetTop >= scrollOffset) {
                    return;
                }
                currentArticle = article;
            });

        if (!!previousArticle &&
            previousArticle !== currentArticle &&
            previousArticle !== null
        ) {
            previousArticle.classList.remove('-current');
        }

        if (!currentArticle) {
            return;
        }
        currentArticle.classList.add('-current');
    }

    window.addEventListener('scroll', doScrollSpy, true);
    window.addEventListener('resize', doScrollSpy);
    doScrollSpy();
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-05
 */

/* global window, document */

__webpack_require__(0)(function galleryCollection() {
    var element = __webpack_require__(1);

    function setImageDisplay(item) {
        var imageDisplay = document.createElement('span'),
            link = element('.link', item),
            image = element('.image', link[0]);

        imageDisplay.classList.add('display');
        imageDisplay.style.backgroundImage = "url('" + image[0].getAttribute('src') + "')";

        link[0].appendChild(imageDisplay);
    }

    element('.gallery-collection')
        .forEach(function initializeGalleryCollection(galleryCollection) {
            element('.item', galleryCollection)
                .forEach(function initializeGalleryItem(item) {
                    //setImageDisplay(item);
                });
        });
});


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-03-04
 */

/* global document */

__webpack_require__(0)(function clockIcon() {
    var element = __webpack_require__(1),
        MINUTES_IN_HOURS = 60,
        SECONDS_IN_MINUTES = 60,
        HOURS_IN_MIDDAY = 12,
        MIDDAYS_IN_DAY = 2,
        DEGREES_IN_A_CIRCLE = 360;

    element('.clock-icon')
        .forEach(function initializeClockIcon(clockIcon) {
            var time = clockIcon.dataset.time,
                hours,
                minutes,
                seconds,
                timeSep,
                timeSepIndex;

            function initializeComponents(seconds) {
                var frame = document.createElement('span'),
                    hands = document.createElement('span'),
                    hourHand = document.createElement('span'),
                    minuteHand = document.createElement('span'),
                    minutes = seconds / SECONDS_IN_MINUTES % MINUTES_IN_HOURS,
                    hours = seconds / SECONDS_IN_MINUTES / MINUTES_IN_HOURS;

                frame.classList.add('frame');
                hands.classList.add('hands');

                hourHand.classList.add('hand');
                hourHand.classList.add('-hour');
                minuteHand.classList.add('hand');
                minuteHand.classList.add('-minute');

                hands.appendChild(hourHand);
                hands.appendChild(minuteHand);

                frame.appendChild(hands);

                minuteHand.style.transform = 'rotate(' + ((minutes / MINUTES_IN_HOURS) * DEGREES_IN_A_CIRCLE - (DEGREES_IN_A_CIRCLE / 4)) + 'deg)';
                hourHand.style.transform = 'rotate(' + ((hours / HOURS_IN_MIDDAY * DEGREES_IN_A_CIRCLE) - (DEGREES_IN_A_CIRCLE / 4)) + 'deg)';

                clockIcon.appendChild(frame);
            }

            timeSep = ':';
            timeSepIndex = time.indexOf(timeSep);
            hours = parseInt(time.slice(0, timeSepIndex), 10);
            minutes = parseInt(time.slice(timeSepIndex + timeSep.length), 10);
            seconds = 0;

            initializeComponents((hours * MINUTES_IN_HOURS + minutes) * SECONDS_IN_MINUTES + seconds);
        });
});


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-07
 */

/* global Rainbow */

__webpack_require__(0)(function codeHighlighter() {
    Rainbow.extend('javascript', [
        {
            name: 'operator.semicolon',
            pattern: /;/g
        }
    ]);
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-02
 */

/* global window, document */

__webpack_require__(0)(function rangeInput() {
    var element = __webpack_require__(1);

    // element('input[type="range"]')

    element('.range-input')
        .forEach(function initializeRange(input) {
            var start = parseInt(input.dataset.value),
                min = parseInt(input.dataset.min),
                max = parseInt(input.dataset.max);

            input.setAttribute('tabindex', 0);

            window.noUiSlider.create(input, {
                animate: false,
                start: isNaN(start) || start === null ? 0 : start,
                behaviour: 'snap',
                range: {
                    min: isNaN(min) || min === null ? 0 : min,
                    max: isNaN(max) || max === null ? 0 : max
                },
                connect: [true, false]
            });

            input.addEventListener('mousedown', function setFocus() {
                if (document.activeElement === this) {
                    return;
                }
                this.focus();
            }, true);

            input.addEventListener('keydown', function doKeyboardAction(e) {
                var value = Number(input.noUiSlider.get()),
                    increment = 5;

                if (e.shiftKey) {
                    increment = 1;
                }

                if (e.ctrlKey) {
                    increment = 10;
                }

                switch (e.which) {
                    case 37:
                        input.noUiSlider.set(value - increment);
                        break;
                    case 39:
                        input.noUiSlider.set(value + increment);
                        break;
                    default:
                        break;
                }
            });
        });
});


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-08
 */

/* global document */

__webpack_require__(0)(function npSidebar() {
    var element = __webpack_require__(1);

    element('[data-open-sidebar]')
        .forEach(function initializeOpenSidebar(target) {
            target.addEventListener('click', function doOpenSidebar(e) {
                var options = JSON.parse(this.dataset.openSidebar),
                    sidebar = document.getElementById(options.id);

                e.preventDefault();

                if (sidebar.classList.contains('-open')) {
                    sidebar.classList.remove('-open');
                    document.documentElement.classList.remove('-sidebar-open');
                    return;
                }

                sidebar.classList.add('-open');
                document.documentElement.classList.add('-sidebar-open');
            });
        });

    element('.np-sidebar')
        .forEach(function initializeSidebar(sidebar) {
            var content = element('.content', sidebar),
                isSidebarClicked = false;

            content[0].addEventListener('click', function handleSidebarClick() {
                isSidebarClicked = true;
            });

            sidebar.addEventListener('click', function dismissSidebar() {
                if (isSidebarClicked) {
                    isSidebarClicked = false;
                    return;
                }

                document.documentElement.classList.remove('-sidebar-open');
                element('.np-sidebar.-open')[0].classList.remove('-open');
            });
        });
});


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-07
 */

/* global document */

__webpack_require__(0)(function npModal() {
    var element = __webpack_require__(1),
        PolyfillCustomEvent = __webpack_require__(11);

    element('[data-open-modal]')
        .forEach(function initializeOpenModal(target) {
            target.onclick = function onTargetClick(e) {
                e.preventDefault();
            };
            target.addEventListener('click', function doOpenModal(e) {
                var
                    options = JSON.parse(this.dataset.openModal),
                    modal = document.getElementById(options.id),
                    content = modal.firstElementChild,
                    event = new PolyfillCustomEvent('modalopen');

                e.preventDefault();

                event.source = modal.source = target;
                modal.dispatchEvent(event);
                if (event.defaultPrevented) {
                    return;
                }
                modal.classList.add('-open');
                content.scrollTop = 0;
                document.documentElement.classList.add('-modal-open');
                return false;
            });
        });

    element('.np-modal')
        .forEach(function initializeModal(modal) {
            var content = modal.firstElementChild,
                sections = Array.prototype.slice.call(content.children),
                isSectionClicked = false;

            modal.source = null;

            sections.forEach(function initializeModalSection(section) {
                section.addEventListener('click', function handleSectionClick() {
                    isSectionClicked = true;
                });
            });

            modal.addEventListener('click', function dismissModal() {
                var event;

                if (isSectionClicked) {
                    isSectionClicked = false;
                    return;
                }

                event = new PolyfillCustomEvent('modalclose');
                event.source = modal.source;
                modal.dispatchEvent(event);
                if (event.defaultPrevented) {
                    return;
                }
                document.documentElement.classList.remove('-modal-open');
                modal.classList.remove('-open');
                modal.source = null;
            });
        });
});


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-07
 */

/* global document */

__webpack_require__(0)(function menuItem() {
    var element = __webpack_require__(1);

    function initializeImageMenuItem(menuItem) {
        var images = element('img.image', menuItem),
            link = menuItem.firstElementChild,
            display = document.createElement('span'),
            displayImages = images.map(function createDisplayImage(image) {
                var imgEl = document.createElement('span');

                imgEl.classList.add('image');
                imgEl.style.backgroundImage = "url('" + image.getAttribute('src') + "')";

                return imgEl;
            });

        display.classList.add('display');
        displayImages.forEach(function appendDisplayImage(displayImage) {
            display.appendChild(displayImage);
        });

        link.insertBefore(display, link.firstChild);
    }

    element('.menu-item')
        .forEach(function initializeMenuItem(menuItem) {
            if (menuItem.classList.contains('-image')) {
                return initializeImageMenuItem(menuItem);
            }
        });
});


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-08
 */

/* global window, document */

__webpack_require__(0)(function npSearch() {
    var element = __webpack_require__(1);

    element('.np-search')
        .forEach(function initializeSearch(search) {
            var submitBtns = element('button[type="submit"]', search),
                q = element('[name="q"]', search),
                content = element('.content', search),
                isSearchClicked = false;

            content[0].addEventListener('click', function handleSearchClick() {
                isSearchClicked = true;
            });

            search.addEventListener('click', function dismissSidebar() {
                if (isSearchClicked) {
                    isSearchClicked = false;
                    return;
                }

                document.documentElement.classList.remove('-search-open');
                element('.np-search.-open')[0].classList.remove('-open');
            });

            submitBtns.forEach(function initializeSubmitButton(submitBtn) {
                submitBtn.addEventListener('click', function onSubmitClick(e) {
                    if (window.innerWidth >= 768 ||
                        search.classList.contains('-always-open') ||
                        search.classList.contains('-open')) {
                        return;
                    }

                    e.preventDefault();
                    search.classList.add('-open');
                    document.documentElement.classList.add('-search-open');
                    q[0].focus();
                });
            });
        });
});


/***/ }),
/* 11 */
/***/ (function(module, exports) {

/**
 * Script description.
 * @author TheoryOfNekomata
 * @date 2017-02-27
 */

module.exports = (function getCustomEvent() {
    if (typeof window.CustomEvent === "function") {
        return CustomEvent;
    }

    function _CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: true };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, null);
        return evt;
    };

    _CustomEvent.prototype = window.Event.prototype;
    return _CustomEvent;
})();


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);
__webpack_require__(3);
__webpack_require__(9);
__webpack_require__(8);
__webpack_require__(10);
__webpack_require__(7);
__webpack_require__(6);
__webpack_require__(2);
module.exports = __webpack_require__(4);


/***/ })
/******/ ]);
//# sourceMappingURL=script.js.map