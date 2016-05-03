// code that is only sent to the server. 

Meteor.startup(function () {
  // create a starter doc if necessary
  if (!Books.findOne()){// no Books yet!
      Books.insert({title:"my new book"});
  }
});


// publish read access to collections

// all visible docs 
Meteor.publish("books", function(){
  return Books.find({
   $or:[
    {isPrivate:{$ne:true}}, 
    {owner:this.userId}
    ] 
  });
})  
// users editing docs
Meteor.publish("editingUsers", function(){
  return EditingUsers.find();
})

// coments on docs
Meteor.publish("comments", function(){
  return Comments.find();
})