var searchConn = Cluster.discoverConnection('search');

Meteor.publish('topPackages', function() {
  console.log("accessing topPackages");
  var options = {sort: {isoScore: -1}, limit: 20};
  return Packages.find({}, options);
});