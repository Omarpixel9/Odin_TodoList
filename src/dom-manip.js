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

const switchProjectDisplay = (project) => {
    selectProject(project);
    updateProjectsSidebar();
    updateTodosDisplay();
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
            switchProjectDisplay(project);
        });
        if (project.isSelected) projectHeader.classList.add('selectedProject');
        projectsListDiv.appendChild(projectHeader);
    }
};

const updateTodosDisplay = () => {
    const todosDisplay = document.getElementById('todosContent');
    const selectedProject = projectsList.find(project => project.isSelected);
    // Remove current todos
    Array.from(todosDisplay.children).forEach(child => todosDisplay.removeChild(child));
    // Add todos of selected project
    for (const todo of selectedProject.todos) {
        const todoDiv = buildElement('div', null, 'todo');
        const todoTitle = buildElement('p');
        todoTitle.textContent = todo.title;
        todoDiv.appendChild(todoTitle);
        todosDisplay.appendChild(todoDiv);
    }
    
};

const loadTodosDisplay = () => {
    const contentDiv = document.getElementById('content');
    // Create container for todos
    const todosDiv = buildElement('div', 'todosContent');
    contentDiv.appendChild(todosDiv);
    // Load and display content from Todos module
    updateTodosDisplay();
};

const loadProjectsSidebar = () => {
    const contentDiv = document.getElementById('content');
    // Create sidebar
    const sidebarDiv = buildElement('div', 'sidebar');
    contentDiv.appendChild(sidebarDiv);
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
    addTodoToProject(Todo('test4'), 'second project');
    addTodoToProject(Todo('test5'), 'third project');
    addTodoToProject(Todo('test6'), 'third project');
    // Create div for projects list
    const projectsListDiv = buildElement('div', 'projects');
    sidebarDiv.appendChild(projectsListDiv);
    // Add project to sidebar div
    updateProjectsSidebar();
};

const initialLoadContent = () => {
    loadProjectsSidebar();
    loadTodosDisplay();
};

export {initialLoadContent};