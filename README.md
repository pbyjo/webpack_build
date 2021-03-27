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

#### Optimización: hashes, compresión y minificación de archivos

 >Clase 12

`npm install css-minimizer-webpack-plugin terser-webpack-plugin -D`

config: 

``` js
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

    optimization : {
        minimize : true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }

    /* cambiamos algunas configs para generar un hash en los archivos qeu queremos, es opcional y lo podemos hacer con diferentes archivos que queramos optimizar en el cache */
    filename : '[name].[contenthash].js',
    name: "[name].[contenthash].[ext]",
    new MiniCssExtractPlugin({
        //Le anadimos una configuracion al plugin que nos permite compilar en css
        filename : 'assets/[name].[contenthash].css'
    }),
```

Transpilamos.
/////////////////

Webpack nos comunica que actualmente terser-webpack-plugin viene incluido desde webpack 5

``` js
    module.exports = {
        ...
        optimization: {
            minimize:true
        }
    }
```

Es decir que no podemos usar la propiedad minimizer: []. Pero si deseáramos personalizar la optimización y agregar plugins como ser css-minimizer-webpack-plugin ahi toca instalar y usar terser-webpack-plugin dentro de optimizations, otro caso de este tipo sería si desearas personalizar el plugin de terser

Una de las cosas mas importantes por la cual utilizamos webpack es la optimización de nuestro proyecto, en comprimir nuestro css, nuestro javascript y optimizar nuestras imagenes, entre otras caracteristicas.

#### Webpack Alias

 >Clase 13

Alias ⇒ nos permiten otorgar nombres paths específicos evitando los paths largos

Para crear un alias debes agregar la siguiente configuración a webpack

``` js
    module.exports = {
        ...
        resolve: {
            ...
                alias: {
                    '@nombreDeAlias': path.resolve(__dirname, 'src/<directorio>'),
                },
        }
    }
```

Puedes usarlo en los imports de la siguiente manera.

`import modulo from "@ejemplo/archivo.js";`

### M4 - Deploy del proyecto

#### Variables de entorno

 >Clase 14

Instalamos dependencias

`npm install dotenv-webpack -D`

En la raíz de nuestro proyecto creamos .env y .env-example donde viviran las variables de entorno. en .env-example no se indica el valor de las variables utilizadas

Este no se sube al repositorio por lo que se debe ignorar en gitignore

agregamos a nuestra config en webpack

``` js
const Dotenv = require('dotenv-webpack');

    //En plugins: 
        new Dotenv(),

```

De esta forma y como ejemplo podemos proteger los datos asignados a una variable, en este caso:

``` js
const API = process.env.API; // consumido desde .env
```

#### Webpack en modo desarrollo

 >Clase 15

En este modo creamos un nuevo archivo de config webpack donde especificamos solo lo que necesitamos para este modo

no necesitamos optimizacion, terser ni css minimizer y estipulamos el modo

``` js 
    module.exports = {
        mode: 'development';
    }
```

por ultimo modificamos nuestro script en modo dev

`"dev": "webpack --config webpack.config.dev.js",`

#### Webpack en modo producción

 >Clase 16

`npm install clean-webpack-plugin -D`

Este plugin nos permite limpiar nuestro directorio dist de todos los archivos que hemos generado durante el proyecto y que no necesitamos y darle un nuevo orden

agregamos `const {CleanWebpackPlugin} = require('clean-webpack-plugin');`

``` js
    const {CleanWebpackPlugin} = require('clean-webpack-plugin');

    plugins : [
        new CleanWebpackPlugin(),
    ]
```

script `"build": "webpack --mode production --config webpack.config.js",`

Transpilamos con el script y se eliminan los archivos sobrantes en este modo.

#### Webpack Watch

 >Clase 17

Existen dos formas de ejecutar watch.

El primero es agregando un watch : true, en nuestro module.exports, o agregando el parametro directamente en el script del modo en el que queremos ver cambios en tiempo real.

Es una mala practica agregar este parametro en modo produccion ya que demora mas en hacer los cambios al tener mas tareas que ejecutar y mostrarlos en tiempo real.

#### Deploy a netlify

 >Clase 18

Enlazar el repo del proyecto a netlify

Primero creamos un archivo en la raíz llamado netlify.toml con la siguiente config

``` js
    [build]
        publish = "dist"
        command = "npm run build"
```

es importante no tener dist en gitignore

Luego pusheamos al repo remoto en github

Para no pushear .env necesitamos crear un script para estas variables de entornos en nuestro deploy del build de la app que estamos creando

creamos una carpeta en la raíz que se llamara scripts y creamos `create-env.js`

--- . ---

Luego vamos a los deploy settings en netlify y en enviroments agregamos la variable API con su valor.

agregamos al script build `"build": "node ./scripts/create-env.js && webpack --mode production --config webpack.config.js",`

Pusheamos de nuevo a nuestro repositorio.

netlify detecta estos cambios automaticamente haciendo deploy en tiempo real y en el preview del proyecto deberia estar funcionando correctamente :)

### M5 - Herramientas de desarrollo complementarias

#### Webpack dev server

 >Clase 19

`npm install webpack-dev-server -D`

Esto para crear un servidor de desarrollo de forma local (este server solo lo habilitamos en el modo dev

agregamos configuración: 

``` js 
    devServer : {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        historyApiFallback : true,
        port: 3006,
    },
```

script:
`"dev:server:start": "webpack serve --config webpack.config.dev.js"`

nota: no necesitamos el modo watch en esta configuración, es decir, nuestro live-server con el modo watch viene a ser reemplazado por esta dependencia de desarrollo además de que nos da la ventaja de asignar el puerto en el que queremos ver nuestra app y en lo personal me gusta que no abra el servidor de forma automática sino yo mismo typearlo.

