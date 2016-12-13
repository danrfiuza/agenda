// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngCordova','ionic-material','ion-datetime-picker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      if (ionic.Platform.isAndroid()) {
        StatusBar.overlaysWebView( false );
        StatusBar.backgroundColorByHexString('#209dc2');
        StatusBar.styleLightContent();
      } else {
        StatusBar.styleLightContent();
      }
    }
 /*   if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }*/
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })
  .state('app.tarefa', {
    url: '/tarefa/:agendaId',
    views: {
      'menuContent': {
        templateUrl: 'templates/tarefa/tarefas.html',
        controller: 'TarefaCtrl'
      }
    }
  })
  .state('app.agenda', {
    url: '/agenda/:usuarioId',
    views: {
      'menuContent': {
        templateUrl: 'templates/agenda/agendas.html',
        controller: 'AgendaCtrl'
      }
    }
  })
  .state('app.usuario', {
    url: '/usuario',
    views: {
      'menuContent': {
        templateUrl: 'templates/usuario/usuarios.html',
        controller: 'UsuarioCtrl'
      }
    }
  })
  .state('app.maps', {
    url: '/maps',
    views: {
      'menuContent': {
        templateUrl: 'templates/maps.html',
        controller: 'MapsCtrl'
      }
    }
  })
  .state('app.file',{
    url:'/file',
    views:{
      'menuContent':{
        templateUrl:'templates/file.html',
        controller:'FileCtrl'
      }
    }
  })
  .state('app.datetime',{
    url:'/datetime',
    views:{
      'menuContent':{
        templateUrl:'templates/datetime.html',
        controller:'DateTimeCtrl'
      }
    }
  })
  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/usuario');
}).directive("ngFileSelect",function(){
  return {
    link: function($scope,el){

      el.bind("change", function(e){

        $scope.file = (e.srcElement || e.target).files[0];
        $scope.getFile();
      })    
    }  
  }
}).run(function($ionicPickerI18n) {
  $ionicPickerI18n.weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  $ionicPickerI18n.months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio","Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  $ionicPickerI18n.ok = "OK";
  $ionicPickerI18n.cancel = "Sair";
  $ionicPickerI18n.okClass = "button-calm";
  $ionicPickerI18n.cancelClass = "button-stable";
});