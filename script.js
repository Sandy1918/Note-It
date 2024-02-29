let contentPlace = document.querySelector(".formClass");
let image = document.querySelector(".image");
let newContent = document.querySelector(".buttonTwo");
let deleteAllContent = document.querySelector(".buttonOne");
let noteSaver = document.querySelector("aside");
let bodyContent = document.querySelector(".bodyContent");

let notesList = [];
let permittedValues = [];
let editId;

function renderNotesFromLocalStorage() {
  if (localStorage.getItem("notesList")) {
    notesList = JSON.parse(localStorage.getItem("notesList"));
    console.log(permittedValues);
    permittedValues = notesList.map((value) => value.uniqueId);
    notesList.forEach((note) => {
      renderNoteList(note, note.uniqueId);
    });
  }
}

contentPlace.style.display = "none";

image.addEventListener("click", (e) => {
  e.preventDefault();
  contentCreate();
  renderNotesFromLocalStorage();
});

newContent.addEventListener("click", (e) => {
  e.preventDefault();
  contentCreate();
});

let contentCreate = () => {
  image.style.display = "none";
  contentPlace.style.display = "block";
  contentPlace.innerHTML = `<div class="inputForm">
       <h2>Add Your Note</h2>
       <div class="createNote">
       <input
        type="text"
        id="createNoteTitle"
        placeholder="Write your title"
       />
        <textarea
        id="createNoteContent"
        name=""
        id=""
        cols="30"
        rows="10"
      ></textarea>
    </div>
    <button class="addNote">Add Note</button>
  </div>`;
  let inputForm = document.querySelector(".inputForm");

  document.querySelector(".addNote").addEventListener("click", () => {
    formValidation();
  });
  deleteAllContent.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".result").forEach((note) => note.remove());
    localStorage.clear();
    //contentPlace.innerHTML = "";
    contentPlace.style.display = "none";
    image.style.display = "block";
  });
};

let formValidation = () => {
  let uniqueId;
  if (permittedValues.includes(editId)) {
    uniqueId = editId;
    deleteSingleNote(uniqueId);
  } else {
    uniqueId = "note" + Math.floor(Math.random() * 1000);
  }
  editId = "";
  let titleValue = document.querySelector("#createNoteTitle").value;
  let contentValue = document.querySelector("#createNoteContent").value;
  if (titleValue === "" || contentValue === "") {
    alert("Please the title/content in-order to make a note ");
  } else {
    let note = {
      title: titleValue,
      content: contentValue,
    };
    permittedValues.push(uniqueId);
    permittedValues = [...new Set(permittedValues)];
    console.log(permittedValues);
    addANoteToLocalStorage(note, uniqueId);
    renderNoteList(note, uniqueId);
  }
};

let renderNoteList = function (note, uniqueId) {
  let noteDiv = document.createElement("div");
  noteDiv.classList.add("result", uniqueId);
  let pin = document.createElement("p");
  let headingFour = document.createElement("h4");
  let para = document.createElement("p");
  para.classList.add("paragraph");
  let buDiv = document.createElement("div");
  let del = document.createElement("button");
  del.classList.add("delSingle");
  let edt = document.createElement("button");
  edt.classList.add("edtSingle");
  pin.innerText = "📌";
  headingFour.innerText = note.title;
  para.innerText = note.content;
  del.innerText = "Delete";
  edt.innerText = "Edit";
  noteDiv.append(pin);
  noteDiv.append(headingFour);
  noteDiv.append(para);
  buDiv.append(del);
  buDiv.append(edt);
  noteDiv.append(buDiv);
  noteSaver.append(noteDiv);

  del.addEventListener("click", () => {
    deleteSingleNote(uniqueId);
  });
  edt.addEventListener("click", () => {
    editSingleNote(uniqueId);
  });
  document.querySelector("#createNoteTitle").value = "";
  document.querySelector("#createNoteContent").value = "";
};
function editSingleNote(uniqueId) {
  editId = uniqueId;
  let id = document.querySelector("." + uniqueId);
  let editTitle = id.querySelector("h4");
  let editContent = id.querySelector(".paragraph");
  document.querySelector("#createNoteTitle").value = editTitle.innerText;
  document.querySelector("#createNoteContent").value = editContent.innerText;
}

function deleteSingleNote(uniqueId) {
  let id = document.querySelector("." + uniqueId);
  id.remove();
  notesList = JSON.parse(localStorage.getItem("notesList"));
  let index = notesList.findIndex((note) => note.uniqueId == uniqueId);
  notesList.splice(index, 1);
  localStorage.setItem("notesList", JSON.stringify(notesList));
}

function addANoteToLocalStorage(note, uniqueId) {
  note = { ...note, uniqueId };
  notesList.push(note);
  localStorage.setItem("notesList", JSON.stringify(notesList));
}
