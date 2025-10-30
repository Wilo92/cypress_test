//acá van las variables globales
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false, // deshabilitar seguridad web
    baseUrl: "https://www.saucedemo.com/",
    pageLoadTimeout: 120000, // 120 segundos ( tiempo de espera para que la página se cargue )
    supportFile: "cypress/support/e2e.js", // donde se encuentran las pruebas
    video: true, // grabar videos de las pruebas
    screenshotOnRunFailure: true, // grabar capturas de pantalla de las pruebas que fallen

    // configuraciones para el navegador
    setupNodeEvents(on, config) {
      // Implementar event listeners aquí
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.family === "chromium") {
          launchOptions.args.push("--disable-web-security"); // Deshabilitar seguridad web
          return launchOptions;
        }
      });
    }
  },
});
