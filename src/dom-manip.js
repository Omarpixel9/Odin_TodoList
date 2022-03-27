import { addProject, initializeProjectsList, projectsList, selectProject } from "./projects";
import { addTodoToProject, Todo } from "./todo";
import { SweetAlert } from "sweetalert";
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
        const todoCheck = buildElement('input');
        todoCheck.type = 'checkbox';
        const todoTitle = buildElement('p');
        todoTitle.textContent = todo.title;
        todoDiv.appendChild(todoCheck);
        todoDiv.appendChild(todoTitle);
        todosDisplay.appendChild(todoDiv);
    }
    // New Todo button
    const newTodoBtn = buildElement('button', 'newTodoBtn');
    newTodoBtn.textContent = '+ New Todo';
    newTodoBtn.addEventListener('click', loadTodoDetailDisplay);
    todosDisplay.appendChild(newTodoBtn);
    
};

const loadTodoDetailDisplay = (todo) => {
    const contentDiv = document.getElementById('content');
    document.body.classList.add('notScrollable');
    const todoDetailBackground = buildElement('div', 'todoDetailsBackground');
    const confirmMessageButtons = ['No', 'Yes'];
    const closeDisplay = () => {
        contentDiv.removeChild(todoDetailDiv);
        contentDiv.removeChild(todoDetailBackground);
    }
    // Close Todo Detail Display
    const closeDisplayDialog = () => {
        swal('Are you sure you want to close this dialog?', "Any changes will not be saved.", "warning", {buttons: confirmMessageButtons}).then((value) => {
            if (value) {
                closeDisplay();
            }
        });
    };
    todoDetailBackground.addEventListener('click', closeDisplayDialog);
    // Create container for todo content
    const todoDetailDiv = buildElement('div', 'todoDetails');

    // Title of Display
    const titleDisplay = buildElement('h1');
    titleDisplay.textContent = 'Create a New Todo';

    // Form Template Model
    const formModel = {
        todoName: {
            label: 'Todo Name',
            element: 'input',
            inputType: 'text',
        },
        todoDesc: {
            label: 'Todo Description',
            element: 'input',
            inputType: 'text',
        },
        todoDueDate: {
            label: 'Todo Due Date & Time',
            element: 'input',
            inputType: 'datetime-local',
        },
        todoAssignedProject: {
            label: 'Assigned Project',
            element: 'select',
        }
    };

    // Generate Form in DOM
    const todoForm = buildElement('form');
    // Form Details
    for (const field in formModel) {
        const myField = formModel[field];
        console.log(myField.label);
        const labelElement = buildElement('label');
        labelElement.textContent = myField.label;
        labelElement.name = field + 'Label';
        const inputElement = buildElement(myField.element);
        inputElement.name = field + 'Input';

        if (myField.inputType) inputElement.type = formModel[field].inputType;
        if (field === 'todoAssignedProject') {
            for (const project of projectsList) {
                const option = buildElement('option');
                option.textContent = project.name;
                inputElement.appendChild(option);
            }
        }
        todoForm.appendChild(labelElement);
        todoForm.appendChild(inputElement);
    }

    // Add Todo Button
    const addTodoBtn = buildElement('button');
    addTodoBtn.textContent = 'Add Todo';
    addTodoBtn.type = 'button';
    addTodoBtn.addEventListener('click', () => {
        let inputs = [];
        let assignedProject;
        for (const input of todoForm.children) {
            if (input.name === 'todoAssignedProjectInput')
                assignedProject = input.options[input.selectedIndex].textContent;
            else if (input.tagName === 'INPUT')
                inputs.push(input.value);
        }
        console.log(inputs);
        addTodoToProject(Todo(inputs[0], inputs[1], inputs[2]), assignedProject);
        closeDisplay();
        updateTodosDisplay();
    });

    todoDetailDiv.appendChild(titleDisplay);
    todoDetailDiv.appendChild(todoForm);
    todoDetailDiv.appendChild(addTodoBtn);
    
    contentDiv.appendChild(todoDetailBackground);
    contentDiv.appendChild(todoDetailDiv);
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