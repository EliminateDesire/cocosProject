const com = require('./game/Common');
cc.Class({
    extends: cc.Component,

    properties: {
        scoreDisplay: {
            default: null,
            type: cc.Node,
        }
    },

    
    start () {
        //cc.log(this.scoreDisplay.getComponent(cc.Label));
       this.scoreDisplay.getComponent(cc.Label).string = com.grades;
    },

    // update (dt) {},
});
