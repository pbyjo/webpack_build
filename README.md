# Curso de webpack

### M1 - Introducción a webpack

#### ¿Que es webpack?

 >Clase 1

Es una herramienta que nos ayuda a preparar nuestro codigo para enviarlo a producción (module bundler)

Module bundlers son herramientas de frontend que nos permiten usar archivos con módulos JavaScript, entre otras características y convertiros a un JavaScript el cual el navegador pueda entender

Webpack nos permite trabajar con

    HTML
    CSS
    JavaScript
    Archivos estáticos
    Imágenes
    Fuentes

Tambien nos permite tener un modo en desarrollo para nuestros proyectos para hacer pruebas

Nacio en el 2012, desde ese entonces varias empresas lo usan como ser

    Twitter
    Instagram
    PayPal

También nos permite

    Gestionar dependencias
    Ejecutar tareas
    Conversión de archivos

Nos permite trabajar en módulos

    Permitiéndonos tener un código separado en desarrollo, pero en producción en una fuente
    Webpack permite tener módulos de JS en formato
        AMD
        Common JS
        ES15

RESUMEN: Webpack es un module bundler que nos permite trabajar con una variedad de tecnologías web empezando desde HTML y terminando con JS. Además de tener soporte para archivos estáticos

#### Conceptos básicos

 >Clase 2

Webpack: paquete de modulos estáticos para aplicaciónes de js modernas

este construye un gráfico de dependencias que mapea cada módulo para convertirlo en uno o mas sea el caso

**Loader** Te permite hacer un bundle de cualquier recurso estático más allá de JavaScript
**Plugins** Extienden recursos para añadir configuraciones y particularidades de recursos externos

Desde webpack 4 ya no dependemos de tener un archivo de configuración, pero si debemos tener un punto de entrada

*Tambien tendremos que tener un punto de salida*

    En este punto se creará nuestro proyecto una vez esté preparado
    Normalmente es la carpeta dist ⇒ Distribution

*Tambien contamos con diferentes modos*

    Modo de desarrollo
    Modo de producción
    Modos de performance
        Donde tu añades
            Configuraciones de minificación
            Donde se va enviar
            Carpeta de destino

*Modos de desarrollo local*

    Donde puedes
        Crear puertos específicos para tu proyecto
        Ver cambios en tiempo real

Dispone de loader y plugins permitiéndonos preparar particularidades de nuestro proyecto

### M2 - Proyecto

#### Primer build con WP

 >Clase 3

`git init`
`npm init -y` <!-- con el indicativo -y nos da una configuración por defecto -->
`npm init`

La carpeta SRC es el source de todo el proyecto ( index.js , imágenes, utils, assets, helpers, database, etc).

Instalar webpack
`npm i webpack@v webpack-cli@v -D` <!-- Con el indicativo -D estipulamos que es una dependencia de desarrollo -->

Ejecutar webpack
`npx webpack`

Al hacer esto webpack creo una carpeta llamada dist, esto lo hace por defecto webpack sin preguntarnos.

**Modo de desarrollo**
Por defecto webpack al compilar nuestro proyecto setea el modo “production” implícitamente pero podemos definirle el modo explícitamente corriendo:

`npx webpack --mode production`
`npx webpack --mode development`

La diferencia radica que el modo development deja el código mas legible para los desarrolladores pero con comentarios, el modo production deja el código comprimido y mas limpio para usarse.

#### Instalación de webpack y construcción del proyecto

 >Clase 4

clonamos `https://github.com/gndx/js-portfolio` donde tenemos ya los archivos preparados para trabajar con el proyecto e instalamos webpack dentro de este.




