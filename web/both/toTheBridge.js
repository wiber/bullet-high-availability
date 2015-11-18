App = {}
App.connect = function ( from, to, object ) {
  console.log( args )
}
App.step = function ( to ) {
  console.log( to )
    // on landing somewhere, call this, (when called on server? not inconceivable..)
    // add location to your journey array on user object
    // set stateful field so that when text enters box it's known what connection it relates to
    // function calls a methodcall that manages collection data on client and server
    // with latency compensation

  Meteor.call( "stepTo", to, function ( error, result ) {
    if ( error ) {
      console.log( "error", error );
    }
    if ( result ) {
      console.log( "result", result );
    }
  } );

}



Meteor.methods( {
  stepTo: function ( to ) {
    if ( !Meteor.userId() ) {
      idSelector = "annon" // || this.connection.clientAddress
      console.log( idSelector )
    }
    setObject = to //? "to"
    Meteor.users.upsert( {
      _id: idSelector
    }, {
      $set: {
        at: setObject
      }
    } );
    console.log(Meteor.users.findOne({_id:idSelector}))

    if ( Meteor.isServer ) {
      console.log( to + ' server ' + Meteor.isServer )
    } else {
      console.log( to + ' server ' + Meteor.isServer )
    }

    return this.connection.clientAddress
  }
} );
pub = function () {
  Meteor.publish( "userData", function () {
    if ( this.userId ) {
      return Meteor.users.find( {
        _id: this.userId
      }, {
        fields: {
          'steps': 1,
          'connects': 1
        }
      } );
    } else {
      this.ready();
    }
  } );

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
  Meteor.subscribe( "userData" );
}


// code to run on server at startup
truncateLogs = function () {
  spawn = Npm.require( 'child_process' ).spawn,
    //grep = spawn('grep', ['ssh']);
    grep = spawn( 'grep' );
  grep.on( 'close', function ( code, signal ) {
    console.log( ' child process terminated due to receipt of signal ' + signal );
    var fs = Npm.require( 'fs' )
    var appRoot = process.env.PWD;
    webl = fs.truncate( appRoot + '/app.log', 0, function () {
      console.log( ' done overwriting the app.log in ' + appRoot )
    } )
  } );
  // send SIGHUP to process
  grep.kill( 'SIGHUP' );
}

Meteor.startup( function () {

  if ( Meteor.isClient ) {
    sub();
  } else {
    pub();
    truncateLogs()
    Meteor.onConnection( function ( connection ) {
      console.log( "new connection from  " + connection.clientAddress )
    } )
  }

} );
