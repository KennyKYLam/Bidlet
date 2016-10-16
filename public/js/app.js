var app = angular.module('BidletApp', ['ngRoute', 'appRoutes']),
    user,
    username = "",
    email = "",
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
    $scope.email = email;
    $scope.anonlistings = [{ title: "8 month lease near UW", landlord: "Joanna", bidder: "Jeffrey Brown", bidPrice: 560, photoURL: "http://i.ebayimg.com/00/s/NjM2WDQ1MA==/z/kMoAAOSwU-pXr~h~/$_35.JPG", description: "female only, 2 rooms left", address: "Lester 203" },
        { title: "8 month sublet near Laurier", landlord: "Terence", bidder: "Andrew Brown", bidPrice: 560, photoURL: "http://faithchung.ca/images/22953/Icon-145.jpg", description: "1 cool room out of 5", address: "University 200" },
        { title: "4 month Sublet near UW", landlord:"Kelly", bidder: "Jane Doe", bidPrice: 800, photoURL: "http://i.ebayimg.com/00/s/NjM2WDQ1MA==/z/kMoAAOSwU-pXr~h~/$_35.JPG", description: "Nice and clean, close to campus", address: "Lester 203" }
    ];
    var array = [];
    var list = firebase.database().ref("estates/").orderByChild("title").on("child_added", function(data) {
        var x = {};
        x["title"] = data.val().title;
        x["address"] = data.val().address;
        x["landlord"] = data.val().landlord;
        x["description"] = data.val().description;
        x["startPrice"] = data.val().startPrice;
        x["currentPrice"] = data.val().currentPrice;
        x["bidPrice"] = data.val().bidPrice;
        x["photoURL"] = data.val().photoURL;
        x["bidder"] = data.val().bidder;
        array.push(x);
    });
    $scope.listings = array;

    function login() {
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            user = result.user;
            $("#fblogin").after("<b>Logged in " + user.displayName + "</b>");
            $("#fblogin").remove();

            $scope.$apply(function() {
                $scope.username = username = user.displayName;
                $scope.userPhotoURL = user.photoURL;
                $scope.email = user.email;
                $scope.isLoggedIn = true;
            });

            firebase.database().ref('users/' + user.displayName).set({
                name: user.displayName,
                photoURL: user.photoURL,
                email: user.email
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
    }

    $("#fblogin").click(function() { login(); });
    $(".bid").click(function() {
        if (!isLoggedIn) login();
    });

    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 16 // Creates a dropdown of 16 years to control year
    });
    $("#postEstate").click(function() {
        //var $input = $('.datepicker').pickadate();
        // lastDayOfBid = $input.pickadate('picker');
        //console.log(lastDayOfBid);
        firebase.database().ref('estates/' + $scope.title).set({
            title: $scope.title || '',
            landlord: username,
            address: $scope.address || '',
            description: $scope.description || '',
            startPrice: $scope.startPrice || 0,
            currentPrice: $scope.startPrice || 0,
            bidPrice: $scope.startPrice || 0,
            photoURL: $scope.photoURL || '',
            bidder: "Nobody"
                // lastDayOfBid: lastDayOfBid
        });
    });

});

firebase.initializeApp(config);
var provider = new firebase.auth.FacebookAuthProvider();
provider.setCustomParameters({
    'display': 'popup'
});
