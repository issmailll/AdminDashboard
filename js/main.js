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

  if (userName.length === 0 || userScore.length === 0) {
    alert("please fill in the user name and score");
  } else {
    fetch("http://localhost:8883/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_name: userName.value,
        user_score: +userScore.value,
      }),
    });
  }
};
sendForm.addEventListener("submit", () => {
  addUser();
});
