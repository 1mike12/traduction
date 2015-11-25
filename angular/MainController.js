/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window, FiltersService) {
    var self = this;

    self.history = [{
        text: "asdfsadfsadfsdf",
        teaser: "sdfsdf",
        timeStamp: 123
    }];

    self.pushToHistory = function (text) {
        var d = new Date();

        var historyObj = {
            text: text,
            teaser: text.slice(0, 50) + "...",
            timeStamp: d.getTime()
        };

        self.history.push(historyObj);
    };

    self.reload = function (history) {
        self.input = history.text;
        self.output = "";
    };

    self.init = function () {
    };

    self.valuesEnabled = true;
    self.attributesEnabled = false;

    self.workingOnValues = function () {
        self.valuesEnabled = true;
        self.attributesEnabled = false;
        self.attrs = "";
    };

    self.workingOnAttributes = function () {
        self.valuesEnabled = false;
        self.attributesEnabled = true;
    };

    self.parse = function () {

        console.log(self.attrs);

        var input = self.input;

        input = '<zzz>\n' + input + '</zzz>';

        var payload;

        angular.forEach(self.filters, function (filter) {
            if (filter.active) {
                if (self.getAttributes()) {
                    payload = filter.getOutput(input, self.getAttributes());
                } else {
                    payload = filter.getOutput(input, false)
                }
            }
        });


        var document = new xmldoc.XmlDocument(payload.output);

        if (payload.message != "" || undefined)
            Materialize.toast(payload.message, 1500);

        self.output = document.toString().replace("<zzz>\n", "").replace("</zzz>", "");
        self.pushToHistory(self.output);
    };

    self.getAttributes = function () {
        var attributes = self.attrs;

        if (attributes == undefined){
            return false;
        }
        attributes = attributes.replace(/\s/g, "");


        var params = attributes.split(",");

        if (params.length > 0 && params[0] != "") {
            return params;
        } else {
            return false;
        }
    };

    self.useOutput = function () {
        self.input = self.output;
        self.output = "";
    };

    /**
     * https://github.com/nfarina/xmldoc
     * https://www.npmjs.com/package/change-case
     */
    self.filters = FiltersService.filters;

    self.toggleFilter = function (filterObj) {
        filterObj.active = !filterObj.active;
    };

    self.anyFiltersSelected = function () {
        var anyActive = false;
        angular.forEach(self.filters, function (filter) {
            if (filter.active) {
                anyActive = true;
            }
        });

        return anyActive;
    };

    self.init();

    self.input = '<string name="test1">test1</string>\n' +
        '<string name="test2">test2</string>' +
        '<string name="test2">test2</string>';

    self.getTimeAgo = function (timeStamp) {
        var date = new Date(timeStamp);

        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();

        var formattedTime = hours + ':' + minutes.substr(-2);

        return formattedTime;
    }
});