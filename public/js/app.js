var app = angular.module('BidletApp', ['ngRoute', 'appRoutes']),
    user,
    username = "",
    userPhotoURL = "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
    config = {
      apiKey: "AIzaSyCAVZQre1Z2L1vXfon989LEWglXYvlnZIw",
      authDomain: "bidlet-ba782.firebaseapp.com",
      databaseURL: "https://bidlet-ba782.firebaseio.com",
      storageBucket: "bidlet-ba782.appspot.com",
      messagingSenderId: "225371224958"
  };
app.controller('MainController', function($scope) {
    $scope.isLoggedIn = false;
    $scope.username = username;
    $scope.userPhotoURL = userPhotoURL;
    $scope.listings = [{ title: "Sublet near UW", image: "http://i.ebayimg.com/00/s/NjM2WDQ1MA==/z/kMoAAOSwU-pXr~h~/$_35.JPG", description: "Lorem dim sum Shrimp dumpling Wu gok Cha siu bao Lo mai gai baked barbecue pork bao Egg custard tarts Popular shumai cha siu bao A creamy mango pudding Chiu-chao fal egg shomai pancit canton guisado.", address: "Lester 203"},
    { title: "Sublet near UW", image: "http://i.ebayimg.com/00/s/NjM2WDQ1MA==/z/kMoAAOSwU-pXr~h~/$_35.JPG", description: "Lorem dim sum Shrimp dumpling Wu gok Cha siu bao Lo mai gai baked barbecue pork bao Egg custard tarts Popular shumai cha siu bao A creamy mango pudding Chiu-chao fan guo. Siu mai Haam sui gau Jiu cai bau. Crispy dragon roll honeydew puree with sago deep fried garlicky fish ball chee cheon", address: "Lester 203"}];

    $(function (){
    $("#fblogin").click(function(){
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // The signed-in user info.
          user = result.user;
          $("#fblogin").after("<b>Logged in " + user.displayName +"</b>");
          $("#fblogin").remove();

          $scope.$apply(function() {
              $scope.username = user.displayName;
              $scope.userPhotoURL = user.photoURL;
              $scope.isLoggedIn = true;
            });
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    });
    });

});


  firebase.initializeApp(config);
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.setCustomParameters({
'display': 'popup'
});
