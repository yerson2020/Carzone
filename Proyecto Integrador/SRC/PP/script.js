// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar elementos del DOM que vamos a manipular
    const navLinks = document.querySelectorAll('.top-bar nav ul li a');
    const mainNavLinks = document.querySelectorAll('.header-main nav.main-nav ul li a');
    const contactButton = document.querySelector('.welcome-services .appointment .button');
    const contactOptions = document.querySelectorAll('.welcome-services .contact-options .option');

    // Agregar funcionalidad a los enlaces de navegación superior
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la recarga de la página
            const targetId = event.target.getAttribute('href');
            // Aquí puedes agregar la lógica para navegar a diferentes secciones de la página
            // Por ejemplo, si tienes secciones con IDs, puedes usar:
            // const targetElement = document.querySelector(targetId);
            // if (targetElement) {
            //     targetElement.scrollIntoView({ behavior: 'smooth' });
            // } else {
            //     console.log(`Sección con ID "${targetId}" no encontrada.`);
            // }
            console.log(`Enlace "${event.target.textContent}" clickeado. Redirigiendo a: ${targetId}`);
            // Por ahora, solo mostramos un mensaje en la consola
        });
    });

    // Agregar funcionalidad a los enlaces de navegación principal (si es necesario)
    mainNavLinks.forEach(link => {
        if (link.getAttribute('href') === '#') { // Evitar el enlace con texto largo
            link.addEventListener('click', (event) => {
                event.preventDefault();
                console.log(`Enlace principal clickeado.`);
                // Aquí puedes agregar más lógica si estos enlaces deben hacer algo
            });
        }
    });

    // Agregar funcionalidad al botón de contacto
    if (contactButton) {
        contactButton.addEventListener('click', (event) => {
            event.preventDefault();
            console.log('Botón "Contactanos" clickeado.');
            // Aquí puedes agregar la lógica para mostrar un formulario de contacto,
            // redirigir a una página de contacto, etc.
            alert('¡Gracias por contactarnos! Te responderemos pronto.');
        });
    }

    // Agregar funcionalidad a las opciones de contacto (iconos)
    contactOptions.forEach(option => {
        option.addEventListener('click', () => {
            const optionText = option.querySelector('span').textContent.toLowerCase();
            console.log(`Opción de contacto "${optionText}" clickeada.`);
            // Aquí puedes agregar la lógica específica para cada opción de contacto
            switch (optionText) {
                case 'llamadas':
                    alert('Puedes llamarnos al [Número de teléfono].');
                    break;
                case 'correo':
                    alert('Envíanos un correo a [Dirección de correo electrónico].');
                    break;
                case 'facebook':
                    window.open('[Enlace a tu página de Facebook]', '_blank');
                    break;
                case 'instagram':
                    window.open('[Enlace a tu perfil de Instagram]', '_blank');
                    break;
                case 'x':
                    window.open('[Enlace a tu perfil de X (Twitter)]', '_blank');
                    break;
                default:
                    console.log(`No se ha definido ninguna acción para la opción "${optionText}".`);
            }
        });
    });

    // Puedes agregar más funcionalidades aquí según las necesidades de tu página
    // Por ejemplo:
    // - Validación de formularios
    // - Animaciones al hacer scroll
    // - Carga dinámica de contenido
});