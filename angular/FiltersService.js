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
                canValue: true,
                canAttribute: true,
                example: "one_two --> One Two",
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input, attrs) {
                    var document = new xmldoc.XmlDocument(input);
                    var payload = {
                        message: "",
                        output: null,
                        error: ""
                    };
                    var count = 0;

                    var attributeFound = {};
                    angular.forEach(attrs, function (attr) {
                        attributeFound[attr] = false;
                    });

                    if (attrs === false) {
                        attrs = [false];
                    }
                    angular.forEach(attrs, function (attr) {
                        document.eachChild(function (child, index, array) {
                            var target = (attr) ? child.attr[attr] : child.val;

                            if (target) {
                                count++;

                                if (attr) {
                                    child.attr[attr] = changeCase.titleCase(target);
                                    attributeFound[attr] = true;
                                } else {
                                    child.val = changeCase.titleCase(target);
                                }
                            }
                        });
                    });

                    var error = "";
                    angular.forEach(attributeFound, function (value, key) {
                        if (value === false) {
                            error += "attribute: " + key + " wasn't found.";
                        }
                    });

                    payload.message = count + " lines changed";
                    payload.error = error;
                    payload.output = document.toString();

                    return payload;
                }
            },
            {
                //https://github.com/bunkat/pseudoloc
                //https://github.com/racker/node-elementtree
                name: "Pseudo-localize",
                canValue: true,
                canAttribute: false,
                example: "one --> òonë",
                description: "Takes latin characters and makes them look all whack. And extends by 30% so that you can test for text views that overflow" +
                "Funny accents also make it easy to spot strings that have not been localized if they appear normal.",
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input) {

                    var payload = {
                        message: "",
                        output: null,
                        error: ""
                    };

                    var count = 0;

                    var document = new xmldoc.XmlDocument(input);
                    document.eachChild(function (child, index, array) {
                        var target = child.val;

                        if (target) {
                            count++;
                            child.val = pseudoloc.transformString(target);
                        }
                    });

                    payload.output = document.toString();
                    payload.message = count + " lines localized";
                    return payload;
                }
            },
            {
                name: "change to snake",
                canValue: true,
                canAttribute: false,
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input, attrs) {
                    var document = new xmldoc.XmlDocument(input);
                    var payload = {
                        message: "",
                        output: null,
                        error: ""
                    };
                    var count = 0;

                    var attributeFound = {};
                    angular.forEach(attrs, function (attr) {
                        attributeFound[attr] = false;
                    });

                    if (attrs === false) {
                        attrs = [false];
                    }
                    angular.forEach(attrs, function (attr) {
                        document.eachChild(function (child, index, array) {
                            var target = (attr) ? child.attr[attr] : child.val;

                            if (target) {
                                count++;

                                if (attr) {
                                    child.attr[attr] = changeCase.snakeCase(target);
                                    attributeFound[attr] = true;
                                } else {
                                    child.val = changeCase.snakeCase(target);
                                }
                            }
                        });
                    });

                    var error = "";
                    angular.forEach(attributeFound, function (value, key) {
                        if (value === false) {
                            error += "attribute: " + key + " wasn't found.";
                        }
                    });

                    payload.message = count + " lines changed";
                    payload.error = error;
                    payload.output = document.toString();

                    return payload;
                }

            },
            {
                name: "Remove dupes",
                canValue: true,
                canAttribute: false,
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input) {

                    var payload = {
                        message: "",
                        output: null,
                        error: ""
                    };
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

                    payload.message = count + " lines removed";
                    payload.output = $xml.find("zzz").prop('outerHTML');
                    return payload;
                }

            },
            {
                name: "Pseudo Loc Key => Value",
                canValue: true,
                canAttribute: false,
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input) {

                    var payload = {
                        message: "",
                        output: null,
                        error: ""
                    };

                    linesArray = input.split("\n");
                    outputArray = [];
                    var count = 0;
                    angular.forEach(linesArray, function (line) {
                        if (line !== "") {
                            count++;
                        }
                    });

                    payload.message = count + " lines removed";
                    payload.output = "?????";
                    return payload;
                }

            }
        ];

    }

    self.buildPayload = function () {
        return {
            message: "",
            output: null,
            error: ""
        };
    };

    self.runFilter = function (attrs, filterFunction, payload) {
        var attributeFound = {};
        angular.forEach(attrs, function (attr) {
            attributeFound[attr] = false;
        });

        if (attrs === false) {
            attrs = [false];
        }
        angular.forEach(attrs, function (attr) {
            document.eachChild(function (child, index, array) {
                var target = (attrs) ? child.attr[attr] : child.val;

                if (target) {
                    count++;

                    if (attrs) {
                        child.attr[attr] = filterFunction(target);
                        attributeFound[attr] = true;
                    } else {
                        child.val = filterFunction(target);
                    }
                }
            });
        });
    };

    return new Service;
});