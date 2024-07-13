#!/usr/bin/env node

// Import the required modules
const fs = require("fs");
const readline = require("readline");

// Create a readline interface to handle user input
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to load tasks from tasks.json file
const loadTasks = () => {
	try {
		const data = fs.readFileSync("tasks.json", "utf8");
		return JSON.parse(data);
	} catch (error) {
		return [];
	}
};

// Function to save tasks to tasks.json file
const saveTasks = (tasks) => {
	fs.writeFileSync("tasks.json", JSON.stringify(tasks, null, 2));
};

// Function to list all tasks
const listTasks = () => {
	const tasks = loadTasks();
	console.log("\nTask List:");
	tasks.forEach((task, index) => {
		console.log(
			`${index + 1}. [${task.completed ? "✓" : " "}] ${task.description}`,
		);
	});
	console.log();
};

// Function to add a new task with description, priority, and due date
const addTask = (description, priority, dueDate) => {
	const tasks = loadTasks();
	tasks.push({ description, priority, dueDate, completed: false });
	saveTasks(tasks);
	console.log(
		`\nTask "${description}" with priority "${priority}" and due date "${dueDate}" has been added.\n`,
	);
};

// Function to mark a task as completed
const completeTask = (index) => {
	const tasks = loadTasks();
	if (index > 0 && index <= tasks.length) {
		tasks[index - 1].completed = true;
		saveTasks(tasks);
		console.log(
			`\nTask "${tasks[index - 1].description}" has been completed.\n`,
		);
	} else {
		console.log("\nInvalid task index.\n");
	}
};

// Function to delete a task
const deleteTask = (index) => {
	const tasks = loadTasks();
	if (index > 0 && index <= tasks.length) {
		const deletedTask = tasks.splice(index - 1, 1);
		saveTasks(tasks);
		console.log(`\nTask "${deletedTask[0].description}" has been deleted.\n`);
	} else {
		console.log("\nInvalid task index.\n");
	}
};

// Function to edit a task's description
const editTask = (index, newDescription) => {
	const tasks = loadTasks();
	if (index > 0 && index <= tasks.length) {
		tasks[index - 1].description = newDescription;
		saveTasks(tasks);
		console.log(`\nTask "${index}" has been updated to "${newDescription}".\n`);
	} else {
		console.log("\nInvalid task index.\n");
	}
};

// Function to filter tasks by status or priority
const filterTasks = (filterType, filterValue) => {
	const tasks = loadTasks();
	let filteredTasks = [];

	switch (filterType) {
		case "status":
			filteredTasks = tasks.filter(
				(task) => task.completed === (filterValue === "completed"),
			);
			break;
		case "priority":
			filteredTasks = tasks.filter(
				(task) => task.priority.toLowerCase() === filterValue.toLowerCase(),
			);
			break;
		default:
			console.log("\nInvalid filter type.\n");
			return;
	}

	console.log("\nFiltered Tasks:");
	filteredTasks.forEach((task, index) => {
		console.log(
			`${index + 1}. [${task.completed ? "✓" : " "}] ${task.description} (Priority: ${task.priority}, Due Date: ${task.dueDate})`,
		);
	});
	console.log();
};

// Function to display the main menu
const showMenu = () => {
	console.log("TaskMan");
	console.log("1. List Tasks");
	console.log("2. Add Task");
	console.log("3. Complete Task");
	console.log("4. Delete Task");
	console.log("5. Edit Task");
	console.log("6. Filter Tasks");
	console.log("7. Exit");
};

// Function to handle user input from the menu
const handleUserInput = (choice) => {
	switch (choice.trim()) {
		case "1":
			listTasks();
			promptMenu();
			break;
		case "2":
			rl.question("\nEnter task description: ", (description) => {
				rl.question("Enter task priority (Low, Medium, High): ", (priority) => {
					rl.question("Enter due date (YYYY-MM-DD): ", (dueDate) => {
						addTask(description, priority, dueDate);
						promptMenu();
					});
				});
			});
			break;
		case "3":
			rl.question("\nEnter task number to complete: ", (index) => {
				completeTask(parseInt(index));
				promptMenu();
			});
			break;
		case "4":
			rl.question("\nEnter task number to delete: ", (index) => {
				deleteTask(parseInt(index));
				promptMenu();
			});
			break;
		case "5":
			rl.question("\nEnter task number to edit: ", (index) => {
				rl.question("Enter new task description: ", (newDescription) => {
					editTask(parseInt(index), newDescription);
					promptMenu();
				});
			});
			break;
		case "6":
			rl.question("\nEnter filter type (status/priority): ", (filterType) => {
				rl.question(
					`Enter filter value (${filterType === "status" ? "completed/pending" : "Low/Medium/High"}): `,
					(filterValue) => {
						filterTasks(filterType, filterValue);
						promptMenu();
					},
				);
			});
			break;
		case "7":
			rl.close();
			break;
		default:
			console.log("\nInvalid choice.\n");
			promptMenu();
			break;
	}
};

// Function to prompt the menu to the user
const promptMenu = () => {
	showMenu();
	rl.question("\nChoose an option: ", handleUserInput);
};

// Start the application by prompting the menu
promptMenu();
