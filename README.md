# Todo List 📆
A practical web application built with Node.js, Express, and MySQL for you to readily record, view, and manage your tasks with an account: Create, view, edit, delete, filter, and sort todos are as easy as pie 🥧


### Trial in this project 🤠
**To increase user experience**
+ [Animate.css](https://daneden.github.io/animate.css/) is used to show animation for certain actions


**To enhance security**
+ [csurf](https://www.npmjs.com/package/csurf) is used to prevent CSRF Attacks 
+ [express-validator](https://www.npmjs.com/package/express-validator) is used for server side validation

___

## Project First Look
![Application Screen Shot in GIF](todoList.gif)


## Features
| Functions              | Detail                                            | URL                         |
| :--------------------: | ------------------------------------------------- | --------------------------- |
| Sign up for an account | 1. User can sign up an account by inputting name, email, password<br>2. User can get a warning message for invalid input format | /users/register |
| Log in with email | 1. User can log in using registered email<br>2. User can get a warning message for incorrect password or unregistered account | /users/login |
| Log in with Facebook account | User can log in via Facebook with a Facebook account | /auth/facebook |
| Log out | 1. User can log out of an account<br>2. User can get a reminder for successful logout | /users/logout |
| View all todos | 1. User can view todos list with name, due date and status after login<br>2. User can get an error message when no todo to display after login | / |
| View a todo | User can view name, due date, status, and detail of a todo after login | /todos/view/:id |
| Create a todo | 1. User can add a todo with detail after login<br>2. User can get a warning message for invalid input format | /todos/new |   
| Edit a todo | User can update detail info of a todo after login | /todos/edit/:id |
| Delete a todo | 1. User can delete a todo after login<br>2. User can receive a warning message before actual delete | /todos/delete/:id |
| Filter todos | User can filter todos based on status and due date | /search |
| Sort todos | User can sort todos based on status, due date, or name | /search |
| Page not found | User can get an error message when travelling to a page not existing | /:any_other_URL |

___

## Installation
The following instructions will get you a copy of the project and all the setting needed to run it on your local machine.


### Prerequisites

- [npm](https://www.npmjs.com/get-npm)
- [Node.js v10.16.0](https://nodejs.org/en/download/)
- [MySQL v8.0.16](https://dev.mysql.com/downloads/mysql/)
- [MySQL Workbench v8.0.16](https://dev.mysql.com/downloads/workbench/)


### Clone

Clone this repository to your local machine

```
$ git clone https://github.com/smallpaes/todo-list.git
```

### Setup Datebase

**Create and use todo-sequelize database via MySQL Workbench**

> Run the following code
```
drop database if exists todo_sequelize;
create database todo_sequelize;
use todo_sequelize;
```

### Setup App

**1. Create a Facebook account**
- [https://developers.facebook.com/](https://developers.facebook.com/)

**2. Create a Facebook App and get the App ID & Secret**

```
My Apps -> Create App -> Scenario: Integrate Facebook Login -> Settings -> Basic
```

**3. Enter the project folder**

```
$ cd todo-list
```

**4. Install packages via npm**

```
$ npm install
```

**5. Create .env file**

```
$ touch .env
```

**6. Store API Key in .env file and save**

```
FACEBOOK_ID=<YOUR_FACEBOOK_APP_ID>
FACEBOOK_SECRET=<YOUR_FACEBOOK_APP_SECRET>
FACEBOOK_CALLBACK=<YOUR_FACEBOOK_REDIRECT_URI>
```

**7. Edit password in config.json file**

> /config/config.json
```
"development": {
  "username": "root",
  "password": "<YOUR_WORKBENCH_PASSWORD>",
  "database": "todo_sequelize",
  "host": "127.0.0.1",
  "dialect": "mysql",
  "operatorsAliases": false
}

```

**8. Create models**

> run the following code in the console
```
$ npx sequelize db:migrate
```

**9. Activate the server**

```
$ npm run dev
```

**10. Find the message for successful activation**

```
> App is running on port 3000!
```
You may visit the application on browser with the URL: http://localhost:3000

___


## Authors
[Mike Huang](https://github.com/smallpaes)