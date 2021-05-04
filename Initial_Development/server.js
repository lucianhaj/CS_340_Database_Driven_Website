/*
    SETUP
*/
// Express
var express = require('express');
//var handle= require('handlebars');
//var handlebars = require('express-handlebars');   // We are using the express library for the web server
var app     = express();   
app.use(express.json());         // We need to instantiate an express object to interact with the server in our code
PORT        = 48531;                // Set a port number at the top so it's easy to change in the future


const path =  require('path');
/*
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.use(express.urlencoded({extended:false}));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static('public'));
*/

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
		template += '\n                    <tr>\n' +
		'                        '+ 
		'<td>\n                            <button onclick = request.send(JSON.stringify({StudentID:'+id+'}))>'
		+ id + '</button>\n' + 
		'</td>\n                        <td>' +gpa + 
		'</td>\n                        <td>' + name +  
		'</td>\n                        <td>' + major +
		'</td>\n' 
		+ '\n                    </tr>\n';

    });
	
		/* onclick = "alert("hello");"	 */
			
			
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
		'</td>\n                        <td>' +id + 
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
/* app.get('/style.css', function(req,res,next){
			 res.statusCode = 200;
		res.setHeader("Content-Type","text/css");
		res.write(CSS);
				res.end();

});	
	 */
		
app.use(express.static('public'));

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

app.get('/teachers.html', function(req,res){
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, './public/teachers.html'));

	//res.end();
});

app.get('/departments.html', function(req,res){
	res.statusCode = 200;
	res.sendFile(path.join(__dirname, 'public/departments.html'));
		
});
app.post('/page1.html/insertStudent', function(req,res){
	var StudentID = req.body.StudentID;
	var GPA = req.body.GPA;
	var Name = req.body.Name;
	var Major = req.body.MajorID;	
	
	//
	queryInsert = 'INSERT INTO Students VALUE (' + StudentID + ',' + GPA + ',' + "'"+ Name + "'" + ','  + Major + ');';
	//console.log("==query", queryInsert);
	querySelectAll = 'SELECT * FROM Students;';
	db.pool.query(queryInsert, function(err,results,fields){
	db.pool.query(querySelectAll, function(err, results, fields){

                        // Send the results to the browser
						res.statusCode = 200;

						res.end();
						});
	
	
	});
	
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