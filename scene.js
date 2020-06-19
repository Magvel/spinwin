const gameState = {
	score: 0
};

let prize_config = {
    count:12,
    
    prizenam : ["3000 Credits","35% Off","Hard Luck","70% OFF","Swagpack","100% OFF","Netflix","50% Off","Amazon Voucher","2 Extra Spin", "CB Tshirt","CB Book"],
}

let wh={
    rot:false,
}

class StartScene extends Phaser.Scene {
	constructor(){
		super({ key: 'StartScene' });
	}
  
    preload(){
         this.load.image('back','back.jpg');
    }
    
  create() {
      
      
    let W= game.config.width;
    let H=game.config.height;
    console.log("in create");
      
     let font2={
        font:"30px bold geneva",
        color:"darkorange",
         backgroundColor:"white",
         textDecoration:"underline",
    }
      let font={
        font:"25px bold arial",
        color:"red",
        backgroundColor:"white",
    }
    
      //let but=document.getElementById("button");   
    let background= this.add.sprite(0,0,'back');
    background.setPosition(W/2,H/2);
      
      this.add.text(10, 30, '//In this project,excluding the changes mentioned, the change that I made ',font);
      
        this.add.text(16, 74, ' is to add multiple scenes. Also if the pin stops at "Hard Luck", Clap sound is',font);
       this.add.text(16, 110, 'disabled.',font);
      this.add.text(16,530, 'THIS IS SCENE-1',font);
      
      
     
    this.add.text(95, 250, 'CLICK ON THE SCREEN TO TRY YOUR LUCK',font2);
    
    this.input.on('pointerup', () => {
      // Add your code below:
      this.scene.stop('StartScene');
      this.scene.start('GameScene');
    });
  }
}

class GameScene extends Phaser.Scene {
	constructor(){
		super({ key: 'GameScene' });
	}

	 preload()
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



	 create()
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
    console.log(button);
    
    
    this.toss=this.sound.add("toss");
       this.clap=this.sound.add("clap");
  button.on("pointerdown",spinwheel,this);
      
   //this.input.on("pointerdown",spinwheel,this);
   
   
      
        let font={
        font:"25px bold arial",
        color:"red",
    }
    
    this.text=this.add.text(10,H-39,"Welcome!.click here->",font);
}


	 update()
{
    console.log("in update");
   // this.wheel.angle+=1;
     
    
}


}

class EndScene extends Phaser.Scene {
	constructor(){
		super({ key: 'EndScene' });
	}
    preload()
    {
        this.load.image('gift','gift.jpg');
    }
    
 create()
    {
    
        
      let gift= this.add.sprite(0,0,'gift');
    gift.setPosition(400,300);  
        gift.setScale(0.65);
        
        
        
        
          let font1=
    {
        font:"40px bold arial",
        color:"blue",
    }
      //this.text.setText("You won.."+prize_config.prizenam[idx]);
      this.add.text(230, 180,"You won.."+prize_config.prizenam[idx],font1 );
 }   
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	//backgroundColor: "b9eaff",
	/*physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
			enableBody: true,
		}
	},*/
    
	scene: [StartScene, GameScene, EndScene]
};

let idx;

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
    
    idx=prize_config.count-1-Math.floor(deg/(360/prize_config.count));
    this.toss.play();
            
   tween = this.tweens.add({
        targets:this.wheel,
        angle:total,
        ease:"Cubic.easeOut",
        callbackScope:this,
        duration:5000,
       
        onComplete:function()
        { 
            
           wh.rot=false;
           
            
            if(prize_config.prizenam[idx]=="Hard Luck")
                {
                     this.scene.stop('GameScene');
              this.scene.start('EndScene');
                }
            
            else
            {
           this.text.setText("You won.."+prize_config.prizenam[idx]);
           // alert("You won.."+prize_config.prizenam[idx]);
            
          this.clap.play();
          this.scene.stop('GameScene');
          this.scene.start('EndScene');
        }
        },
    });
    
}
}

const game = new Phaser.Game(config);

