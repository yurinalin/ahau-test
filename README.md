# Ahau Test Project

This project was created as a technical test for [Ahau Software](https://www.ahausoftware.com/).

## The Problem - Drawing tool 

You're given the task of writing a simple drawing tool. In a nutshell, the program reads the 
input.txt, executes a set of commands from the file, step by step, and produces output.txt.
At this time, the functionality of the program is quite limited but this might change in the 
future. At the moment, the program should support the following set of commands: 

* **C w h**
* **L x1 y1 x2 y2** 
* **R x1 y1 x2 y2** 
* **B x y c** 

**Create Canvas:** Should create a new canvas of width w and height h. 

**Create Line:** Should create a new line from (x1,y1) to (x2,y2). Currently only horizontal or 
vertical lines are supported. Horizontal and vertical lines will be drawn using the 'x' 
character. 

**Create Rectangle:** Should create a new rectangle, whose upper left corner is (x1,y1) and 
lower right corner is (x2,y2). Horizontal and vertical lines will be drawn using the 'x' 
character. 

**Bucket Fill:** Should fill the entire area connected to (x,y) with "colour" c. The behavior of this 
is the same as that of the "bucket fill" tool in paint programs. 
Please take into account that you can only draw if a canvas has been created.

<hr />

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
