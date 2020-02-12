const com = require('../Common');
const type = require('./types').ItemsType;

cc.Class({
    extends: cc.Component,

    properties: {
        hero: {
            default: null,
            type: cc.Node,

        },
        poolMng: {
            default: null,
            type: cc.Node,
        },
        maxDuration: 0,
        minDuration: 0,
        ratio1: 0, //item1 appear ratio
        ratio2: 0,
        ratio3: 0,
        leafDuration:0,
    },
    onLoad() {

        cc.director.getPhysicsManager().enabled = true;
        this.poolMng = this.poolMng.getComponent('poolMng'); //get component "PoolMng"
        this.itemsPool = this.poolMng.itemsPool;
        this.poolMng.init();

    },
    start() {
        this.changeDif = 0;
        this.difficulty = 0;
        this.root = this.node.getChildByName('ItemRoot');
        this.array = this.root.children;
        this.showTimer = 0;
        this.showTimer2 = 0;
        this.categration();
     

    },
    update(dt) {
        while(com.heroMaxSpeed<=500 && this.changeDif ){
            com.heroMaxSpeed += 30;
            this.changeDif = 0;
            while(this.minDuration>0.3&&this.maxDuration>2){
                this.minDuration -= 0.05;
                this.maxDuration -= 0.05;
            }
        }
        this.array = this.root.children;
        let dita = this.maxDuration - this.minDuration;
        let duration = this.minDuration + Math.random() * dita;
        //cc.log(duration);
        this.showTimer += dt;
        this.showTimer2 += dt;
        if (this.showTimer > duration) {
            com.grades += 1;
            let ctg;
            let rand = Math.random();
            const stda1 = this.ratio1;
            const stda2 = stda1 + this.ratio2;
            const stda3 = stda2 + this.ratio3; //separate 1 to 3 parts
            if (rand < stda1) ctg = type.item1;
            else if (rand < stda2) ctg = type.item2;
            else if (rand > stda3) ctg = type.item3; //for various possibility :else if 

            switch (ctg) {
                case type.item1:
                    this.itemsPool[(type.item1)].createItem(this.root, type.item1);
                    break;
                case type.item2:
                    this.itemsPool[(type.item2)].createItem(this.root, type.item2);
                    break;
        
            }

            this.showTimer = 0;

        } 
       if (this.showTimer2 > this.leafDuration) {
           this.itemsPool[(type.item3)].createItem(this.root, type.item3);
           this.showTimer2 = 0;
            this.difficulty+=1;
            this.changeDif =1;
       }
        

   
            for (let i = 0; i < this.array.length; ++i) {
                this.array[i].y -= dt * (com.heroMaxSpeed-100);
            }
    
        const size = cc.view.getDesignResolutionSize();
        //if item out of board, push it to pool
        for (let i = 0; i < this.array.length; ++i) {
            if (this.array[i].x < 0 || this.array[i].x > size.width || this.array[i].y < 0 || this.array[i].y > size.height) {
                let ctg = this.array[i].ctg;
                switch (ctg) {
                    case type.item1:
                        this.itemsPool[(type.item1)].onItemOut(this.array[i]);
                        break;
                    case type.item2:
                        this.itemsPool[(type.item2)].onItemOut(this.array[i]);
                        break;
                    case type.item3:
                        this.itemsPool[(type.item3)].onItemOut(this.array[i]);
                        break;

                }

            }

        }

    },
    categration() {
        this.array[0].ctg = type.item1;
        this.array[1].ctg = type.item2;
    },


});