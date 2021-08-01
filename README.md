# Semana 2: Profile NFT

Task-1: Diseño de la primera card (pequeña==mini NFT). <br>
Task-2: Maquetar cromo NFT del perfil de usuario (parte delantera y trasera). <br>
Task-3: Agregar un botón al perfil del usuario para ver las tajetas NFT. <br>
Task-4: Al hacer doble clic en la card debe verse el reverso de la tarjeta. <br>
Task-5: Generar el QR automáticamente. <br>
Task-6: Implementar una API para crear el avatar al hacer click en el círculo de la imagen del perfil. <br>
Task- (extra): Implementar levitación o algún tipo de animación a las NFT. <br>

# Diseño del avatar con The Character Creator

Es una interface frontend (WEB) para la creación de personajes en formato SVG o PNG. Los personajes originalmente se pueden exportar para su uso en juegos, cómics, etc.
Parece estar creada solamente con html, css, javascript y puede que con jQuery. Hay que linkarla sobre Linux, por lo que he tenido que modificarla de forma remota en el servidor. La WEB del autor parece funcionar bién pero al compilar he encontronado varios errores que he tenido que solventar, como archivos fuera de su ubicación, nodos que el programa no encontraba, etc. La exportación a PNG tampoco me funcionaba, por lo que he tenido que implementar mi propio método de conversión.
Tiene licencia GPL por lo que me ha sido posible su adaptación para su uso por mi aplicación. Ahora al pulsar DONE en vez de descargar los archivos los recojo en mi aplicación.
La API la ejecuto en un iframe y me comunico con esta mediante Window.postMessage.

# El gráfico tipo Radar con los skills.

El gráfico central lo he creado mediante Apexcharts. Los diferentes skills los dispongo de forma geométrica alrededor del gráfico. Si hay menos de cinco skills cámbio el número de vertices del gráfico y calcúlo las posiciones adecuadas de los datos en pantalla.

![image](https://user-images.githubusercontent.com/29376434/127755506-38a67fc9-f36b-4aec-8b28-9d564887aef7.png)
![image](https://user-images.githubusercontent.com/29376434/127755583-60f705dd-925d-4ebb-b08e-d0263007395a.png)

# Las animaciones

Imágenes y texto ocupan diferentes elevaciones. También he aplicado una animación a las sombras de las cartas NFT.

<p align="center"><img align="center" src="https://user-images.githubusercontent.com/29376434/127755695-b4844042-2443-42ed-bd38-f2a3cd7c53ba.png"/></p>

# Repositorios

El repositorio con el código modificado de Character Creator es [https://github.com/manuelgarciacr/charactercreator](https://github.com/manuelgarciacr/charactercreator)

# Deploy

Sigue siendo la misma URL del reto anterior: [http://manuelgc.eu/nuwe2101](http://manuelgc.eu/nuwe2101)

# CodeFactor

Calificación global "A"

![image](https://user-images.githubusercontent.com/29376434/127756173-e0d2588d-42d4-427d-8fe3-51cd0a884386.png)

# Semana 1: Pantalla responsive para el perfil de usuario y su modificación

Task-1: Maquetar el header. <br>
Task-2: Maquetar la segunda card.<br>
Task-3: Maquetar la card con las gráficas de skills.<br>
Task-4: Agregar gestión del estado utilizando Redux.<br>
Task-5: Agregar la funcionalidad de edición para al Task-1 y Task-2.<br>

La tarea número seis solo he podido empezarla, registrándome en Unplash y curioseando un poco por las distintas opciones

# Tecnología

He utilizádo las últimas versiones:

React 17.0.2<br>
Typescript 4.3.5<br>
Controles y theming con Material UI 4.12.2<br>
React Redux 7.2.4<br>
React Router 5.2.0<br>
The Character Creator [https://github.com/ubik23/charactercreator](https://github.com/ubik23/charactercreator)
Apexcharts 3.27.3
qrcode.react 1.0.1

# Arquitectura

Redux es una librería para el manejo del estado basada en la librería Flux de Facebook, y muchos la consideran en si misma una forma de arquitectura de software.
Aquí he intentado combinarla con un diseño DDD, con servicios iniciando el flujo de datos y un patrón de puertos y adaptadores que aisla las diferentes tecnologías.
Los reducers no atacan diréctamente las BBDD, sino que llaman a servicios, que acceden a los repositorios y estos a su vez a los diferentes adaptadores.

# Repositorio

Es un repositorio de GitHub con una única rama principal llamada master.
La estructura de las carpetas es:

SRC -- app (hooks, store, utils)<br>
&emsp;&emsp;|<br>
&emsp;&emsp;-- domain -- model (HardSkills, IdName, PersonalProfile, etc)<br>
&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;&emsp;|<br>
&emsp;&emsp;&emsp;|&emsp;&emsp;&emsp;&emsp;-- services  (CompanyTypeSvc, NuweProfileSvc, PersonalProfileSvc, etc)<br>
&emsp;&emsp;&emsp;|&emsp;&emsp;<br>
&emsp;&emsp;&emsp;-- infrastructure -- components (Icons, MAin, PersonalData, Profile, etc)<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-- repositories (companyType, nuweProfile, personalProfile, etc)<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-- adapters (httpAdapter, jsonserverAdapter)<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;|<br>
&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;-- assets (iconos e imágenes)<br>

# Deploy
       
Lo he realizado en un peqeño VPS que tengo en Ionos. La URL es  [http://manuelgc.eu/nuwe2101](http://manuelgc.eu/nuwe2101)
Utilizo un pequeño servidor json-server para la persistencia de los datos que solo funciona con http, por eso hay que acceder a la aplicación con este mismo protocolo inseguro. Si se accede con https aparece el error de Mixed Content al cargar los datos.

# CodeFactor

Calificación global "A"

![image](https://user-images.githubusercontent.com/29376434/126888725-e6bf3828-8f24-46f4-b427-ee68a54e8587.png)


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
