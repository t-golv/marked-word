const upload = document.getElementById("file-upload");

upload.addEventListener("change", (e) => {
  const fileName = e.target.files[0].name;
  // console.log(e.target);
  console.log(Date.now());
  saveToLocal(fileName, e.target.files[0].lastModified);
});
function getRecentFromStorage() {
  let getStorage = window.localStorage.getItem("recent-files");
  let recentContainer = document.querySelector(".recent-container");
  if (getStorage && getStorage != "[]") {
    recentContainer.innerHTML = `
    <div class="item recent-header">
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
      ${el.filename}
      </h3>
      <h3>${new Date(el.date).toLocaleString({
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "2-digit",
      })}</h3>`;
      recentContainer.appendChild(item);
    });
  } else {
    recentContainer.innerHTML = `
    <div class="item recent-header">
          <h3>
            <div class="icon"><img src="assets/file.svg" alt=""></div>
            Name:</h3>
          <h3>Last time:</h3>
    </div>
    <div class="item">
    <h3>
      No files yet...</h3>
  </div>
    `;
  }
}
getRecentFromStorage();

function saveToLocal(fileName, time) {
  let getStorage = window.localStorage.getItem("recent-files");
  let newRecentFiles = { filename: fileName, date: time };
  if (getStorage) {
    let storage = JSON.parse(getStorage);
    // console.log(storage);
    storage = storage.filter((el) => {
      return el.filename != newRecentFiles.filename;
    });
    console.log("storage: ", storage);
    storage.unshift(newRecentFiles);
    window.localStorage.setItem("recent-files", JSON.stringify(storage));
  } else {
    getStorage = [];
    getStorage.unshift(newRecentFiles);
    window.localStorage.setItem("recent-files", JSON.stringify(getStorage));
  }
  // window.location.reload();
}
