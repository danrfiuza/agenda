angular.module('starter')
.controller('TarefaCtrl', function($scope,$ionicModal,$cordovaDialogs,$stateParams,AgendaService,TarefaService,$http,$filter,$cordovaToast) {
  $scope.tarefas = [];
  $scope.titulo = "Tarefas";
  $scope.fk_agenda  = $stateParams.agendaId;
  var agendaId = $stateParams.agendaId;
  console.log($stateParams.agendaId);

  $scope.showToast = function(message, duration, location) {
    $cordovaToast.show(message, duration, location).then(function(success) {
      console.log("The toast was shown");
    }, function (error) {
      console.log("The toast was not shown due to " + error);
    });
  }
  $http.get('http://10.0.2.2/agenda/tarefa/index.php?agenda_id='+$stateParams.agendaId+'').success(function(data){
    $scope.tarefas =  data;
  });

    function updateLista(){//atualiza a lista
      TarefaService.getByAgenda($stateParams.agendaId).success(function(data){
        $scope.tarefas = data;
      });
    };

    
    $ionicModal.fromTemplateUrl('templates/tarefa/form.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.closeModal = function(){
      $scope.titulo = "tarefas";
      $scope.tarefa = [];
      $scope.modal.hide();

    };

    $scope.openModal = function(){
      $scope.tarefa = {};
      $scope.titulo = "Formulário de tarefa";
      $scope.fk_agenda = $stateParams.agendaId;
      console.log("fk_agenda: " + $scope.fk_agenda);
      $scope.modal.show();
    }; 

    $scope.cadastrar = function(tarefa){  
      $scope.tarefa = tarefa;
    /*      tarefa.data = new Date($filter('date')(tarefa.data, 'yyyy-MM-dd'));
    */      $scope.tarefa.fk_agenda = $stateParams.agendaId;  
    TarefaService.insert(tarefa).success(function(response){
      console.log(response);
      $scope.closeModal();
      updateLista();  
      $scope.showToast('Salvo', 'long', 'center');
    }).error(function(response){
      $scope.showToast('Ocorreu um erro', 'long', 'center');
      updateLista(); 
      console.log(response);
    });
  };

  $scope.deletar = function(tarefa){
    $cordovaDialogs.confirm("Deseja apagar a tarefa '"+tarefa.nome+"' ?", 'Apagar Tarefa', ['Confirmar','Cancelar'])
    .then(function(buttonIndex) {
     var btnIndex = buttonIndex;
     if(btnIndex == 1){
      TarefaService.deletar(tarefa.id)
      .success(function(response){
        $scope.closeModal();
        updateLista();
        $scope.showToast('Tarefa deletada com sucesso', 'long', 'center');
      });
    }
      // no button = 0, 'OK' = 1, 'Cancel' = 2



    });
  }

  $scope.alterar = function(tarefa){
    $scope.modal.show();

    /*if(abastecimento){//se a modal estiver carregando um abastecimento*/
      $scope.titulo = tarefa.nome;
/*        tarefa.data = new Date($filter('date')(tarefa.data, 'yyyy-MM-dd'));
*/        console.log(tarefa.data);
$scope.tarefa = tarefa;

}


$scope.formatarData = function(data){
  moment.locale('pt-br');
  return moment(data).format('LL');
}
});