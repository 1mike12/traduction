/**
 * Created by mike on 11/17/15.
 */
var app =  angular.module("app", []);
/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window) {
    var self = this;
    self.init = function () {

    };

    self.parse = function () {
        var input = self.input;

        input = '<zzz>' + input + '</zzz>';
        var output = "";

        angular.forEach(self.filters, function (filter) {
            if (filter.active) {
                output = filter.getOutput(input);
            }
        });

        var xmlResultDocument = $.parseXML(output);
        var $xmlResult = $(xmlResultDocument);
        self.output = $xmlResult.html().toString();
    };

    /**
     * https://github.com/nfarina/xmldoc
     * https://www.npmjs.com/package/change-case
     */
    self.filters = [
        {
            name: "snake --> Title Case",
            valueToggle: true,
            paramToggle: false,
            example: "snake_case --> Snake Case",
            active: false,
            param: "",
            pattern: "",
            replace: "",
            getOutput: function (input) {
                var document = new xmldoc.XmlDocument(input);
                document.eachChild(function (child, index, array) {
                    var target = child.val;

                    if (target) {
                        console.log(target);
                        child.val = changeCase.titleCase(target);
                    }
                });

                return document.toString();
            }
        },
        {
            //https://github.com/bunkat/pseudoloc
            name: "psedolocalize",
            valueToggle: true,
            paramToggle: false,
            example: "snake --> śnakeeé!",
            active: false,
            param: "",
            pattern: "",
            replace: "",
            getOutput: function (input) {
                var document = new xmldoc.XmlDocument(input);
                document.eachChild(function (child, index, array) {
                    var target = child.val;

                    if (target) {
                        pseudoloc.option.prepend = "";
                        pseudoloc.option.append = "";
                        pseudoloc.option.extend = 0.4;

                        child.val = pseudoloc.str(target);
                    }
                });

                return document.toString();
            }
        },
        {
            name: "snake name attribute",
            valueToggle: true,
            paramToggle: false,
            active: false,
            param: "",
            pattern: "",
            replace: "",
            getOutput: function (input) {
                var document = new xmldoc.XmlDocument(input);
                document.eachChild(function (child, index, array) {
                    var target = child.attr.name;

                    if (target) {
                        child.attr.name = changeCase.snakeCase(target);
                    }
                });

                return document.toString();
            }

        },
    ];

    self.toggleFilter = function (filterObj) {
        filterObj.active = !filterObj.active;
    };

    self.init();

    self.input = '<string name="test1">test1</string>\n' +
    '<string name="test2">test2</string>';
});