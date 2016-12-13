app = angular.module('starter');

app.service('TarefaService', function($http) {

	this.insert = function(tarefa){
		if(tarefa.id != null){ 	
			return $http.put('http://10.0.2.2/agenda/tarefa/index.php', tarefa);
		}
		return $http.post('http://10.0.2.2/agenda/tarefa/index.php', tarefa);
	}
	this.deletar = function(id){
		console.log(id);
		return $http.delete('http://10.0.2.2/agenda/tarefa/index.php?id='+id+'');
	}

	this.get = function(){
		return $http.get('http://10.0.2.2/agenda/tarefa/index.php');
	}
	this.getByAgenda = function(id){
		return $http.get('http://10.0.2.2/agenda/tarefa/index.php?agenda_id='+id+'');
	}
});

