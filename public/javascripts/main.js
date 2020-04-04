/// <reference path="../js/angular.js" />
(function () {
    var app = angular.module("app", ["ui.router"]);
    app.run(function ($rootScope, $http) {
        $rootScope.isLogged = false;
        $rootScope.loader = false;
        var user = sessionStorage.getItem("user");
        var session = sessionStorage.getItem("session");
        $http.defaults.headers.common.token =JSON.parse(session);
        console.log(user);
        if (user == null) {
            $rootScope.isLogged = false;
        }
        else {
            $rootScope.isLogged = true;
            console.log(user);
            $rootScope.user = JSON.parse(user);
        }
    });
    app.directive("fileInput", ['$parse', function ($parse) {
        return {
            restrict: "A",
            link: function (scope, elm, attrs) {
                elm.bind('change', function () {
                    $parse(attrs.fileInput)
                        .assign(scope, elm[0].files);
                    scope.$apply();
                })
            }
        }
    }])
    app.controller("navCtrl", ["$scope", "$rootScope", function ($scope, $rootScope) {
        $scope.logout = function () {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("session");
            $rootScope.isLogged = false;
            document.location.reload();
        }
    }]);

    app.controller("homeCtrl", ["$scope", function ($scope) {
        //write home controller code
    }])
    app.controller("profileCtrl", ["$scope", "$rootScope", "$http", function ($scope, $rootScope, $http) {
        $scope.deleteInstitution = function(index){
            $scope.institutions.splice(index,1);
            console.log($scope.institutions);
        }
        $scope.index = null;
        $scope.addRecord = function(){
            if($scope.index){
$scope.institution[$scope.index] = $scope.institution;
$scope.institution = {};
$scope.index = null;
return;
            }
$scope.institutions.push( $scope.institution);
$scope.institution = {};
console.log($scope.institutions)
        };
        $scope.loadInstitution = function(index){
            $scope.index = index;
            $scope.institution = $scope.institutions[index];
        }
        $scope.institution = {};
        $scope.institutions = [];
        $scope.startup = true;
        $scope.startVerification = function () {
            $scope.startup = false;
            console.log($rootScope.user);
            $scope.verify = {};
            $scope.verify.firstname = $rootScope.user.firstname;
        }
        if ($rootScope.isLogged == false) {
            console.log(location);
            location.href = '/';
        };
        $scope.fileChanged = function (elem) {
            $scope.file = elem.files[0];
            $scope.$apply();
            console.log($scope.file);
            if ($scope.file.size > 100000) {
                alert("Image size too large! Pick image less than 100kb.");
            }
            else {
                var fd = new FormData();
                fd.append('id', 3);
                fd.append('file', $scope.file);
                console.log(fd);
                $http.post("/secure/uploadpics", fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type' : undefined
                    }
                }).then(function (res) {
                    alert("upload successful");
                    console.log(res.data);
                    sessionStorage.setItem("user", JSON.stringify(res.data.user));
                    $rootScope.user = res.data.user;
                    }, function (err) {
                        console.log(err)
                    })
            }
        }
        $scope.saveEdit = function () {
            $rootScope.user;
            for (var key in $rootScope.user) {
                if (key == $scope.edit.holder) {
                    $rootScope.user[key] = $scope.edit.value;
                    console.log($rootScope.user);
                    break;
                }
            }
            $('#editModal').modal("hide");
            $http.put('/secure/update',$scope.edit, function (res) {
                console.log(res.data);
            })
        }
        $scope.popupEdit = function (holder, value) {
            $scope.edit = {
                "value": value,
                "holder": holder
            }
            $('#editModal').modal("show");
        }
    }])
    app.controller("bookCtrl", ["$scope", "$http", function ($scope, $http) {
        console.log("we are ok");
        $http.get("/api/books").then(function (res) {
            if (res.data.length > 0) {
                $scope.books = res.data;
            }
            else {
                console.log("no available book in store");
            }
        }, function (err) {
            console.log("failed to load books");
            console.log(err);
            });
    }])
    var countries = [{ "name": "Afghanistan" }, { "name": "Åland Islands" }, { "name": "Albania" }, { "name": "Algeria" }, { "name": "American Samoa" }, { "name": "Andorra" }, { "name": "Angola" }, { "name": "Anguilla" }, { "name": "Antarctica" }, { "name": "Antigua and Barbuda" }, { "name": "Argentina" }, { "name": "Armenia" }, { "name": "Aruba" }, { "name": "Australia" }, { "name": "Austria" }, { "name": "Azerbaijan" }, { "name": "Bahamas" }, { "name": "Bahrain" }, { "name": "Bangladesh" }, { "name": "Barbados" }, { "name": "Belarus" }, { "name": "Belgium" }, { "name": "Belize" }, { "name": "Benin" }, { "name": "Bermuda" }, { "name": "Bhutan" }, { "name": "Bolivia (Plurinational State of)" }, { "name": "Bonaire, Sint Eustatius and Saba" }, { "name": "Bosnia and Herzegovina" }, { "name": "Botswana" }, { "name": "Bouvet Island" }, { "name": "Brazil" }, { "name": "British Indian Ocean Territory" }, { "name": "United States Minor Outlying Islands" }, { "name": "Virgin Islands (British)" }, { "name": "Virgin Islands (U.S.)" }, { "name": "Brunei Darussalam" }, { "name": "Bulgaria" }, { "name": "Burkina Faso" }, { "name": "Burundi" }, { "name": "Cambodia" }, { "name": "Cameroon" }, { "name": "Canada" }, { "name": "Cabo Verde" }, { "name": "Cayman Islands" }, { "name": "Central African Republic" }, { "name": "Chad" }, { "name": "Chile" }, { "name": "China" }, { "name": "Christmas Island" }, { "name": "Cocos (Keeling) Islands" }, { "name": "Colombia" }, { "name": "Comoros" }, { "name": "Congo" }, { "name": "Congo (Democratic Republic of the)" }, { "name": "Cook Islands" }, { "name": "Costa Rica" }, { "name": "Croatia" }, { "name": "Cuba" }, { "name": "Curaçao" }, { "name": "Cyprus" }, { "name": "Czech Republic" }, { "name": "Denmark" }, { "name": "Djibouti" }, { "name": "Dominica" }, { "name": "Dominican Republic" }, { "name": "Ecuador" }, { "name": "Egypt" }, { "name": "El Salvador" }, { "name": "Equatorial Guinea" }, { "name": "Eritrea" }, { "name": "Estonia" }, { "name": "Ethiopia" }, { "name": "Falkland Islands (Malvinas)" }, { "name": "Faroe Islands" }, { "name": "Fiji" }, { "name": "Finland" }, { "name": "France" }, { "name": "French Guiana" }, { "name": "French Polynesia" }, { "name": "French Southern Territories" }, { "name": "Gabon" }, { "name": "Gambia" }, { "name": "Georgia" }, { "name": "Germany" }, { "name": "Ghana" }, { "name": "Gibraltar" }, { "name": "Greece" }, { "name": "Greenland" }, { "name": "Grenada" }, { "name": "Guadeloupe" }, { "name": "Guam" }, { "name": "Guatemala" }, { "name": "Guernsey" }, { "name": "Guinea" }, { "name": "Guinea-Bissau" }, { "name": "Guyana" }, { "name": "Haiti" }, { "name": "Heard Island and McDonald Islands" }, { "name": "Holy See" }, { "name": "Honduras" }, { "name": "Hong Kong" }, { "name": "Hungary" }, { "name": "Iceland" }, { "name": "India" }, { "name": "Indonesia" }, { "name": "Côte d'Ivoire" }, { "name": "Iran (Islamic Republic of)" }, { "name": "Iraq" }, { "name": "Ireland" }, { "name": "Isle of Man" }, { "name": "Israel" }, { "name": "Italy" }, { "name": "Jamaica" }, { "name": "Japan" }, { "name": "Jersey" }, { "name": "Jordan" }, { "name": "Kazakhstan" }, { "name": "Kenya" }, { "name": "Kiribati" }, { "name": "Kuwait" }, { "name": "Kyrgyzstan" }, { "name": "Lao People's Democratic Republic" }, { "name": "Latvia" }, { "name": "Lebanon" }, { "name": "Lesotho" }, { "name": "Liberia" }, { "name": "Libya" }, { "name": "Liechtenstein" }, { "name": "Lithuania" }, { "name": "Luxembourg" }, { "name": "Macao" }, { "name": "Macedonia (the former Yugoslav Republic of)" }, { "name": "Madagascar" }, { "name": "Malawi" }, { "name": "Malaysia" }, { "name": "Maldives" }, { "name": "Mali" }, { "name": "Malta" }, { "name": "Marshall Islands" }, { "name": "Martinique" }, { "name": "Mauritania" }, { "name": "Mauritius" }, { "name": "Mayotte" }, { "name": "Mexico" }, { "name": "Micronesia (Federated States of)" }, { "name": "Moldova (Republic of)" }, { "name": "Monaco" }, { "name": "Mongolia" }, { "name": "Montenegro" }, { "name": "Montserrat" }, { "name": "Morocco" }, { "name": "Mozambique" }, { "name": "Myanmar" }, { "name": "Namibia" }, { "name": "Nauru" }, { "name": "Nepal" }, { "name": "Netherlands" }, { "name": "New Caledonia" }, { "name": "New Zealand" }, { "name": "Nicaragua" }, { "name": "Niger" }, { "name": "Nigeria" }, { "name": "Niue" }, { "name": "Norfolk Island" }, { "name": "Korea (Democratic People's Republic of)" }, { "name": "Northern Mariana Islands" }, { "name": "Norway" }, { "name": "Oman" }, { "name": "Pakistan" }, { "name": "Palau" }, { "name": "Palestine, State of" }, { "name": "Panama" }, { "name": "Papua New Guinea" }, { "name": "Paraguay" }, { "name": "Peru" }, { "name": "Philippines" }, { "name": "Pitcairn" }, { "name": "Poland" }, { "name": "Portugal" }, { "name": "Puerto Rico" }, { "name": "Qatar" }, { "name": "Republic of Kosovo" }, { "name": "Réunion" }, { "name": "Romania" }, { "name": "Russian Federation" }, { "name": "Rwanda" }, { "name": "Saint Barthélemy" }, { "name": "Saint Helena, Ascension and Tristan da Cunha" }, { "name": "Saint Kitts and Nevis" }, { "name": "Saint Lucia" }, { "name": "Saint Martin (French part)" }, { "name": "Saint Pierre and Miquelon" }, { "name": "Saint Vincent and the Grenadines" }, { "name": "Samoa" }, { "name": "San Marino" }, { "name": "Sao Tome and Principe" }, { "name": "Saudi Arabia" }, { "name": "Senegal" }, { "name": "Serbia" }, { "name": "Seychelles" }, { "name": "Sierra Leone" }, { "name": "Singapore" }, { "name": "Sint Maarten (Dutch part)" }, { "name": "Slovakia" }, { "name": "Slovenia" }, { "name": "Solomon Islands" }, { "name": "Somalia" }, { "name": "South Africa" }, { "name": "South Georgia and the South Sandwich Islands" }, { "name": "Korea (Republic of)" }, { "name": "South Sudan" }, { "name": "Spain" }, { "name": "Sri Lanka" }, { "name": "Sudan" }, { "name": "Suriname" }, { "name": "Svalbard and Jan Mayen" }, { "name": "Swaziland" }, { "name": "Sweden" }, { "name": "Switzerland" }, { "name": "Syrian Arab Republic" }, { "name": "Taiwan" }, { "name": "Tajikistan" }, { "name": "Tanzania, United Republic of" }, { "name": "Thailand" }, { "name": "Timor-Leste" }, { "name": "Togo" }, { "name": "Tokelau" }, { "name": "Tonga" }, { "name": "Trinidad and Tobago" }, { "name": "Tunisia" }, { "name": "Turkey" }, { "name": "Turkmenistan" }, { "name": "Turks and Caicos Islands" }, { "name": "Tuvalu" }, { "name": "Uganda" }, { "name": "Ukraine" }, { "name": "United Arab Emirates" }, { "name": "United Kingdom of Great Britain and Northern Ireland" }, { "name": "United States of America" }, { "name": "Uruguay" }, { "name": "Uzbekistan" }, { "name": "Vanuatu" }, { "name": "Venezuela (Bolivarian Republic of)" }, { "name": "Viet Nam" }, { "name": "Wallis and Futuna" }, { "name": "Western Sahara" }, { "name": "Yemen" }, { "name": "Zambia" }, { "name": "Zimbabwe" }]
})();