document.addEventListener("DOMContentLoaded", () => {
  // Cache elements using getElementById and querySelector
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const errorMsg = document.getElementById("error-msg");
  const todoList = document.querySelector("#todo-list");
  const clearButton = document.querySelector("#clear-list");

  // Event listener for form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Validate input using DOM event-based validation
    if (input.value.length < 3) {
      errorMsg.classList.remove("hidden");
      return;
    }
    errorMsg.classList.add("hidden");

    // Create a new task item
    const li = document.createElement("li");
    li.textContent = input.value;

    // Add delete button to the task item
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      li.remove(); // Remove the task on click
    });

    li.appendChild(deleteButton);

    // Add the new task to the list
    todoList.appendChild(li);

    // Clear input
    input.value = "";
  });

  // Event listener for clear button
  clearButton.addEventListener("click", () => {
    while (todoList.firstChild) {
      todoList.firstChild.remove(); // Remove all tasks
    }
  });

  // BOM Usage: Dynamically change the document title based on tasks
  const updateTitle = () => {
    document.title = `To-Do List (${todoList.children.length} tasks)`;
  };

  // Add a MutationObserver to watch changes in the todo list
  const observer = new MutationObserver(updateTitle);
  observer.observe(todoList, { childList: true });

  // Initial title update
  updateTitle();
});
