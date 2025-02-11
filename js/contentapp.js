const pagesData = {
    'NOTES': {
        sidebar: {
            'Test station': '',
            'Signal generator': '',
            'Vector Network Analyzer': '',
            'Spectrum Analyzer': '',
            'S-Parameters': '',
            'RF Basics': '',
            'Signals and decibel': '',
            'Circulator, Isolator and Coupler': '',
            'Design Pattern': '',
            'Architecture': '',
            'Object Oriented Programming': '',
            'C++': '',
            'Python': '',
            'HTML': '',
            'JavaScript': '',
            'CSS': '',
            'Useful ETSW info': '',
            'Useful TERM command': ''
        }
    },
    'Test Setup': {
        sidebar: {
            'Console App': '',
            'FAAP proxy client': '',
            'GRPC FAAP proxy': '',
            'Power supply control': '',
            'Spectrum Analyzer control': ''
        }
    },
    'Links': {
        sidebar: {
            'Jenkins': '',
            'Gerrit': '',
            'Implementation Specification': '',
            '1524 requirement description': '',
            'Abbreviations and links': ''
        }
    },
    'To-doList': {
        sidebar: {
            'To-do-List': ''
        }
    }
};

let currentPage = 'NOTES'; // Default sidebar category
let currentSidebarItem = null; // Track selected sidebar item
const sidebarContainer = document.getElementById('sidebar-container');
const pageTabsContainer = document.getElementById('page-tabs');
const mainContent = document.getElementById('notepad-container');
const notepad = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');

function switchPage(page) {
    currentPage = page;

    if (page === 'Test Setup') {
        updateSidebarTestSetup(page);
        if (notepad) notepad.style.display = 'none'; 
        if (saveBtn) saveBtn.style.display = 'none'; 
        if (clearBtn) clearBtn.style.display = 'none'; 
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.innerHTML = ''; // Clear any previous content from other tabs
        }
    } else {
        updateSidebar(page);
        if (notepad) notepad.style.display = 'block'; 
        if (saveBtn) saveBtn.style.display = 'block'; 
        if (clearBtn) clearBtn.style.display = 'block'; 
        if (mainContent) {
            mainContent.style.display = 'block'; // Ensure main content is visible
            mainContent.innerHTML = ''; // Reset content when switching back
            mainContent.appendChild(notepad); // Show the notepad again
            mainContent.appendChild(saveBtn); // Show the notepad again
            mainContent.appendChild(clearBtn); // Show the notepad again
        }
    }
    updateTabStyles();
}


// Function to update sidebar for "Test Setup" and display buttons in the main content
function updateSidebarTestSetup(page) {
    if (!sidebarContainer) return;
    sidebarContainer.innerHTML = '';
    const sidebarItems = Object.keys(pagesData[page].sidebar);
    const scrollBox = document.createElement('div');
    scrollBox.classList.add('scroll-box');

    sidebarItems.forEach(item => {
        const sidebarItem = document.createElement('div');
        sidebarItem.classList.add('sidebar-item');
        sidebarItem.innerText = item;

        sidebarItem.onclick = function () {
            displayAppControls(item);
        };

        scrollBox.appendChild(sidebarItem);
    });

    sidebarContainer.appendChild(scrollBox);
}
    // Function to display Browse and Open buttons in the main content
function displayAppControls(item) {
    if (!mainContent) return;

    mainContent.innerHTML = ''; // Clear previous content

    const title = document.createElement('h2');
    title.innerText = `Setup: ${item}`;

    const selectDirBtn = document.createElement('button');
    selectDirBtn.innerText = '📂 Browse';
    selectDirBtn.classList.add('control-btn');
    selectDirBtn.onclick = function () {
        selectDirectory(item);
    };

    const openAppBtn = document.createElement('button');
    openAppBtn.innerText = '🚀 Open';
    openAppBtn.classList.add('control-btn');
    openAppBtn.onclick = function () {
        openApplication(item);
    };

    mainContent.appendChild(title);
    mainContent.appendChild(selectDirBtn);
    mainContent.appendChild(openAppBtn);
}
// Function to select a directory (Requires backend for actual functionality)
function selectDirectory(item) {
    alert(`Selecting directory for: ${item}\n(This requires backend support to browse directories!)`);
}

// Function to open the selected application (Requires backend for actual execution)
function openApplication(item) {
    alert(`Opening application: ${item}\n(This requires backend support to execute files!)`);
}

// Function to update sidebar content for NOTES and LINKS
function updateSidebar(page) {
    if (!sidebarContainer) return;

    sidebarContainer.innerHTML = '';
    const sidebarItems = Object.keys(pagesData[page].sidebar);
    const scrollBox = document.createElement('div');
    scrollBox.classList.add('scroll-box');

    sidebarItems.forEach(item => {
        const sidebarItem = document.createElement('div');
        sidebarItem.classList.add('sidebar-item');
        sidebarItem.innerText = item;

        sidebarItem.onclick = function () {
            currentSidebarItem = item; // Update the selected item
            notepad.innerHTML = pagesData[page].sidebar[item] || ''; // Load saved content
        };

        scrollBox.appendChild(sidebarItem);
    });

    sidebarContainer.appendChild(scrollBox);
}

// Function to update the active tab styles
function updateTabStyles() {
    const tabs = document.querySelectorAll('.page-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active-tab');
        if (tab.innerText === currentPage) {
            tab.classList.add('active-tab');
        }
    });
}

// Create page tabs dynamically
function createPageTabs() {
    if (!pageTabsContainer) return;

    Object.keys(pagesData).forEach(page => {
        const tab = document.createElement('div');
        tab.classList.add('page-tab');
        tab.innerText = page;
        tab.onclick = function () { switchPage(page); };
        pageTabsContainer.appendChild(tab);
    });
}

// Save the content for the selected sidebar item
saveBtn.addEventListener('click', function () {
    if (currentSidebarItem) {
        pagesData[currentPage].sidebar[currentSidebarItem] = notepad.innerHTML;
        localStorage.setItem('notesData', JSON.stringify(pagesData)); // Save to Local Storage
        alert(`Saved content for "${currentSidebarItem}"`);
    } else {
        alert('Select a sidebar item first!');
    }
});

function loadNotesFromStorage() {
    const savedData = localStorage.getItem('notesData');
    if (savedData) {
        Object.assign(pagesData, JSON.parse(savedData)); // Restore saved notes
    }
}

// Clear the content for the selected sidebar item
clearBtn.addEventListener('click', function () {
    if (currentSidebarItem) {
        if (confirm(`Are you sure you want to clear "${currentSidebarItem}"?`)) {
            pagesData[currentPage].sidebar[currentSidebarItem] = '';
            notepad.innerHTML = '';
            localStorage.setItem('notesData', JSON.stringify(pagesData)); // Update storage
        }
    } else {
        alert('Select a sidebar item first!');
    }
});

// Initialize the page
createPageTabs(); // Create sidebar categories
switchPage(currentPage); // Load default sidebar
loadNotesFromStorage(); // Call this at the start