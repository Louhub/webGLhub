
//****** Canvas API *******//

//** Globals **//
var ctx2;
var frame;
var x;
var y;
var z = 1;

//** use requestAnemFrame to call the drag function **//		
window.requestAnimFrame = (function(callback){
   return window.requestAnimationFrame ||
   window.webkitRequestAnimationFrame ||
   window.mozRequestAnimationFrame ||
   window.oRequestAnimationFrame ||
   window.msRequestAnimationFrame ||
   function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();


   			  	
   

	 function start(){		    
		x = -40;
		y = 40;
	  	frame = document.createElement('img');
	  	frame.src = "frame.png";
			
		draw();
	};
		
		
	function draw() {  
	   // get and set the canvas element using the DOM	  
       var cnvs2 = document.getElementById("canvas2");
       ctx2 = cnvs2.getContext('2d');
       
	   ctx2.globalCompositeOperation = 'source-over';  
		
	   //clear the canvas before redraw
	   ctx2.clearRect(0,0,700,400); // clear canvas  

	   //redraw everything each time
       drawBalls();
				
		
	   //cntxt.save();  

	   // Draw moved image  
	   ctx2.drawImage(frame, x, y, 90, 90);  

	   //** change the x value each time to move the image **//
	   if (z<250){
	   	  x += 4;
		  z += 2;
	   }else if (z>=250){
	     x -= 4;
		 z += 2;
		 }else if(z>=300){
		 z -= 300;
		 x = -40;
		 }
	   

	//cntxt.restore();  
		
		// request new frame
	    requestAnimFrame(function(){
	        draw();
	    });
		}

		

function drawBalls(){


    // Create gradients
  		 var radgrad = ctx2.createRadialGradient(45,45,10,52,50,30);
  		 radgrad.addColorStop(0, '#A7D30C');
  		 radgrad.addColorStop(0.9, '#019F62');
  		 radgrad.addColorStop(1, 'rgba(1,159,98,0)');
  
  		 var radgrad2 = ctx2.createRadialGradient(105,105,20,112,120,50);
  		 radgrad2.addColorStop(0, '#FF5F98');
         radgrad2.addColorStop(0.75, '#FF0188');
         radgrad2.addColorStop(1, 'rgba(255,1,136,0)');
       
         var radgrad3 = ctx2.createRadialGradient(95,15,15,102,20,40);
         radgrad3.addColorStop(0, '#00C9FF');
         radgrad3.addColorStop(0.8, '#00B5E2');
         radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

  		 var radgrad4 = ctx2.createRadialGradient(0,150,50,0,140,90);
         radgrad4.addColorStop(0, '#F4F201');
         radgrad4.addColorStop(0.8, '#E4C700');
         radgrad4.addColorStop(1, 'rgba(228,199,0,0)');
		 
		 var radgrad5 = ctx2.createRadialGradient(145,40,10,152,45,30);
  		 radgrad5.addColorStop(0, '#A7D30C');
  		 radgrad5.addColorStop(0.9, '#019F62');
  		 radgrad5.addColorStop(1, 'rgba(1,159,98,0)');
         
         // draw circles
		 ctx2.fillStyle = radgrad5;
         ctx2.fillRect(0,0,250,150);
         ctx2.fillStyle = radgrad4;
         ctx2.fillRect(0,0,250,150);
         ctx2.fillStyle = radgrad3;
         ctx2.fillRect(0,0,250,150);
         ctx2.fillStyle = radgrad2;
         ctx2.fillRect(0,0,250,150);
         ctx2.fillStyle = radgrad;
         ctx2.fillRect(0,0,250,150);
		 
		 
		 //Write the Heading//
		 ctx2.shadowOffsetX = 5;  
  		 ctx2.shadowOffsetY = 5;  
  		 ctx2.shadowBlur = 2;  
  		 ctx2.shadowColor = "rgba(0, 0, 0, 0.5)";  
   
   		 ctx2.font = "60px Times New Roman";  
  		 ctx2.fillStyle = "Black";  
  		 ctx2.fillText("Drag N Drop!", 15, 100);  
		   
	}



