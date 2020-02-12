const com = require('./Common');
const Types = require('./UI/types').ItemsType;
cc.Class({
    extends: cc.Component,
    properties: {
        // ...
        // 得分音效资源
        scoreAudio1: {
            default: null,
            type: cc.AudioClip
        },
        scoreAudio2:{
            default :null,
            type: cc.AudioClip
        },
    },
    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
    },
    
     onBeginContact: function (contact, selfCollider,otherCollider) {
        let otherCtg = otherCollider.node.ctg;
       // cc.log(Types.item1);
        if(otherCtg == 0) {
            com.grades += 5;
            cc.audioEngine.playEffect(this.scoreAudio1,false);
        }
        if(otherCtg !=Types.item1){
             cc.audioEngine.playEffect(this.scoreAudio2,false);
             let worldManifold = contact.getWorldManifold();
             let normal = worldManifold.normal;
             let v = cc.v2(com.heroXspeed, com.heroYspeed);
             let angle = normal.angle(v);
             let angle2 = 2 * angle - Math.PI;
             let cross = v.cross(normal);
             com.angle = cross > 0 ? com.angle - angle2 : com.angle + angle2;
        }      
    },
    
   
});
