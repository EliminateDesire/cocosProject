cc.Class({
    extends: cc.Component,
    onBeginContact: function () {
        this.node.active = 0;
    },
    onPostSolve: function (contact) {

    }
});