$('#home').on('pageinit', function(){
	//code needed for home page goes here
});	
		
$('#additem').on('pageinit', function(){

		var myForm = $('#vtc');
		myForm.validate({
		invalidHandler: function(form, validator) {
		},
		submitHandler: function() {
			var data = myForm.serializeArray();
			storeData(data);
		}
});
	
	//any other code needed for addItem page goes here
	var storeData = function(data){
		// if no key, this is a new post, if there is a key, its an old item being edited
		
		var id 				= Math.floor(Math.random() * 100001);
		
		localStorage.setItem(id, JSON.stringify(data));
		console.log(data);
		alert("Meeting Saved!");
	}
	
});

//The functions below can go inside or outside the pageinit function for the page in which it is needed.

var autofillData = function (){
	 
};

var getData = function(){

};

var storeData = function(data){
	
}; 

var	deleteItem = function (){
			
};
					
var clearLocal = function(){

};


