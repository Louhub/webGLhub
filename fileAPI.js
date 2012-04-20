// Check for the various File API support.
function checkFileApi(){
	if (window.File && window.FileReader && window.FileList && window.Blob) {
  	// Great success! All the File APIs are supported.
	} else {
  		alert('The File APIs are not fully supported in this browser.');
	}
}

function dragenter(evt) {  
  evt.stopPropagation();  
  evt.preventDefault();  
}  
  
function dragover(evt) {  
  evt.stopPropagation();  
  evt.preventDefault();  
}  

function drop(evt) {  
  evt.stopPropagation();  
  evt.preventDefault();  
    
  var files = evt.dataTransfer.files;  
  
  handleFiles(files);  
}  

function fileSelect(evt){
	var files = evt.target.files; // FileList object
	handleFiles(files);
}
function handleFiles(files) {

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,'" title="', escape(theFile.name), '"/>'].join('');
          document.getElementById('dropbox').insertBefore(span, null);
         // document.getElementById('glcanvas').insertBefore(span, null);
         // initTextures(e.target.result);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
      
    }
  }

function handleFiles2(files){
	 // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }
	 
	 window.URL = window.webkitURL || window.URL; // Vendor prefixed in Chrome.

  	var img = document.createElement('img');
  	img.onload = function(e) {
    	window.URL.revokeObjectURL(img.src); // Clean up after yourself.
  	};
  	img.src = window.URL.createObjectURL(files[0]);
  	document.body.appendChild(img);
  }
} //http://stackoverflow.com/questions/6217652/html5-file-api-crashes-chrome-when-using-readasdataurl-to-load-a-selected-image

function handleFiles3(files) {

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

	  var img = document.createElement("img");  
    img.classList.add("obj");  //css class "obj" added to image for styling
    img.file = f;  
    document.getElementById('dropbox').appendChild(img);	

      var reader = new FileReader();
		
    reader.onload = (function(aImg) { 
    	return function(e) { 
    		aImg.src = e.target.result; 
    	}; 
    })(img);  
    reader.readAsDataURL(f);  

  //https://developer.mozilla.org/en/Using_files_from_web_applications    
    }
  }

  //**  Event Listeners **//
  var dropbox;
  //add event listener to input field
  document.getElementById('files').addEventListener('change', fileSelect, false);
  
  //add event listeners to the dropbox
  dropbox = document.getElementById("dropbox");
  dropbox.addEventListener("dragenter", dragenter, false);
  dropbox.addEventListener("dragover", dragover, false);
  dropbox.addEventListener("drop", drop, false);  