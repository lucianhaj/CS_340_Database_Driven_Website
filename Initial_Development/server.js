/*
    SETUP
*/
// Express
var express = require('express');
//var handle= require('handlebars');
//var handlebars = require('express-handlebars');   // We are using the express library for the web server
var app     = express();   
app.use(express.json());         // We need to instantiate an express object to interact with the server in our code
PORT        = 48532;                // Set a port number at the top so it's easy to change in the future



// Database
var db = require('./connector')
var fs = require('fs');
/* let template = '';


querySelectAll = 'SELECT * FROM student;';
	db.pool.query(querySelectAll, function(err, results, fields){
	console.log("==results:", results);						
	var i;
	Object.keys(results).forEach(function(key) {
      var row = results[key];
	  var id = row.studentID;
	  var gpa = row.GPA;
	  var name = row.Name;
	  var major = row.Major;
		template += '\n                    <tr>\n' + '                        ' + '<td>' + id + '</td>\n                        <td>' +gpa + '</td>\n                        <td>' + name + '</td>\n                        <td>' + major + '</td>\n                    </tr>\n';

    });
 */


/**********************************************************
Reads the files relevant to Students Table from file system
**********************************************************/
 try{
var first = fs.readFileSync("public/First_Half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
 try{
var first_StudentsTeachers = fs.readFileSync("public/StudentsTeachers_first_half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
 try{
var second_StudentsTeachers= fs.readFileSync("public/StudentsTeachers_second_half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
 try{
var plans_first_half = fs.readFileSync("public/Plans_page_first_half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
 try{
var plans_second_half = fs.readFileSync("public/Plans_page_second_half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
 try{
var page1 = fs.readFileSync("public/page1.html").toString();
}
catch(er){
	console.log("Err", er);
	
}

try{
var client = fs.readFileSync("public/client.js").toString();
}
catch(er){
	console.log("Err", er);
	
}
try{
var Major = fs.readFileSync("public/Majors.js").toString();
}
catch(er){
	console.log("Err", er);
	
}
try{
var CSS = fs.readFileSync("public/style.css").toString();
}
catch(er){
	console.log("Err", er);
	
}
console.log("==What's inside first", first);


 try{
var second = fs.readFileSync("public/Second_Half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
console.log("==What's inside second:", second);

/**********************************************************
Reads the files relevant to Majors Table from file system
**********************************************************/

 try{
var first_majors = fs.readFileSync("public/Majors_page_first_half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}
 try{
var second_majors = fs.readFileSync("public/Majors_page_second_half.html").toString();
}
catch(er){
	console.log("Err", er);
	
}


 try{
var home = fs.readFileSync("home.html").toString();
}
catch(er){
	console.log("Err", er);
	
}



app.get('/page1.html', function(req,res,next){
	
	
let template = '';

querySelectAll = 'SELECT * FROM Students;';
	db.pool.query(querySelectAll, function(err, results, fields){
	console.log("==results:", results);						
	var i;
	
	
	
	
	Object.keys(results).forEach(function(key) {
      var row = results[key];
	  var id = row.StudentID;
	  var gpa = row.GPA;
	  var name = row.Name;
	  var major = row.MajorID;
		template += '\n'+ '<tr>'+ 
		'<td>\n                          <button type = "button" id = "'+ id + '" onclick = "deleteStudent('+id+ ',this)">'
		//+ 'alert("hello");};>'
		+ 'DeleteStudent  ' +id+ '</button>\n'  
		+'</td>\n                        <td>' +gpa + '<button onclick = "updateStudent('+id+',this)">UpdateStudent  ' +id+ '</button>\n'
		+'</td>\n                        <td>' + name +  
		'</td>\n                        <td> <button onclick = request.send(JSON.stringify({StudentID:' +id+ '}));>SET to NULL</button>' + major +
		'</td>\n' 
		+ '\n                    </tr>\n';

    });
	template += '<script>\n function updateStudent(ID,t){\n'
	+'					t.onclick = ()=> false\n'
	+'var Count = document.createElement("input");\n'
	+'Count.setAttribute("type","text");\n'
	+'Count.setAttribute("id","new-gpa-input");\n'
	+'					var confirmButton = document.createElement("button");\n'
	+'					confirmButton.textContent = "confirm";\n'
	+'					t.appendChild(confirmButton);\n'
		+'				t.appendChild(Count);\n'
	+		'			confirmButton.onclick = function confirmTeacher(){\n'
	+'					confirmButton.onclick = ()=> false\n'		
	+ '					t.removeChild(Count);\n'
	+ '					t.removeChild(confirmButton);\n'

	/*
	+'					var Button = document.createElement("button");\n'
	+'					Button.setAttribute("id",ID);\n'
	+'					Button.textContent = "UpdateStudent"+ID;\n'
	+ '					t.parentNode.appendChild(Button);\n'
		*/
	/*
	+ '					var table_data = document.createElement("td");\n'
	
	+ '					var td = t.parentNode;\n'
	+ '					table_data.textContent = ID;\n'

	+ '					t.parentNode.textContent= Count.value;\n'

	+'

	+'					Button.onclick = updateStudent(ID,t);\n' 
	+ '					table_data.appendChild(Button);\n'
	+ '					t.parentNode.replaceChild(table_data,td);\n'

	*/

	
	+'	request3.send(JSON.stringify({NewGPA:Count.value,StudentID:ID}));\n'
	+'	document.location.reload(true);\n'


	+'	'
	+ '					alert(Count.value);\n' 	
	+'}}\n'
		+'		function deleteStudent(id,t){\n'
		+'				request2.send(JSON.stringify({StudentID:id}));\n'
		+'				var click = document.getElementById("id");\n'
		+'				t.parentNode.parentNode.remove();\n'
		+' 			document.location.reload(true);\n'
		/* +'		 request2.open("DELETE", request2URL);\n'
		+' 			 request2.setRequestHeader("Content-Type", "application/json");\n'
 */

		+'}'		
	+ '		 </script>\n';
		
		/* onclick = "alert("hello");"	 */
		
		
						let template2 = '';
			querySelectTeachers = 'SELECT name, teacherID FROM teachers;';
		template2 += '<table>';
			db.pool.query(querySelectTeachers, function(err, res, fields){
	console.log("==results:", res);						
	var i;
	Object.keys(res).forEach(function(key) {
      var row = res[key];
	  var id = row.teacherID;
	  var name = row.name;
		template2 += '\n                    <tr>\n' +
		'                        '+ 
		'                       <td>' +id + 
		'</td>\n                        <td>' + name + 
		'</td>\n' 
		+ '\n                    </tr>\n';


    });
			
			template2 += '</table>';
			});
	
		var temp = first + template + second;	
			console.log(":temp", temp);
			
			
			
			
			res.statusCode = 200;
		res.setHeader("Content-Type","text/html");
		res.write(temp);
				res.end();
				
				

});	



app.get('/Majors_page.html', function(req,res,next){
	
	
let template2 = '';


querySelectAll = 'SELECT * FROM Majors;';
	db.pool.query(querySelectAll, function(err, results, fields){
	console.log("==results:", results);						
	var i;
	Object.keys(results).forEach(function(key) {
      var row = results[key];
	  var id = row.ID;
	  var name = row.Name;
	  var credits = row.CreditsRequired;
	  var electives = row.ElectivesRequired;
	  var degree = row.Degree;
		template2 += '\n                    <tr>\n' +
		'                        '+ 
		'<td>\n                            <button onclick = function(){request.send(JSON.stringify({ID:'+id+'})); alert("hello");};>'
		+ id + '</button>\n' + 
		'</td>\n                        <td>' + credits + 
		'</td>\n                        <td>' + electives+ 
		'</td>\n                        <td>' + name +
		'</td>\n                        <td>' + degree +
		'</td>\n' 
		+ '\n                    </tr>\n';


    });
	
		/* onclick = "alert("hello");"	 */
			
			
		var temp = first_majors + template2 + second_majors;	
			console.log(":temp", temp);
			
			
			
			
			res.statusCode = 200;
		res.setHeader("Content-Type","text/html");
		res.write(temp);
				res.end();

});	
});





app.get('/Plans.html', function(req,res,next){
	
	
let template2 = '';


querySelectAll = 'SELECT * FROM Plans;';
	db.pool.query(querySelectAll, function(err, results, fields){
	console.log("==results:", results);						
	var i;
	Object.keys(results).forEach(function(key) {
      var row = results[key];
	  var Program = row.Program;
	  var Name = row.MajorName;
		template2 += '\n                    <tr>\n' +
		'                        '+ '                        <td>' + Program + 
		'</td>\n                        <td>' + Name+ 
		'</td>\n' 
		+ '\n                    </tr>\n';


    });
	
		/* onclick = "alert("hello");"	 */
			
			
		var temp = plans_first_half + template2 + plans_second_half;	
			console.log(":temp", temp);
			
			
			
			
			res.statusCode = 200;
		res.setHeader("Content-Type","text/html");
		res.write(temp);
				res.end();

});	
});



app.get('/StudentsTeachers.html', function(req,res,next){
	
	
let template2 = '';


querySelectAll = 'SELECT * FROM StudentsTeachers;';
	db.pool.query(querySelectAll, function(err, results, fields){
	console.log("==results:", results);						
	var i;
	Object.keys(results).forEach(function(key) {
      var row = results[key];
	  var sid = row.sid;
	  var tid = row.tid;
		template2 += '\n                    <tr>\n' +
		'                        '+ '                        <td>' + sid + 
		'</td>\n                        <td>' + tid+ 
		'</td>\n' 
		+ '\n                    </tr>\n';


    });
	
		/* onclick = "alert("hello");"	 */
			
			
		var temp = first_StudentsTeachers + template2 + second_StudentsTeachers;	
			console.log(":temp", temp);
			
			
			
			
			res.statusCode = 200;
		res.setHeader("Content-Type","text/html");
		res.write(temp);
				res.end();

});	
});
/* app.get('/public/Majors.js', function(req,res,next){

        res.statusCode = 200;
		res.setHeader("Content-Type","application/json");
		res.write(Major);
		
		
		
		
		
});
 */
/* app.get('/style.css', function(req,res,next){
			 res.statusCode = 200;
		res.setHeader("Content-Type","text/css");
		res.write(CSS);
				res.end();

});	
	 */
		
app.use(express.static('public'));

app.put('/page1.html/updateStudent', function(req,res,next){

	console.log("==RequestBody for UPDATE Student GPA:", req.body.NewGPA, req.body.StudentID);
	queryUpdate = 'UPDATE Students SET GPA =' +req.body.NewGPA+ ' WHERE Students.StudentID =' + req.body.StudentID;
	console.log("==Query:", queryUpdate);
	db.pool.query(queryUpdate, function(err, results, fields){
	
	
	});
	
});

app.all('/page1.html/removeStudent', function(req,res,next){

	console.log("==RequestBody:", req.body.StudentID);
	querySelectAll = 'DELETE FROM Students WHERE StudentID =' + req.body.StudentID;
	db.pool.query(querySelectAll, function(err, results, fields){
	
	
	});
	res.statusCode = 200;
	
	res.end(); 
	//res.render('page1', {data:results});
	//res.send(template);
		// Send the results to the browser
						//res.end();

queryRemove_MM_Relationship = 'DELETE FROM StudentsTeachers WHERE sid =' +req.body.StudentID;
db.pool.query(queryRemove_MM_Relationship, function(err, results, fields){
		console.log("==results:", results);						

});
});

app.get('/requestTable', function(req,res,next){
	let template = '';


	querySelectAll = 'SELECT * FROM Students;';
	db.pool.query(querySelectAll, function(err, results, fields){
	console.log("==results:", results);						
	var i;
	Object.keys(results).forEach(function(key) {
      var row = results[key];
	  var id = row.StudentID;
	  var gpa = row.GPA;
	  var name = row.Name;
	  var major = row.Major;
		template += '\n                    <tr>\n' + '                        ' + '<td>' + id + '</td>\n                        <td>' +gpa + '</td>\n                        <td>' + name + '</td>\n                        <td>' + major + '</td>\n                    </tr>\n';

    });
	})
	res.statusCode = 200;
	var temporary = first + template + second;
	res.write(temporary);
	res.end();
	//res.render('page1', {data:results});
	//res.send(template);
		// Send the results to the browser
						//res.end();
																})
});
//app.use(express.static('public'));
app.get('/', function(req, res)
    { 
	res.statusCode = 200;
	res.write(home);
	res.end();
	/*
        // Define our queries
        query1 = 'DROP TABLE IF EXISTS diagnostic;';
        query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        query3 = 'INSERT INTO diagnostic (text) VALUES ("MySQL is working!")';
        query4 = 'SELECT * FROM diagnostic;';

        // Execute every query in an asynchronous manner, we want each query to finish before the next one starts

        // DROP TABLE...
        db.pool.query(query1, function (err, results, fields){

            // CREATE TABLE...
            db.pool.query(query2, function(err, results, fields){

                // INSERT INTO...
                db.pool.query(query3, function(err, results, fields){

                    // SELECT *...
                    db.pool.query(query4, function(err, results, fields){

                        // Send the results to the browser
                        let base = "<h1>MySQL Results:</h1>"
                        res.send(base + JSON.stringify(results));
                    });
                });
            });
        }); */
    });
	
app.put('/page1.html/removeFKStudent', function(req,res){
	var StudentID = req.body.StudentID;

	//
	queryUpdate = 'UPDATE Students\nSET MajorID = NULL\n WHERE Students.StudentID =' + StudentID;
	//console.log("==query", queryInsert);
	querySelectAll = 'SELECT * FROM Students;';
	db.pool.query(queryUpdate, function(err,results,fields){

                        // Send the results to the browser
						res.statusCode = 200;

						res.end();
						
	
	

	
});
});
app.post('/page1.html/insertStudent', function(req,res){
		res.statusCode = 200;

	var Teachers_Results = new Array ();
	var StudentID = req.body.StudentID;
	var GPA = req.body.GPA;
	var Name = req.body.Name;
	var Major = req.body.MajorID;	
	var Teachers = req.body.Teachers;
	console.log("== teachers:", Teachers);
	console.log("== teachers:", Teachers[0]);
	
	//
	queryInsert = 'INSERT INTO Students VALUE (' + StudentID + ',' + GPA + ',' + "'"+ Name + "'" + ','  + Major + ');';
	//console.log("==query", queryInsert);
	querySelectAll = 'SELECT * FROM Students;';
	db.pool.query(queryInsert, function(err,results,fields){
	
	});
	
	querySelectAll_Teachers = 'SELECT * FROM teachers';
	db.pool.query(querySelectAll_Teachers, function(err, results, fields){
		var count = 0;
	for (i in Teachers) {
		var located = false;
		Object.keys(results).forEach(function(key) {
		  var row = results[key];
		  var len = results.length;
		  var name = row.name;
		  Teachers_Results[count] = name;
		  console.log("Teachers_results:", Teachers_Results[count]);
		//for (i in Teachers) {
		queryLocate = 'SELECT teacherID FROM teachers WHERE teachers.name = "' +Teachers[i] + '";';
					db.pool.query(queryLocate, function(err, results, fields){
					console.log("==Specific teacher results:", results);						
					var i;
					Object.keys(results).forEach(function(key) {
					  var row = results[key];
					  var id = row.teacherID;
					  console.log("ID is:", id);
							if(Teachers[i] == Teachers_Results[count]){
								located = true;
				console.log("Entered correctly");
			queryInsertTeacher = 'INSERT INTO StudentsTeachers (sid,tid) VALUE (' +StudentID+ ',' + id +');';
			db.pool.query(queryInsertTeacher, function(err, results, fields){
					console.log("==results:", results);						

			});
			
					}
					});
					console.log("Teachers at i", Teachers[0]);
			count = count + 1;


		}); 
		
		});
		if(located == false){
			res.statusCode = 400;
		}
    }
	});
	console.log("++", Teachers_Results[0]);
	

						res.end();	
	
});



app.post('/page1.html/insertMajor', function(req,res){

	var MajorID = req.body.MajorID;
	var Credit = req.body.Credit;
	var Electives = req.body.Electives;
	var Name = req.body.Name;	
	var Degree = req.body.Degree;
	console.log("Req", MajorID, Credit, Electives, Name, Degree);
	
	//
	queryInsert = 'INSERT INTO `Majors`(`ID`, `CreditsRequired`, `ElectivesRequired`, `Name`, `Degree`) VALUE (' + MajorID + ',' + Credit + ',' + Electives + ',' +"'" + Name + "'" + ',' + "'" + Degree + "'"+ ')';
	//console.log("==query", queryInsert);
	db.pool.query(queryInsert, function(err,results,fields){
	console.log("Resss:", results);
	});
	

	
	
		res.statusCode = 200;

						res.end();	
	
});


app.post('/page1.html/insertPlan', function(req,res){

	var Program = req.body.Program;
	var MajorName = req.body.MajorName;
	console.log("Req", Program, MajorName);
	
	//
	queryInsert = 'INSERT INTO Plans (Program, MajorName) VALUE (' +"'"+ Program + "'"+ ',' + "'" + MajorName + "'" + ')';
	//console.log("==query", queryInsert);'
	db.pool.query(queryInsert, function(err,results,fields){
	console.log("Resss:", results);
	});
	

	
	
		res.statusCode = 200;

						res.end();	
	
});

/* app.get('/public/page1.html', function(req, res){
			res.statusCode = 200;
		res.setHeader("Content-Type","text/html");
		res.write(index);
				res.end();
		
	}); 
 */
	
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
