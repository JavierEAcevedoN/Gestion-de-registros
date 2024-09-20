const CrearRegistroBtn = document.getElementById("crear_registro_btn");
const ActualizarRegistroBtn = document.getElementById(
    "actualizar_registro_btn"
);
const EliminarRegistroBtn = document.getElementById("eliminar_registro_btn");
const TipoDeBusqueda = document.getElementById("tipo_de_busqueda");
const Buscador = document.getElementById("buscador");
const EstadoBusqueda = document.getElementById("estado_busqueda");
const FormatoBusqueda = document.getElementById("formato_busqueda");
const ContRegistros = document.getElementById("contenedor_registros");
let lastWidth = window.innerWidth;
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
const GuardarContRegistros = () => {
    const datos = ContRegistros.innerHTML;
    localStorage.setItem("contenedor_registros", datos);
};
const MayusculaPrimeraLetra = (texto) => {
    if (texto.length === 0) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
};
const Cancelar = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    if (cuadroInput === null) {
        return;
    }
    cuadroInput.remove();
};
const Redimensionamiento = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth !== lastWidth) {
        lastWidth = currentWidth;
        Cancelar();
    }
};
const Intervalo = (func) => {
    let timeout;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(), 100);
    };
};
window.addEventListener("resize", Intervalo(Redimensionamiento));
const EstadoFecha = () => {
    const estado = document.getElementById("estado").value;
    const fechaT = document.getElementById("fecha_t");
    if (estado !== "Terminado") {
        fechaT.toggleAttribute("hidden", true);
        fechaT.value = "";
    } else {
        fechaT.toggleAttribute("hidden", false);
    }
};
const CrearRegistro = (event) => {
    if (
        event.target.parentElement.parentElement.querySelector(
            "div#cuadro_input"
        ) !== null
    ) {
        return;
    }
    const div = document.createElement("div");
    div.id = "cuadro_input";
    div.style.position = "fixed";
    div.style.left = `${event.clientX}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
            <input type="text" id="nombre_recurso" placeholder="Nombre del recurso" title="Solo so permiten caracteres Alfabeticos">
            <input type="text" id="genero" placeholder="Género" title="Solo so permiten caracteres Alfabeticos">
            <input type="text" id="plataforma" placeholder="Plataforma" title="Solo so permiten caracteres Alfabeticos">
            <select id="estado" onchange="EstadoFecha()">
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
            <input type="date" id="fecha_t" placeholder="Fecha de terminacion" hidden>
            <select id="valoracion">
                <option value="" hidden selected>Valoración final</option>
                <option value="Sin valoracion">Sin valoracion</option>
                <option value="★">★</option>
                <option value="★★">★★</option>
                <option value="★★★">★★★</option>
                <option value="★★★★">★★★★</option>
                <option value="★★★★★">★★★★★</option>
            </select>
            <input type="text" id="resena" placeholder="Reseña" title="Solo so permiten caracteres Alfabeticos">
            <button onclick="GuardarRegistro()">Crear Registro</button>
            <button onclick="Cancelar()">Cancelar</button>
        `;
    event.target.parentElement.insertBefore(
        div,
        event.target.nextElementSibling
    );
    const hoy = new Date();
    const fechaMax = hoy.toISOString().split("T")[0];
    document.getElementById("fecha_t").max = fechaMax;
};
const GuardarRegistro = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    const nombreRecurso = document
        .getElementById("nombre_recurso")
        .value.split(" ")
        .map((txt) => MayusculaPrimeraLetra(txt))
        .join(" ");
    const genero = document
        .getElementById("genero")
        .value.split(", ")
        .map((txt) => MayusculaPrimeraLetra(txt))
        .join(", ");
    const plataforma = document
        .getElementById("plataforma")
        .value.split(", ")
        .map((txt) => MayusculaPrimeraLetra(txt))
        .join(", ");
    const estado = document.getElementById("estado").value;
    const formato = document.getElementById("formato").value;
    let fechaT = document.getElementById("fecha_t").value;
    const valoracion = document.getElementById("valoracion").value;
    const resena = MayusculaPrimeraLetra(
        document.getElementById("resena").value
    );
    if (
        !/^[\p{L} _-]+$/u.test(nombreRecurso) ||
        !/^[\p{L} _+-,.]+$/u.test(genero) ||
        !/^[\p{L} _+-,.]+$/u.test(plataforma) ||
        estado === "" ||
        formato === "" ||
        valoracion === "" ||
        !/^[\p{L} _+-,.]+$/u.test(resena)
    ) {
        alert("Hay un formato que no es correcto");
        return;
    }
    if (fechaT === "") {
        fechaT = "Ninguna";
    }
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
            <h3>Reseña</h3>
            <p class="resena">${resena}</p>
    `;
    ContRegistros.appendChild(DivElemento);
    cuadroInput.remove();
    AsignarID();
    GuardarContRegistros();
};
const ActualizarRegistro = (event) => {
    if (
        event.target.parentElement.parentElement.querySelector(
            "div#cuadro_input"
        ) !== null
    ) {
        return;
    }
    const div = document.createElement("div");
    div.id = "cuadro_input";
    div.style.position = "fixed";
    div.style.left = `${event.clientX - 144.5}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
            <input type="text" id="id" placeholder="Ingresa la ID del recurso" title="Solo so permiten caracteres Numericos" onchange="BuscarModificarRegistro()">
            <input type="text" id="nombre_recurso" placeholder="Nombre del recurso" title="Solo so permiten caracteres Alfabeticos">
            <input type="text" id="genero" placeholder="Género" title="Solo so permiten caracteres Alfabeticos">
            <input type="text" id="plataforma" placeholder="Plataforma" title="Solo so permiten caracteres Alfabeticos">
            <select id="estado"onchange="EstadoFecha()">
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
            <input type="date" id="fecha_t" placeholder="Fecha de terminacion" hidden>
            <select id="valoracion">
                <option value="" hidden selected>Valoración final</option>
                <option value="Sin valoracion">Sin valoracion</option>
                <option value="★">★</option>
                <option value="★★">★★</option>
                <option value="★★★">★★★</option>
                <option value="★★★★">★★★★</option>
                <option value="★★★★★">★★★★★</option>
            </select>
            <input type="text" id="resena" placeholder="Reseña" title="Solo so permiten caracteres Alfabeticos">
            <button onclick="ModificarRegistro()">Modificar Registro</button>
            <button onclick="Cancelar()">Cancelar</button>
        `;
    event.target.parentElement.insertBefore(
        div,
        event.target.nextElementSibling
    );
    const hoy = new Date();
    const fechaMax = hoy.toISOString().split("T")[0];
    document.getElementById("fecha_t").max = fechaMax;
};
const BuscarModificarRegistro = () => {
    const ID = document.getElementById("id").value;
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        if (element.querySelector(".id").textContent === ID) {
            document.getElementById("nombre_recurso").value =
                element.querySelector(".nombre_recurso").textContent;
            document.getElementById("genero").value =
                element.querySelector(".genero").textContent;
            document.getElementById("plataforma").value =
                element.querySelector(".plataforma").textContent;
            document.getElementById("estado").value =
                element.querySelector(".estado").textContent;
            if (document.getElementById("estado").value !== "Terminado") {
                document
                    .getElementById("fecha_t")
                    .toggleAttribute("hidden", true);
                document.getElementById("fecha_t").value = "";
            } else {
                document
                    .getElementById("fecha_t")
                    .toggleAttribute("hidden", false);
            }
            document.getElementById("formato").value =
                element.querySelector(".formato").textContent;
            if (element.querySelector(".fecha_t").textContent !== "Ninguna") {
                document.getElementById("fecha_t").value =
                    element.querySelector(".fecha_t").textContent;
            }
            document.getElementById("valoracion").value =
                element.querySelector(".valoracion").textContent;
            document.getElementById("resena").value =
                element.querySelector(".resena").textContent;
            break;
        }
    }
};
const ModificarRegistro = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    const ID = document.getElementById("id").value;
    const nombreRecurso = document
        .getElementById("nombre_recurso")
        .value.split(" ")
        .map((txt) => MayusculaPrimeraLetra(txt))
        .join(" ");
    const genero = document
        .getElementById("genero")
        .value.split(", ")
        .map((txt) => MayusculaPrimeraLetra(txt))
        .join(", ");
    const plataforma = document
        .getElementById("plataforma")
        .value.split(", ")
        .map((txt) => MayusculaPrimeraLetra(txt))
        .join(", ");
    const estado = document.getElementById("estado").value;
    const formato = document.getElementById("formato").value;
    let fechaT = document.getElementById("fecha_t").value;
    const valoracion = document.getElementById("valoracion").value;
    const resena = MayusculaPrimeraLetra(
        document.getElementById("resena").value
    );
    if (
        !/\d+/.test(ID) ||
        !/^[\p{L} _-]+$/u.test(nombreRecurso) ||
        !/^[\p{L} _+-,.]+$/u.test(genero) ||
        !/^[\p{L} _+-,.]+$/u.test(plataforma) ||
        estado === "" ||
        formato === "" ||
        valoracion === "" ||
        !/^[\p{L} _+-,.]+$/u.test(resena)
    ) {
        alert("Hay un formato que no es correcto");
        return;
    }
    if (fechaT === "") {
        fechaT = "Ninguna";
    }
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        if (element.querySelector(".id").textContent === ID) {
            element.querySelector(".nombre_recurso").textContent =
                nombreRecurso;
            element.querySelector(".genero").textContent = genero;
            element.querySelector(".plataforma").textContent = plataforma;
            element.querySelector(".estado").textContent = estado;
            element.querySelector(".formato").textContent = formato;
            element.querySelector(".fecha_t").textContent = fechaT;
            element.querySelector(".valoracion").textContent = valoracion;
            element.querySelector(".resena").textContent = resena;
            break;
        }
    }
    cuadroInput.remove();
    GuardarContRegistros();
};
const EliminarRegistro = (event) => {
    if (
        event.target.parentElement.parentElement.querySelector(
            "div#cuadro_input"
        ) !== null
    ) {
        return;
    }
    const div = document.createElement("div");
    div.id = "cuadro_input";
    div.style.position = "fixed";
    div.style.left = `${event.clientX - 289}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
            <input type="text" id="id" placeholder="Ingresa la ID del recurso" title="Solo so permiten caracteres Numericos">
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
            element.remove();
            break;
        }
    }
    if (!/\d+/.test(ID)) {
        alert("Hay un formato que no es correcto");
        return;
    }
    cuadroInput.remove();
    AsignarID();
    GuardarContRegistros();
};
const MostrarBusqueda = () => {
    const opcion = TipoDeBusqueda.value;
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        element.style.display = "flex";
    }
    Buscador.value = "";
    EstadoBusqueda.value = "Nada";
    FormatoBusqueda.value = "Nada";
    if (opcion === "nada") {
        Buscador.style.display = "none";
        EstadoBusqueda.style.display = "none";
        FormatoBusqueda.style.display = "none";
        Cancelar();
    } else if (opcion === "estado") {
        EstadoBusqueda.style.display = "block";
        Buscador.style.display = "none";
        FormatoBusqueda.style.display = "none";
        Cancelar();
    } else if (opcion === "formato") {
        FormatoBusqueda.style.display = "block";
        Buscador.style.display = "none";
        EstadoBusqueda.style.display = "none";
        Cancelar();
    } else {
        Buscador.style.display = "block";
        EstadoBusqueda.style.display = "none";
        FormatoBusqueda.style.display = "none";
        Cancelar();
    }
};
const BuscarRegistrosNP = () => {
    const opcion = TipoDeBusqueda.value;
    const buscador = Buscador.value;
    const elemento = ContRegistros.querySelectorAll(`.${opcion}`);
    if (/["<>=]+/g.test(buscador)) {
        alert("No se puede ingresar eso");
        for (let i = 0; i < ContRegistros.children.length; i++) {
            const element = ContRegistros.children[i];
            element.style.display = "flex";
        }
        Buscador.value = "";
        return;
    }
    let patron;
    if (opcion === "nombre_recurso") {
        patron = new RegExp(`^${buscador}`, "i");
    } else {
        patron = new RegExp(`${buscador}`, "i");
    }
    elemento.forEach((element) => {
        if (!patron.test(element.textContent)) {
            element.parentElement.style.display = "none";
        } else {
            element.parentElement.style.display = "flex";
        }
    });
    if (
        ContRegistros.querySelectorAll('div[style="display: none;"]').length ==
        ContRegistros.children.length
    ) {
        alert(
            `No se encontro ninguna coincidencia de ${opcion
                .split("_")
                .join(" ")}`
        );
        for (let i = 0; i < ContRegistros.children.length; i++) {
            const element = ContRegistros.children[i];
            element.style.display = "flex";
        }
        Buscador.value = "";
    }
};
const BuscarRegistrosE = () => {
    const estadoBusqueda = EstadoBusqueda.value;
    if (estadoBusqueda === "Nada") {
        for (let i = 0; i < ContRegistros.children.length; i++) {
            const element = ContRegistros.children[i];
            element.style.display = "flex";
        }
        return;
    }
    const elemento = ContRegistros.querySelectorAll(".estado");
    elemento.forEach((element) => {
        if (estadoBusqueda === element.textContent) {
            element.parentElement.style.display = "flex";
        } else {
            element.parentElement.style.display = "none";
        }
    });
    if (
        ContRegistros.querySelectorAll('div[style="display: none;"]').length ==
        ContRegistros.children.length
    ) {
        alert(
            `No se encontro ninguna coincidencia en el estado ${estadoBusqueda.toLowerCase()}`
        );
        for (let i = 0; i < ContRegistros.children.length; i++) {
            const element = ContRegistros.children[i];
            element.style.display = "flex";
        }
        EstadoBusqueda.value = "Nada";
    }
};
const BuscarRegistrosF = () => {
    const formatoBusqueda = FormatoBusqueda.value;
    if (formatoBusqueda === "Nada") {
        for (let i = 0; i < ContRegistros.children.length; i++) {
            const element = ContRegistros.children[i];
            element.style.display = "flex";
        }
        return;
    }
    const elemento = ContRegistros.querySelectorAll(".formato");
    elemento.forEach((element) => {
        if (formatoBusqueda === element.textContent) {
            element.parentElement.style.display = "flex";
        } else {
            element.parentElement.style.display = "none";
        }
    });
    if (
        ContRegistros.querySelectorAll('div[style="display: none;"]').length ==
        ContRegistros.children.length
    ) {
        alert(
            `No se encontro ninguna coincidencia en el formato ${formatoBusqueda.toLowerCase()}`
        );
        for (let i = 0; i < ContRegistros.children.length; i++) {
            const element = ContRegistros.children[i];
            element.style.display = "flex";
        }
        FormatoBusqueda.value = "Nada";
    }
};
if (localStorage.getItem("contenedor_registros") !== null) {
    ContRegistros.innerHTML = localStorage.getItem("contenedor_registros");
    for (let i = 0; i < ContRegistros.children.length; i++) {
        const element = ContRegistros.children[i];
        element.style.display = "flex";
    }
}
