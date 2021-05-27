var num_rows = 0;
var acceptMajorButton = document.querySelector(".modal-Plans-accept-button");

acceptMajorButton.onclick = function insertPlan(){
	var table = document.querySelector('table');
	var button = document.createElement('button');
// Create an empty <tr> element and add it to the 1st position of the table:
var row = table.insertRow(num_rows);
num_rows += 1;

// Insert new cells (<td> elements) at the 1st and 2nd position of the "new" <tr> element:
var cell1 = row.insertCell(0);
var cell2 = row.insertCell(1);

// Add some text to the new cells:
var program_content = document.getElementById("plan-program-input");
var name_content = document.getElementById("plan-name-input");



cell1.textContent = program_content.value;
cell2.textContent = name_content.value;


		
        var request2 = new XMLHttpRequest();
        var request2URL = "/page1.html/insertPlan";
        
        request2.open('POST', request2URL);
        var request2Body = JSON.stringify({Program:program_content.value,MajorName:name_content.value});
        
        request2.setRequestHeader('Content-Type', 'application/json');
        
     
        request2.send(request2Body);
 		
program_content.value = "";
name_content.value = ""; 
	
}