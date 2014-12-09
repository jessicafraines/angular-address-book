;(function(){
  'use strict';

  angular.module('ab', ['ngRoute'])
    .config(function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl: 'views/contacts.html',
          controller: 'AddressBookController',
          controllerAs: 'ab'
        })
        .when('/new', {
          templateUrl: 'views/form.html',
          controller: 'AddressBookController',
          controllerAs: 'ab'
        })
        .when('/:id', {
          templateUrl: 'views/contact.html',
          controller: 'ShowController',
          controllerAs: 'show'
        })
         
        .otherwise({redirectTo: '/'});
    })
    .controller('ShowController', function($http, $routeParams){
      var scope = this;
      var id = $routeParams.id;
      $http.get('https://nss-addressbook.firebaseio.com/' + id + '.json')
        .success(function(data){
          scope.contact = data;
        })
        .error(function(err){
          alert('NOT SHOWING');
        });
    
    })
    .controller('AddressBookController', function($http, $location){
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
            $location.path('/#/contacts');
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
