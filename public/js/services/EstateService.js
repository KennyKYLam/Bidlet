angular.module('EstateService', []).factory('Estate', ['$http', function($http) {

    return {
        // call to get all nerds
        get : function() {
            return $http.get('/api/estate');
        },


                // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new nerd
        create : function(estateData) {
            return $http.post('/api/estate', estateData);
        },

        // call to DELETE a nerd
        delete : function(id) {
            return $http.delete('/api/estate/' + id);
        }
    }

}]);
