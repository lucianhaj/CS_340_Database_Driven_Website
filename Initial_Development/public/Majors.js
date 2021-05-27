var num_rows = 0;
var acceptMajorButton = document.querySelector(".modal-Majors-accept-button");

acceptMajorButton.onclick = function insertMajor(){
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
var cell5 = row.insertCell(4);

// Add some text to the new cells:
var MajorID_content = document.getElementById("major-id-input");
var Credit_content = document.getElementById("major-credits-input");
var Electives_content = document.getElementById("major-electives-input");
var Name_content = document.getElementById("major-name-input");
var Degree_content = document.getElementById("major-degree-input");


var id = MajorID_content.value;	
cell1.textContent = MajorID_content.value;
cell2.textContent = Credit_content.value;

cell3.textContent = Electives_content.value;
cell4.textContent = Name_content.value;
cell5.textContent = Degree_content.value;


		
        var request2 = new XMLHttpRequest();
        var request2URL = "/page1.html/insertMajor";
        
        request2.open('POST', request2URL);
        var request2Body = JSON.stringify({MajorID:MajorID_content.value,Credit:Credit_content.value,Electives:Electives_content.value,Name:Name_content.value,Degree:Degree_content.value});
        
        request2.setRequestHeader('Content-Type', 'application/json');
        
     
        request2.send(request2Body);
 		
MajorID_content.value = "";
Credit_content.value = ""; 
Electives_content.value = "";
Name_content.value = "";   
Degree_content.value = "";
	
}