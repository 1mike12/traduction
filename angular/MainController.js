/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function(){
    var self = this;

    self.init = function(){

    };

    self.filters = [
        {
            name: "snake case",
            pattern: "",
            replace: ""

        },
        {
            name: "strip dupes",
            pattern: "",
            replace: ""
        },
        {
            name: "space to underline",
            pattern: "",
            replace: ""
        },
        {
            name: "strip dupe content",
            pattern: "",
            replace: ""
        },
        {
            name: "to lowercase",
            pattern: "",
            replace: ""
        },
        {
            name: "to uppercase",
            pattern: "",
            replace: ""
        }
    ];

    self.toggleFilter = function (filterObj){

    };

    self.init();
});