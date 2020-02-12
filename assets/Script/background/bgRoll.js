
let com = require('../game/Common');
cc.Class({
    extends: cc.Component,

    properties: {
         bg2:{
            default:null,
            type:cc.Node
         },
         bg1:{
            default:null,
            type:cc.Node
         },
         ball:{
             default:null,
             type:cc.Node
         },
        rollSpeed:0
    },



    onLoad () {
        this.cur_bg = this.bg1;
    },

    start () {

    },

    update (dt) {
            if(com.isRotate == 0 && com.heroYspeed < 0)
            {
                this.rollSpeed = 0;
            }
            if(com.isRotate == 0 && com.heroYspeed > 0||com.isRotate==1)
            this.rollSpeed = com.heroMaxSpeed;
            else 
            this.rollSpeed = 0; 
            let s =dt * this.rollSpeed;
            this.bg1.y -= s;
            this.bg2.y -= s;
            let size = cc.view.getDesignResolutionSize();
            let length = size.height;
                if(this.cur_bg.y <= -length){
                if(this.cur_bg == this.bg2){
                    this.bg2.y = this.bg1.y + length;
                    this.cur_bg = this.bg1;
                }
                else{
                    this.bg1.y = this.bg2.y + length;
                    this.cur_bg = this.bg2;
                }
            }
    },
});
