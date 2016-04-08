/**
 * Created by mike on 12/12/15.
 */
var app = angular.module("app", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state("bye", {
            url: "/",
            templateUrl: "views/bye.html"
        })

});