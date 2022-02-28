// This module is for storing and modifying projects
const projectsList = [];

// A Project is composed of a name and a collection of todos
const Project = (name, todos) => {
    return {name, todos};
};

const addProject = (name) => {
    let project = Project(name, ['']);
    projectsList.push(project);
};

export {addProject, projectsList};