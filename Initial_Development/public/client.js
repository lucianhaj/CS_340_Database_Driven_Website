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
var teachers_array = new Array ();
var count = 0;
var createRowBtn = document.getElementById("create-row-button");
var backdrop = document.getElementById("modal-backdrop");
var modal = document.getElementById("create-row-modal");
//svar delete_button = document.querySelector(".delete-student-button");
/* delete_button.onclick = function deleteStudent(){
	
	this.parentNode.remove();

}

 */



var addTeachersButton = document.getElementById("add-teachers-input")
addTeachersButton.onclick = function getTeachers(){
	var Anchor = document.querySelector("p");
	console.log("==", Anchor.textContent);
	var Count = document.createElement('input');
	Count.setAttribute("type","text");
	Count.setAttribute("id","teacher-count-input");
	Anchor.appendChild(Count);
	//<input type="text" id="teacher-count-input">
	var confirmButton = document.createElement('button');
	confirmButton.textContent = "confirm";
	Anchor.appendChild(confirmButton);
	confirmButton.onclick = function confirmTeacher(){
			confirmButton.onclick = ()=> false
			var teacher_id = Count.value;
			console.log("Count:", teacher_id);
			teachers_array[count] = teacher_id;
			console.log("TeachersArray", teachers_array);

			count++;
	Anchor.removeChild(confirmButton);
	Anchor.removeChild(Count);
		
		
		
	}
	 
	
	
}


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
		console.log("ID is", id);
		del_button.parentNode.remove();
        var request = new XMLHttpRequest();
        var requestURL = "/page1.html/removeStudent";
        request2.open('DELETE', request2URL);
        var request2Body = JSON.stringify({StudentID:id});
        console.log("Body:", requestBody);
        request2.setRequestHeader('Content-Type', 'application/json');
       // document.location.reload(true);

     
        request2.send(requestBody);
	}







		
        var request = new XMLHttpRequest();
        var requestURL = "/page1.html/insertStudent";
        
        request.open('POST', requestURL);
        var requestBody = JSON.stringify({StudentID:StudentID_content.value,GPA:GPA_content.value,Name:Name_content.value,MajorID:MajorID_content.value,Teachers:teachers_array});
        
        request.setRequestHeader('Content-Type', 'application/json');
        
     
        request.send(requestBody);
 		
StudentID_content.value = "";
GPA_content.value = ""; 
Name_content.value = "";
MajorID_content.value = "";   
teachers_array.length = 0;


	
}

