# RoadToReact

This repository is a run through of the Road to React book by Robin Wieruch.
It deviates in a few ways, namely: using yarn instead of npm, using flow on the project, and using functional components.

At the bottom will be a direct running log of any relevant terminal commands run during setup.


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
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

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


`yarn init` - setup project to use yarn as dep manager  
`yarn install react` - install react  
`yarn add create-react-app` - install create-react-app cli tool  
`yarn create react-app .` - initialize react app in current directory  
`yarn start` - start the react app  
`yarn test` - run tests  
`yarn build` -  builds the production application  
`yarn add --dev eslint` - install eslint  
`yarn add --dev babel-eslint` - install babel eslint  
`yarn add --dev @babel/core @babel/cli @babel/preset-flow` - install babel tools  
`yarn add --dev flow-bin` - install flow  
`yarn add --dev eslint-plugin-flowtype` - install static linting for flow via babel  
`yarn add --dev eslint-plugin-react` - install eslint react plugin  
`eslint .` - run eslint linting  
`yarn flow status` - run flow typechecking  
`yarn add axios` - add axios fetching  
`yarn add --dev react-test-renderer` - add jest snapshot dependency  
`yarn global add flow-typed` - add cli tool to install flow libdefs for untyped dependencies  
`flow-typed install jest@26.x.x` - install libdef for jest testing  
`yarn add --dev enzyme react-addons-test-utils enzyme-adapter-react-16` - install enzyme unit testing framework  

