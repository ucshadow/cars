Router.route('/', {
  name: "homescreenMenu",
  template: "homescreenMenu"
});
Router.route('try');
Router.route('/game/:name', {
  name: "gameScreen",
  template: "gameScreen",
  data: function(){
    var currentCar = this.params.name;
    console.log(currentCar);
    return Cars.findOne({ name: currentCar });
  }
});

if (Meteor.isClient) {

  Template.try.helpers({
    cars: function(){
      return Cars.find({});
    }
  });

  Template.try.events({
    'click .car_container': function(event){
      event.preventDefault();
      var divId = this._id;
    }
  })

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Cars = new Meteor.Collection('cars');
