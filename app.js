/***************************************************/
/********************* SETUP ***********************/
/***************************************************/

var express             = require("express"),
    bodyParser          = require("body-parser"),
    mongoose            = require("mongoose");
    
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
    
mongoose.connect("mongodb://localhost/event_app");

// SCHEMA SETUP
var eventSchema = new mongoose.Schema({
   name: String,
   date: Date,
   location: String,
   image: String,
   description: String
});

var Event = mongoose.model("Event", eventSchema);

/*Event.create( 
    {   name: "Mo's Birthday",
        date: new Date(2017,05,11),
        location: "Pokemon World",
        image: "https://farm4.staticflickr.com/3692/12414882233_cfa96bb2b2.jpg",
        description: "Great bday"
    }, function(err, createdEvent) {
        if(err) {
            console.log(err);
        } else {
            console.log(createdEvent)
        }
    }
);
*/

/***************************************************/
/********************* ROUTES **********************/
/***************************************************/


// LANDING PAGE
app.get("/", function(req,res) {
   res.render("landing"); 
});

// INDEX ROUTE - DISPLAY A LIST OF ALL EVENTS
app.get("/events", function(req,res) {
    Event.find({}, function(err, foundEvents) {
        if(err) {
            console.log(err);
        } else {
            res.render("events", {events: foundEvents}); // Change to index later 
        }
    });
});

// NEW ROUTE - DISPLAY FORM TO CREATE A NEW EVENT
app.get("/events/new", function(req,res) {
    res.render("new"); 
});

// CREATE ROUTE
app.post("/events", function(req,res) {
    res.send("this is the create route");
});


// SHOW ROUTE
app.get("/events/:id", function(req,res) {
   res.send("This is the show route"); 
});

// EDIT ROUTE
app.get("/events/:id/edit", function(req,res) {
    res.send("this is the edit route");
});

// UPDATE ROUTE
app.put("/events/:id", function(req, res) {
    res.send("this is the update route");
});

// DESTROY ROUTE
app.delete("/events/:id", function(req,res) {
    res.send("this is the delete route");
});


/***************************************************/
/********************* LISTEN **********************/
/***************************************************/

app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Event App Server Has Started!");
});