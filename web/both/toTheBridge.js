
App = {}
App.connect = function (from,to,object) {console.log(args)}
App.step = function ( stepTo ) {
  console.log( stepTo )
    // on landing somewhere, call this, (when called on server? not inconceivable..)
    // add location to your journey array on user object
    // set stateful field so that when text enters box it's known what connection it relates to
    // function calls a methodcall that manages collection data on client and server
    // with latency compensation
  callback = function ( error, result ) {
    if ( error ) {
      console.log( "error", error );
    }
    if ( result ) {
      console.log( "result", result );
    }
  }
  Meteor.call( "meteorMethod", dataObject, callback( error, result ) );
}

pub = function () {
  steps = new Mongo.Collection( "steps" );
  steps.allow( {
    insert: function () {
      return true;
    },
    update: function () {
      return true;
    },
    remove: function () {
      return true;
    }
  } );
  Meteor.publish( "userObj", function ( argument ) {
    return users.findOne( {
      _id: this.userId
    } );
  } );
}



sub = function () {
  Meteor.subscribe( "userObjs", this.userId );
}
Meteor.startup( function () {

  if ( Meteor.isClient ) {
    sub();
  } else {
    pub();
  }

} );

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    spawn = Npm.require('child_process').spawn,
            grep = spawn('grep', ['ssh']);


    grep.on('close', function (code, signal) {
      console.log(' child process terminated due to receipt of signal '+signal);
      var fs = Npm.require('fs')
      var appRoot = process.env.PWD;
      webl = fs.truncate(appRoot+'/web.log', 0, function(){console.log(' done overwriting web.log')})
    });

    // send SIGHUP to process
    grep.kill('SIGHUP');
  });
}
