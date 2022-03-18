// A todo is a todo-list item
import { projectsList } from "./projects";

const Todo = (title, description, dueDate, priority) => {
    return {title, description, dueDate, priority};
};

const addTodoToProject = (todo, projectName) => {
    let selectedProject;
    if (!projectName)   selectedProject = projectsList.find(project => project.isSelected == true);
    else selectedProject = projectsList.find(project => project.name == projectName);
    selectedProject.assignTodo(todo);
};

export {addTodoToProject, Todo};