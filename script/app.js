let txtarea = document.getElementById("txtarea");
let mainContainer = document.querySelector(".main-container");
let downloadEl = document.getElementById("downloadA");
let tools = document.querySelectorAll(".btn-tool");
let convert = document.querySelector(".btn-convert");
let selected = null;
let selectValue = "";
let isSelectedTxd = false;
function clearSimilar(el) {
  if (el.classList.contains("align-tools")) {
    let alignTools = document.querySelectorAll(".align-tools");
    alignTools.forEach((tool) => tool.classList.remove("active"));
  }
}
function handleTool(action, el) {
  switch (action) {
    case "center":
      mainContainer.style.textAlign = "center";
      txtarea.style.textAlign = "center";
      el.classList.add("active");
      break;
    case "right":
      mainContainer.style.textAlign = "right";
      txtarea.style.textAlign = "right";
      el.classList.add("active");
      break;
    case "left":
      mainContainer.style.textAlign = "left";
      txtarea.style.textAlign = "left";
      el.classList.add("active");
      break;
    case "justify":
      mainContainer.style.textAlign = "justify";
      txtarea.style.textAlign = "justify";
      el.classList.add("active");
      break;
    case "bold":
      if (isSelectedTxd) {
        window.getSelection().empty();
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `**${selected}**`;
        txtarea.value = txtarea.value.replace(selected, newSelected);
      }
      break;
    case "h1":
      if (isSelectedTxd) {
        window.getSelection().empty();
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `# ${selectValue}`;
        txtarea.value = replaceString(
          selected.target.value,
          selected.target.selectionStart,
          selected.target.selectionEnd,
          newSelected
        );
      }
      break;
    case "h2":
      if (isSelectedTxd) {
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `## ${selectValue}`;
        txtarea.value = replaceString(
          selected.target.value,
          selected.target.selectionStart,
          selected.target.selectionEnd,
          newSelected
        );
      }
      break;
    case "h3":
      if (isSelectedTxd) {
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `### ${selectValue}`;
        txtarea.value = replaceString(
          selected.target.value,
          selected.target.selectionStart,
          selected.target.selectionEnd,
          newSelected
        );
      }
      break;
    case "list-ul":
      if (isSelectedTxd) {
        window.getSelection().empty();
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `- ${selectValue}`;
        txtarea.value = replaceString(
          selected.target.value,
          selected.target.selectionStart,
          selected.target.selectionEnd,
          newSelected
        );
      }
      break;
    case "list-ol":
      if (isSelectedTxd) {
        window.getSelection().empty();
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `1. ${selectValue}`;
        txtarea.value = replaceString(
          selected.target.value,
          selected.target.selectionStart,
          selected.target.selectionEnd,
          newSelected
        );
      }
      break;
    case "quote":
      if (isSelectedTxd) {
        window.getSelection().empty();
        el.classList.add("active");
        setTimeout(() => {
          el.classList.remove("active");
        }, 500);
        let newSelected = `> ${selectValue}`;
        txtarea.value = replaceString(
          selected.target.value,
          selected.target.selectionStart,
          selected.target.selectionEnd,
          newSelected
        );
      }
      break;
  }
  if (isSelectedTxd) {
    disableBtn();
  }
  return action;
}
function replaceString(str, selectStart, selectEnd, replacementStr) {
  return (
    str.slice(0, selectStart) +
    replacementStr +
    str.slice(selectEnd, str.length)
  );
}
function disableBtn() {
  window.getSelection().removeAllRanges();
  isSelectedTxd = false;
  tools.forEach((tool) => {
    if (!tool.classList.contains("align-tools")) {
      tool.classList.add("disabled");
    }
  });
}
downloadEl.addEventListener("click", () => {
  let fileToOpen = window.localStorage.getItem("open-file");
  fileToOpen = JSON.parse(fileToOpen);
  downloadEl.href =
    "data:text/plain;charset=utf-8," + encodeURIComponent(txtarea.value);
  downloadEl.setAttribute[("download", `untitle.txt`)];
});
txtarea.addEventListener("select", (e) => {
  isSelectedTxd = true;
  selected = e;
  selectValue = selected.target.value.substring(
    selected.target.selectionStart,
    selected.target.selectionEnd
  );
  tools.forEach((tool) => {
    if (!tool.classList.contains("align-tools")) {
      tool.classList.remove("disabled");
    }
  });
});
convert.addEventListener("click", (e) => {
  mainContainer.innerHTML = marked.parse(txtarea.value, { breaks: true });
  mainContainer.classList.toggle("hidden");
  txtarea.classList.toggle("hidden");
  if (mainContainer.classList.contains("hidden")) {
    convert.innerHTML = "<h3>Convert</h3>";
    convert.style.backgroundColor = "var(--blue)";
  } else {
    convert.style.backgroundColor = "var(--red)";
    convert.innerHTML = "<h3>Edit</h3>";
  }
});
function loadOpened() {
  let fileToOpen = window.localStorage.getItem("open-file");
  if (fileToOpen) {
    let headerText = document.querySelector(".main-text");
    fileToOpen = JSON.parse(fileToOpen);
    txtarea.value = fileToOpen.content;
    document.title = fileToOpen.filename.slice(0, -4).toUpperCase();
    headerText.innerText = fileToOpen.filename.slice(0, -4).toUpperCase();
    tools.forEach((tool) => {
      tool.addEventListener("click", (e) => {
        if (tool.attributes[1].value == "bold") {
          boldBtn = tool;
        }
        clearSimilar(tool);
        handleTool(tool.attributes[1].value, tool);
      });
    });
  }
}
loadOpened();
