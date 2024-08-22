document.addEventListener("DOMContentLoaded", () => {
  const creador = document.querySelector(".creador");
  const inputTitulo = creador.querySelector("input");
  const botonCrear = creador.querySelector("button");
  const listasCreadas = document.querySelector(".listas-creadas");
  const ulEnProceso = document.querySelector(".ul-en-proceso");
  const ulTerminadas = document.querySelector(".ul-terminadas");

  // Función para crear una nueva lista de tareas
  function creadorDeNotas() {
    const id = listasCreadas.childElementCount + 1;
    const lista = document.createElement("div");
    lista.classList.add("lista", `lista-${id}`);

    const h3 = document.createElement("h3");
    h3.textContent = inputTitulo.value;
    inputTitulo.value = ""; // Limpiar el campo de título después de crear la lista

    const ul = document.createElement("ul");
    ul.classList.add("ul-creadas");
    ul.setAttribute("id", `ul-${id}`);

    const createTask = document.createElement("button");
    createTask.classList.add("btn-crear");
    createTask.textContent = "+";
    createTask.setAttribute("data-lista-id", id);

    lista.appendChild(h3);
    lista.appendChild(ul);
    lista.appendChild(createTask);
    listasCreadas.appendChild(lista);

    // Añadir el evento de crear tarea al botón específico
    createTask.addEventListener("click", creadorDeTask);
  }

  // Event listener para el botón de crear lista
  botonCrear.addEventListener("click", creadorDeNotas);

  // Event listener para crear la lista presionando "Enter"
  inputTitulo.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      creadorDeNotas();
    }
  });

  // Función para agregar una nueva tarea a una lista específica
  function creadorDeTask(event) {
    const listaId = event.target.getAttribute("data-lista-id");
    const ul = document.querySelector(`#ul-${listaId}`);

    const li = document.createElement("li");

    const input = document.createElement("input");
    input.classList.add("check", "creadaCheckbox"); // Clase específica para checkboxes en "Creada"
    input.setAttribute("type", "checkbox");

    const text = document.createElement("input");
    text.classList.add("tarea");
    text.setAttribute("type", "text");

    li.appendChild(input);
    li.appendChild(text);
    ul.appendChild(li);

    // Añadir el evento de "Enter" a cada nuevo input de tarea creado
    text.addEventListener("keypress", ingresarTarea);

    // Añadir el evento de mover a "En Proceso" al marcar el checkbox
    input.addEventListener("change", function () {
      if (input.checked) {
        enProceso(li);
      }
    });
  }

  // Función para manejar el ingreso de una tarea y reemplazar el input con un <p>
  function ingresarTarea(event) {
    if (event.key === "Enter") {
      event.preventDefault();

      const tareaInput = event.target;
      const p = document.createElement("p");
      p.textContent = tareaInput.value;

      tareaInput.style.display = "none"; // Ocultar el input
      tareaInput.parentNode.insertBefore(p, tareaInput.nextSibling);
    }
  }

  // Función para mover la tarea a "En Proceso" cuando se marca el checkbox
  function enProceso(li) {
    ulEnProceso.appendChild(li);

    // Limpiar el checkbox y cambiar la clase
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.checked = false;
    checkbox.classList.remove("creadaCheckbox");
    checkbox.classList.add("procesoCheckbox");

    // Añadir el evento de mover a "Terminadas"
    checkbox.addEventListener("change", function () {
      if (checkbox.checked) {
        moverATerminadas(li);
      }
    });
  }

  // Función para mover la tarea a la lista "Terminadas"
  function moverATerminadas(li) {
    ulTerminadas.appendChild(li);

    // Limpiar el checkbox y cambiar la clase
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.checked = false;
    checkbox.classList.remove("procesoCheckbox");
    checkbox.classList.add("terminadasCheckbox");
  }
});
