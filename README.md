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

#### Configuración de webpack.config.js

 >Clase 5

configuramos nuestro archivo 
`webpack.config.js` 

luego ejecutamos en la consola
`npx webpack --mode production --config webpack.config.js`

creamos un script de build en json
`"build" : "webpack --mode production"`

### M3 - Loaders y Plugins en Webpack

#### Babel loader para Javascript

 >Clase 6

Babel te permite hacer que tu código JavaScript sea compatible con todos los navegadores

**!Debes agregar a tu proyecto las siguientes dependencias**

`npm install babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime -D`

`babel-loader` nos permite usar babel con webpack
`@babel/core` es babel en general
`@babel/preset-env` trae y te permite usar las ultimas características de JavaScript
`@babel/plugin-transform-runtime` te permite trabajar con todo el tema de asincronismo como ser async y await

Debes crear el archivo de configuración de babel el cual tiene como nombre `.babelrc`

Para comenzar a utilizar webpack debemos agregar la siguiente configuración en `webpack.config.js`

``` js 
    module : { 
        rules : [
            {
                test : /\.m?js$/,
                exclude : /node_modules/,
                use : {
                    loader: 'babel-loader'
                }
            }
        ]},
```

finalmente npm run build

RESUMEN: Babel te ayuda a transpilar el código JavaScript, a un resultado el cual todos los navegadores lo puedan entender y ejecutar. Trae “extensiones” o plugins las cuales nos permiten tener características más allá del JavaScript común

#### HTML Loader

 >Clase 7

`HtmlWebpackPlugin`
Es un plugin para inyectar javascript, css, favicons, y nos facilita la tarea de enlazar los bundles a nuestro template HTML.

Instalacion:
`npm i html-webpack-plugin -D`

webpack config queda asi
``` jsx
    const path = require('path')
    const HtmlWebpackPlugin = require('html-webpack-plugin')

    module.exports = {
        mode: 'production', // LE INDICO EL MODO EXPLICITAMENTE
        entry: './src/index.js', // el punto de entrada de mi aplicación
        output: { // Esta es la salida de mi bundle
            path: path.resolve(__dirname, 'dist'),
            // resolve lo que hace es darnos la ruta absoluta de el S.O hasta nuestro archivo
            // para no tener conflictos entre Linux, Windows, etc
            filename: 'bundle.js', 
            // EL NOMBRE DEL ARCHIVO FINAL,
        },
        resolve: {
            extensions: ['.js'] // LOS ARCHIVOS QUE WEBPACK VA A LEER
        },
        module: {
            // REGLAS PARA TRABAJAR CON WEBPACK
            rules : [
                {
                    test: /\.m?js$/, // LEE LOS ARCHIVOS CON EXTENSION .JS,
                    exclude: /node_modules/, // IGNORA LOS MODULOS DE LA CARPETA
                    use: {
                        loader: 'babel-loader'
                    }
                }
            ]
        },
        // SECCION DE PLUGINS
        plugins: [
            new HtmlWebpackPlugin({ // CONFIGURACIÓN DEL PLUGIN
                inject: true, // INYECTA EL BUNDLE AL TEMPLATE HTML
                template: './public/index.html', // LA RUTA AL TEMPLATE HTML
                filename: './index.html' // NOMBRE FINAL DEL ARCHIVO
            })
        ]
    }
```
Destacar que antes de transpilar eliminamos el script directo que lleva el html ya que webpack se encargara de ello.

listo
`npm run build`

#### Loaders para CSS y preprocesadores de CSS

 >Clase 8

para CSS
`npm install mini-css-extract-plugin css-loader -D`

**css-loader** ⇒ Loader para reconocer CSS
**mini-css-extract-plugin** ⇒ Extrae el CSS en archivos

para SASS
`npm install node-sass sass-loader -D`

``` js
    {
        test: /\.s?css$/,
        use: [MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader"]
    }
```

para STYLUS
`npm install stylus stylus-loader -D`

luego agregamos la config de este en webpack.config e importamos archivo styl en index.js

#### Copia de archivos con webpack

 >Clase 9

`npm install copy-webpack-plugin -D`

webpack.config.js

``` js 
    const CopyWebpackPlugin = require('copy-webpack-plugin');

    new CopyWebpackPlugin({
            patterns : [
                {
                    from: path.resolve(__dirname, 'src', 'assets/images'),
                    to: 'assets/images'
                }
            ]
        })
```

importante en Template.js cambiar las rutas finales de los assets.

#### Loaders de imágenes

 >Clase 10

Este loader nos permite importar de forma dinámica en nuestros archivos JavaScript imágenes, el loader le genera un hash unico para cada imagen. Algo parecido sucede con ReactJS al importar imágenes

**Configuración**
Al final de las rules:

``` js 
    {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
    }
```

Si quieren que las imagenes generadas se guarden en la carpeta images/ pueden agregar la opcion dentro de rules.

``` js
        generator: {
            filename: 'static/images/[hash][ext][query]'
        }
```

importamos en template cada una de las imágenes, transpilamos y nos genera un hash por cada una.

#### Loaders de fuentes 

 >Clase 11

Configuramos en nuestro CSS el consumo de fuentes de forma local

``` css 
    @font-face {
        font-family: 'Ubuntu';
        src: url('../assets/fonts/ubuntu-regular.woff2') format('woff2'),
            url('../assets/fonts/ubuntu-regular.woff') format('woff');
        
        font-weight: 400;
        font-style: normal;
    }
```

Luego instalamos `npm install url-loader file-loader -D` nos ayuda a leer archivos y tambien moverlos.


Creamos una configuración para las fuentes en webpack config dentro de rules:

``` js 
    ...
    {
        test : /\.(woff|woff2)$/,
        use : {
            loader: 'url-loader',
            options : {
                limit: 10000,
                mimetype: 'application/font-woff',
                name: "[name].[ext]",
                outputPath: './assets/fonts/',
                publicPath: './assets/fonts/',
                esModule : false,
            }
        }
    }
```

Transpilamos.
