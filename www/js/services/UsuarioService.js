app = angular.module('starter');

app.service('UsuarioService', function($http) {

	this.insert = function(usuario){
		if(usuario.id != null){ 	
			return $http.put('http://10.0.2.2/agenda/usuario/index.php', usuario);
		}
		return $http.post('http://10.0.2.2/agenda/usuario/index.php', usuario);
	}
	this.deletar = function(id){
		console.log(id);
		return $http.delete('http://10.0.2.2/agenda/usuario/index.php?id='+id+'');
	}

	this.get = function(){
		return $http.get('http://10.0.2.2/agenda/usuario/index.php');
	}
});