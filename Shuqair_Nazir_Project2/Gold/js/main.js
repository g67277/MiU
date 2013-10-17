// JavaScript Document
// Nazir Shuqair
//	MiU 1310
//	10 OCT 2013
//	Project 2

window.addEventListener("DOMContentLoaded", function(){
	//alert(localStorage.value(0));
	//getElementByID function
	function get(e){
		var element = document.getElementById(e);
		return element;
	}
	
	//Create select field elements and populate with options
	function popSec(){
		var formTag =  document.getElementsByTagName("form");//formTag is an array of all form tags
		var selectLi = get('select');
		var makeSelect = document.createElement('select');
		makeSelect.setAttribute("id", "bridges");
		for(var i=0, j = bridgeGroup.length; i < j; i++){
			var makeOption = document.createElement('option');
			var optText= bridgeGroup[i];
			makeOption.setAttribute("value", optText);	
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	
	//Find the value of a selected radio button
	function getSelectedRadio(){
		var radios = document.forms[1].check;
		for(var i=0; i<radios.length; i++){
			if(radios[i].checked){
			userRValue = radios[i].value;
			}
		}
	}
	
	function getCheckBoxValue(){
		if(get('vip').checked){
			vipValue = get('vip').value;
		}else{
			vipValue = "No";	
		}
	}

	/*function getCheckBoxValue(){
		var checkBoxes = document.forms[0].hit;
		var checkArray = [];
		var testing = [];
		//console.log(checkBoxes[1]);
		for(var i=0; i<checkBoxes.length; i++){
			if(checkBoxes[i].checked){
				checkbValue = checkBoxes[i].value;
				checkArray[i] = checkbValue;
				testing[i] = i;
			}else{
				checkbValue = "No";	
			}
		}
		retriveNum(testing);
		return checkArray;
	}
	
	function retriveNum (num){
		var ckNum = [];
		ckNum = num;
		console.log(ckNum);
	}*/
	
	//turn links on and off
	function toggleControls(n){
			switch(n){
				case "on":
					get('meetingForms').style.display = "none";
					get('displayD').style.display = "none";
					get('additem').style.display = "inline";
					get('clearD').style.display = "inline";
					break;
				case "off":
					get('meetingForms').style.display = "block";
					get('displayD').style.display = "inline";
					get('clearD').style.display = "inline";
					get('submit').style.display = "inline";
					get('items').style.display = "none";
					break;
				case "edit":
					get('meetingForms').style.display = "block";
					get('clearD').style.display = "inline";
					get('displayD').style.display = "none";
					get('submit').style.display = "inline";
					get('items').style.display = "none";
					get('top').style.display = "none";
					break;
				case "search":
					get('meetingForms').style.display = "none";
					get('clearD').style.display = "inline";
					get('displayD').style.display = "none";
					get('submit').style.display = "none";
					get('top').style.display = "none";
					break;
				default:
					return false;
			}
	}
	
	function storeData(key){
		// if no key, this is a new post, if there is a key, its an old item being edited
		if(!key){
			var id 				= Math.floor(Math.random() * 100001);
		}else{
			id = key;
		}
		//Gather up all our form field values and store in an object
		//Object properties containt array with the form label and input value 
		getSelectedRadio();
		getCheckBoxValue();
		
		var item 			= {};
			//item.date 		= ["Date of Meeting:", get('date').value ];
			item.nameM 		= ["Name of Meeting:", get('nameM').value];
			item.poc		= ["Contact Number:", get('poc').value];
			item.roomN 		= ["Room Number:", get('roomN').value];
			item.meetingT 	= ["Meeting Time:", get('meetingT').value];
			item.checkb 	= ["Is a VIP Present: ", vipValue];
			item.bridges 	= ["Using Bridge:", get('bridges').value];
			item.code 		= ["Call Code:", get('code').value];
			item.length 	= ["Length of Meeting:", get('length').value];
			item.userR 		= ["User Responded:", userRValue];
			item.notes		= ["Notes:", get('notes').value];
		//Save data to local storage.  Use stringify to convert objects to strings
		localStorage.setItem(id, JSON.stringify(item));
		alert("Meeting Saved!");
	}
	
	function getData(){
		if(localStorage.length === 0){
			alert("You do not have any Scheduled Meetings! ***Default Data Loaded***");
			autoFillData();
			toggleControls("on");
		}else{
			toggleControls("on");
			//Write data from local storage to browser
			var makeDiv = document.createElement('div');
			makeDiv.setAttribute("id","items");
			var makeList = document.createElement('ul');
			makeList.className = "dynamicMakeList";
			makeDiv.appendChild(makeList);
			document.body.appendChild(makeDiv);	
			get('items').style.display = "block";
			for(i=0, j= localStorage.length; i<j;i++){
				var makeli = document.createElement('li');
				var makeLinks = document.createElement('li');
				makeList.appendChild(makeli);
				var key = localStorage.key(i);
				var value = localStorage.getItem(key);
				//Convert String from localStorage value back to an object by using JSON parse
				var obj = JSON.parse(value);
				var makeSubList = document.createElement('ul');
				var breakTag = document.createElement('br');
				makeList.appendChild(breakTag);
				makeSubList.className = "dynamicSubList";
				makeli.appendChild(makeSubList);
				console.log(obj.checkb[1]);
				if(obj.checkb[1] == "vip"){
					getImage(makeSubList);
				}
				for(var n in obj){
					var makeSubLi= document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = obj[n][0]+" "+ obj[n][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(makeLinks);
				}
				makeItemLinks(localStorage.key(i), makeLinks); //creates our edit or delete links for each item in local storage
			}
		}
	}
	
	//get the image for the right category
	function getImage(makeSubList){
		var imgLi = document.createElement('li');
		imgLi.className = "dynamicImg";
		makeSubList.appendChild(imgLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "img/vip_3.png");
		imgLi.appendChild(newImg);
	}
	
	// Creates the edit and delete links
	function makeItemLinks(key, makeLinks){
		var breakTag = document.createElement('br');
		makeLinks.appendChild(breakTag);
		
		//Add edit single Item link
		var editLink = document.createElement('a');	
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		editLink.className = "dynamicEdit";
		makeLinks.appendChild(editLink);
		
		//breakTag = document.createElement('br');
		//makeLinks.appendChild(breakTag);
		
		var deleteLink = document.createElement('a');	
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		deleteLink.className = "dynamicDelete";
		makeLinks.appendChild(deleteLink);
	}
	
	//Auto populate local storage
	function autoFillData(){
		//The actual JSON Object data required for this to work is coming from json.js file which is loaded form the html page
		//Store the JSON into local storage
		for(var n in json){
			var id = Math.floor(Math.random() * 100001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
		getData();	
	}
	
	function editItem(cb){
		//Grab data from our item in local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		//show form again
		toggleControls("edit");	
		
		//populate form fields with the current local storage values
		get('date').value = item.date[1];
		get('nameM').value = item.nameM[1];
		get('poc').value = item.poc[1];
		get('roomN').value = item.roomN[1];
		get('meetingT').value = item.meetingT[1];
		//Radio button population, must be a better way to write this!
		var radios = document.forms[0].check;
		for(i = 0; i < radios.length ; i++){
			if(radios[i].value == "yes" && item.userR[1] == "yes"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "no" && item.userR[1] == "no"){
				radios[i].setAttribute("checked", "checked");	
			}
		}
		if(item.checkb[1] == "vip"){
			get('vip').setAttribute("checked", "checked");	
		}
		get('bridges').value = item.bridges[1];
		get('code').value = item.code[1];
		get('length').value = item.length[1];
		get('notes').value = item.notes[1];
		
		//remove the intial listener from the input "add" button
		add.removeEventListener("click", storeData);
		//Change submit button value to edit button value
		get('submit').value = "Edit Meeting";
		var editSubmit = get('submit');
		
		//Save value established in this function as a property of editSubmit Event
		//so we can use that value, when we save the data we edited
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;		
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Meeting Deleted");
			window.location.reload();
		}else{
			alert("Meeting was not deleted");
		}
	}
	//Clear Data Function
	function clearLocal(){
		if(localStorage.length === 0){
			alert("Nothing to clear!")
		}else{
			localStorage.clear();
			alert("Schedule is cleared");
			window.location.reload();
			return false;
		}
	}
	function getSearch(){
		toggleControls("search");
		var term = get("search").value;	
		
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id","items");
		var makeList = document.createElement('ul');
		makeList.className = "dynamicMakeList";
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);	
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var makeLinks = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var item = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			var breakTag = document.createElement('br');
			makeList.appendChild(breakTag);
			makeli.appendChild(makeSubList);
			if(term === item.nameM[1]){
				for(q in item){
					var makeSubLi= document.createElement('li');
					makeSubList.appendChild(makeSubLi);
					var optSubText = item[q][0]+" "+ item[q][1];
					makeSubLi.innerHTML = optSubText;
					makeSubList.appendChild(makeLinks);
					console.log(item[q][0]+" : " + item[q][1]);
				}
				
			}
		}
	}
	
	function validate(e){
		//Define the elements we want to check
		var getDat = get('date');
		var getNameM = get('nameM');
		var getRoomN = get('roomN');
		var getMeetingT = get('meetingT');
		var getPoc = get('poc');
		
		//Reset Error Messages
		errMsg.innerHTML = "";
		getNameM.style.border = "1px solid black";
		getRoomN.style.border = "1px solid black";
		getMeetingT.style.border = "1px solid black";
		getPoc.style.border = "1px solid black";
		//get Error messages
		var messageAry = [];
		//check for group validation
		if(getNameM.value === ""){
			var nameMError = "Please enter a Meeting Name"
			getNameM.style.border = "1px solid red";
			messageAry.push(nameMError);
		}
		var roomNum = /^\(?([0-9]{1})\)?[-. ]?([0-9]{3})$/
		if(!(roomNum.exec(getRoomN.value))){
			var roomNError = "Please enter a valid room number"
			getRoomN.style.border = "1px solid red";
			messageAry.push(roomNError);
		}
		if(getMeetingT.value === ""){
			var meetingTError = "Please enter a Meeting Time"
			getMeetingT.style.border = "1px solid red";
			messageAry.push(meetingTError);
		}
		// phone number validation
		var phone = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if(!(phone.exec(getPoc.value))){
			var pocError = "Please enter a valid Phone number"
			getPoc.style.border = "1px solid red";
			messageAry.push(pocError);	
		}
		
		//if there were errors, display them on the screen
		if (messageAry.length >= 1){
			for(var i = 0, j = messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				console.log(messageAry[i]);
				errMsg.appendChild(txt);	
			} 
			e.preventDefault();
			return false;
		}else{
			//send the key value which came from the editdata function
			storeData(this.key);
			window.location.reload();
		}
  		
	}
	

	
	//variabes default
	
	var bridgeGroup = ["--Select--", "USAMTIC Audio", "USAMTIC Video", "TMS Audio", "TMS Video"],
		userRValue,
		vipValue = "No",
		errMsg = get('errors');
	popSec();
	
	//Set Links and submit click events
	var displayD = get('displayD');
	displayD.addEventListener("click", getData);
	var clearD = get('clearD');
	clearD.addEventListener("click", clearLocal);
	var add = get('submit');
	add.addEventListener("click", validate);
	
	var searchB = get('searchBtn');
	searchB.addEventListener("click", getSearch);
	
	
	
	
});