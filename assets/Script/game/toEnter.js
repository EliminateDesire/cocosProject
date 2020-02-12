let com = require("./Common");
cc.Class({
    extends:cc.Component,

    properties:{
        button:cc.Button,
        Audio: {
            default: null,
            type: cc.AudioClip
        },
    },

    toEnter(){
        this.reset();
        cc.audioEngine.playEffect(this.Audio, false);
        cc.director.loadScene("Game");
    },
    reset(){
        com.heroMaxSpeed = 300; //<400
        com.heroXspeed = 0;
        com.heroYspeed = 0;
        com.heroSpeed = 0;
        com.notAlowRot = 0;
        com.iscol = 0;//collision state  
        com.isAcl = 1; //accelerate (can)
        com.maxAcl = 1.2;
        com.coliCnt = 0; //counter for debug 
        com.angle = 0;
        com.heroMinSpeed = 100;
        com.grades = 0;
        com.isRotate = 0;
        com.direction = 'left';
    },

});
