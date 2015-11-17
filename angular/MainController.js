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

        },
        {
            name: "strip dupes",
        },
        {
            name: "space to underline"
        },
        {
            name: "strip dupe content"
        },
        {
            name: "to lowercase"
        },
        {
            name: "to uppercase"
        }
    ];

    self.init();
});