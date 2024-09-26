// busquedaDatacrm.js

const { Builder, By, Key, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

async function buscarDatacrm() {
    // Configura las opciones de Chrome para modo headless
    let options = new chrome.Options();
    options.addArguments('--headless'); // Ejecuta Chrome en modo headless
    options.addArguments('--no-sandbox');
    options.addArguments('--disable-dev-shm-usage');
    options.addArguments('--ignore-certificate-errors'); // Ignorar errores SSL
    options.addArguments('--disable-logging'); // Desactivar algunos logs de Chrome
    options.addArguments('--log-level=3'); // Menos errores mostrados en consola

    // Inicia el navegador (Chrome en este caso)
    let driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    try {
        // Navega a Google
        await driver.get('https://www.google.com');

        // Acepta las cookies si es necesario
        try {
            let aceptarCookies = await driver.findElement(By.id('L2AGLb'));
            await aceptarCookies.click();
        } catch (e) {
            // Si no aparece el botón, continúa
        }

        // Encuentra el campo de búsqueda
        let cajaBusqueda = await driver.findElement(By.name('q'));

        // Ingresa "datacrm" y presiona Enter
        await cajaBusqueda.sendKeys('datacrm', Key.RETURN);

        // Espera a que se carguen los resultados
        await driver.wait(until.titleContains('datacrm'), 10000);

        console.log('Búsqueda completada exitosamente.');
    } catch (error) {
        console.error('Ocurrió un error:', error);
        process.exit(1); // Asegura que GitHub Actions detecte el error
    } finally {
        // Cierra el navegador
        await driver.quit();
    }
}

buscarDatacrm();
