;(function(){
  'use strict';

  angular.module('ab', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'views/table.html'})
        .when('/new', {
          templateUrl: 'views/form.html'})
        .otherwise({redirectTo: '/'});
    })
    .controller('abController', function($http){
      var scope = this;

      $http.get('https://nss-addressbook.firebaseio.com/.json')
        .success(function(data){
          scope.contacts = data;
        })
        .error(function(err){
          alert('NOT WORKING');
        });

      scope.addNewContact = function(){
        $http.post('https://nss-addressbook.firebaseio.com/.json', scope.newContact)
          .success(function(data){
            scope.contacts[data.name] = scope.newContact;
            scope.newContact = "";
          })
          .error(function(err){
            alert('Nothing Added');
          });
      };

      scope.deleteContact = function(contactId){
        var url = 'https://nss-addressbook.firebaseio.com/' + contactId + '.json';
        $http.delete(url)
          .success(function(){
            delete scope.contacts[contactId]
          })
          .error(function(err){
            alert('Did not delete');
          });
      };
    });
}());
