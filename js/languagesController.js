angularApp.controller('languagesController', function (utils) {
    this.languages = ['en', 'es', 'fr'];
    this.updateLanguage = function (lang) {
        utils.language = lang;
    };
    this.getName = function (key) {
        return utils.getName(key);
    };
    this.menuExpanded = true;
    this.expandMenu = function () {
        if (this.menuExpanded) {
            $("span.menu-label").hide();
            $("div.side-nav-cv").removeClass("m2");
            $("div.side-nav-cv").addClass("m1");
        } else {
            $("span.menu-label").show();
            $("div.side-nav-cv").removeClass("m1");
            $("div.side-nav-cv").addClass("m2");
        }
        this.menuExpanded = !this.menuExpanded;
    };
});
