"use strict";
const baseUrl = "https://n36-todolist.herokuapp.com";
const regForm = document.querySelector("#reg");
const modalToast = document.querySelector(".modal-toast");

const registration = () => {
  const userRegName = document.querySelector("#userRegName");
  userRegName.value.trim();
  const userRegPassword = document.querySelector("#userRegPassword");
  userRegPassword.value.trim();

  const params = {
    userName: userRegName.value,
    userPassword: userRegPassword.value,
  };
  console.log(params);
  fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      if (res.message) {
        modalToast.innerHTML = `<strong>${res.message}</strong>`;
        modalToast.classList.remove("hide-toast");
        setTimeout(() => {
          modalToast.classList.add("hide-toast");
        }, 2000);
      }
      if (res.token) {
        modalToast.innerHTML = `<strong>SUCCESSFULLY REGISTERED</strong>`;
        modalToast.classList.remove("alert-danger");
        modalToast.classList.add("alert-success");
        modalToast.classList.remove("hide-toast");
        setTimeout(() => {
          modalToast.classList.add("hide-toast");
          window.location.replace("login.html")
        }, 2000);
      }
    });
};

regForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  registration();
});