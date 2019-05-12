# LedWallApp

Web application deployed on any Linux to control the Polytech' Tours LedWall.

- **front** : expressjs
- **back** : angular 7

## Running the app

To run the project, you need to have [node](https://nodejs.org/en/download/) installed with [npm](https://www.npmjs.com/get-npm) and [Angular CLI](https://cli.angular.io/).

1. Clone project
2. Go in front folder
4. `npm install`
5. `ng serve`
6. Go in back folder
7. `npm install`
8. `node server.js`
9. Navigate to `http://localhost:4200/`

## Deploying the app

run : 
`sudo -s`
`source ./project_install.sh`


or ...

If you intend to deploy your app onto a device with small amount of memory, it would be wise to run the app with this method instead.

1. Clone project
2. Go in front folder
4. `npm install`
5. `ng build --prod`
6. Go in back folder
7. `npm install`
8. `NODE_ENV=production node server.js`
9. Navigate to `http://localhost:8080/`

## Config

Change default piskel size when opening the editor :
`front/src/assets/piskel-editor/js/piskel-packaged-2015-09-02-11-47.js (11782)`

Secure front access with the command below :
`sudo htpasswd -c .htpasswd ledwall`

## Sources

* https://github.com/boopathi4291/MEAN
* https://angular.io/
* https://github.com/piskelapp/piskel-embed




