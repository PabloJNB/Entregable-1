// Botón de mover a lista finalizada
const pendientesCbox = document.querySelectorAll(".pendientesCbox");
const listaFinalizadas = document.querySelector(".lista-terminada");

// Crear un evento para cada checkbox
pendientesCbox.forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
        if (checkbox.checked) {
            const tarea = checkbox.parentNode;

            // Mover la tarea a la lista de finalizadas
            listaFinalizadas.appendChild(tarea);
            
            // Cambiar la clase del checkbox
            checkbox.classList.remove("pendientesCbox");
            checkbox.classList.add("terminadasCbox");

            // Cambiar la clase del elemento li
            tarea.classList.add("tarea-finalizada");
        }
    });
});

const clearButton = document.querySelector(".boton-borrar");
clearButton.addEventListener("click", function () {
    const terminadasCbox = document.querySelectorAll(".terminadasCbox");
    terminadasCbox.forEach((checkbox) => {
        if (checkbox.checked) {
            // Eliminar la tarea finalizada
            checkbox.parentNode.remove();
        }
    });
});


