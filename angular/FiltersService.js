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
            {
                name: "strip dupes",
                valueToggle: true,
                paramToggle: false,
                active: false,
                param: "",
                pattern: "",
                replace: "",
                getOutput: function (input) {
                    var step1= $.parseXML(input);
                    var $xml = $(step1);
                    $children = $xml.find("zzz").children();

                    $children.each(function(){
                        var value = $(this).text();
                        if (value == "test1")
                            $(this).remove();
                    });

                    return $xml.find("zzz").prop('outerHTML');
                }

            },
        ];

    }

    return new Service;
});