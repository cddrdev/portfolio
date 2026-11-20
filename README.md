# Portfolio de Carlos de Diego Rodríguez

Portfolio personal de un desarrollador full stack junior. Incluye proyectos,
experiencia profesional, tecnologías, formación y enlaces de contacto.

## Tecnologías

- React 19 y JavaScript.
- Vite para desarrollo y compilación.
- CSS con diseño adaptable y soporte para movimiento reducido.
- Instrument Sans e IBM Plex Mono, servidas desde el propio sitio.
- Oxlint para el análisis estático y Playwright para las pruebas de navegador.

## Desarrollo local

Usa una versión de Node.js compatible con Vite 8, como Node.js 22.12 o posterior.

```sh
npm ci
npm run dev
```

Vite muestra la dirección del servidor en la terminal.

## Comprobaciones

```sh
npm run lint
npm run build
npx playwright install chromium
npm test
```

Las pruebas arrancan su propio servidor de producción en
`http://127.0.0.1:4175`. Ese puerto debe estar libre. Comprueban los saltos a
secciones, el menú con teclado y la alternativa sin `IntersectionObserver`,
tanto en escritorio como en móvil. También cubren los idiomas, el tema, su
persistencia, el almacenamiento bloqueado y la preferencia de movimiento
reducido. El header se comprueba entre 320 y 1440 px con ambos idiomas y temas.
El servidor se detiene al terminar.

Para usar Microsoft Edge ya instalado en Windows:

```powershell
$env:PLAYWRIGHT_CHANNEL = 'msedge'
npm test
```

GitHub Actions ejecuta el lint, la compilación y las pruebas de navegador en
cada push o pull request.

## Estructura

```text
src/
  assets/           Foto del perfil
  components/       Secciones y componentes compartidos
  data/             Contenido manual en es.js y en.js; selector en portfolio.js
  hooks/            Comportamiento compartido
  App.jsx           Composición de la página
  index.css         Estilos globales y variables de diseño
  motion.css        Animaciones y movimiento reducido
public/             Iconos y archivos estáticos
tests/              Pruebas de navegador
```

## Actualizar el contenido

Edita `src/data/es.js` y `src/data/en.js` para cambiar el contenido en español
e inglés, respectivamente. Cada archivo contiene el perfil, los proyectos,
la experiencia, las tecnologías, la formación, los contactos, los textos de
interfaz y los metadatos de su idioma. Mantén las mismas claves e identificadores
en ambos. Los enlaces de correo deben usar el prefijo `mailto:`.

El selector ES/EN del header alterna entre estos datos locales sin APIs ni
servicios de traducción. El idioma inicial es español. El botón de sol/luna
alterna entre los temas claro y oscuro; inicialmente respeta el tema del sistema.
Ambas preferencias se guardan en `localStorage` (`portfolio-language` y
`portfolio-theme`). Si el almacenamiento está bloqueado, los controles siguen
funcionando durante la visita. Los colores de ambos temas se definen en
`src/index.css` y las animaciones respetan la preferencia de movimiento reducido.

El proyecto de IA describe un recomendador de productos integrado con Python y
Flask: utilizaba las preferencias del cliente y únicamente el campo de palabras
clave de cada producto en la base de datos para generar recomendaciones.

`index.html` contiene los metadatos iniciales en español y el favicon. Al cambiar
el idioma, el título, las descripciones y el idioma del documento se actualizan
con los metadatos de `src/data/es.js` o `src/data/en.js`.

## Publicación

```sh
npm run build
npm run preview
```

Publica la carpeta `dist/` en un alojamiento de archivos estáticos. La
configuración actual está preparada para servir el portfolio en la raíz de un
dominio. Para publicarlo en un subdirectorio, configura `base` en
`vite.config.js` y adapta la ruta del favicon.

`npm run preview` permite comprobar la compilación localmente. El sitio no
necesita un servidor de aplicación ni variables de entorno para funcionar.
