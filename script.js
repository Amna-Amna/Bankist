"use strict";
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector('.nav')
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

//Button scrolling
btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  section1.scrollIntoView({ behavior: "smooth" });
});

//Event delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
//tabbed component

tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((t) => t.classList.remove("operations__tab--active"));
  tabsContent.forEach((c) => c.classList.remove("operations__content--active"));

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});


//fading animation

const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el =>{
      if( el !== link) el.style.opacity = this
    })
    logo.style.opacity = this

  }
}
nav.addEventListener('mouseover',handleHover.bind(0.5))

nav.addEventListener('mouseout',handleHover.bind(1))

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height
const stickyNav = function(entries){
  const [entry] = entries
  if(!entry.isIntersecting)  nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const headerObserver = new IntersectionObserver(stickyNav, {
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`,
})

headerObserver.observe(header)
//Reveal section
const allSections = document.querySelectorAll('.section')
const revealSection = function(entries, observer){
   const [entry] = entries
   if(!entry.isIntersecting) return ;
   entry.target.classList.remove('section--hidden')
   observer.unobserve(entry.target)
}
const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold:0.15
})
allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})

//Lazzy loading images 
const loadImg = function(entries, observer){
  const [entry] = entries
  console.log(entry)

  if (!entry.isIntersecting) return

  entry.target.src = entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')

  })
  observer.unobserve(entry.target)
}

const imgTarget = document.querySelectorAll('img[data-src]')
 console.log(imgTarget)

const imgObserver = new IntersectionObserver(loadImg,{
  root:null,
  threshold:0,
  rootMargin:'200px'
})
 imgTarget.forEach(img =>imgObserver.observe(img))

//slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

//******************************************************************************************* */
//sticky navigation
// const initialCoords = section1.getBoundingClientRect()
// window.addEventListener('scroll', function(){
//   if(window.scrollY > initialCoords.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky')
// })

//API intersection

// const obsCallback = function(entries, observer){
//   entries.forEach(entry =>{
//     console.log(entry)
//   })
// }

// const obsOption = {
//   root:null,
//   threshold:[0,0.2]
// }
// const observer = new IntersectionObserver(obsCallback, obsOption)
// observer.observe(section1)
// tabs.forEach((e) =>
//   e.addEventListener("click", () => {
//     console.log("tabs");
//   })
// );

/////nav scrolling
// document.querySelectorAll(".nav__link").forEach(function (el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     console.log(id);
//   });
// });

// const h1 = document.querySelector("h1");
// console.log(h1.querySelectorAll(".highlight"));
// console.log(h1.childNodes);

//////////////////////////////////////////////////////////////////////////////////
// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");
// console.log(allSections);
// const buttons = document.getElementsByTagName("button");
// console.log(buttons);
///////////////////////////////////////////////////////////////////////////////////
// creating an element
// let message = document.createElement("div");
// message.classList.add("cookie-message");
// message.innerHTML =
//   'We use cookies for improved functionality and analytics <button class = "btn btn--close-cookie">Got it!</button>';

// header.append(message);
// header.prepend(message.cloneNode(true));

// header.before(message);
// header.after(message);
//deleting elements:

// document
//   .querySelector(".btn--close-cookie")
//   .addEventListener("click", function () {
//     // message.parentElement.removeChild(message);old way (inheritance concept)
//     message.remove();
//   });

// message.style.backgroundColor = "#37383d";
// message.style.width = "104.6%";

// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// //attributes
// const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// console.log(logo.getAttribute("designer"));
// logo.alt = "beautiful miniministic logo";

// const btnScrollTo = document.querySelector(".btn--scroll-to");
// const section1 = document.querySelector("#section--1");

// btnScrollTo.addEventListener("click", function (e) {
//   const s1coords = section1.getBoundingClientRect();
// console.log(s1coords);
//   console.log(e.target.getBoundingClientRect());
//   console.log("(X/Y) positions = ", window.pageXOffset, window.pageYOffset);
//   console.log(
//     "viewwport height and width",
//     document.documentElement.clientHeight,
//     document.documentElement.clientWidth
//   );
//   scrolling;
//   window.scrollTo(
//     s1coords.left + window.pageXOffset,
//     s1coords.top + window.pageYOffset
//   );
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: "smooth",
//   });
//   section1.scrollIntoView({ behavior: "smooth" });
// });

// let h1 = document.querySelector("h1");
// const alerth1 = function (e) {
//   alert("1   You are reading the heading");
// };
// h1.addEventListener("mouseenter", alerth1);
// setTimeout(() => h1.removeEventListener("mouseenter", alerth1), 3000);
// h1.onmouseenter = function (e) {
//   alert("2   You are reading the heading");
// };

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Link", e.target, e.currentTarget);
//   // e.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("conatiner", e.target, e.currentTarget);
// });
// document.querySelector(".nav").addEventListener(
//   "click",
//   function (e) {
//     this.style.backgroundColor = randomColor();
//     console.log("nav", e.target, e.currentTarget);
//   },
//   true
// )}
