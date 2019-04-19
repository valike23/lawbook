/// <reference path="../js/angular.js" />
(function ($) {
    'use strict';
    /*==================================================================
        [ Daterangepicker ]*/
    try {
        $('.js-datepicker').daterangepicker({
            "singleDatePicker": true,
            "showDropdowns": true,
            "autoUpdateInput": false,
            locale: {
                format: 'DD/MM/YYYY'
            },
        });
    
        var myCalendar = $('.js-datepicker');
        var isClick = 0;
    
        $(window).on('click',function(){
            isClick = 0;
        });
    
        $(myCalendar).on('apply.daterangepicker',function(ev, picker){
            isClick = 0;
            $(this).val(picker.startDate.format('DD/MM/YYYY'));
    
        });
    
        $('.js-btn-calendar').on('click',function(e){
            e.stopPropagation();
    
            if(isClick === 1) isClick = 0;
            else if(isClick === 0) isClick = 1;
    
            if (isClick === 1) {
                myCalendar.focus();
            }
        });
    
        $(myCalendar).on('click',function(e){
            e.stopPropagation();
            isClick = 1;
        });
    
        $('.daterangepicker').on('click',function(e){
            e.stopPropagation();
        });
    
    
    } catch(er) {console.log(er);}
    /*[ Select 2 Config ]
        ===========================================================*/
    
    try {
        var selectSimple = $('.js-select-simple');
    
        selectSimple.each(function () {
            var that = $(this);
            var selectBox = that.find('select');
            var selectDropdown = that.find('.select-dropdown');
            selectBox.select2({
                dropdownParent: selectDropdown
            });
        });
    
    } catch (err) {
        console.log(err);
    }
    

})(jQuery);

(function () {
   
    var app = angular.module("app", []);
    app.run(function ($rootScope) {
        $rootScope.countries = countries;
    });
    app.controller("registerCtrl", ["$scope", "$http", function ($scope, $http) {
    
        var test = false;
        var test2 = false;
        $scope.success = true;
        var loaded = document.getElementById("loadingBlock");
        var main = document.getElementById("mainBlock");
        var username = document.getElementById("username");
        var confirm = document.getElementById("confirm");
        var password = document.getElementById("password");
        main.style.display = "block";
        loaded.style.display = "none";


        $scope.submit = function () {
            $scope.user.birthday = document.getElementById("birth").value;
            console.log($scope.user);
         
            main.style.display = "none";
            loaded.style.display = "block";
            if (test && test2) {
                $http.post("/api/register", $scope.user).then(function (res) {
                    main.style.display = "block";
                    loaded.style.display = "none";
                    if (res.data.message == "user created successfully") {
                        alert("user created successfully!!!,   click ok to login");
                        location.href = "/login";
                    }
                    else {
                        alert("there must have been an error in the form you filled please change the username and try again...")
                        main.style.display = "block";
                        loaded.style.display = "none";

                    }
                }, function (err) {
                    main.style.display = "block";
                    loaded.style.display = "none";
                    alert("oops!!!, something went wrong please try again... or you can contact admin.");
                })
            }
        }
        $scope.checkUser = function () {
            console.log($scope.user.username)
            $http.get("/api/checkUser/" + $scope.user.username).then(function (res) {
                console.log(res.data);
                if (res.data.length > 0) {
                    test = false;
                    console.log(res.data);
                    username.className += " error";
                }
                else {
                    test = true;
                    username.classList.remove("error");
                }
            }, function (err) {
                console.log(err);
        
                })
        }
        $scope.confirmPassword = function () {
            if ($scope.user.password != $scope.confirm) {
                test2 = false;
                confirm.className += " error";
                password.className += " error";

            }
            else {
                test2 = true;
               confirm.classList.remove("error");
                password.classList.remove("error");

            }
        }
    }]);

})()


