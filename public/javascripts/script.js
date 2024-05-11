var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
var swiper = new Swiper(".mySwipers", {
  effect: "cards",
  grabCursor: true,
  loop: true,
  autoplay:{
    delay: 2000,
    disableOnInteraction: false,
  }
});

var p = document.querySelector("#gsap")
  var cluter = "";
  var text = p.textContent;
  var textelem = text.split("");
  textelem.forEach(function (e) {
    cluter += `<span>${e}</span>`;
  });
  p.innerHTML = cluter;

  gsap.to("#gsap span", {
    color: "black",
    stagger: 0.1,
    scrollTrigger: {
      trigger: "#gsap",
      scroller: "body",
      start: "top 75%",
      end: "top 30%",
      scrub: 2
    },
  });
  gsap.to("#window", {
    width: "100%",
    scrollTrigger: {
      trigger: "#window",
      scroller: "body",
      start: "top 80%",
      end: "top 40%",
      scrub: 2
    },
  });
Shery.makeMagnet("#button");

var loaderText = document.querySelector("#loader-text");
var loader = "";
var Intext = loaderText.textContent;
var Intextelem = Intext.split("");
Intextelem.forEach(function (e) {
  loader += `<span>${e}</span>`;
});
loaderText.innerHTML = loader;
var navbar = document.querySelector("#navbar");
var tl = gsap.timeline();
tl.to("#loader-text span", {
  color: "black",
  stagger: 0.2,
  duration: 1.8
});
tl.to("#loader",{
  bottom:"100%"
})
tl.to("#wrapper",{
  opacity:1
})
tl.from("#navbar",{
  top:"-20%"
})
tl.from("#nav-text",{
  y:-70,
  stagger:0.2
})