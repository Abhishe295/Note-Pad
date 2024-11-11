const addbox = document.querySelector(".wrapper .add-box i"),
popupBox = document.querySelector(".pop-up"),
wrapper = document.querySelector(".add-box"),
content = document.querySelector(".pop-up .content header p"),
closeIcon = document.querySelector(".pop-up .content header i"),
titleTag = document.querySelector(".pop-up .content main input"),
boxup = document.querySelector(".box-up"),
descTag = document.querySelector(".pop-up .content main textarea"),
addBtn = document.querySelector(".pop-up .content footer button");
const months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"];
// getting local storage notes if exist and parsing them
// to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addbox.addEventListener("click" , ()=>{
    popupBox.classList.add("show");
    titleTag.focus()
    
})
closeIcon.addEventListener("click" , ()=>{
    isUpdate = false;
    titleTag.value = '';
    descTag.value = '';
    addBtn.innerHTML = "Add Note"
    content.innerHTML = "Add a new Note"
    popupBox.classList.remove("show");
});
function showNotes(){
    // document.querySelectorAll(".real-contents").forEach(real_content => real_content.remove());
    document.querySelectorAll(".real-contents").forEach(realContent => realContent.remove());
    notes.forEach((note, index) =>{
        console.log(note);
        let liTag = `<div class="real-contents">
            <header>
                <p id="title">${note.title}</p>
            </header>
            <main>
                <p id="desc">${note.description}</p>
            </main>
            <footer>
                <p>${note.date}</p>
                <i onclick="showMenu(event)" class="fa-solid fa-ellipsis"></i>
                <div class="box-up">
            <div class="edit">
            <i onclick = "updateNotes(${index},'${note.title}' , '${note.description}')" class="fa-solid fa-pen-to-square">edit</i>
            
            </div>
            <div class="delete">
            <i onclick="deleteNote(${index})" class="fa-solid fa-trash">Delete</i>
            
            </div>
        </div>
            </footer>
            
        </div>
        `
        wrapper.insertAdjacentHTML("afterend" , liTag);
    })
}
// showNotes();
// function showMenu(){
//     boxup.classList.add("show")
// }
function showMenu(event) {
    // Find the closest box-up from the clicked ellipsis icon
    const boxUp = event.target.closest('.real-contents').querySelector('.box-up');
    // Toggle the show class
    boxUp.classList.toggle("show");
    document.addEventListener("click" , e =>{
        if(e.target.tagName != "I" || e.target != elem ){
            boxUp.classList.remove("show")
        }
    })
}
function deleteNote(noteId){
    let confirmDel = confirm("Are you sure you want to delete this note?");
    if(!confirmDel) return;
    console.log(noteId);
    notes.splice(noteId,1);
    // saving to lacal storage
    localStorage.setItem("notes", JSON.stringify(notes));
    // const boxUp = document.querySelector(".box-up")
    showNotes();
    // boxUp.classList.remove("show")
}
function updateNotes(noteId , title , desc){
    updateId = noteId;
    isUpdate = true;
    addbox.click();
    titleTag.value = title;
    descTag.value = desc;
    addBtn.innerHTML = "Update Note"
    content.innerHTML = "Update a Note"
    console.log(noteId,title,desc)
}
showNotes();

addBtn.addEventListener("click" , ()=>{
    let noteTitle = titleTag.value;
    let noteDesc = descTag.value;
    if (noteDesc || noteTitle){
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title : noteTitle , description: noteDesc , date: `${month} ${day}, ${year}`
        }
        console.log(noteInfo)
        if(!isUpdate){
            notes.push(noteInfo);
        } else{
            isUpdate = false;
            notes[updateId]  = noteInfo
        }
        // notes.push(noteInfo);
        // saving to lacal storage
        localStorage.setItem("notes", JSON.stringify(notes));
        closeIcon.click();
        showNotes();

    }
    else{
        closeIcon.click();
    }
    
});
