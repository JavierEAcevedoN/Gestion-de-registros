const CrearRegistroBtn = document.getElementById("crear_registro_btn");
const ActualizarRegistroBtn = document.getElementById(
    "actualizar_registro_btn"
);
const EliminarRegistroBtn = document.getElementById("eliminar_registro_btn");
const TipoDeBusqueda = document.getElementById("tipo_de_busqueda");
const Buscador = document.getElementById("buscador");
const ContRegistros = document.getElementById("contenedor_registros");
const AsignarID = () => {
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        if (element.querySelector(".id") !== null) {
            element.querySelector(".id").textContent = i + 1;
        } else {
            const id = `
            <h3>ID</h3>
            <p class="id">${i + 1}</p>
        `;
            element.innerHTML += id;
        }
    }
};
const Cancelar = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    if(cuadroInput === null) {
        return
    }
    cuadroInput.remove();
}
const Intervalo = func => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), 100);
    };
}
window.addEventListener('resize', Intervalo(Cancelar));
const CrearRegistro = (event) => {
    if (event.target.parentElement.querySelector("div#cuadro_input") !== null) {
        return;
    }
    const div = document.createElement("div");
    div.id = "cuadro_input";
    div.style.position = "absolute";
    div.style.left = `${event.clientX}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
            <input type="text" id="nombre_recurso" placeholder="Nombre del recurso">
            <input type="text" id="genero" placeholder="Género">
            <input type="text" id="plataforma" placeholder="Plataforma">
            <select id="estado">
                <option value="" hidden selected>Estado</option>
                <option value="En progreso">En progreso</option>
                <option value="Terminado">Terminado</option>
                <option value="Pendiente">Pendiente</option>
            </select>
            <select id="formato">
                <option value="" hidden selected>Formato</option>
                <option value="Serie">Serie</option>
                <option value="Película">Película</option>
                <option value="Libro">Libro</option>
            </select>
            <input type="text" id="fecha_t" placeholder="Fecha de terminacion">
            <select id="valoracion">
                <option value="" hidden selected>Valoración final</option>
                <option value="Ninguna">Ninguna</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button onclick="GuardarRegistro()">Crear Registro</button>
            <button onclick="Cancelar()">Cancelar</button>
        `;
    event.target.parentElement.insertBefore(
        div,
        event.target.nextElementSibling
    );
};
const GuardarRegistro = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    const nombreRecurso = document.getElementById("nombre_recurso").value;
    const genero = document.getElementById("genero").value;
    const plataforma = document.getElementById("plataforma").value;
    const estado = document.getElementById("estado").value;
    const formato = document.getElementById("formato").value;
    const fechaT = document.getElementById("fecha_t").value;
    const valoracion = document.getElementById("valoracion").value;
    const DivElemento = document.createElement("div");
    DivElemento.classList.add("registro");
    DivElemento.innerHTML = `
            <h2 class="nombre_recurso">${nombreRecurso}</h2>
            <h3>Genero</h3>
            <p class="genero">${genero}</p>
            <h3>Plataforma</h3>
            <p class="plataforma">${plataforma}</p>
            <h3>Estado</h3>
            <p class="estado">${estado}</p>
            <h3>Formato</h3>
            <p class="formato">${formato}</p>
            <h3>Fecha de terminacion</h3>
            <p class="fecha_t">${fechaT}</p>
            <h3>Valoracion</h3>
            <p class="valoracion">${valoracion}</p>
    `;
    ContRegistros.appendChild(DivElemento);
    cuadroInput.remove();
    AsignarID();
};
const ActualizarRegistro = (event) => {
    if (event.target.parentElement.querySelector("div#cuadro_input") !== null) {
        return;
    }
    const div = document.createElement("div");
    div.id = "cuadro_input";
    div.style.position = "absolute";
    div.style.left = `${event.clientX}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
            <input type="text" id="id" placeholder="Ingresa la ID del recurso">
            <input type="text" id="nombre_recurso" placeholder="Nombre del recurso">
            <input type="text" id="genero" placeholder="Género">
            <input type="text" id="plataforma" placeholder="Plataforma">
            <select id="estado">
                <option value="" hidden selected>Estado</option>
                <option value="En progreso">En progreso</option>
                <option value="Terminado">Terminado</option>
                <option value="Pendiente">Pendiente</option>
            </select>
            <select id="formato">
                <option value="" hidden selected>Formato</option>
                <option value="Serie">Serie</option>
                <option value="Película">Película</option>
                <option value="Libro">Libro</option>
            </select>
            <input type="text" id="fecha_t" placeholder="Fecha de terminacion">
            <select id="valoracion">
                <option value="" hidden selected>Valoración final</option>
                <option value="Ninguna">Ninguna</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <button onclick="ModificarRegistro()">Modificar Registro</button>
            <button onclick="Cancelar()">Cancelar</button>
        `;
    event.target.parentElement.insertBefore(
        div,
        event.target.nextElementSibling
    );
};
const ModificarRegistro = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    const ID = document.getElementById("id").value;
    const nombreRecurso = document.getElementById("nombre_recurso").value;
    const genero = document.getElementById("genero").value;
    const plataforma = document.getElementById("plataforma").value;
    const estado = document.getElementById("estado").value;
    const formato = document.getElementById("formato").value;
    const fechaT = document.getElementById("fecha_t").value;
    const valoracion = document.getElementById("valoracion").value;
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        if (element.querySelector(".id").textContent === ID) {
            element.querySelector(".nombre_recurso").textContent = nombreRecurso
            element.querySelector(".genero").textContent = genero
            element.querySelector(".plataforma").textContent = plataforma
            element.querySelector(".estado").textContent = estado
            element.querySelector(".formato").textContent = formato
            element.querySelector(".fecha_t").textContent = fechaT
            element.querySelector(".valoracion").textContent = valoracion
            break
        }
    }
    cuadroInput.remove();
};
const EliminarRegistro = (event) => {
    if (event.target.parentElement.querySelector("div#cuadro_input") !== null) {
        return;
    }
    const div = document.createElement("div");
    div.id = "cuadro_input";
    div.style.position = "absolute";
    div.style.left = `${event.clientX}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
            <input type="text" id="id" placeholder="Ingresa la ID del recurso">
            <button onclick="RemoverRegistro()">Remover Registro</button>
            <button onclick="Cancelar()">Cancelar</button>
        `;
    event.target.parentElement.insertBefore(
        div,
        event.target.nextElementSibling
    );
};
const RemoverRegistro = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    const ID = document.getElementById("id").value;
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        if (element.querySelector(".id").textContent === ID) {
            element.remove()
            break
        }
    }
    cuadroInput.remove();
    AsignarID()
};