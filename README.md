# TaskMan

TaskMan is a simple CLI application for managing tasks built using JavaScript. This application allows you to add, complete, delete, edit, and filter tasks based on priority and status.

### Quick Overview
- **Installation:** Instructions for downloading and installing necessary dependencies.
- **Usage:** Steps to run the application.
- **Project Structure:** Brief explanation of the main files and their functions.
- **Example Usage:** Examples of how a user might interact with the application.

## Features

- Add tasks with description, priority, and due date.
- List all tasks.
- Mark tasks as completed.
- Delete tasks.
- Edit task descriptions.
- Filter tasks by status (completed/pending) and priority (Low, Medium, High).

## Requirements

- [Node.js](https://nodejs.org/) must be installed on your system.

## Installation

To install the TaskMan CLI globally, run:

```bash
npm install -g taskman-cli
```

## Project Structure

```bash
taskman-cli/
├── bin/
│   └── index.js
└── package.json
```

- `index.js`: Contains the main logic of the Task Manager application.
- `tasks.json`: File used to store task data locally.

## Usage

After installing globally, you can use the `taskman` command to manage your tasks:

```bash
taskman
```

Follow the prompts in the terminal to manage your tasks.

## Example Usage

Here is an example of using the TaskMan application:

1. **Adding a Task**
    - Enter task description: `Learn JavaScript`
    - Enter task priority: `High`
    - Enter due date: `2024-07-15`
    - Output: `Task "Learn JavaScript" with priority "High" and due date "2024-07-15" has been added.`

2. **Listing Tasks**
    - Output: `1. [ ] Learn JavaScript (Priority: High, Due Date: 2024-07-15)`

3. **Completing a Task**
    - Enter task number to complete: `1`
    - Output: `Task "Learn JavaScript" has been completed.`

4. **Deleting a Task**
    - Enter task number to delete: `1`
    - Output: `Task "Learn JavaScript" has been deleted.`

5. **Editing a Task**
    - Enter task number to edit: `1`
    - Enter new task description: `Learn Node.js`
    - Output: `Task "1" has been updated to "Learn Node.js".`

6. **Filtering Tasks**
    - Enter filter type (status/priority): `status`
    - Enter filter value (completed/pending): `completed`
    - Output: `Filtered Tasks: 1. [✓] Learn JavaScript (Priority: High, Due Date: 2024-07-15)`

## License

This project is licensed under the [MIT License](LICENSE).
