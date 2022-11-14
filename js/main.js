"use strict";

function getUser() {
  fetch("http://localhost:8883/users")
    .then((response) => response.json())
    .then((result) => renderUsers(result))
    .catch((error) => console.log(error));
}
getUser();

const tBody = document.querySelector(".t-body");
const sendForm = document.querySelector("#sendForm");
const elToastify = document.querySelector(".toastify");
const elAddButton = document.querySelector("#add-button");

function renderUsers(data = []) {
  data.length > 0
    ? data.forEach((user) => {
        const tr = createElement(
          "tr",
          "item",
          `<td>${user.id}</td>
      <td>${user.user_name}</td>
      <td>${user.user_score}</td>
      <td><button class="btn btn-primary data-edit = ${user.id} w-100">EDIT</button></td>
      <td><button class="btn btn-danger data-del = ${user.id} w-100">DELETE</button></td>`
        );

        tBody.append(tr);
      })
    : (tBody.innerHTML = "DATA IS EMPTY");
}

const addUser = () => {
  const userName = document.querySelector("#user_name");
  userName.value.trim();

  const userScore = document.querySelector("#user_score");
  userScore.value.trim();

  if (userScore.value.length === 0 || userName.value.length === 0) {
    elToastify.style.backgroundColor = "red";
    elToastify.innerHTML = `<h5>Ma'lumot yetarli emas ! </h5>`;
    elToastify.style.transform = "translateX(0)";
    setTimeout(() => {
      elToastify.style.transform = "translateX(200%)";
    }, 1500);
  } else {
    elAddButton.disabled = true;

    elToastify.style.backgroundColor = "lime";
    elToastify.innerHTML = `<h5>Muvaffaqiyatli qo'shildi ! </h5>`;
    elToastify.style.transform = "translateX(0)";
    setTimeout(() => {
      elToastify.style.transform = "translateX(200%)";

      fetch("http://localhost:8883/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_name: userName.value,
          user_score: +userScore.value,
        }),
      });
      elAddButton.disabled = false;
    }, 2000);
  }
};
sendForm.addEventListener("submit", () => {
  addUser();
});
