# Proyecto de Pruebas Automatizadas con Cypress

![Cypress Logo](https://raw.githubusercontent.com/cypress-io/cypress/develop/assets/cypress-logo-dark.png)


## Descripción
Este proyecto contiene pruebas end-to-end (E2E) desarrolladas con [Cypress](https://www.cypress.io/) para validar el funcionamiento del sitio web [https://www.saucedemo.com](https://www.saucedemo.com).  
Se automatizan escenarios relacionados con el inicio de sesión (login) y cierre de sesión (logout), verificando tanto casos válidos como errores esperados.

---

## Estructura del Proyecto

```
cypress_prueba/
│
├── cypress/
│   ├── e2e/
│   │   ├── login_logout.cy.js           # Prueba login y logout correcto
│   │   ├── login_invalid.cy.js          # Prueba login con credenciales incorrectas
│   │   └── login_empty_fields.cy.js     # Prueba login con campos vacíos
│   │
│   ├── downloads/                       # Descargas (si aplica)
│   ├── fixtures/                        # Datos de prueba (opcional)
│   ├── videos/                          # Se guardan los videos de ejecución
│   └── screenshots/                     # Capturas de errores automáticas
│
├── node_modules/
├── package.json
├── package-lock.json
└── cypress.config.js
```

---

## Instalación y Configuración

###  Clonar el repositorio
```bash
git clone https://github.com/Wilo92/cypress_test
cd cypress_prueba
```

###  Instalar dependencias
```bash
npm install
```

Esto instalará Cypress y todas las dependencias necesarias que están en el archivo `package.json`.

###  Estructura de configuración básica (`cypress.config.js`)
```js
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: false,
    video: true,
    videoUploadOnPasses: false,
    screenshotOnRunFailure: true,
    setupNodeEvents(on, config) {
      return config
    }
  }
})
```

---

## Ejecución de las Pruebas

### Abrir el panel interactivo de Cypress
Permite ejecutar pruebas visualmente y ver paso a paso:

```bash
npx cypress open
```

### Ejecutar todas las pruebas en modo headless (sin abrir navegador)
Genera **videos automáticos** de todas las pruebas:

```bash
npx cypress run
```

### Ejecutar una prueba específica
Ejemplo:

```bash
npx cypress run --spec "cypress/e2e/login_logout.cy.js"
```

---

## Resultados y Evidencias

###  Ejecución visual
![Ejecución Cypress](./docs/cypress-run.png)

### Video generado
Los videos se guardan automáticamente en la carpeta:
```
cypress/videos/
```

Ejemplo:  
```
cypress/videos/login_logout.cy.js.mp4
```


---

## Casos de Prueba Incluidos

| Archivo | Descripción |
|----------|--------------|
| `login_logout.cy.js` | Verifica login correcto y logout exitoso |
| `login_invalid.cy.js` | Prueba credenciales incorrectas y mensaje de error |
| `login_empty_fields.cy.js` | Prueba campos vacíos y validación “Username is required” |

---

## Comandos Útiles

| Comando | Descripción |
|----------|--------------|
| `npm install` | Instala dependencias |
| `npx cypress open` | Abre interfaz visual de pruebas |
| `npx cypress run` | Ejecuta pruebas grabando video |
| `npx cypress run --spec "ruta/al/archivo"` | Ejecuta prueba específica |

---


##  Requisitos Previos

- Tener instalado **Node.js** (v16 o superior)
- Tener **npm** configurado
- Sistema operativo: Windows, macOS o Linux

---

##  Autores
**Wilmer Restrepo**
**Mario Yepes** 
**Nicolas Giraldo** 

Proyecto de demostración QA con Cypress  
Año: 2025  

---

##  Licencia
Este proyecto es libre para uso académico y de aprendizaje.
