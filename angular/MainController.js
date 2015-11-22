/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window, FiltersService) {
    var self = this;
    self.init = function () {

    };

    self.valuesEnabled = true;
    self.attributesEnabled = false;

    self.workingOnValues = function (){
        self.valuesEnabled = true;
        self.attributesEnabled = false;
    };

    self.workingOnAttributes = function (){
        self.valuesEnabled = false;
        self.attributesEnabled = true;
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