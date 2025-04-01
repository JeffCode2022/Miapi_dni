# Consulta de DNI y RUC

Este proyecto es una aplicación web que permite consultar información de personas y empresas a través de sus DNI y RUC respectivamente. La aplicación utiliza una API externa para obtener los datos y presenta una interfaz de usuario intuitiva y responsiva.

## Características

- Consulta de DNI de personas naturales
- Consulta de RUC de empresas
- Interfaz de usuario moderna y responsiva
- Indicador de carga durante las consultas
- Manejo de errores y validaciones
- Diseño adaptable a diferentes dispositivos

## Tecnologías Utilizadas

- HTML5
- CSS3
- JavaScript (Vanilla)
- API externa para consultas de DNI y RUC

## Estructura del Proyecto

```
├── index.html          # Página principal
├── js/
│   └── aplication.js  # Lógica de la aplicación
└── style/
    └── style.css      # Estilos de la aplicación
```

## Funcionalidades

### Consulta de DNI
- Muestra información detallada de la persona:
  - Número de DNI
  - Nombres y apellidos
  - Dirección completa
  - Ubigeo
  - Distrito, provincia y departamento

### Consulta de RUC
- Muestra información detallada de la empresa:
  - Razón social
  - Estado y condición
  - Dirección completa
  - Información de contacto
  - Correos electrónicos

## Instalación y Uso

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
```

2. Abre el archivo `index.html` en tu navegador web.

3. Selecciona el tipo de consulta (DNI o RUC) y ingresa el número correspondiente.

4. Haz clic en "Consultar" para obtener la información.

## Requisitos

- Navegador web moderno con soporte para JavaScript ES6+
- Conexión a internet para realizar las consultas a la API
- Token de autenticación válido para la API

## Diseño Responsivo

La aplicación está diseñada para funcionar correctamente en:
- Dispositivos móviles
- Tablets
- Computadoras de escritorio

## Manejo de Errores

La aplicación incluye:
- Validación de campos vacíos
- Manejo de errores de conexión
- Mensajes de error claros para el usuario
- Indicador de carga durante las consultas

## Seguridad

- Validación de datos de entrada
- Manejo seguro de tokens de autenticación
- Protección contra inyección de código

## Contribuciones

Las contribuciones son bienvenidas. Por favor, asegúrate de:
1. Hacer un fork del proyecto
2. Crear una rama para tu feature
3. Hacer commit de tus cambios
4. Hacer push a la rama
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para cualquier consulta o sugerencia, por favor contacta al desarrollador principal. 