angular.module('starter')
.controller('AgendaCtrl',function($scope,$ionicModal,$http,$filter,AgendaService,TarefaService,$stateParams){
  $scope.titulo = "Agendas";
  $scope.agendas = [];
  $scope.agenda = {};
  $scope.tarefas = [];
  $scope.agendasSalvas =  $scope.agendas;
  $scope.mensagem = '';


  var usuarioId = $stateParams.usuarioId;
  console.log($stateParams.usuarioId);

  $http.get('http://10.0.2.2/agenda/agenda/index.php?usuario_id='+$stateParams.usuarioId+'').success(function(data){
    $scope.agendas =  data;
  });

    function updateLista(){//atualiza a lista
      AgendaService.getByUsuario($stateParams.usuarioId).success(function(data){
        $scope.agendas = data;
      });
    };


    $ionicModal.fromTemplateUrl('templates/agenda/form.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function(){
      $scope.titulo = "agendas";
      $scope.agenda = [];
      $scope.modal.hide();

    };

    $scope.openModal = function(){
      $scope.titulo = "Formulário de Agenda";

      AgendaService.get().success(function(data){
    //console.log(data[0]);
    $scope.agendas =  data;
  });

      $scope.modal.show();
      console.log($scope.agendas);
    }; 

    $scope.cadastrar = function(agenda){    
      $scope.agenda = agenda;
      $scope.agenda.fk_usuario = $stateParams.usuarioId;  
      console.log(agenda.fk_usuario);
      console.log(agenda.nome);
      AgendaService.insert(agenda).success(function(response){
        console.log(response);
        $scope.closeModal();
        updateLista();  
      });
    };

    $scope.excluir = function(id){
      agenda.deletar(id)
      .success(function(response){
        $scope.closeModal();
        updateLista();
      });

    }

    $scope.alterar = function(agenda){
      $scope.modal.show();

      /*if(abastecimento){//se a modal estiver carregando um abastecimento*/
        $scope.titulo = agenda.nome;
        $scope.agenda = agenda;

      }


      $scope.formatarData = function(data){
        moment.locale('pt-br');
        return moment(data).format('LL');
      }

    });