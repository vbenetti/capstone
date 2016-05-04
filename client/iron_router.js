// set up the iron router
Router.configure({
  layoutTemplate: 'ApplicationLayout'
});

// 'home' page
Router.route('/', function () {
  console.log("you hit / ");
  this.render("navbar", {to:"header"});
  this.render("bookList", {to:"main"});
});

// individual document page
Router.route('/books/:_id', function () {
  console.log("you hit /books  "+this.params._id);
  Session.set("bookid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("bookItem", {to:"main"});  
});

Router.route('/shelves/:_id', function () {
  console.log("you hit /shelves  "+this.params._id);
  Session.set("shelvid", this.params._id);
  this.render("navbar", {to:"header"});
  this.render("ShelvItem", {to:"main"});  
}

);
