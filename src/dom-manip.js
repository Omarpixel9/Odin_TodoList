// This file is for DOM Manipulation related features

// Creates and returns an element
const buildElement = (elementType, elementId, elementClass) => {
    let newElement = document.createElement(elementType);
    if (elementId)
        newElement.id = elementId;
    if (elementClass)
        newElement.classList.add(elementClass);
    return newElement;
};

const loadProjectsSidebar = () => {
    // Create div
    const sidebarDiv = buildElement('div', 'sidebar');
    document.body.appendChild(sidebarDiv);
    // Create heading
    const projectsHeading = buildElement('h1');
    projectsHeading.textContent = 'Projects';
    sidebarDiv.appendChild(projectsHeading);
    // Load default project from projects module
};

export {loadProjectsSidebar};