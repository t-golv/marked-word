const upload = document.getElementById("file-upload");
let footer = document.querySelector(".footer");
let recentContainer = document.querySelector(".recent-container");
let newfilebtn = document.querySelector(".newFile");

function refreshDate() {
  let el = document.getElementById("date-foot");
  el.innerText = new Date().toLocaleString();
  footer.appendChild(el);
}
function getRecentFromStorage() {
  let getStorage = window.localStorage.getItem("recent-files");
  if (getStorage && getStorage != "[]") {
    recentContainer.innerHTML = `
    <div class=" recent-header">
    <h3>
      <div class="icon"><img src="assets/file.svg" alt=""></div>
      Name:</h3>
      <h3>Last time:</h3>
    </div>`;
    JSON.parse(getStorage).forEach((el) => {
      const item = document.createElement("div");
      item.classList.add("item");
      item.innerHTML = `
      <h3>
      <img src="assets/txt.svg" alt="">
      <strong >${el.filename}</strong>
      </h3>
      <h3>${new Date(el.date).toLocaleString({
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "2-digit",
      })}</h3>`;
      item.addEventListener("click", (e) => {
        window.localStorage.setItem("open-file", JSON.stringify(el));
        window.location.href = "./pages/app.html";
      });
      recentContainer.appendChild(item);
    });
  } else {
    recentContainer.innerHTML = `
    <div class=" recent-header">
          <h3>
            <div class="icon"><img src="assets/file.svg" alt=""></div>
            Name:
          </h3>
          <h3>Last time:</h3>
    </div>
    <div class="item">
    <h3>
      No files yet...</h3>
  </div>
    `;
  }
}
function saveToLocal(fileName, time, content = "") {
  let getStorage = window.localStorage.getItem("recent-files");
  let newRecentFiles = { filename: fileName, date: time, content: content };
  if (getStorage && JSON.parse(getStorage).length < 8) {
    let storage = JSON.parse(getStorage);
    storage = storage.filter((el) => {
      return el.filename != newRecentFiles.filename;
    });
    storage.unshift(newRecentFiles);
    window.localStorage.setItem("recent-files", JSON.stringify(storage));
  } else if (getStorage && JSON.parse(getStorage).length >= 8) {
    let storage = JSON.parse(getStorage);
    storage = storage.filter((el) => {
      return el.filename != newRecentFiles.filename;
    });
    storage.pop();
    storage.unshift(newRecentFiles);
    window.localStorage.setItem("recent-files", JSON.stringify(storage));
  } else {
    getStorage = [];
    getStorage.unshift(newRecentFiles);
    window.localStorage.setItem("recent-files", JSON.stringify(getStorage));
  }
  // window.location.reload();
}
newfilebtn.addEventListener("click", (e) => {
  window.localStorage.setItem(
    "open-file",
    JSON.stringify({
      filename: "untitled.txt",
      content: "Put your content here",
    })
  );
  window.location.href = "./pages/app.html";
});
upload.addEventListener("change", (e) => {
  const fileName = e.target.files[0].name;
  if (e.target.files[0].size < 10000) {
    let fr = new FileReader();
    fr.onload = function () {
      saveToLocal(fileName, e.target.files[0].lastModified, fr.result);
      getRecentFromStorage();
    };
    console.log(fr.readAsText(e.target.files[0]));
  } else {
    alert("File has to be less than 10kb");
  }
});
getRecentFromStorage();
refreshDate();