var countries = [{ "name": "Afghanistan" }, { "name": "�land Islands" }, { "name": "Albania" }, { "name": "Algeria" }, { "name": "American Samoa" }, { "name": "Andorra" }, { "name": "Angola" }, { "name": "Anguilla" }, { "name": "Antarctica" }, { "name": "Antigua and Barbuda" }, { "name": "Argentina" }, { "name": "Armenia" }, { "name": "Aruba" }, { "name": "Australia" }, { "name": "Austria" }, { "name": "Azerbaijan" }, { "name": "Bahamas" }, { "name": "Bahrain" }, { "name": "Bangladesh" }, { "name": "Barbados" }, { "name": "Belarus" }, { "name": "Belgium" }, { "name": "Belize" }, { "name": "Benin" }, { "name": "Bermuda" }, { "name": "Bhutan" }, { "name": "Bolivia (Plurinational State of)" }, { "name": "Bonaire, Sint Eustatius and Saba" }, { "name": "Bosnia and Herzegovina" }, { "name": "Botswana" }, { "name": "Bouvet Island" }, { "name": "Brazil" }, { "name": "British Indian Ocean Territory" }, { "name": "United States Minor Outlying Islands" }, { "name": "Virgin Islands (British)" }, { "name": "Virgin Islands (U.S.)" }, { "name": "Brunei Darussalam" }, { "name": "Bulgaria" }, { "name": "Burkina Faso" }, { "name": "Burundi" }, { "name": "Cambodia" }, { "name": "Cameroon" }, { "name": "Canada" }, { "name": "Cabo Verde" }, { "name": "Cayman Islands" }, { "name": "Central African Republic" }, { "name": "Chad" }, { "name": "Chile" }, { "name": "China" }, { "name": "Christmas Island" }, { "name": "Cocos (Keeling) Islands" }, { "name": "Colombia" }, { "name": "Comoros" }, { "name": "Congo" }, { "name": "Congo (Democratic Republic of the)" }, { "name": "Cook Islands" }, { "name": "Costa Rica" }, { "name": "Croatia" }, { "name": "Cuba" }, { "name": "Cura�ao" }, { "name": "Cyprus" }, { "name": "Czech Republic" }, { "name": "Denmark" }, { "name": "Djibouti" }, { "name": "Dominica" }, { "name": "Dominican Republic" }, { "name": "Ecuador" }, { "name": "Egypt" }, { "name": "El Salvador" }, { "name": "Equatorial Guinea" }, { "name": "Eritrea" }, { "name": "Estonia" }, { "name": "Ethiopia" }, { "name": "Falkland Islands (Malvinas)" }, { "name": "Faroe Islands" }, { "name": "Fiji" }, { "name": "Finland" }, { "name": "France" }, { "name": "French Guiana" }, { "name": "French Polynesia" }, { "name": "French Southern Territories" }, { "name": "Gabon" }, { "name": "Gambia" }, { "name": "Georgia" }, { "name": "Germany" }, { "name": "Ghana" }, { "name": "Gibraltar" }, { "name": "Greece" }, { "name": "Greenland" }, { "name": "Grenada" }, { "name": "Guadeloupe" }, { "name": "Guam" }, { "name": "Guatemala" }, { "name": "Guernsey" }, { "name": "Guinea" }, { "name": "Guinea-Bissau" }, { "name": "Guyana" }, { "name": "Haiti" }, { "name": "Heard Island and McDonald Islands" }, { "name": "Holy See" }, { "name": "Honduras" }, { "name": "Hong Kong" }, { "name": "Hungary" }, { "name": "Iceland" }, { "name": "India" }, { "name": "Indonesia" }, { "name": "C�te d'Ivoire" }, { "name": "Iran (Islamic Republic of)" }, { "name": "Iraq" }, { "name": "Ireland" }, { "name": "Isle of Man" }, { "name": "Israel" }, { "name": "Italy" }, { "name": "Jamaica" }, { "name": "Japan" }, { "name": "Jersey" }, { "name": "Jordan" }, { "name": "Kazakhstan" }, { "name": "Kenya" }, { "name": "Kiribati" }, { "name": "Kuwait" }, { "name": "Kyrgyzstan" }, { "name": "Lao People's Democratic Republic" }, { "name": "Latvia" }, { "name": "Lebanon" }, { "name": "Lesotho" }, { "name": "Liberia" }, { "name": "Libya" }, { "name": "Liechtenstein" }, { "name": "Lithuania" }, { "name": "Luxembourg" }, { "name": "Macao" }, { "name": "Macedonia (the former Yugoslav Republic of)" }, { "name": "Madagascar" }, { "name": "Malawi" }, { "name": "Malaysia" }, { "name": "Maldives" }, { "name": "Mali" }, { "name": "Malta" }, { "name": "Marshall Islands" }, { "name": "Martinique" }, { "name": "Mauritania" }, { "name": "Mauritius" }, { "name": "Mayotte" }, { "name": "Mexico" }, { "name": "Micronesia (Federated States of)" }, { "name": "Moldova (Republic of)" }, { "name": "Monaco" }, { "name": "Mongolia" }, { "name": "Montenegro" }, { "name": "Montserrat" }, { "name": "Morocco" }, { "name": "Mozambique" }, { "name": "Myanmar" }, { "name": "Namibia" }, { "name": "Nauru" }, { "name": "Nepal" }, { "name": "Netherlands" }, { "name": "New Caledonia" }, { "name": "New Zealand" }, { "name": "Nicaragua" }, { "name": "Niger" }, { "name": "Nigeria" }, { "name": "Niue" }, { "name": "Norfolk Island" }, { "name": "Korea (Democratic People's Republic of)" }, { "name": "Northern Mariana Islands" }, { "name": "Norway" }, { "name": "Oman" }, { "name": "Pakistan" }, { "name": "Palau" }, { "name": "Palestine, State of" }, { "name": "Panama" }, { "name": "Papua New Guinea" }, { "name": "Paraguay" }, { "name": "Peru" }, { "name": "Philippines" }, { "name": "Pitcairn" }, { "name": "Poland" }, { "name": "Portugal" }, { "name": "Puerto Rico" }, { "name": "Qatar" }, { "name": "Republic of Kosovo" }, { "name": "R�union" }, { "name": "Romania" }, { "name": "Russian Federation" }, { "name": "Rwanda" }, { "name": "Saint Barth�lemy" }, { "name": "Saint Helena, Ascension and Tristan da Cunha" }, { "name": "Saint Kitts and Nevis" }, { "name": "Saint Lucia" }, { "name": "Saint Martin (French part)" }, { "name": "Saint Pierre and Miquelon" }, { "name": "Saint Vincent and the Grenadines" }, { "name": "Samoa" }, { "name": "San Marino" }, { "name": "Sao Tome and Principe" }, { "name": "Saudi Arabia" }, { "name": "Senegal" }, { "name": "Serbia" }, { "name": "Seychelles" }, { "name": "Sierra Leone" }, { "name": "Singapore" }, { "name": "Sint Maarten (Dutch part)" }, { "name": "Slovakia" }, { "name": "Slovenia" }, { "name": "Solomon Islands" }, { "name": "Somalia" }, { "name": "South Africa" }, { "name": "South Georgia and the South Sandwich Islands" }, { "name": "Korea (Republic of)" }, { "name": "South Sudan" }, { "name": "Spain" }, { "name": "Sri Lanka" }, { "name": "Sudan" }, { "name": "Suriname" }, { "name": "Svalbard and Jan Mayen" }, { "name": "Swaziland" }, { "name": "Sweden" }, { "name": "Switzerland" }, { "name": "Syrian Arab Republic" }, { "name": "Taiwan" }, { "name": "Tajikistan" }, { "name": "Tanzania, United Republic of" }, { "name": "Thailand" }, { "name": "Timor-Leste" }, { "name": "Togo" }, { "name": "Tokelau" }, { "name": "Tonga" }, { "name": "Trinidad and Tobago" }, { "name": "Tunisia" }, { "name": "Turkey" }, { "name": "Turkmenistan" }, { "name": "Turks and Caicos Islands" }, { "name": "Tuvalu" }, { "name": "Uganda" }, { "name": "Ukraine" }, { "name": "United Arab Emirates" }, { "name": "United Kingdom of Great Britain and Northern Ireland" }, { "name": "United States of America" }, { "name": "Uruguay" }, { "name": "Uzbekistan" }, { "name": "Vanuatu" }, { "name": "Venezuela (Bolivarian Republic of)" }, { "name": "Viet Nam" }, { "name": "Wallis and Futuna" }, { "name": "Western Sahara" }, { "name": "Yemen" }, { "name": "Zambia" }, { "name": "Zimbabwe" }]