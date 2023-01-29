
// import required modules
const http = require("http");
const fs = require("fs");
const path = require("path");
const qs = require("querystring");

// my http server
const server = http.createServer((req, res) => {

    // get the path of the required files
    const formFilePath = path.join(__dirname, "form.html");
    const userFilePath = path.join(__dirname, "user.txt");

    // check the request method
    if (req.method === "GET") {
        // serve a form to the user
        fs.readFile(formFilePath, (err, data) => {
            if (err) {
                // when there is an error reading the file
                res.writeHead("content-type", "text/plain");
                res.statusCode = 404;
                res.end("path you are looking for was Not Found");
            } else {

                // when there is no error
                res.end(data);
            }
        });
    }

    // when the request method is POST
    else if (req.method === "POST") {
        // get the data from the form
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });

        // when the request is ended
        req.on("end", () => {
            const data = qs.parse(body);

            // data from form
            const { email, password } = data;
            console.log("email: " + email + " password: " + password);

            // read the local user data from the user.txt file and store it in a buffer variable.
            const localUserDataBuffer = fs.readFileSync(userFilePath, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    return data;
                }
            });

            // convert the buffer to a string
            const localUserData = localUserDataBuffer.toString();

            // split the string to get the email and password
            /*
                explanation:
                ----------------

                localUserData.split("\n") will split the string into an array of strings
                each string will be a line from the user.txt file
                localUserData.split("\n")[0] will get the first line from the user.txt file
                localUserData.split("\n")[0].split("=") will split the first line into an array of strings
                each string will be a word from the first line
                localUserData.split("\n")[0].split("=")[1] will get the second word from the first line
                localUserData.split("\n")[0].split("=")[1].trim() will remove the spaces from the second word
            */

            const localEmail = localUserData.split("\n")[0].split("=")[1].trim();
            const localPassword = localUserData.split("\n")[1].split("=")[1].trim();
            console.log("localEmail: " + localEmail + " localPassword: " + localPassword)

            // check if the data from the form is the same as the local user data
            if (email === localEmail && password === localPassword) {
                res.statusCode = 200;
                res.end("user logged in successfully!");
            } else {
                res.statusCode = 401;
                res.end("Invalid email or password");
            }
        });
    }
});


// listen to port 3000
const port = 3000;
const hostname = "localhost";

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});


