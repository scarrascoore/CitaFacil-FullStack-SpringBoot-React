# CitaFácil - Full Stack Spring Boot + React

Aplicación Full Stack para la gestión de citas, desarrollada con Spring Boot, React, TypeScript, PostgreSQL y Docker Compose.

Este proyecto forma parte de un portafolio profesional orientado a demostrar conocimientos en desarrollo Full Stack Java, integración frontend-backend, APIs REST, bases de datos relacionales, Docker y buenas prácticas de arquitectura por capas.

---

## Objetivo del proyecto

El objetivo de CitaFácil es permitir el registro y gestión de citas desde una interfaz web conectada a una API REST.

El sistema permite:

- Registrar citas.
- Listar citas.
- Filtrar citas por estado.
- Confirmar citas.
- Cancelar citas.
- Marcar citas como completadas.
- Eliminar citas.
- Consultar y probar la API desde Swagger UI.
- Ejecutar frontend, backend y base de datos con Docker Compose.

---

## Tecnologías utilizadas

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- PostgreSQL
- Jakarta Validation
- Maven
- Swagger / OpenAPI
- Springdoc OpenAPI

### Frontend

- React
- TypeScript
- Vite
- Axios
- CSS

### DevOps / Infraestructura local

- Docker
- Docker Compose
- Nginx
- PostgreSQL en contenedor

---

## Arquitectura general

```text
Navegador Web
     ↓
Frontend React + TypeScript
     ↓ HTTP / JSON
Backend Spring Boot API REST
     ↓ JPA / JDBC
PostgreSQL
```

---

## Arquitectura con docker
![Arquitectura con Docker.png](docs/Arquitectura%20con%20Docker.png)

## Puertos utilizados

| Servicio | Puerto local | Puerto interno | Descripción |
|---|---:|---:|---|
| Frontend React | 5173 | 80 | Interfaz web servida por Nginx |
| Backend Spring Boot | 8080 | 8080 | API REST |
| PostgreSQL Docker | 5433 | 5432 | Base de datos en contenedor |

## Arquitectura del Proyecto
### Arquitectura Backend
![Arq Backend.png](docs/Arq%20Backend.png)
### Arquitectura Frontend
![Arq Frontend.png](docs/Arq%20Frontend.png)

---

## Errores controlados

| Código HTTP | Caso |
|---|---|
| 400 Bad Request | Datos inválidos |
| 404 Not Found | Cita no encontrada |
| 409 Conflict | Operación inválida por estado de la cita |

---

## Autor

Proyecto desarrollado como parte de un portafolio profesional 
de desarrollo Full Stack Java.

- Java
- Spring Boot
- React
- TypeScript
- PostgreSQL
- Docker
- Docker Compose
- API REST
- Arquitectura por capas
- Integración frontend-backend
- Documentación técnica

## LICENCIA

MIT License

Copyright (c) 2026 Shelvy Carrasco Oré

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
