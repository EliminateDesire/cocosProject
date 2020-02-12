
cc.Class({
    extends: cc.Component,

    properties: {
        Audio: {
            default: null,
            type: cc.AudioClip
        },
    },
    toMain(){
        cc.audioEngine.playEffect(this.Audio, false);
        cc.director.loadScene("begin");
    },

    start () {

    },
});
