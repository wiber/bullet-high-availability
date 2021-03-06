var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = [ 'packageName', 'description' ];

PackageSearch = new SearchSource( 'packages', fields, options );
PackageSearch.fetchData = function ( searchText, options, success ) {
  SearchConn.call( 'getPackages', searchText, options, function ( err, data ) {
    success( err, data );
  } );
};

Template.searchResult.helpers( {
  getPackages: function () {
    // we want to get jump to the first one on enter
    // or 0-9 on keyup
    // later
    return PackageSearch.getData( {
      transform: function ( matchText, regExp ) {
        return matchText.replace( regExp, "<b>$&</b>" )
      },
      sort: {
        isoScore: -1
      }
    } );
  },

  isLoading: function () {
    return PackageSearch.getStatus().loading;
  }
} );
Template.searchResult.events( {
  "click a.to": function ( e, template ) {
    console.log( e )
    function stepper(e) {
      try {
        App.step( e.target.href )
      } catch (err) {
        Meteor.Error(5, "linkdeath "+ err)
      } finally {
        return false;
      }
    }
    return stepper()

  }
} );

Template.searchBox.events( {

  "keyup #search-box": _.throttle( function ( e ) {
    var searchBox = $( '#search-result' );
    var text = $( e.target ).val().trim();
    if ( text.length > 0 ) {
      searchBox.show();
    } else {
      searchBox.hide();
    }

    PackageSearch.search( text );
    if (e.keyCode == 13) {
      console.log(e)
    }
  }, 200 )
} );

Template.searchBox.rendered = function () {
  $( '#search-result' ).hide();
};
