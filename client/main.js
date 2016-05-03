// code that is only sent to the client

// subscribe to read data
Meteor.subscribe("books");
Meteor.subscribe("editingUsers");
Meteor.subscribe("comments");


Template.editor.helpers({
  // get current book id
  bookid:function(){
    setupCurrentBook();
    return Session.get("bookid");
  }, 
  // set up the editor
  config:function(){
    return function(editor){
      editor.setOption("lineNumbers", true);
      editor.setOption("theme", "cobalt");
      editor.on("change", function(cm_editor, info){
        $("#viewer_iframe").contents().find("html").html(cm_editor.getValue());
        Meteor.call("addEditingUser", Session.get("bookid"));
      });        
    }
  }, 
});


Template.editingUsers.helpers({
  // retrieve a list of users
  users:function(){
    var book, eusers, users;
    book = Books.findOne({_id:Session.get("bookid")});
    if (!book){return;}// give up
    eusers = EditingUsers.findOne({bookid:book._id});
    if (!eusers){return;}// give up
    users = new Array();
    var i = 0;
    for (var user_id in eusers.users){
        users[i] = fixObjectKeys(eusers.users[user_id]);
        i++;
    }
    return users;
  }
})

Template.navbar.helpers({
  // rerrieve a list of Books
  books:function(){
    return Books.find();
  }
})

Template.bookMeta.helpers({
  // find current bookument
  books:function(){
    return Books.findOne({_id:Session.get("bookid")});
  }, 
  // test if a user is allowed to edit current book
  canEdit:function(){
    var book;
    book = Books.findOne({_id:Session.get("bookid")});
    if (book){
      if (book.owner == Meteor.userId()){
        return true;
      }
    }
    return false;
  }
})

Template.editableText.helpers({
    // test if a user is allowed to edit current book
  userCanEdit : function(book,Collection) {
    // can edit if the current book is owned by me.
    book = Books.findOne({_id:Session.get("bookid"), owner:Meteor.userId()});
    if (book){
      return true;
    }
    else {
      return false;
    }
  }    
})

Template.bookList.helpers({
  // find all visible books
  books:function(){
    return Books.find();
  }
})

Template.insertCommentForm.helpers({
  // find current book id
  bookid:function(){
    return Session.get("bookid");
  }, 
})

Template.commentList.helpers({
  // find all comments for current book
  comments:function(){
    return Comments.find({bookid:Session.get("bookid")});
  }
})

/////////
/// EVENTS
////////

Template.navbar.events({
  // add book button
  "click .js-add-book":function(event){
    event.preventDefault();
    console.log("Add a new book!");

    for (var i=0;i<10;i++){
      Meteor.call('testMethod', function(){
        console.log('testMethod returned');
      });
      console.log('after testMethod call');
    }


    if (!Meteor.user()){// user not available
        alert("You need to login first!");
    }
    else {
      // they are logged in... lets insert a book
      var id = Meteor.call("addBook", function(err, res){
        if (!err){// all good
          console.log("event callback received id: "+res);
          Session.set("bookid", res);            
        }
      });
    }
  }, 
  // load book button
  "click .js-load-book":function(event){
    //console.log(this);
    Session.set("bookid", this._id);
  }
})

Template.bookMeta.events({
  // change bookument privacy
  "click .js-tog-private":function(event){
    console.log(event.target.checked);
    var book = {_id:Session.get("bookid"), isPrivate:event.target.checked};
    Meteor.call("updatebookPrivacy", book);

  }
})

// helper to make sure a book is available
function setupCurrentbookument(){
  var book;
  if (!Session.get("bookid")){// no book id set yet
    book = Books.findOne();
    if (book){
      Session.set("bookid", book._id);
    }
  }
}
// helper to remove hyphens from object keys for spacebars.
function fixObjectKeys(obj){
  var newObj = {};
  for (key in obj){
    var key2 = key.replace("-", "");
    newObj[key2] = obj[key];
  }
  return newObj;
}




  

