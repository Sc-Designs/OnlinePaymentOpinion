var pass = document.querySelector("#pass");
var seeing = document.querySelector("#seeing");
var flag = 0;
pass.addEventListener("click", function() {
    if(flag == 0) {
        pass.innerHTML = `<i class="ri-eye-line"></i>`;
        seeing.type = "text";
        flag = 1;
    }else {
        pass.innerHTML = `<i class="ri-eye-close-line">`;
        seeing.type = "password";
        flag = 0;
    }
});

var check = ()=>{
var name = document.querySelector("#name").value.trim();
var email = document.querySelector("#email").value.trim();
var username = document.querySelector("#username").value.trim();
var password = document.querySelector("#seeing").value.trim();

let filter_name = /^([a-zA-Z]{2,25}\s[a-zA-Z]{2,25})+$/;
let filter_email =/^([a-zA-Z0-9_\.\-])+\@+([a-zA-Z0-9_\.\-])+\.+([a-zA-Z]{2,5})$/;
let filter_username = /^([a-zA-z]+[0-9]{2,4})$/;
let filter_password =/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-_=+{};:'",.<>?/|])(?!.*\s).{6,15}$/;

if (name == "" || name == null) {
  document.getElementById("name-error").style.display = "block";
  document.getElementById("name-error").textContent = "-Please Enter A Name-";
  return false;
} else if (!filter_name.test(name) || name == 0) {
  document.getElementById("name-error").style.display = "block";
  document.getElementById("name-error").textContent = "-Please Enter A Valid Name-";
  return false;
} else {
  document.getElementById("name-error").style.display = "none";
}
if (email == "" || email == null) {
  document.getElementById("email-error").style.display = "block";
  document.getElementById("email-error").textContent = "-Please Filled-";
  return false;
} else if (!filter_email.test(email)) {
  document.getElementById("email-error").style.display = "block";
  document.getElementById("email-error").textContent = "-Please Enter Valid Email-";
  return false;
} else {
  document.getElementById("email-error").style.display = "none";
}
if (username == "" || username == null) {
  document.getElementById("user-error").style.display = "block";
  document.getElementById("user-error").innerHTML = "-Please Filled-";
  return false;
} else if (!filter_username.test(username) || username == 0) {
  document.getElementById("user-error").style.display = "block";
  document.getElementById("user-error").innerHTML = "-Please Enter Valid Username-";
  return false;
} else {
  document.getElementById("user-error").style.display = "none";
}
if (password == "" || password == null) {
  document.getElementById("pass-error").style.display = "block";
  document.getElementById("pass-error").innerHTML = "-Please Filled-";
  return false;
} else if (!filter_password.test(password)) {
  document.getElementById("pass-error").style.display = "block";
  document.getElementById("pass-error").innerHTML ="-Please Enter Valid Password-";
  return false;
} else {
  document.getElementById("pass-error").style.display = "none";
}
}
