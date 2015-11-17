/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window) {
    var self = this;
    self.init = function () {

    };

    self.run = function () {

    };


    self.parse = function () {
        var input = self.input;
        var document = new xmldoc.XmlDocument(input);
        document.eachChild(function (child, index, array) {
            var attribute = child.attr.name;

            if (attribute){
                console.log(attribute);
                child.attr.name = changeCase.snakeCase(attribute);
            }
        });

        self.output = document.toString();
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

    self.toggleFilter = function (filterObj) {

    };

    self.init();
});