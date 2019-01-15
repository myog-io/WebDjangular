# Quick Install Guide
Before you can use WebDjangular, you’ll need to get it installed. We have a [detailed installation guide](#todo) that covers all the possibilities; this guide will guide you to a simple, minimal installation that’ll work while you walk through the introduction.

## 1 Install Python
Since we use Django, a Python Web framework, Django requires Python. See [What Python version can I use with Django?](https://docs.djangoproject.com/en/2.1/faq/install/#faq-python-version-support) for details. Remeber we are going to use a MongoDB, so you will need to configure your settings files acordinglyu

Get the latest version of Python at [https://www.python.org/downloads/](https://www.python.org/downloads/) or with your operating system’s package manager.

For development porposes we recomend using [Conda](https://conda.io/docs/) ou [Anaconda](https://www.anaconda.com/) they will help you with the creation of different enviroments for you development, with eazy to use interface.
``` bash 
Python 3.x.y
[GCC 4.x] on linux
ype "help", "copyright", "credits" or "license" for more information.
>>>
```
    
## 2 Install Node.js and NPM
Now let's install [Node.js](https://nodejs.org/en/)! Node.js tends to come with a outdated version of npm, so run a to update your node
``` bash
npm install npm@latest -g
```
## 3 Installing Mysql 8 & Creating DB
To install [Mysql 8](ttps://dev.mysql.com/downloads/) please download and follow the steps on the website for instalation



## 4 Clone WebDjangular
Now, to the cool part, let's starting using our beloved WebDjangular 😍
Navegate to the folder of your choise and clone 
``` bash
git clone git@github.com:MyOwnGamesLLC/WebDjangular.git
```

## 5 Installing Pip Packages
Now Navegate to the cloned root folder, and run pip to install all packages necessary, assuming you have your python(anconda) enviroment is running
``` bash
cd webdjangular
pip install -r ./requirements.txt
```
## 6 Configuring your local.py
after that, let's create a copy of the settings from the 📁*/webdjango/settings/development.default.py* duplicate it, and name it 📁 */webdjango/settings/local.py*,  
change the *SECRET_KEY* for one you would like, and change the *DATABASES* name to the one you created in our case is *webdjangular*
and your *local.py* should look something like this

``` python
from .base import *

DEBUG = True

SECRET_KEY = "MYCR4AZYS3CR3TK3Y" # Change to your secret key


INSTALLED_APPS += [

]

DATABASES = {
    'default': {
        'ENGINE': 'mysql.connector.django',
        'NAME': 'webdjangular',
        'USER': 'root',
        'PASSWORD': '#######',

        #'HOST': 'localhost',   # Or an IP Address that your DB is hosted on
        #'PORT': '3306',
    }
}
```

## 8 Running First Migration
Anyone who knows a little bit about Django, you know about migrations, if you want to know more about it please [go to this link](https://docs.djangoproject.com/en/2.1/topics/migrations/)
Still assuming your python enviroment is running on the bash you will run
``` bash
python manage.py migrate
```
This will start the migration of all the databases of webdjangular base.

## 9 Create our first superuser
Again, Django Users will know, we now have to create our first user, and also let him be a super user, via the terminal is easier, django supplies us with a command called [createsuperuser](https://docs.djangoproject.com/en/2.1/intro/tutorial02/#creating-an-admin-user)
```bash
python manage.py createsuperuser
```
This command will ask you for and username, first and last name, email and password, this will be the information of your admin account!

## 10 Start Django Development Server
This is also very streight foward for seasoned Django users, django provides a terminal run for serving a development server, [know more here](https://docs.djangoproject.com/en/2.1/intro/tutorial02/#start-the-development-server)  
just run the following command
```bash
python manage.py runserver
```
You can now open the your Web browser and go to [http://localhost:8000/](http://localhost:8000/) this is just the default link for the api server. You can also check the API Endpoints [http://localhost:8000/api/swagger/](http://localhost:8000/api/swagger/) or the Api "Documentation" on [http://localhost:8000/api/docs/](http://localhost:8000/api/docs/)

## 11 Installing NPM Packages for frontend
Start another terminal and navegate again to the root folder of the project. 
Run the installation so we can download the packages!
```bash
npm install
```
This can take a while, sit back and grab a cup of coffe☕ or whatever🍺.

## 12 Run Angular Development Server for Admin and Client Side
On the same previus terminal, run this command to run the client side of the app
```bash
npm start
```
You can no go to your web browser and go to [http://localhost:4200/](http://localhost:4200/) this is the default link for development angular server


In Another terminal on the root folder of the project you wiwll rann
```bash
npm run start:admin
```
This will run the Admin Application of Webdjangular, we have choosen to keep it spearted because they are very differnt in design
acessing [http://localhost:4201/](http://localhost:4201/) you will be able to login with the previus masteradmin created, now you will be able to create new pages and users to your new CSS 😘


Yayyyyy, now you have your backend and frontend running on your development enviroment, roll up your sleeves and start coding 🤓 



