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
                        message : "",
                        output : null
                    };
                    var count = 0;

                    if (attrs) {
                        var attributeFound = {};

                        angular.forEach(attrs, function (attr) {
                            attributeFound[attr] = false;
                        });

                        angular.forEach(attrs, function (attr) {
                            document.eachChild(function (child, index, array) {
                                var target = child.attr[attr];

                                if (target) {
                                    count ++;
                                    child.attr[attr] = changeCase.titleCase(target);
                                    attributeFound[attr] = true;
                                }
                            });
                        });

                        var message = "";

                        angular.forEach(attributeFound, function (attr){
                            if (attr === false){
                                message += attr + " wasn't found. ";
                            }
                        });

                    } else {
                        document.eachChild(function (child, index, array) {
                            var target = child.val;

                            if (target) {
                                count++;
                                child.val = changeCase.titleCase(target);
                            }
                        });
                    }

                    return {
                        message: count + " lines changed",
                        output: document.toString()
                    }
                }
            },
            {
                //https://github.com/bunkat/pseudoloc
                name: "Pseudo-localize",
                canValue: true,
                canAttribute: false,
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

                    payload.output = document.toString();

                    return payload;
                }
            },
            {
                name: "snake name attribute",
                canValue: true,
                canAttribute: false,
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
                        message: "",
                        output: document.toString()
                    }

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
                        message: count + " lines removed",
                        output: $xml.find("zzz").prop('outerHTML')
                    }
                }

            },
        ];

    }

    return new Service;
});