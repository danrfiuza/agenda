angular.module('starter')
.controller('UsuarioCtrl', function($http,$scope,$ionicModal,$cordovaCamera,$ionicPopup,UsuarioService) {
  $scope.usuarios = [];
  $scope.titulo = "Usuários";
  $scope.srcImage = "";

  $ionicModal.fromTemplateUrl('templates/usuario/form.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $http.get('http://10.0.2.2/agenda/usuario/index.php').success(function(data){
    $scope.usuarios =  data;
  });

function updateLista(){//atualiza a lista
  $http.get('http://10.0.2.2/agenda/usuario/index.php').success(function(data){
    $scope.usuarios =  data;
  });
};

$scope.openModal = function(){
  $scope.titulo = "Configurações do Usuário";
  $scope.modal.show();

}; 

$scope.cadastrar = function(usuario){    
  UsuarioService.insert(usuario).success(function(response){
    console.log(response);
    $scope.closeModal();
    updateLista();  
  });
};

$scope.deletar = function(id){
  agenda.deletar(id)
  .success(function(response){
    $scope.closeModal();
    updateLista();
  });

}

$scope.closeModal = function(){
  $scope.titulo = "Usuários";
  $scope.usuarios = [];
  $scope.modal.hide();
  updateLista();
};

$scope.alterar = function(usuario){
  $scope.modal.show();

  /*if(abastecimento){//se a modal estiver carregando um abastecimento*/
    PostoService.get().success(function(data){
    //console.log(data[0]);
    $scope.usuarios =  data;
  });
    $scope.titulo = "usuario "+ usuario.id;
    usuario.nascimento = new Date($filter('date')(usuario.nascimento, 'yyyy-MM-dd'));
    $scope.usuario = usuario;
/*  }
*/  
}


$scope.showAlert = function(mensagem) {
 var alertPopup = $ionicPopup.alert({
   title: 'Sucesso!',
   template: mensagem
 });
};
});