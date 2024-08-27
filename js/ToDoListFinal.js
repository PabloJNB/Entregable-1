const predefinedTasks = [
    {
        id: 0,
        title: "Entregable",
        description: "Terminar js y css",
        date: "2024-08-21",
    },
    {
        id: 1,
        title: "Ir al gym",
        description: "Hacer rutina",
        date: "2024-09-22",
    },
];
let tasks = [...predefinedTasks];
let currentIdNumber = predefinedTasks.length;

// Funcion para crear los componenentes de cada tarea
function createTaskComponent(task) {
    // Crear elemento li 
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    taskElement.setAttribute("id", task.id);

    // Crear span para completar la tarea
    const completeSpan = document.createElement("span");
    completeSpan.textContent = "✔";
    completeSpan.classList.add("completeSpan");

    // Agregar event listener al completeSpan para marcar la tarea como terminada
    completeSpan.addEventListener("click", () => completeTask(task.id));

    // Crear span para borrar la tarea
    const deleteSpan = document.createElement("span");
    deleteSpan.textContent = "X";
    deleteSpan.classList.add("deleteSpan");

    // Agregar event listener al deleteSpan para eliminar la tarea
    deleteSpan.addEventListener("click", () => deleteTask(task.id));
    
    // Crear elementos para mostrar la informacion de la tarea
    const taskTitle = document.createElement("h5");
    taskTitle.classList.add("task-title");
    taskTitle.textContent = task.title;
    
    const taskDescription = document.createElement("h6");
    taskDescription.classList.add("task-description");
    taskDescription.textContent = task.description;
    
    const taskDate = document.createElement("h6");
    taskDate.classList.add("task-date");
    taskDate.textContent = task.date;
    
    // Añadir los elementos al elemento li
    taskElement.appendChild(completeSpan);
    taskElement.appendChild(deleteSpan);
    taskElement.appendChild(taskTitle);
    taskElement.appendChild(taskDescription);
    taskElement.appendChild(taskDate);

    // Obtener el elemento <ul> donde se mostrarán las tareas y añadirla al dom
    const taskList = document.querySelector(".task-list-container");
    taskList.appendChild(taskElement);
}

// FUNCION PARA CARGAR LAS TAREAS
function loadTasks() {
    tasks.forEach(createTaskComponent);
}
// Cargar las tareas al cargar la página
document.addEventListener("DOMContentLoaded", loadTasks);

// FUNCION PARA CREAR UNA NUEVA TAREA //
function addTask(event) {
    // Evitamos que el formulario se envie
    event.preventDefault();

    // Obtener los valores de los inputs
    const titleInput = document.getElementById("title-input").value;
    const descriptionInput = document
        .getElementById("description-input")
        .value;
    const dateInput = document.getElementById("date-input").value;

    // Crear un nuevo objeto de tarea   
    const newTask = {
        id: currentIdNumber++,
        title: titleInput,
        description: descriptionInput,
        date: dateInput,
    };

    // Agregamos la nueva tarea al array de tareas
    tasks.push(newTask);

    // Correr la funcion de crear componentes sobre la nueva tarea para 
    //  mostrarla en el DOM
    createTaskComponent(newTask);

    // Resetea el formulario
    document.querySelector("form").reset();
}
// Cargar el formulario, agregar event listener al boton submit
//  y correr la funcion de agregar tarea
document.querySelector("form").addEventListener("submit", addTask);


// FUNCION PARA ELIMINAR UNA TAREA
function deleteTask(taskId) {
    // Filtrar el array de tareas para eliminar la tarea con el ID correspondiente
    tasks = tasks.filter((task) => task.id !== taskId);

    // Eliminar la tarea del DOM
    const taskElement = document.getElementById(taskId);
    taskElement.remove();
}

// FUNCION PARA COMPLETAR UNA TAREA
function completeTask(taskId) {
    // Obtener la tarea del array tasks
    const task = tasks.find((task) => task.id === taskId);

    // Si la tarea existe, moverla a la lista de terminadas
    if (task) {
        const taskElement = document.getElementById(taskId);

        // Eliminar la tarea de la lista principal
        taskElement.remove();

        // Crear un nuevo elemento en la lista de tareas terminadas
        const finishedTaskElement = document.createElement("li");
        finishedTaskElement.classList.add("finished-task");
        finishedTaskElement.textContent = task.title;


        const finishContainer = document.querySelector(".task-finish-container");
        finishContainer.appendChild(finishedTaskElement);
    }
}

// FUNCION PARA ELIMINAR TODAS LAS TAREAS TERMINADAS
document.getElementById("delete-all-tasks").addEventListener("click", () => {
    const finishContainer = document.querySelector(".task-finish-container");
    finishContainer.innerHTML = "";  // Vaciar el contenido del contenedor de tareas terminadas
});


