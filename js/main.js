"use strict";
const baseUrl = "http://localhost:8883/users";
const tBody = document.querySelector(".t-body");
const sendForm = document.querySelector("#sendForm");
const elToastify = document.querySelector(".toastify");
const elAddButton = document.querySelector("#add-button");
const sendFormEdit = document.querySelector("#sendFormEdit");

// GET USER LIST ----------------------------------------------------------------------------------------
function getUser() {
  fetch(`${baseUrl}`)
    .then((response) => response.json())
    .then((result) => renderUsers(result))
    .catch((error) => console.log(error));
}
getUser();
// GET USER LIST FINISHED --------------------------------------------------------------------------------
// RENDER FUNCTION ---------------------------------------------------------------------------------------

function renderUsers(data = []) {
  data.length > 0
    ? data.forEach((user) => {
        const tr = createElement(
          "tr",
          "item",
          `<td>${user.id}</td>
      <td>${user.user_name}</td>
      <td>${user.user_score}</td>
      <td><button class="btn btn-primary w-100" data-bs-toggle="modal" data-bs-target="#exampleModal" data-edit=${user.id}>EDIT</button></td>
      <td><button class="btn btn-danger w-100" data-del=${user.id}>DELETE</button></td>`
        );

        tBody.append(tr);
      })
    : (tBody.innerHTML = "DATA IS EMPTY");
}
// RENDER FUNCTION  FINISHED -------------------------------------------------------------------------
// POST METHOD ---------------------------------------------------------------------------------------
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
    elAddButton.textContent = `adding ${userName.value}`;

    elToastify.style.backgroundColor = "lime";
    elToastify.innerHTML = `<h5>Muvaffaqiyatli qo'shildi ! </h5>`;
    elToastify.style.transform = "translateX(0)";
    setTimeout(() => {
      elToastify.style.transform = "translateX(200%)";

      fetch(`${baseUrl}`, {
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
// POST METHOD FINISHED ---------------------------------------------------------------------------------
// DELETE FUNCTION --------------------------------------------------------------------------------
tBody.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("btn-danger")) {
    let id = evt.target.getAttribute("data-del");
    deleteUser(id);
  }
});

const deleteUser = (id) => {
  elToastify.style.transform = "translateX(0)";
  elToastify.style.backgroundColor = "yellow";

  setTimeout(() => {
    elToastify.style.transform = "translateX(200%)";
    fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
  }, 2000);
};
// DELETE FUNCTION FINISHED ---------------------------------------------------------------------
// EDIT FUNCTION --------------------------------------------------------------------------------
const userNameInputId = document.querySelector("#user_nameEdit");
userNameInputId.value.trim();
const userScoreInputId = document.querySelector("#user_scoreEdit");
userScoreInputId.value.trim();
const editButtonForm = document.querySelector("#add-buttonEdit")

tBody.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("btn-primary")) {
    let id = evt.target.getAttribute("data-edit");
    localStorage.setItem("editUser", id);

    fetch(`${baseUrl}/${id}`)
      .then((res) => res.json())
      .then((result) => setValue(result))
      .catch((err) => console.log(err));
  }
});

const updateUser = () => {
  let id = localStorage.getItem("editUser");

  let newUser = userNameInputId;
  let newScore = userScoreInputId;

  if (newUser.value.length === 0 || newScore.value.length === 0) {
    elToastify.style.backgroundColor = "red";
    elToastify.innerHTML = `<h5>Ma'lumot yetarli emas!</h5>`;
    elToastify.style.transform = "translateX(0)";

    setTimeout(() => {
      elToastify.style.transform = "translateX(200%)";
    }, 1500);
  } else {
    editButtonForm.disabled = true;
    editButtonForm.textContent = "editing...";

    elToastify.style.backgroundColor = "lime";
    elToastify.innerHTML = `<h6>Muvaffaqiyatli o'zgartirildi ! </h6>`;
    elToastify.style.transform = "translateX(0)";

    setTimeout(() => {
      elToastify.style.transform = "translateX(200%)";

      fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_name: newUser.value,
          user_score: newScore.value,
        }),
      });
      editButtonForm.disabled = false;
    }, 1500);
  }
};

sendFormEdit.addEventListener("submit", () => {
  updateUser();
});

function setValue(data) {
  userNameInputId.value = data.user_name;
  userScoreInputId.value = data.user_score;
}
// EDIT FUNCTION FINISHED -----------------------------------------------------------------------
