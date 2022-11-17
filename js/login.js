"use strict";

const baseUrl = "https://n36-todolist.herokuapp.com";
const loginForm = document.querySelector("#login");
const modalToast = document.querySelector(".modal-toast");

const auth = () => {
  const userRegName = document.querySelector("#userLogName");
  userRegName.value.trim();
  const userRegPassword = document.querySelector("#userLogPassword");
  userRegPassword.value.trim();

  const params = {
    login: userRegName.value,
    password: userRegPassword.value,
  };
  console.log(params);
  fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.message) {
        modalToast.innerHTML = `<strong>LOGIN OR PASSWORD IS INCORRECT :)</strong>`;
        modalToast.classList.remove("hide-toast");
        setTimeout(() => {
          modalToast.classList.add("hide-toast");
          window.location.reload();
        }, 2000);
      }
      if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("userName", params.login)
        modalToast.innerHTML = `<strong>SUCCESSFULLY LOGINED</strong>`;
        modalToast.classList.remove("alert-danger");
        modalToast.classList.add("alert-success");
        modalToast.classList.remove("hide-toast");
        setTimeout(() => {
          modalToast.classList.add("hide-toast");
          window.location.replace("index.html");
        }, 2000);
      }
    });
};

loginForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  auth();
});
