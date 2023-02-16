let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  fetch("http://localhost:3000/toys")
    .then((resp) => resp.json())
    .then((obj) => {
      obj.forEach((e) => {
        let toyCard = document.createElement("div");
        toyCard.className = "card";
        toyCard.innerHTML = `<h2>${e.name}</h2>
        <img class="toy-avatar" src=${e.image} />
        <p>${e.likes} likes</p>
        <button class="like-btn" id=${e.id}>Like ❤️</button>`
        toyCard.addEventListener("click", function() {
          let likeObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": `${e.likes++}`
            })
          }
          fetch(`http://localhost:3000/toys/${e.id}`, likeObj)
            .then((resp) => resp.json())
            .then((object) => {
              toyCard.querySelector("p").textContent = `${object.likes} likes`
            })
        })
        document.getElementById("toy-collection").appendChild(toyCard);
      })
    })
});

let form = document.querySelector("form");
let submit = document.querySelector(".submit");

function postForm() {  
  let nameInput = document.querySelectorAll(".input-text")[0];
  let imgInput = document.querySelectorAll(".input-text")[1];
  let toyObject = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": nameInput.value,
      "image": imgInput.value,
      "likes": 0
    })
  }
  fetch("http://localhost:3000/toys", toyObject)
    .then((resp) => resp.json())
    .then((e) => {
      let toyCard = document.createElement("div");
        toyCard.className = "card";
        toyCard.innerHTML = `<h2>${e.name}</h2>
        <img class="toy-avatar" src=${e.image} />
        <p>${e.likes} likes</p>
        <button class="like-btn" id=${e.id}>Like ❤️</button>`
        toyCard.addEventListener("click", function() {
          let likeObj = {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            },
            body: JSON.stringify({
              "likes": `${e.likes++}`
            })
          }
          fetch(`http://localhost:3000/toys/${e.id}`, likeObj)
            .then((resp) => resp.json())
            .then((object) => {
              toyCard.querySelector("p").textContent = `${object.likes} likes`
            })
        })
        document.getElementById("toy-collection").appendChild(toyCard);
    })
}

submit.addEventListener("click", (e) => {
  e.preventDefault();
  postForm();
});