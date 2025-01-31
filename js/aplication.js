document.getElementById("formularioConsulta").onsubmit = async (e) => {
    e.preventDefault(); // Previene el envío del formulario
    
    const dniRuc = document.getElementById("dni").value.trim();
    const tipoConsulta = document.getElementById("tipoConsulta").value; // 'dni' o 'ruc'
    
    // Asegúrate de que el DNI o RUC no esté vacío
    if (!dniRuc) {
        alert("Por favor, ingrese un DNI o RUC válido.");
        return;
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiZXhwIjoxNzMzODU0NDkzfQ.wWWb4IjuEaBldr05xtGrvGI3o6USr-R3jvAwa6vfwc8";

    // Mostramos el spinner
    const spinner = document.getElementById("spinner");
    const resultadoDiv = document.getElementById("resultado");
    const datosConsulta = document.getElementById("datosConsulta");

    spinner.style.display = 'block'; // Mostrar el spinner
    resultadoDiv.style.display = 'none'; // Ocultar resultados anterioresS
    datosConsulta.innerHTML = ''; // Limpiar resultados anteriores

    try {
        let url;

        // Realizamos la solicitud a la API según el tipo de consulta (DNI o RUC)
        if (tipoConsulta === 'dni') {
            url = `https://miapi.cloud/v1/dni/${dniRuc}`;
        } else if (tipoConsulta === 'ruc') {
            url = `https://miapi.cloud/v1/ruc/det/${dniRuc}`;
        }

        const respuesta = await fetch(url, {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Ocultamos el spinner cuando la respuesta llega
        spinner.style.display = 'none';

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        // Intentamos procesar la respuesta JSON
        const respuestaJson = await respuesta.json();
        const { datos } = respuestaJson;

        // Mostrar resultados
        if (!datos || Object.keys(datos).length === 0) {
            resultadoDiv.style.display = 'block';
            datosConsulta.innerHTML = "<p>No se encontraron datos para el DNI o RUC ingresado.</p>";
        } else {
            let listadoDatos = '';

            // Si es DNI, mostramos los datos correspondientes
            if (tipoConsulta === 'dni') {
                listadoDatos = `
                    <li><strong>DNI:</strong> ${datos.dni || "No disponible"}</li>
                    <li><strong>Nombres:</strong> ${datos.nombres || "No disponible"}</li>
                    <li><strong>Apellido Paterno:</strong> ${datos.ape_paterno || "No disponible"}</li>
                    <li><strong>Apellido Materno:</strong> ${datos.ape_materno || "No disponible"}</li>
                    <li><strong>Dirección:</strong> ${datos.domiciliado.direccion || "No disponible"}</li>
                    <li><strong>Distrito:</strong> ${datos.domiciliado.distrito || "No disponible"}</li>
                    <li><strong>Provincia:</strong> ${datos.domiciliado.provincia || "No disponible"}</li>
                    <li><strong>Departamento:</strong> ${datos.domiciliado.departamento || "No disponible"}</li>
                    <li><strong>Ubigeo:</strong> ${datos.domiciliado.ubigeo || "No disponible"}</li>
                `;
            } 
            // Si es RUC, mostramos los datos correspondientes
            else if (tipoConsulta === 'ruc') {
                listadoDatos = `
                    <li><strong>Razón Social:</strong> ${datos.razon_social || "No disponible"}</li>
                    <li><strong>Estado:</strong> ${datos.estado || "No disponible"}</li>
                    <li><strong>Condición:</strong> ${datos.condicion || "No disponible"}</li>
                    <li><strong>Dirección:</strong> ${datos.ubicacion.direccion || "No disponible"}</li>
                    <li><strong>Departamento:</strong> ${datos.ubicacion.departamento || "No disponible"}</li>
                    <li><strong>Provincia:</strong> ${datos.ubicacion.provincia || "No disponible"}</li>
                    <li><strong>Distrito:</strong> ${datos.ubicacion.distrito || "No disponible"}</li>
                    <li><strong>Teléfonos:</strong> ${datos.contacto.numTelefono3 || "No disponible"}</li>
                    <li><strong>Correo 1:</strong> ${datos.correos.codCorreo1 || "No disponible"}</li>
                    <li><strong>Correo 2:</strong> ${datos.correos.codCorreo2 || "No disponible"}</li>
                `;
            }

            // Mostrar los resultados
            resultadoDiv.style.display = 'block';
            datosConsulta.innerHTML = listadoDatos;
        }
    } catch (error) {
        // Ocultamos el spinner en caso de error
        spinner.style.display = 'none';

        console.error(error);
        resultadoDiv.style.display = 'block';
        datosConsulta.innerHTML = `
            <p style="color: red;">
                Ocurrió un error al procesar la solicitud: ${error.message}. 
                Por favor, intente nuevamente más tarde.
            </p>
        `;
    }
};
