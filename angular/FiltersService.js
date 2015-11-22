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