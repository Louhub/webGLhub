//*** Drag and Drop API ***//

function allowDrop(ev)
{
ev.preventDefault();  		 		//prevent default inorder to allow elements/data be dropped on other elements
}

function drag(ev)
{
ev.dataTransfer.setData("Text",ev.target.id);	   //set the data type and value of the dragged data
}

function drop(ev)
{
var data=ev.dataTransfer.getData("Text");		   		 	 //get the data
ev.target.appendChild(document.getElementById(data));		 //the id is the same as the dragged element
ev.preventDefault();										 //prevent the browser from default handling the data as a link
}