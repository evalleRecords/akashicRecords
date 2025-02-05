function handleClick(element) {
    alert("You clicked: " + element.innerText);
}

 // Define the structure for each page's sidebar and content
 const pagesData = {
    'NOTES': {
        sidebar: [
            'Test station',
            'Signal generator',
            'Vector Network Analyzer',
            'Spectrum Analyzer',
            'S-Parameters',
            'RF Basics',
            'Signals and decibel',
            'Circulator, Isolator and Coupler',
            'Design Pattern',
            'Architecture',
            'Object Oriented Programming',
            'C++',
            'Python',
            'HTML',
            'JavaScript',
            'CSS',
        ],
        content: ''

    },
    'Test Setup': {
        sidebar: [
            'Console App',
            'FAAP proxy client',
            'GRPC FAAP proxy',
            'Power supply control',
            'Spectrum Analyzer control'
        ],
        content: ''
    },
    'Links': {
        sidebar: [
            'Jenkins',
            'Gerrit',
            'Implementation Specification',
            '1524 requirement description'
        ],
        content: ''
    }
};

let currentPage = 'NOTES'; // Default page
const notepad = document.getElementById('notepad');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const sidebarContainer = document.getElementById('sidebar-container');
const pageTabsContainer = document.getElementById('page-tabs');

// Function to switch pages
function switchPage(page) {
    currentPage = page;
    updateSidebar(page);
    notepad.innerHTML = pagesData[page].content || ''; // Load saved content if any
    updateTabStyles();
}

// Function to update the active tab style
function updateTabStyles() {
    const tabs = document.querySelectorAll('.page-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active-tab');
        if (tab.innerText === currentPage) {
            tab.classList.add('active-tab');
        }
    });
}

// Update the sidebar based on the selected page
function updateSidebar(page) {
    sidebarContainer.innerHTML = '';
    const sidebarList = pagesData[page].sidebar;
    const scrollBox = document.createElement('div');
    scrollBox.classList.add('scroll-box');
    
    sidebarList.forEach(item => {
        const sidebarItem = document.createElement('div');
        sidebarItem.classList.add('sidebar-item');
        sidebarItem.innerText = item;
        sidebarItem.onclick = function () {
            notepad.innerHTML = `You selected: ${item}`;
        };
        scrollBox.appendChild(sidebarItem);
    });

    sidebarContainer.appendChild(scrollBox);
}

// Create page tabs dynamically
function createPageTabs() {
    Object.keys(pagesData).forEach(page => {
        const tab = document.createElement('div');
        tab.classList.add('page-tab');
        tab.innerText = page;
        tab.onclick = function () { switchPage(page); };
        pageTabsContainer.appendChild(tab);
    });
}

// Save the content for the current page
saveBtn.addEventListener('click', function () {
    pagesData[currentPage].content = notepad.innerHTML;
    alert('Page saved!');
});

// Clear the content for the current page
clearBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to clear this page?')) {
        pagesData[currentPage].content = '';
        notepad.innerHTML = '';
    }
});

// Initialize the page
createPageTabs(); // Create page tabs dynamically
switchPage(currentPage); // Display the content for the default page