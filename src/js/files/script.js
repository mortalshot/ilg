// Подключение функционала 
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// Выводим высоту шапки
const header = document.querySelector('header.header');
if (!isMobile) {
   window.addEventListener('resize', headerHeight);
}
function headerHeight() {
   let headerHeight = header.offsetHeight;
   document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
}

setTimeout(() => {
   headerHeight();
}, 200);

// Получаем высоту первого экрана
const firstscreen = document.querySelector('.firstscreen');
if (firstscreen) {
   if (!isMobile) {
      window.addEventListener('resize', firstScreenHeight);
   }

   function firstScreenHeight() {
      let firstScreenHeight = firstscreen.offsetHeight;
      firstscreen.style.setProperty('--firstscreen-height', `${firstScreenHeight}`);
      ScrollTrigger.refresh();
   }

   setTimeout(() => {
      firstScreenHeight();
   }, 300);
}

// Высчитываем длину полосок в services
const services = document.querySelector('.services');
if (services) {
   const servicesItems = document.querySelectorAll('.services .tabs__title');
   const servicesNavigation = document.querySelector('.tabs__navigation');

   if (!isMobile) {
      window.addEventListener('resize', calcNavigationTitleLineWidth);
   }
   function calcNavigationTitleLineWidth() {
      let navigationWidth = servicesNavigation.offsetWidth;
      let elementWidth = 0;

      servicesItems.forEach(element => {
         elementWidth <= element.offsetWidth ? elementWidth = element.offsetWidth : null;
      });

      let lineWidth = (navigationWidth - elementWidth * servicesItems.length - 10 * servicesItems.length) / servicesItems.length;

      services.style.setProperty('--line-width', `${lineWidth}px`);
   }

   setTimeout(() => {
      calcNavigationTitleLineWidth();
   }, 300);
}

// gsap Анимации
function addGsapAnimation() {
   // Первый экран
   if (firstscreen) {
      ScrollTrigger.create({
         trigger: firstscreen,
         onEnter: function () {
            firstscreen.classList.add('_active');
         },
         onEnterBack: function () {
            firstscreen.classList.add('_active');
         },
         onLeave: function () {
            firstscreen.classList.remove('_active');
         },
      });
   }

   // Анимация при доскролле до секции services
   const services = document.querySelector('.services');
   if (services) {
      const servicesFirstTab = services.querySelector('.tabs__body._hide');

      ScrollTrigger.create({
         trigger: servicesFirstTab,
         start: "top 60%",
         onEnter: function () {
            servicesFirstTab.classList.remove('_hide');
         }
      });
   }

   const serviceItemsMedia = document.querySelectorAll('.service-item__media svg');
   if (serviceItemsMedia.length > 0) {
      serviceItemsMedia.forEach(element => {
         const elementHideClass = element.closest('._hide');

         if (elementHideClass && !elementHideClass.classList.contains('tabs__body')) {
            ScrollTrigger.create({
               trigger: element,
               start: "top 60%",
               onEnter: function () {
                  elementHideClass.classList.remove('_hide');
               }
            });
         }
      });
   }

   // Секция tools
   const toolsCards = document.querySelectorAll('.tools__card');
   if (toolsCards.length > 0) {
      toolsCards.forEach(element => {
         let elementTimeLine = gsap.timeline({
            scrollTrigger: {
               trigger: element,
               start: "top 80%",
            }
         });
         elementTimeLine.fromTo(element, { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0 });
      })
   }

   const tollsText = document.querySelector('.tools__text');
   if (tollsText) {
      let tollsTextTimeLine = gsap.timeline({
         scrollTrigger: {
            trigger: document.querySelector('.tools'),
            start: "top 80%",
         }
      });
      tollsTextTimeLine.fromTo(tollsText, { opacity: 0, yPercent: 20 }, { opacity: 1, yPercent: 0 });
   }

   // Секция groth
   const groth = document.querySelector('.groth');
   const grothImage = document.querySelector('.groth__image img');
   if (grothImage) {
      let grothTimeLine = gsap.timeline({
         scrollTrigger: {
            trigger: groth,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
            // markers: true,
         }
      });

      grothTimeLine.fromTo(grothImage, { yPercent: -40 }, { yPercent: 0 });
   }
}

window.addEventListener('DOMContentLoaded', function () {
   setTimeout(() => {
      addGsapAnimation();
   }, 300);
})