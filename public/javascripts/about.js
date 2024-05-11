var p = document.querySelector("#gsapp");
var cluter = "";
var text = p.textContent;
var textelem = text.split("");
textelem.forEach(function (e) {
  cluter += `<span>${e}</span>`;
});
p.innerHTML = cluter;
gsap.to("#gsapp span", {
  color: "black",
  stagger: 0.02,
  duration: 0.01
});
