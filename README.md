Notify AMiCUS
=====================

A project that will help AMiCUS spread the news faster and easier to all those who are interested in its projects.

### Usage

Clone the repo

```
git clone https://github.com/raduanastase/notify-amicus.git
```

Install the dependencies and start the server.

```
npm install
npm start
open http://localhost:3000
```

### Static Files

You can store static files like images, fonts, etc in the `build` folder.

For example, if you copy a file called my_image.png into the build folder you can access it using `http://localhost:3000/build/my_image.png`.

### Contributing

If you want to contribute to this project, make a PR(pull request) to master, don't commit your files directly to master.

### Linting

This boilerplate project includes React ESLint configuration.

```
npm run lint
```

### Dependencies

* React
* Webpack
* [babel-loader](https://github.com/babel/babel-loader)
* [webpack-dev-server](https://github.com/webpack/webpack-dev-server)
