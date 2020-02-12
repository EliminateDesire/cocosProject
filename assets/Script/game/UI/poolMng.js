const nodePool = require('./nodePool.js');
cc.Class({
    extends: cc.Component,

    properties: {
        itemsPool:{
            default:[],
            type:nodePool,
        }
    },
    init(){
        for(let i=0;i<this.itemsPool.length;i++){
            this.itemsPool[i].init(i);
        }
    },

    // update (dt) {},
});
