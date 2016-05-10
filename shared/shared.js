// code that is shared between client and server, i.e. sent to both

// method definitions
Meteor.methods({
  // adding new comments
  addComment:function(comment){
    console.log("addComment method running!");
    if (this.userId){// we have a user
      comment.owner = this.userId;
        return Comments.insert(comment);
    }
    return;
  }, 

  // adding new Books
  addBook:function(){
    var book;
    if (!this.userId){// not logged in
      return;
    }
    else {
      book = {owner:this.userId, createdOn:new Date(), 
            title:"my new book",author:"default author",  shelvid:" " , summary:" "};
      var id = Books.insert(book);
      console.log("addBook method: got an id "+id);
      return id;
    }
  },
   updatebook:function(book){
    console.log("dettagli libro")
    console.log(book) ; 
   
       var realBook = Books.findOne({_id:book._id, owner:this.userId});
    if (realBook){
      realBook.shelvid = book.shelvid;
      realBook.title = book.title;
      realBook.author=book.author;
      console.log("qua");
      realBook.summary=book.summary;
      Books.update({_id:book._id}, realBook);
    }
    
    
    console.log("updatebook");
  },
  
    addShelf:function(){
    var shelf;
    if (!this.userId){// not logged in
      return;
    }
    else {
      shelf = {owner:this.userId, createdOn:new Date(), 
            title:"my new Shelf",location:"my spot"};
      var id = Shelves.insert(shelf);
      console.log("addShelf method: got an id "+id);
      return id;
    }
  },

  // changing doc privacy settings
  updatebookPrivacy:function(book){
    console.log("updatebookPrivacy method");
    console.log(book);
    var realBook = Books.findOne({_id:book._id, owner:this.userId});
    if (realBook){
      realBook.isPrivate = book.isPrivate;
      Books.update({_id:book._id}, realBook);
    }
  },
// adding editors to a document
  addEditingUser:function(bookid){
    var book, user, eusers;
    book = Books.findOne({_id:bookid});
    if (!book){return;}// no doc give up
    if (!this.userId){return;}// no logged in user give up
    // now I have a doc and possibly a user
    user = Meteor.user().profile;
    eusers = EditingUsers.findOne({bookid:book._id});
    if (!eusers){
      eusers = {
        bookid:book._id, 
        users:{}, 
      };
    }
    user.lastEdit = new Date();
    eusers.users[this.userId] = user;

    EditingUsers.upsert({_id:eusers._id}, eusers);
  }
})