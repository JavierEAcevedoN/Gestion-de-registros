const CrearRegistroBtn = document.getElementById("crear_registro_btn")
const ActualizarRegistroBtn = document.getElementById("actualizar_registro_btn")
const EliminarRegistroBtn = document.getElementById("eliminar_registro_btn")
const TipoDeBusqueda = document.getElementById("tipo_de_busqueda")
const Buscador = document.getElementById("buscador")
const ContRegistros = document.getElementById("contenedor_registros")
const CrearRegistro = (event) => {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `${event.clientX}px`;
    div.style.top = `${event.clientY}px`;
    div.innerHTML = `
        <div id="cuadro_input">
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
        </div>
        `
    ContRegistros.parentElement.appendChild(div);
}
const GuardarRegistro = () => {
    const cuadroInput = document.getElementById("cuadro_input");
    const nombreRecurso = document.getElementById("nombre_recurso").value;
    const genero = document.getElementById("genero").value;
    const plataforma = document.getElementById("plataforma").value;
    const estado = document.getElementById("estado").value;
    const formato = document.getElementById("formato").value;
    const fechaT = document.getElementById("fecha_t").value;
    const valoracion = document.getElementById("valoracion").value;
    // Aquí se podría conectar a la base de datos y guardar el registro
    console.log("Registro guardado:", { nombreRecurso, genero, plataforma, estado, formato, fechaT, valoracion });
    // Luego de guardar, se deben limpiar los inputs y remover el cuadro de registro
    cuadroInput.remove();
}