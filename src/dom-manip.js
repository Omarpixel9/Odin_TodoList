import { addProject, initializeProjectsList, projectsList } from "./projects";
// This file is for DOM Manipulation related features

// Creates and returns an element
const buildElement = (elementType, elementId, elementClass) => {
    let newElement = document.createElement(elementType);
    if (elementId)  newElement.id = elementId;
    if (elementClass)   newElement.classList.add(elementClass);
    return newElement;
};

// Pulls from Projects module and updates sidebar DOM
const updateProjectsSidebar = () => {
    const projectsListDiv = document.getElementById('projects');
    for (const project of projectsList) {
        const projectHeader = buildElement('h1');
        projectHeader.textContent = project.name;
        projectsListDiv.appendChild(projectHeader);
    }
};

const loadProjectsSidebar = () => {
    // Create sidebar
    const sidebarDiv = buildElement('div', 'sidebar');
    document.body.appendChild(sidebarDiv);
    // Create heading
    const projectsHeading = buildElement('h1');
    projectsHeading.textContent = 'Projects';
    sidebarDiv.appendChild(projectsHeading);
    // Create default project in projects module
    initializeProjectsList();
    console.log(projectsList[0]);
    // Create div for projects list
    const projectsListDiv = buildElement('div', 'projects');
    sidebarDiv.appendChild(projectsListDiv);
    // Add project to sidebar div
    updateProjectsSidebar();
};

export {loadProjectsSidebar};