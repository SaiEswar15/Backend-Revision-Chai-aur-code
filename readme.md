# Hai welcome to backend revision project 

I am creating this project by following the tutorial of chai aur code by Hitesh Chowdary

## step 1 : 

npm init 

## step 2 : 

readme.md add file

## step 3 : 

create a src folder 

## step 4 : 

add .gitignore and fill it using generator 

https://mrkandreev.name/snippets/gitignore-generator/#Node

## step 5 : 

use .gitkeep to add files to git hub if they are not pushing because they are empty

## step 6 : 

add a public folder so that all the images or  videos required will be present inside the folder

## step 7 : 

add env file such taht which ever confidential files you dont want to show will be inside env and remember these will go into github but dont show in git hub

.env.sample is for the tutorial purpose and not necessary

## step 8 : 

inside src we have a certain folder structure which we should follow

we have the app.js index.js 

we have controllers db(for db connections) routes models middlewares utils 

## step 9 :

add prettier to make the code consistant so that whole team writes the similar code with similar annotations.

add folders .prettierrc and settings code inside it 

{
    "singleQoute" : false,
    "bracketSpacing" : true,
    "tabWidth" : 2,
    "trailingComma" : "es5",
    "semi" : true

}

and also add .prettierignore and add what you dont want to change like

/.vscode
/node_modules
/.dist

*.env
.env
.env.*

## step 10 :

install prettier and nodemon as dev dependencies using 

npm i -D nodemon prettier 

## step 11 :

