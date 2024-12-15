document.addEventListener("DOMContentLoaded", function () {
  const p = document.querySelector("#email_text").value;
  const span = document.querySelector("#Email");
  const reSend = document.querySelector("#reSend");

  function email() {
    if (p.includes("@")) {
      const [localPart, domain] = p.split("@"); // Split email into local part and domain
      let star = "";
      for (var i = 3; i < localPart.length; i++) {
        star += "*";
      }
      const maskedEmail = `${localPart.slice(0, 3)}${star}${domain}`;
      span.textContent = maskedEmail;
    } else {
      span.textContent = "Invalid email format";
    }
  }

  email();

  let countdown = 60;
  let timer = document.getElementById("timer");
  let interval = setInterval(function () {
    reSend.style.backgroundColor = "grey";
    reSend.style.pointerEvents = "none";
    countdown--;
    timer.textContent = `0${Math.floor(countdown / 60)}:${
      countdown % 60 < 10 ? "0" : ""
    }${countdown % 60}`;
    if (countdown <= 0) {
      reSend.style.backgroundColor = "orangered";
      reSend.style.pointerEvents = "auto";
      clearInterval(interval);
    }
  }, 1000);

  function OTPInput() {
    const inputs = document.querySelectorAll("#otp > *[id]");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
          inputs[i].value = "";
          if (i !== 0) inputs[i - 1].focus();
        } else {
          if (i === inputs.length - 1 && inputs[i].value !== "") {
            return true;
          } else if (event.keyCode > 47 && event.keyCode < 58) {
            inputs[i].value = event.key;
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          } else if (event.keyCode > 64 && event.keyCode < 91) {
            inputs[i].value = String.fromCharCode(event.keyCode);
            if (i !== inputs.length - 1) inputs[i + 1].focus();
            event.preventDefault();
          }
        }
      });
    }
  }
  OTPInput();

  // Capture OTP from individual fields into a hidden input
  document.getElementById("otp-form").addEventListener("submit", function (e) {
    const otpValue = Array.from(document.querySelectorAll("#otp > *[id]"))
      .map((input) => input.value)
      .join("");
    document.getElementById("otp-hidden").value = otpValue;
  });
});
