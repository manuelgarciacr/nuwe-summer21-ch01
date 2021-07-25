# Pantalla responsive para el perfil de usuario y su modificación

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
       
Lo he realizado en un peqeño VPS que tengo en Ionos. La URL es  [https://manuelgc.eu/nuwe2101](https://manuelgc.eu/nuwe2101)

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

![image](https://user-images.githubusercontent.com/29376434/126887907-0ecc7dbe-84d6-4a52-b7e3-97a5adf8e5fb.png)
