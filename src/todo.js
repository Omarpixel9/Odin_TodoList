// A todo is a todo-list item
import { projectsList } from "./projects";

const Todo = (title, description, dueDate, priority) => {
    return {title, description, dueDate, priority};
};

const addTodoToProject = (todo, projectName) => {
    let selectedProject = projectsList.find(project => project.isSelected == true);
    if (!projectName)   selectedProject.assignTodo(todo);
    console.log(projectsList);
};

export {addTodoToProject, Todo};