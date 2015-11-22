/**
 * Created by mike on 11/17/15.
 */
var app =  angular.module("app", []);
/**
 * Created by 1mike12 on 11/22/2015.
 */
app.service("FiltersService", function () {
    function Service() {
        var self = this;

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
                            child.val = changeCase.titleCase(target);
                        }
                    });

                    return {
                        message : "",
                        output : document.toString()
                    }
                }
            },
            {
                //https://github.com/bunkat/pseudoloc
                name: "Pseudo-localize",
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

                    return {
                        message : "",
                        output : document.toString()
                    }
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

                    return {
                        message : "",
                        output : document.toString()
                    }

                }

            },
            {
                name: "Remove dupes",
                valueToggle: true,
                paramToggle: false,
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input) {
                    var step1 = $.parseXML(input);
                    var $xml = $(step1);
                    var $children = $xml.find("zzz").children();

                    var map = {};
                    var count = 0;
                    $children.each(function () {
                        var value = $(this).text();
                        if (value in map) {
                            $(this).remove();
                            count++;
                        } else {
                            map[value] = true;
                        }

                    });

                    return {
                        message : count + " lines removed",
                        output : $xml.find("zzz").prop('outerHTML')
                    }
                }

            },
        ];

    }

    return new Service;
});
/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window, FiltersService) {
    var self = this;
    self.init = function () {

    };

    self.parse = function () {
        var input = self.input;

        input = '<zzz>\n' + input + '</zzz>';

        var payload;
        angular.forEach(self.filters, function (filter) {
            if (filter.active) {
                payload = filter.getOutput(input);
            }
        });

        var document = new xmldoc.XmlDocument(payload.output);

        if (payload.message != "" || undefined)
            Materialize.toast(payload.message, 1500);
        self.output = document.toString().replace("<zzz>\n","").replace("</zzz>","");
    };

    self.getAttributes = function () {
        var attributes = self.attributes;
        attributes = attributes.replace(/\s/g, "");
        var params = attributes.split(",");
        params.splice(-1, 1);
        return params;
    };
    /**
     * https://github.com/nfarina/xmldoc
     * https://www.npmjs.com/package/change-case
     */
    self.filters = FiltersService.filters;

    self.toggleFilter = function (filterObj) {
        filterObj.active = !filterObj.active;
    };

    self.init();

    self.input = '<string name="test1">test1</string>\n' +
        '<string name="test2">test2</string>' +
        '<string name="test2">test2</string>';
});