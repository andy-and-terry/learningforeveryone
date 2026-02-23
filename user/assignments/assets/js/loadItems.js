/*
This is used to load projects
on index.html
*/
const BASE = "projects/"; //projects directory
fetch(BASE + "projects.json") //fetch allprojects json
  .then(res => res.json())
  .then(files => {
    const feed = document.getElementById("feed"); //HTML cards
    files.forEach(file => {
      fetch(BASE + file)
        .then(r => r.json())
        .then(p => {
          feed.innerHTML += `
            <div class="card">
              <img src="${p.thumbnail}">
              <h3>${p.title}</h3>
              <p>${p.description}</p>
              <small>By ${p.author}</small><br>
              <a href="view.html?file=${file}">Open</a>
            </div>
          `;
        });
    });
  });
