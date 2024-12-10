document.getElementById("formularioConsulta").onsubmit = async (e) => {
    e.preventDefault(); // Previene el envío del formulario

    const dniORuc = document.getElementById("dni").value.trim();
    const tipoConsulta = document.getElementById("tipoConsulta").value; // Obtener el tipo de consulta (DNI o RUC)

    // Asegúrate de que el campo no esté vacío
    if (!dniORuc) {
        alert("Por favor, ingrese un DNI o RUC válido.");
        return;
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiZXhwIjoxNzMzODU0NDkzfQ.wWWb4IjuEaBldr05xtGrvGI3o6USr-R3jvAwa6vfwc8";

    try {
        // Ajustamos la URL según el tipo de consulta (DNI o RUC)
        const endpoint = tipoConsulta === "dni"
            ? `https://miapi.cloud/v1/dni/${dniORuc}`
            : `https://miapi.cloud/v1/ruc/det/${dniORuc}`;

        // Realizamos la solicitud a la API
        const respuesta = await fetch(endpoint, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        // Intentamos procesar la respuesta JSON
        const respuestaJson = await respuesta.json();

        // Comprobamos si la respuesta contiene 'datos'
        const { datos } = respuestaJson;

        // Verificar si el div de resultados existe
        const resultadosDiv = document.getElementById("resultado");
        const listadoDatosDiv = document.getElementById("datosConsulta");

        if (!resultadosDiv || !listadoDatosDiv) {
            throw new Error("Los elementos de resultados no existen.");
        }

        resultadosDiv.style.display = 'block'; // Mostrar la sección de resultados
        listadoDatosDiv.innerHTML = ""; // Limpiar resultados anteriores

        // Si no se encuentran datos, mostramos un mensaje
        if (!datos || Object.keys(datos).length === 0) {
            listadoDatosDiv.innerHTML = "<p>No se encontraron datos para el DNI/RUC ingresado.</p>";
        } else {
            if (tipoConsulta === "dni") {
                // Mostrar resultados específicos para DNI
                listadoDatosDiv.innerHTML = `
                    <ul>
                        <li><strong>DNI:</strong> ${datos.dni || "No disponible"}</li>
                        <li><strong>Nombres:</strong> ${datos.nombres || "No disponible"}</li>
                        <li><strong>Apellido Paterno:</strong> ${datos.ape_paterno || "No disponible"}</li>
                        <li><strong>Apellido Materno:</strong> ${datos.ape_materno || "No disponible"}</li>
                        <li><strong>Dirección:</strong> ${datos.domiciliado?.direccion || "No disponible"}</li>
                        <li><strong>Distrito:</strong> ${datos.domiciliado?.distrito || "No disponible"}</li>
                        <li><strong>Provincia:</strong> ${datos.domiciliado?.provincia || "No disponible"}</li>
                        <li><strong>Departamento:</strong> ${datos.domiciliado?.departamento || "No disponible"}</li>
                    </ul>
                `;
            } else if (tipoConsulta === "ruc") {
                // Mostrar resultados específicos para RUC
                listadoDatosDiv.innerHTML = `
                    <ul>
                        <li><strong>Razón Social:</strong> ${datos.razon_social || "No disponible"}</li>
                        <li><strong>Estado:</strong> ${datos.estado || "No disponible"}</li>
                        <li><strong>Condición:</strong> ${datos.condicion || "No disponible"}</li>
                        <li><strong>Dirección:</strong> ${datos.ubicacion?.direccion || "No disponible"}</li>
                        <li><strong>Departamento:</strong> ${datos.ubicacion?.departamento || "No disponible"}</li>
                        <li><strong>Provincia:</strong> ${datos.ubicacion?.provincia || "No disponible"}</li>
                        <li><strong>Distrito:</strong> ${datos.ubicacion?.distrito || "No disponible"}</li>
                        <li><strong>Teléfono 1:</strong> ${datos.contacto?.numTelefono1 || "No disponible"}</li>
                        <li><strong>Teléfono 2:</strong> ${datos.contacto?.numTelefono2 || "No disponible"}</li>
                        <li><strong>Teléfono 3:</strong> ${datos.contacto?.numTelefono3 || "No disponible"}</li>
                        <li><strong>Correo 1:</strong> ${datos.correos?.codCorreo1 || "No disponible"}</li>
                        <li><strong>Correo 2:</strong> ${datos.correos?.codCorreo2 || "No disponible"}</li>
                    </ul>
                `;
            }
        }
    } catch (error) {
        console.error(error);
        alert("Ocurrió un error: " + error.message);
    }
};
