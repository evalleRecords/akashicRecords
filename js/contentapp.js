function handleClick(element) {
    alert("You clicked: " + element.innerText);
}

const notepad = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

// Load saved content from localStorage
const savedContent = localStorage.getItem('savedContent');
if (savedContent) {
    notepad.innerHTML = savedContent; // Restore the saved HTML content
}

// Save the content to localStorage
saveBtn.addEventListener('click', function() {
    const content = notepad.innerHTML; // Get the inner HTML (with images, formatting)
    localStorage.setItem('savedContent', content);
    alert('Notes saved!');
});

// Clear the content and localStorage
clearBtn.addEventListener('click', function() {
    if (confirm('Are you sure you want to clear all content?')) {
        notepad.innerHTML = ''; // Clear the content
        localStorage.removeItem('savedContent'); // Remove saved content from localStorage
    }
});