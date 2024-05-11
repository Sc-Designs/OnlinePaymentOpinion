document.querySelector("#pencil").addEventListener("click", function () {
  document.querySelector("#uploadform input").click();
});
document.querySelector("#uploadform input").addEventListener("change", function () {
    document.querySelector("#uploadform").submit();
});
var editName = document.querySelector("#edit-name");
editName.addEventListener("click", function () {
  document.querySelector("#edit-area").style.scale = "1";
});
document.querySelector("#close").addEventListener("click", function () {
  document.querySelector("#edit-area").style.scale = "0";
});
var validupdate = () => {
  var name = document.querySelector("#name").value.trim();
  let filter_name = /^([a-zA-Z]{2,25}\s[a-zA-Z]{2,25})+$/;

  if (name == "" || name == null) {
    document.getElementById("name-error").style.display = "block";
    document.getElementById("name-error").textContent = "-Please Enter A Name-";
    return false;
  } else if (!filter_name.test(name) || name == 0) {
    document.getElementById("name-error").style.display = "block";
    document.getElementById("name-error").textContent =
      "-Please Enter A Valid Name-";
    return false;
  } else {
    document.getElementById("name-error").style.display = "none";
  }
};