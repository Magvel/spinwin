let prize_config = {
    count:12,
    prizenam:["A","B","C","D","E","F","G","H","I","J","K","L"],
}

let wh={
    rot:false,
}




let config = {
    type : Phaser.CANVAS,
    width: 800,
    height:600,
    backgroundColor : 0xffcc00,
    
    scene:{
        preload:preload,
        create:create,
        update:update,
    },
    
    
   
};

let game = new Phaser.Game(config);

function preload()
{
    
    console.log(game);
    
    this.load.image('backg','back.jpg');
    this.load.image('wheel','wheel.png');
    this.load.image('stand','stand.png');
    this.load.image('pin','pin.png');
    this.load.image('button','butt.jpg');
    this.load.audio('toss','toss.mp3');
    
     this.load.audio('clap','clap.mp3'); 
}


function create()
{
    let W= game.config.width;
    let H=game.config.height;
    console.log("in create");
    
      //let but=document.getElementById("button");   
    let background= this.add.sprite(0,0,'backg');
    background.setPosition(W/2,H/2);
    
     let stand=this.add.sprite(W/2,H/2+250,'stand');
    stand.setScale(0.25);
    
    this.wheel=this.add.sprite(W/2,H/2,'wheel');
    this.wheel.setScale(0.25);
    
    let pin=this.add.sprite(W/2,H/2-250,'pin');
    pin.setScale(0.25);
  
    let button=this.add.sprite(W/2-130,H-25,'button').setInteractive();
    button.setScale(0.25);
    
    
    this.toss=this.sound.add("toss");
       this.clap=this.sound.add("clap");
  button.on("pointerdown",spinwheel,this);
      
   //this.input.on("pointerdown",spinwheel,this);
   
   
      
        font={
        font:"25px bold arial",
        color:"red",
    }
    
    this.text=this.add.text(10,H-39,"Welcome!.click here->",font);
}

function update()
{
    console.log("in update");
   // this.wheel.angle+=1;
     
    
}



function spinwheel()
{
    if(wh.rot==false)
        {
           
   wh.rot=true;
    console.log("sexed");
    
   // this.text.setText("AND YOU WON.....");
    
    let rounds=Phaser.Math.Between(2,4);
    let deg=Phaser.Math.Between(0,11)*30;
    
    let total=rounds*360+ deg;
    console.log(total);
    
    let idx=prize_config.count-1-Math.floor(deg/(360/prize_config.count));
    this.toss.play();
   tween = this.tweens.add({
        targets:this.wheel,
        angle:total,
        ease:"Cubic.easeOut",
        callbackScope:this,
        duration:6000,
       
        onComplete:function()
        { 
            this.clap.play();
           wh.rot=false;
           this.text.setText("You won.."+prize_config.prizenam[idx]);
            alert("You won.."+prize_config.prizenam[idx]);
        },
    });
    
}
}

