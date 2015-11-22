/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window, FiltersService) {
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
        self.output = $xmlResult.find('zzz').html();
    };

    self.getAttributes = function (){
        var attributes = self.attributes;
        attributes = attributes.replace(/\s/g, "");
        var params = attributes.split(",");
        params.splice(-1,1);
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
    '<string name="test2">test2</string>';
});