// code sent to client and server
// which gets loaded before anything else (since it is in the lib folder)

this.Books = new Mongo.Collection("books");
Shelves = new Mongo.Collection("shelves");
EditingUsers = new Mongo.Collection("editingUsers");
Comments = new Mongo.Collection("comments");

// set up a schema controlling the allowable 
// structure of comment objects
Comments.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
  body:{
    type: String,
    label: "Review",
    max: 1000  	
  },
  bookid:{
  	type: String, 
  }, 
  owner:{
  	type: String, 
  }, 
  
}));


/*Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },
   author: {
    type: String,
    label: "Author",
    max: 200
  },
  summary:{
    type: String,
    label: "Summary",
    max: 1000  	
  },
     shelvid:{
  	type: String, 
  }, 
  owner:{
  	type: String, 
  }, 
  
}));*/