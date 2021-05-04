/* window.onload = function insertTable(){
var table = document.querySelector('table');
	
	 var request = new XMLHttpRequest();
        var requestURL = "/requestTable";
        requestBody = JSON.stringify({StudentID:"hello"});
        request.open('GET', requestURL);
        request.setRequestHeader('Content-Type', 'application/json');

	request.send(requestBody);
} */

var num_rows = 1; 

var createRowBtn = document.getElementById("create-row-button");
var backdrop = document.getElementById("modal-backdrop");
var modal = document.getElementById("create-row-modal");
/* var delete_button = document.querySelectorAll(".student-delete-button");
delete_button.onclick = function deleteStudent(){
	
	var ID = this.parentNode.textContent;
	ID = ID.toString().trim();
	console.log("==what is trimmed", ID);
	this.parentNode.parentNode.remove();
	var request = new XMLHttpRequest();
        var requestURL = "/page1.html/removeStudent";
        
        request.open('DELETE', requestURL);
        var requestBody = JSON.stringify({StudentID:ID});
        
        request.setRequestHeader('Content-Type', 'application/json');
        
     
        request.send(requestBody);

}
 */



createRowBtn.onclick = function removeHidden(){

		backdrop.classList.remove("hidden");
		modal.classList.remove("hidden");

};

var acceptButton = document.querySelector(".modal-accept-button");
var cancelButton = document.querySelector(".modal-cancel-button");
var modalCloseButton = document.querySelector(".modal-close-button");


acceptButton.onclick = function insertStudent(){
	var table = document.querySelector('table');
	var button = document.createElement('button');
// Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(num_rows);
num_rows += 1;

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);
var cell3 = row.insertCell(2);
var cell4 = row.insertCell(3);


// Add some text to the new cells:
var StudentID_content = document.getElementById("student-id-input");
var GPA_content = document.getElementById("student-gpa-input");
var Name_content = document.getElementById("student-name-input");
var MajorID_content = document.getElementById("student-major-input");
del_button = document.createElement("button");
del_button.textContent = ("DELETE ROW"+StudentID_content.value);
row.appendChild(del_button);


var id = StudentID_content.value;	
cell1.textContent = StudentID_content.value;
cell2.textContent = GPA_content.value;

cell3.textContent = Name_content.value;
cell4.textContent = MajorID_content.value;

	del_button.onclick = function(){
		del_button.parentNode.remove();
        var request = new XMLHttpRequest();
        var requestURL = "/page1.html/removeStudent";
        request.open('DELETE', requestURL);
        var requestBody = JSON.stringify({StudentID:id});
        console.log("Body:", requestBody);
        request.setRequestHeader('Content-Type', 'application/json');
        
     
        request.send(requestBody);
	}







		
        var request = new XMLHttpRequest();
        var requestURL = "/page1.html/insertStudent";
        
        request.open('POST', requestURL);
        var requestBody = JSON.stringify({StudentID:StudentID_content.value,GPA:GPA_content.value,Name:Name_content.value,MajorID:MajorID_content.value});
        
        request.setRequestHeader('Content-Type', 'application/json');
        
     
        request.send(requestBody);
 		
StudentID_content.value = "";
GPA_content.value = ""; 
Name_content.value = "";
MajorID_content.value = "";   
	
        
	
}


