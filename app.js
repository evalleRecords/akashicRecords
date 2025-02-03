
// app.js
document.addEventListener("DOMContentLoaded", function() {
    const notesContainer = document.getElementById("notes-container");

    // Example notes
    const notes = [
        { title: "Note 1", content: "This is the first note." },
        { title: "Note 2", content: "This is the second note." },
        { title: "Note 3", content: "This is the third note." }
    ];

    notes.forEach(note => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note");

        const title = document.createElement("h2");
        title.textContent = note.title;

        const content = document.createElement("p");
        content.textContent = note.content;

        noteElement.appendChild(title);
        noteElement.appendChild(content);

        notesContainer.appendChild(noteElement);
    });
});
