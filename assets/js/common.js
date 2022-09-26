"use strict";
/*

  Может стоит переделать на data-event=""

*/

function ClickSelector(element, className) {
  try {
    if (element.classList.contains(className)) {
      return element;
    } else {
      let el = (element.closest('.' + className)) ? element.closest('.' + className) : false;
      return el;
    }
  } catch (err) {
  }
}

function documentClicks() {
  document.addEventListener('click', function (e) {

    // Все действия с этом блоке зависят от element
    let
      target = e.target,
      element = false;

    // Пример на все случаи
    // if (document.querySelector('.select')) {
    //   element = ClickSelector(target, 'select');
    //   if (element) {
    //     #code...
    //   } else {
    //     selectClose();
    //     document.querySelector('.selector').classList.remove('active');
    //   }
    // }

    if (document.querySelector('#nav')) {
      element = ClickSelector(target, 'e_toggle');
      if (element) {
        modalToggle('nav');
        element.classList.toggle('active');
      }
    }

    if (document.querySelector('#sub-menu')) {
      element = ClickSelector(target, 'toggle-btn');
      if (element) {
        modalOpen('sub-menu');
        document.querySelector('.mobile__burger').classList.add('active-sub');
      }
      element = ClickSelector(target, 'active-sub');
      if (element) {
        modalClose('sub-menu');
        document.querySelector('.mobile__burger').classList.remove('active-sub');
      }
    }
  });
}



/* BEGIN BASE FUNCTIONS */

// Модальные окна.
function modalOpen(eID) {
  document.querySelector('html').classList.add('overflow-hidden');
  let element = document.getElementById(eID);
  element.classList.remove('hidden');
}
function modalClose(eID) {
  document.querySelector('html').classList.remove('overflow-hidden');
  let element = document.getElementById(eID);
  element.classList.add('hidden');
}
function modalToggle(eID) {
  document.querySelector('html').classList.toggle('overflow-hidden');
  let element = document.getElementById(eID);
  element.classList.toggle('hidden');
}
/* END BASE FUNCTIONS */

window.addEventListener('scroll', function (e) {
  if (document.querySelector('html').scrollTop > 0) {
    document.querySelector('.navigation').classList.add("fixed");
    document.querySelector('body').classList.add("h-f");
  } else {
    document.querySelector('.navigation').classList.remove("fixed");
    document.querySelector('body').classList.remove("h-f");
  }
});

const addHiddenNav = () => {
  let nav = document.querySelector('.navigation__row');
  if (!(window.innerWidth >= 991)) {
    nav.classList.add('hidden');
  } else {
    nav.classList.remove('hidden');
  }
}

function footer() {
  if (document.querySelector('footer')) {
    document.querySelector('.wrapper').style.paddingBottom = document.querySelector('footer').clientHeight + 'px';
  }
}


// Основной код после загрузки страницы.
document.addEventListener('DOMContentLoaded', function () {

  if (document.querySelector('.screen-5__slider')) {
    let work_slider = new Swiper('.screen-5__slider', {
      breakpoints: {
        320: {
          slidesPerView: 1.5,
          spaceBetween: 16,
        },
        425: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 16,
        },
        1100: {
          slidesPerView: 4,
          spaceBetween: 28,
        },
      },
      mousewheel: false,
      loop: true,
      grabCursor: true,
      navigation: {
        nextEl: '.screen-5__slider-next',
        prevEl: '.screen-5__slider-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    });
  }

  addHiddenNav();

  (function () { // Базовые функции
    documentClicks();
    footer();
  }());
});

window.addEventListener('resize', function () {
  addHiddenNav();
  footer();
});


