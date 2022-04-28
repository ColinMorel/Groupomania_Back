# Back-End Repo
This README will help you setup your back page and your database.
First, you need to have already installed NodeJS: https://nodejs.org/en/
Then, you're going to create a database. 


## DataBase
I chose wampserver, because it is quite easy to configure. So first download it : https://www.wampserver.com .
Then you start the programm Wampserver64, wait few seconds for the windows to pop up and disappear, go on the hidden apps on your task bar and click on "start the services" (on the wamp server icone) and then go to phphMyAdmin 5.1.1. After entering your mysql logs into the browser window that opened, you're going to create a database called "groupomania".

Now that your database is created, you're going to modify some settings on the config/config.json file. You're gonna put your mysql logs on "username" and "password", write "groupomania" as the in the "database" field, and make sure that the host is correct.
Now your database is connected to your back server. 


### Create folders
To make the server works, you'll need to create an "images" folder, which will includes all the images downloaded by the users (profil pictures, posts images), and also a .env files where you're going to paste "SECRET_TOKEN = YOURSECRETKEYGOESHERE".


### Launch the back server
Now to start your server, you need to write (on the terminal located at `Groupomania_Back`) : `npm install` + `nodemon server`.


### Create an administrator
Now that your database is created and your back server is started, you'll need to go back to the phpMyAdmin browser window. 
Then, `click on your "groupomania"` database --> "SQL" button --> paste "INSERT INTO `users`(`firstname`,`lastname`,`email`,`password`,`administrator`,`createdAt`,`updatedAt`) VALUES ('admin','rank','administrator@groupomania.com','admin123safe',1,NOW(),NOW())" and click on `execute`.

And now, your back server and database are both ready to be used.
