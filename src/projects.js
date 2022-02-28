// This module is for storing and modifying projects
const projectsList = [];

// A Project is composed of a name and a collection of todos
const Project = (name, isSelected) => {
    const todos = [];
    const assignTodo = todo => todos.push(todo);
    return {name, todos, isSelected, assignTodo};
};

const addProject = (name, todos, isSelected) => {
    let project = Project(name, todos, isSelected);
    projectsList.push(project);
    return project;
};

// Initial setup of todo list, runs for first-time users
const initializeProjectsList = () => {
    addProject('default', true);
};

export {addProject, initializeProjectsList, projectsList};