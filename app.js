var express = require("express");
var app = express();
var session = require("express-session");

app.use(express.static(__dirname + "/static"));
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
}));

app.get("/", function(request, response){
    // TODO: Determine if session value has incremented from /x2reload. If not, then we increment session by 1
    if(!request.session.isAdded)
        (!request.session.count) ? request.session.count = 1 : request.session.count += 1;

    // TODO: Set isAdded sesstion to false for it to satisfy the condition above
    request.session.isAdded = false;

    

    // TODO: Store count session and word variable in an object
    var count_data = {
        count: request.session.count,
        word: (request.session.count == 1) ? "time" : "times" // TODO: This isn't necessary but I wanted the word time to be plural if the count is greater than 1
    }

    // TODO: Pass object to our EJS file
    response.render("index", {data: count_data});
});

app.get("/x2reload", function(request, response){
    request.session.count += 2;
    request.session.isAdded = true;
    response.redirect("/");
});

app.get("/reset", function(request, response){
    request.session.count = 1;
    request.session.isAdded = true;
    response.redirect("/");
});

app.listen(8080, function(){
    console.log("Listening on 8080");
});