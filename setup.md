How to use this code?
1) Make sure you have the latest stable version of Node.js installed
$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n stable

2) Configure your database and add BASE_URL & MONGO_URL in .env File.
(Since it has a minimal HTML based UI included in the same repo, so you will also need to change the URL in index.js for the UI in line 50)

3) Fork this repository and clone it
$ git clone https://github.com/the-himanshu/url-shortner.git

4) Navigate into the folder
$ cd url-shortener

5) Install NPM dependencies
$ npm install

6) Run the project
$ node server.js

7) Navigate to http://localhost:8080 in your browser to test it!

The app is currently deployed at : https://url-hash-app.herokuapp.com