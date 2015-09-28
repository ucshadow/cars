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
Router.route('getInput');

var countdown = new ReactiveCountdown();
  countdown.start(function() {
  console.log('done');
});

var available = "yes";

if (Meteor.isClient) {


  Template.try.helpers({
    cars: function(){
      return Cars.find({});
    },
    timer: function(){
      return available;
    }
  });

  Template.try.events({
    'click .car_container': function(event){
      event.preventDefault();
      var divId = this._id;
      //$("#" + this.name).text("Available: no");
      Router.go("gameScreen", {name: this.name});
    }
  });

  Template.gameScreen.rendered = function(){
     $('body').keypress(function(event){
      var pressed = event.key;
      Input.update({_id: 'Wrk4kPcZfck3LvMit'}, { key: pressed });
      var active_now = Input.findOne().key
      setTimeout(
      function(){
        Input.update({_id: 'Wrk4kPcZfck3LvMit'}, { key: "nothing pressed!" });
      }, 500);
     });
    };

  Template.getInput.helpers({
    input: function(){
      var no_err = Input.findOne();
      return no_err && no_err.key;  // && for error check
    }
  });

  Template.gameScreen.helpers({
    obj: function(){
      var no_err = Input.findOne();
      return no_err && no_err.key;  // && for error check
    }
  });

}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}


Cars = new Meteor.Collection('cars');
Input = new Meteor.Collection('input');
