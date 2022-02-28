import { addProject, initializeProjectsList, projectsList, selectProject } from "./projects";
import { addTodoToProject, Todo } from "./todo";
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
    // Clear projects list
    Array.from(projectsListDiv.children).forEach(child => projectsListDiv.removeChild(child));
    // Add projects to list
    for (const project of projectsList) {
        const projectHeader = buildElement('button', null, 'project');
        projectHeader.textContent = project.name;
        projectHeader.addEventListener('click', () => {
            selectProject(project);
            updateProjectsSidebar();
        });
        if (project.isSelected) projectHeader.classList.add('selectedProject');
        projectsListDiv.appendChild(projectHeader);
    }
};

const loadProjectsSidebar = () => {
    // Create sidebar
    const sidebarDiv = buildElement('div', 'sidebar');
    document.body.appendChild(sidebarDiv);
    // Create heading
    const projectsHeading = buildElement('h1', 'projectsTitle');
    projectsHeading.textContent = 'Projects';
    sidebarDiv.appendChild(projectsHeading);
    // Create default project in projects module
    initializeProjectsList();
    addProject('second project');
    addProject('third project');
    addTodoToProject(Todo('test'));
    addTodoToProject(Todo('test2'));
    addTodoToProject(Todo('test3'));
    // Create div for projects list
    const projectsListDiv = buildElement('div', 'projects');
    sidebarDiv.appendChild(projectsListDiv);
    // Add project to sidebar div
    updateProjectsSidebar();
};

export {loadProjectsSidebar};