const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

addNoteBtn.addEventListener("click", () => {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
    <textarea rows="5" placeholder="Write your note here..."></textarea>`;
    note.addEventListener("dblclick", () => {
        note.remove();
    });


    notesContainer.prepend(note);
});
