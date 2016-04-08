/**
 * Created by mike on 11/17/15.
 */
app.controller("MainController", function ($window) {
    var self = this;

    self.init = function () {
        setTimeout(function () {
            self.reveal();
        }, 6000);
    };

    self.reveal = function () {
        var el = document.querySelectorAll('.bg')[0];
        el.classList.add('animated', 'hinge');
    };

    self.init();

});