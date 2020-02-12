
const Types = require('types').ItemsType;
var NodePool = cc.Class({
    name: 'NodePool',
    properties: {
        prefab: cc.Prefab,
        size: 0,
    },
    init(ctg) {
        this.itemsPool = new cc.NodePool();
        for (let i = 0; i < this.size; ++i) {
            let obj = cc.instantiate(this.prefab);
            obj.ctg = ctg;
            this.itemsPool.put(obj);

        }
    },
   
   
    onItemOut: function (item) {
        this.itemsPool.put(item);
    },
    getPosition() {
        let size = cc.view.getDesignResolutionSize();
        let randX = Math.random() * (size.width);
        let randY = size.height;
        // cc.log(size.height);
        return cc.v2(randX, randY);
    }

});

module.exports = NodePool;