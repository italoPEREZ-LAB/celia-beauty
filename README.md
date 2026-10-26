# CELIA BEAUTY · SALÓN BELLEZA INTEGRAL

Proyecto independiente para VS Code, preparado para publicarse después en GitHub y Vercel.

## Abrir la página
1. Extrae el archivo ZIP.
2. Abre la carpeta celia-beauty en VS Code (la que contiene package.json).
3. Abre Terminal > Nueva terminal y ejecuta:

    npm start

4. Visita http://127.0.0.1:3004
5. Detén el servidor con Ctrl+C.

Necesitas Node.js 18 o superior. No hace falta npm install: no hay dependencias.
Si PowerShell bloquea npm.ps1, usa npm.cmd start o node server.cjs.
También puedes abrir public/index.html con Live Server de VS Code.
Si el puerto está ocupado, ejecuta $env:PORT=3005 y después npm start.

## Funciones incluidas
- Portada con imágenes y animaciones en tonos lavanda, rosa, violeta y plata.
- Buscador que reconoce palabras con y sin tildes, filtros y estado sin resultados.
- Detalle de cada referencia.
- Selección de productos con cantidades y eliminación (máximo 9 por referencia).
- La selección se guarda localmente en el navegador; no hay cuenta de usuario.
- Consulta de la selección por WhatsApp.
- Servicios: pintado de uñas, arreglo de cabello y micropigmentación.
- Formulario de solicitud de cita, con servicio, fecha deseada y comentario.
- Menú móvil, ventanas accesibles y soporte de movimiento reducido.
- Enlaces de llamada, WhatsApp y consulta de ubicación.

No hay cobros, existencias sincronizadas ni agenda automática. Los productos y citas se confirman por WhatsApp. La página prepara el texto; el visitante debe enviarlo en WhatsApp.
No se enviaron mensajes durante las pruebas.

## Datos utilizados
Nombre: CELIA BEAUTY · SALÓN BELLEZA INTEGRAL
Teléfono: 992 411 280
WhatsApp: +51 992 411 280 (Perú).
Dirección: Av. ERES MI YANA ÑAWI, tal como fue proporcionada.
No se añadió un pin en Maps porque no se proporcionaron distrito, ciudad ni número. El botón pide la ubicación exacta al salón.
No se inventaron horarios, precios, promociones, marcas ni resultados de tratamientos.

## Productos e imágenes
El catálogo contiene cuatro conjuntos de referencia, NO existencias confirmadas:
- Tu momento de color: maquillaje.
- Tu ritual capilar: cabello.
- Una pausa para tu piel: rostro.
- Color en tus manos: uñas.

Las imágenes fueron generadas como referencias ilustrativas a partir de la dirección visual de las fotos proporcionadas. No son fotos del inventario real.
Los prompts y el origen de las imágenes están en IMAGENES.md.
La estructura de tienda por categorías se inspira en la referencia solicitada https://www.aruma.pe/; no se copiaron sus marcas, promociones ni textos.

## Editar
- public/index.html: textos de portada, servicios, teléfono visible y dirección.
- public/config.js: productos, nombres, descripciones, palabras de búsqueda y teléfono de WhatsApp.
- public/styles.css: colores, tamaños, diseño y animaciones.
- public/app.js: búsqueda, selección y formularios.
- public/assets/: imágenes y emblema.

Para añadir un producto, copia un objeto de products en config.js, cambia su id por uno único y rellena los demás campos. Usa una categoría existente: Maquillaje, Cabello, Rostro o Uñas.
Para cambiar las fotos, añade tus imágenes en public/assets y actualiza image en config.js.
Si cambias el teléfono, actualiza config.js y los enlaces tel: y teléfonos visibles en index.html.
Las fuentes usan Google Fonts con alternativas del dispositivo.

## GitHub (cuando quieras publicarla)
Crea un repositorio vacío celia-beauty, sin README inicial, en tu cuenta.
Desde la terminal dentro de ESTA carpeta:

    git init
    git add .
    git commit -m "Crear Celia Beauty"
    git branch -M main
    git remote add origin https://github.com/italoPEREZ-LAB/celia-beauty.git
    git push -u origin main

Si Git muestra "dubious ownership", autoriza únicamente esta carpeta:

    git config --global --add safe.directory (Get-Location).Path

Luego repite git add, commit y push.
El repositorio se crea por separado de Arotinco, Halloween y las invitaciones.

## Vercel
Importa el repositorio celia-beauty desde https://vercel.com/new.
- Framework Preset: Other.
- Root Directory: raíz del repositorio.
- Output Directory: public.
- Build Command: vacío.
- No necesita compilación ni instalación de dependencias.

vercel.json contiene la configuración. Cuando se publique, usa el dominio de producción para compartir la página y generar un QR.
Referencia técnica: https://vercel.com/docs/builds/configure-a-build

## Actualizar
    git add .
    git commit -m "Actualizar Celia Beauty"
    git push

Con Vercel conectado al repositorio, los cambios se despliegan al mismo proyecto.

## Verificaciones
Sintaxis JS, filtros, búsquedas con tilde y sin resultados, detalle, añadir/quitar productos, cantidades y persistencia tras recarga comprobados.
Menú móvil y vista de 390 px sin desbordamiento; imágenes cargadas y sin errores de consola.
Las cuentas de WhatsApp y la disponibilidad real de productos/servicios deben verificarse con el negocio.

