(function($) {
    // TODO: make the node ID configurable
    var treeNode = $('#jsdoc-toc-nav');

    // initialize the tree
    treeNode.tree({
        autoEscape: false,
        closedIcon: '&#x21e2;',
        data: [],
        openedIcon: ' &#x21e3;',
        saveState: false,
        useContextMenu: false
    });

    // add event handlers
    // TODO
})(jQuery);
