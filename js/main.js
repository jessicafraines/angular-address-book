;(function(){
  'use strict';

  angular.module('ab', [])
    .controller('abController', function(){
      var scope = this;

      scope.contacts = [
        {
          name: 'Dakota Jane',
          phone: '615-555-1212',
          email: 'dakotajane@gmail.com',
          github: 'github.com/dakota',
          facebook: 'facebook/dakota',
          linkedIn: 'linkedIn/dakota'
        },
        {
          name: 'Brian Raines',
          phone: '615-555-1212',
          email: 'brianraines@gmail.com',
          github: 'github.com/brian',
          facebook: 'facebook/brian',
          linkedIn: 'linkedIn/brian'
        },
        {
          name: 'Jenny Becker',
          phone: '615-555-1212',
          email: 'jennybecker@gmail.com',
          github: 'github.com/jenny',
          facebook: 'facebook/jenny',
          linkedIn: 'linkedIn/jenny'
        }
      ];

      scope.addNewContact = function(){
        scope.contacts.push(scope.newContact);
        scope.newContact = null;
      }

      scope.deleteContact = function(contact){
        var index = scope.contacts.indexOf(contact);
        scope.contacts.splice(index, 1);
      }

     /* $http.get('https://nss-addressbook.firebaseio.com/list.json')
        .success(function(data){
          scope.contacts = data;
        });
        .error(function(err){
          alert(err);
        });*/

    
    });
}());
