
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
        .when('/:id/edit', {
          templateUrl: 'views/form.html',
          controller: 'EditController',
          controllerAs: 'ab'
        })
        .otherwise({redirectTo: '/'});
    })
    .factory('AddressBookFactory', function($http, $location){
      function getContact(contactId, cb){
        var url = 'https://nss-addressbook.firebaseio.com/' + contactId + '.json'
        $http.get(url)
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          alert('NOT SHOWING');
        });
      }
      function editContact(contactId, contact){
        var url = 'https://nss-addressbook.firebaseio.com/' + contactId + '.json'
        $http.put(url, contact)
        .success(function(data){
          $location.path('/');
        })
        .error(function(err){
          alert('NOT SHOWING');
        });
      }
      function getAllContacts(cb){
      $http.get('https://nss-addressbook.firebaseio.com/.json')
        .success(function(data){
          cb(data);
        })
        .error(function(err){
          alert('NOT WORKING');
        });
      }
      function addNewContact(contact, cb){  
      $http.post('https://nss-addressbook.firebaseio.com/.json', contact)
        .success(function(data){
          cb(data);
          $location.path('/');
        })
        .error(function(err){
          alert('Nothing Added');
        });
      };
        function deleteContact(contactId, cb){
        var url = 'https://nss-addressbook.firebaseio.com/' + contactId + '.json';
        $http.delete(url)
          .success(function(){
            cb();
          })
          .error(function(err){
            alert('Did not delete');
          });
        };

      return{
        getContact: getContact,
        editContact: editContact,
        getAllContacts: getAllContacts,
        addNewContact: addNewContact,
        deleteContact: deleteContact
      };
    })//close factory

    .controller('ShowController', function($routeParams, AddressBookFactory){
      var scope = this;
      var id = $routeParams.id;
      AddressBookFactory.getContact(id, function(data){
        scope.contact = data;
      });
    })//closes show controller

    .controller('EditController', function($routeParams, AddressBookFactory){
      var scope = this;
      var id = $routeParams.id;
      AddressBookFactory.getContact(id, function(data){
        scope.newContact = data;
      });
      scope.addNewContact = function(){
        AddressBookFactory.editContact(id, scope.newContact);
      };
    })//closes edit controller

    .controller('AddressBookController', function(AddressBookFactory){
      var scope = this;
      
      AddressBookFactory.getAllContacts(function(data){
        scope.contacts = data;
      });

      scope.addNewContact = function(){
        AddressBookFactory.addNewContact(scope.newContact, function(data){
          scope.contacts[data.name] = scope.newContact;
        });
      };

      scope.deleteContact = function(contactId){
        AddressBookFactory.deleteContact(contactId, function(){    
        delete scope.contacts[contactId]
        })
      };
    })//closes addressbook controller
}());//closes iife
