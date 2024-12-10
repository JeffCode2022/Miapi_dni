document.getElementById("formularioConsulta").onsubmit = async (e) => {
    e.preventDefault(); // Previene el envío del formulario
    
    const dni = document.getElementById("dni").value.trim();
    
    // Asegúrate de que el DNI no esté vacío
    if (!dni) {
        alert("Por favor, ingrese un DNI válido.");
        return;
    }

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMiwiZXhwIjoxNzMzODU0NDkzfQ.wWWb4IjuEaBldr05xtGrvGI3o6USr-R3jvAwa6vfwc8";

    try {
        // Realizamos la solicitud a la API
        const respuesta = await fetch(`https://miapi.cloud/v1/dni/${dni}`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!respuesta.ok) {
            throw new Error(`Error: ${respuesta.status} ${respuesta.statusText}`);
        }

        // Intentamos procesar la respuesta JSON
        const respuestaJson = await respuesta.json();
        
        // Comprobamos si la respuesta contiene 'datos'
        const { datos } = respuestaJson;
        
        // Mostrar resultados
        const resultadosDiv = document.getElementById("resultado");
        resultadosDiv.innerHTML = "";

        // Si no se encuentran datos, mostramos un mensaje
        if (!datos || Object.keys(datos).length === 0) {
            resultadosDiv.innerHTML = "<p>No se encontraron datos para el DNI ingresado.</p>";
        } else {
            // Procesamos los datos para mostrar las propiedades correctamente
            const listadoDatos = Object.entries(datos)
                .map(([key, value]) => {
                    if (key === "domiciliado" && typeof value === "object" && value !== null) {
                        // Mostramos las propiedades del objeto 'domiciliado' de forma estructurada
                        value = `
                            <ul>
                                <li><strong>Dirección:</strong> ${value.direccion}</li>
                                <li><strong>Distrito:</strong> ${value.distrito}</li>
                                <li><strong>Provincia:</strong> ${value.provincia}</li>
                                <li><strong>Departamento:</strong> ${value.departamento}</li>
                                <li><strong>Ubigeo:</strong> ${value.ubigeo}</li>
                            </ul>
                        `;
                    } else {
                        // Mostramos el valor de la propiedad normalmente
                        value = value !== null ? value : "No disponible";
                    }
                    return `<li><strong>${key}:</strong> ${value}</li>`;
                })
                .join("");

            resultadosDiv.innerHTML = `<ul>${listadoDatos}</ul>`;
            resultadosDiv.style.display = 'block'; // Mostrar resultados
        }
    } catch (error) {
        // Manejamos errores de la solicitud
        console.error(error);
        const resultadosDiv = document.getElementById("resultado");
        resultadosDiv.innerHTML = `
            <p style="color: red;">
                Ocurrió un error al procesar la solicitud: ${error.message}. 
                Por favor, intente nuevamente más tarde.
            </p>
        `;
        resultadosDiv.style.display = 'block'; // Mostrar error
    }
};
