Sitecore.PageModes.ChromeControls = Sitecore.PageModes.ChromeControls.extend({
    renderTitle: function (command, chrome, isMoreCommand) {
        var container = $sc("<div class='scChromeName'></div>");

        var tooltip = this.chrome.data.expandedDisplayName || this.chrome.displayName();

        var displayName = this.chrome.displayName();

        var isReadOnly = this.chrome.isReadOnly();

        // var title = $sc("<span class='scChromeText'></span>")     
        //   .text($sc.truncate(displayName, this._maxDisplayNameLength))
        //   .appendTo(container);

        var title = $sc("<span class='scChromeText'></span>");
        this.ancestorListFlat = title;
        this.renderAncestorsFlat().append($sc.truncate(displayName, this._maxDisplayNameLength));

        this.ancestorListFlat
            .appendTo(container);
        if (isReadOnly) {
            $sc("<span class='scReadonlyText'></span>").text("[" + Sitecore.PageModes.Texts.ReadOnly + "]").appendTo(container);
        }
        else {
            title.attr("title", tooltip);
        }

        $sc("<img class='scToolbarIndicator' src='/sitecore/shell/Themes/Standard/Images/PageEditor/toolbar_progress.gif' />")
            .css({ opacity: 0.0 })
            .appendTo(container);

        return container;
    },
    renderAncestorsFlat: function () {
        this.ancestorListFlat.update("");
        var ancestors = this.chrome.ancestors();
        for (var i = ancestors.length - 1; i >= 0; i--) {
            if (!ancestors[i].isFake()) {
                var level = ancestors.length - i - 1;
                this.ancestorListFlat.append(this.renderAncestorFlat(ancestors[i], level));
            }
        }

        return this.ancestorListFlat;
    },
    renderAncestorFlat: function (ancestor, level) {
        var paddingValue = 16;
        var row = $sc("<a class='' href='#'></a>");
        $sc("<span class='scChromeText'></span>").text(ancestor.displayName()).appendTo(row);

        row.mouseenter(function () {
            ancestor.showHover("ancestor menu mouseenter");
        });

        row.mouseleave(function () {
            ancestor.hideHover("ancestor menu mouseleave");
        });

        row.click($sc.proxy(function (e) {
            e.stop();
            this.hideAncestors();
            Sitecore.PageModes.ChromeManager.select(ancestor);
        }, this));

        return row;
    }

},
    {
        commandRenderers: Sitecore.PageModes.ChromeControls.commandRenderers,
        eventNameSpace: Sitecore.PageModes.ChromeControls.eventNameSpace,
        registerCommandRenderer: Sitecore.PageModes.ChromeControls.registerCommandRenderer
    });