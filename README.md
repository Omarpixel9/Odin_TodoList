# Todo List
## Requirements
- Every todo item, as a minimum, should have a title, description, dueDate and priority.
- The todo list should have projects; where every project is a collection of todos. Your todos must be contained within a project. Initially, todos will be stored in a 'default' project.
- Users should be able to create new projects and modify them, as well as assign todos to a project.
- Application logic should be separate from any DOM-related code (keep in separate modules)
- UI functionality should have the following:
    - view all projects
    - view all todos within each project
    - expand a single todo to see/edit its details
    - delete a todo
- Consider using a library using NPM for dates (date-fns)
- Implement data persistence using localStorage