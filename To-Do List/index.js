var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// Render css files
app.use(express.static('public'));

// Placeholders for added task (array)
var task = ['Math assignment', 'Complete web app'];

// Placeholders for removed task (array)
var complete = ['Buy snacks'];

// Post route for adding new task
app.post('/addtask', function(req, res) {
    var newTask = req.body.newtask;
    // Add the new task from the post route
    task.push(newTask);
    res.redirect('/');
});

// Remove task
app.post('/removetask', function(req, res) {
    var completeTask = req.body.check;

    // Check for the "typeof" the different completed tasks, then add into the completed tasks
    if (typeof completeTask === 'string') {
        complete.push(completeTask);
        // Check if the completed task already exists in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === 'object') {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    res.redirect('/');
});

// Render the ejs and display added task, completed task
app.get('/', function(req, res) {
    res.render('index', {task: task, complete: complete});
});

// Set app to listen on port 3000
app.listen(3000, function() {
    console.log("To-Do App Server is running on port 3000!")
});