let com = require('./Common'); //全局对象
cc.Class({
    extends: cc.Component,

    properties: {
        ball: {
            default: null,
            type: cc.Node
        },
        scoreDisplay: {
            default: null,
            type: cc.Label
        },
        canvas: cc.Node,
        w: 0, //角速度

    },
    onLoad() {
        this.holdTimeEclipse = 0;
        this.holdClick = false;
        this.score = 0;
        this.canvas.on(cc.Node.EventType.TOUCH_MOVE, this.onKeyDown, this);
        this.canvas.on(cc.Node.EventType.TOUCH_END, this.onKeyUp, this);
    },
    start() {
        com.heroSpeed = com.heroMinSpeed;

    },
    onDestroy() {
        this.canvas.off(cc.Node.EventType.TOUCH_MOVE, this.onKeyDown, this);

        this.canvas.off(cc.Node.EventType.TOUCH_END, this.onKeyUp, this);
    },

    onKeyDown: function (event) {
        this.holdClick = true;
        let x = event.getLocation().x;
        const size = cc.view.getDesignResolutionSize();
        if (x < size.width / 2) {
            com.direction = 'left';
        } else {
            com.direction = 'right';
        }
    },

    onKeyUp: function () {
        this.holdClick = false;
        com.isRotate = 0;
    },


    update(dt) {
        if (this.holdClick) {
            this.rotate(com.direction);
        }
        //accelerate within 1 second.
        if (com.isAcl && com.heroSpeed < com.heroMaxSpeed) com.heroSpeed *= com.maxAcl;
        if (com.heroSpeed > com.heroMaxSpeed) com.heroSpeed = com.heroMaxSpeed; //adjust to heroMaxSpeed
        if (com.heroSpeed == com.heroMaxSpeed) com.isAcl = 0;
        //rotate -- Speed
        com.heroXspeed = com.heroSpeed * Math.sin(com.angle);
        com.heroYspeed = com.heroSpeed * Math.cos(com.angle);
        //update 60 FPS 
        this.ball.x += com.heroXspeed * dt;
        this.ball.y += com.heroYspeed * dt;
        this.score = com.grades;
        this.scoreDisplay.string = 'Score\n' + this.score;
        //hero going out of the canvas
        this.gameOver();
    },

    rotate(direction) {
        com.isRotate = 1;
        if (direction == 'right')
            com.angle += this.w * Math.PI / 180; //#pi even ->+ Counterclockwise
        else if (direction == 'left')
            com.angle -= this.w * Math.PI / 180;

    },

    gameOver() {
        let size = cc.view.getDesignResolutionSize();
        if (this.ball.x < 0 || this.ball.x > size.width || this.ball.y < 0 || this.ball.y > size.height)
            cc.director.loadScene('gameOver');
    },

});