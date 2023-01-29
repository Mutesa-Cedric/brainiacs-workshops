# what will you do

1. create a project and name it nodejs-login

2. inside the project, create a ``login.html`` file containing 2 fields(email and password).


3. create a user.txt file with data about the user.
     
      ex :
    ```
    email=johndoe@gmail.com
    password=johndoe123
    ```

4. make a HTTP nodejs server to handle login logic. (come up with your own implementation.

### Recomended Implementation:

* create a http server for serving a html file and handling form submission.
* process input fields (email and password) when a user clicks on submit.
* validate emal and password according to data you have in user.txt file.
* if the data matches, send a response to the user that login was successful. **user logged in successfully**

* else if data doesn't match, send a response that credentials are invalid . **Invalid credentials**