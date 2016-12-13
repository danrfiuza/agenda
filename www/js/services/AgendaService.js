app = angular.module('starter');

app.service('AgendaService', function($http) {

	this.insert = function(agenda){
		if(agenda.id != null){ 	
			return $http.put('http://10.0.2.2/agenda/agenda/index.php', agenda);
		}
		return $http.post('http://10.0.2.2/agenda/agenda/index.php', agenda);
	}
	this.deletar = function(id){
		console.log(id);
		return $http.delete('http://10.0.2.2/agenda/agenda/index.php?id='+id+'');
	}

	this.get = function(){
		return $http.get('http://10.0.2.2/agenda/agenda/index.php');
	}
	this.getById = function(id){
		return $http.get('http://10.0.2.2/agenda/agenda/index.php?id='+id+'');
	}
	this.getByUsuario = function(id){
		return $http.get('http://10.0.2.2/agenda/agenda/index.php?usuario_id='+id+'');
	}
});