<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/main.css">
    <title>App</title>
</head>
<body>
    <!-- <div class="container">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div> -->




        <canvas id="canvas"></canvas>
        <script>

            let canvas, ctx;
            const drops =[];
            let initialX =  Math.random()>0.5? Math.random()*15+1:-Math.floor( Math.random()*15+1);

            class Drop {
                constructor(x,y,size){
                    this.x = x;
                    this.y = y;

                    this.Vx = initialX;
                    
                    this.Vy = 3 ;
                    this.alpha = -Math.atan(this.Vy/this.Vx);
                    this.size = size;
                }
                draw(){
                    

                    const that = this;
                    let default_size = that.size; 
                    let newSize = default_size;
                    // ctx.fillRect( that.x, that.y,that.size,that.size);
                    
                    ctx.rotate(this.alpha);
                     
                    ctx.fillRect( that.x, that.y,that.size,that.size);
       
                    for(let i=1;i<3;i++){
                    
                    
                    ctx.fillStyle = `rgba(0,255,255,${newSize/default_size})`;
                    newSize*=0.6;
                    
                   
                    
                   
                     ctx.fillRect( that.x+(default_size-newSize)/2, that.y-(that.size+newSize)/2*(i),newSize,newSize);
                    }
                   
                    ctx.setTransform(1, 0, 0, 1, 0, 0); 
                }
                update(){ 
                    this.y +=this.Vy;
                    this.x += this.Vx ;
                
                    this.Vy+=0.3*this.size;
                    this.draw();
                }
            }

            for(let i=0;i<100;i++){
                
                drops.push(new Drop(i*200+100,-1000, Math.floor(Math.random()*100+10)));
            }

            function init(){
                
                canvas = document.getElementById('canvas');
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                ctx = canvas.getContext('2d');
                

        }


        function loop(){
            ctx.clearRect(0,0, canvas.width,canvas.height);
            drops.forEach(drop=>drop.update());
            requestAnimationFrame(loop);
        }




            init();
            loop();




            // let container = document.querySelector('.container');
            // let boxes = document.querySelectorAll('.box');
            //     const observer = new IntersectionObserver(function(entries){
            //     entries.forEach(entry=>{
            //         if(entry.intersectionRatio>0){
            //             setTimeout(()=>{
            //             entry.target.style.backgroundColor="#000";
            //         },1000);
            //         }
            //         else {
            //             entry.target.style.backgroundColor="#fff";
            //         }
            
            //     })
            // },container);
            // // observer.observe(box);
            // boxes.forEach(box=>{
            //     observer.observe(box);
            // })
            setInterval(()=>{
                drops.shift();
                drops.shift();
                drops.shift();
                drops.shift();
                drops.shift();
          
                    drops.push(new Drop(Math.floor( Math.random()*drops.length)*200+100,-1000, Math.floor(Math.random()*100+10)));
                    drops.push(new Drop(Math.floor( Math.random()*drops.length)*200+100,-1000, Math.floor(Math.random()*100+10)));
                    drops.push(new Drop(Math.floor( Math.random()*drops.length)*200+100,-1000, Math.floor(Math.random()*100+10)));
                    drops.push(new Drop(Math.floor( Math.random()*drops.length)*200+100,-1000, Math.floor(Math.random()*100+10)));
                    drops.push(new Drop(Math.floor( Math.random()*drops.length)*200+100,-1000, Math.floor(Math.random()*100+10)));
          
            },100);
        </script>
</body>
</html>
