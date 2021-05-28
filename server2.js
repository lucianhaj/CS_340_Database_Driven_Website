var express = require('express');
var mysql = require('./dbcon2.js');


var app = express();
var CORS = require('cors');
//const { query } = require('express');
//const { findSourceMap } = require('module');
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('port', 2300);

//get departments
app.get('/departments', function(req, res,next){
    let context = {}
    mysql.pool.query('SELECT * FROM departments', (err, rows, field)=>{
        if(err){
            next(err)
            return
        }
        context.result = JSON.stringify(rows);
        res.send(context);
    });
    console.log("Getting result for departments");
});

app.put('/teachers', function(req, res, next){
    let my_query = "UPDATE teachers SET `name`=?, `subject`=?, `departID`=? WHERE `teacherID`=?";
    mysql.pool.query(my_query, [req.body.name, req.body.subject, req.body.departID, req.body.teacherID], function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query('SELECT teacherID, teachers.name, teachers.subject, departments.name as department from teachers left join departments on teachers.departID = departments.departID;'
            , (err, rows, field)=>{
            if(err){
                next(err)
                return
            }
            let context = {};
            context.result = JSON.stringify(rows);
            res.send(context);
        });
        }
    });
});

app.delete('/teachers', function(req, res, next){
    mysql.pool.query("DELETE FROM teachers WHERE `teacherID`=?", [req.body.teacherID], function(err, rows, field){
        if (err){
            next(err);
            return
        }
        else{
            mysql.pool.query('SELECT teacherID, teachers.name, teachers.subject, departments.name as department from teachers left join departments on teachers.departID = departments.departID;'
            , (err, rows, field)=>{
            if(err){
                next(err)
                return
            }
            let context = {};
            context.result = JSON.stringify(rows);
            res.send(context);
        });
        }
    });
});
//edit departments
app.put('/departments', function(req, res, next){
    let my_query = "UPDATE departments SET `name`=?, `funding`=?  WHERE departID=?";
    mysql.pool.query(my_query, [req.body.name, req.body.funding, req.body.departID], function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query('SELECT * FROM departments', (err, rows, field)=>{
                if(err){
                    next(err)
                    return
                }
                let context = {}
                context.result = JSON.stringify(rows);
                res.send(context);
            });
        }
    });
});

//delete from departments
app.delete('/departments', function(req, res, next){
    mysql.pool.query("DELETE FROM departments WHERE `departID`=?", [req.body.departID], function(err, rows, field){
       if(err){
           next(err);
       } 
       else{
        mysql.pool.query('SELECT * FROM departments', (err, rows, field)=>{
            if(err){
                next(err)
                return
            }
            let context = {}
            context.result = JSON.stringify(rows);
            res.send(context);
        });
       }
    })
})
//get departments names and their ids
app.get('/departments_options', function(req, res, next){
    let context = {}
    mysql.pool.query('SELECT departID, name from departments', (err, rows, field)=>{
        if(err){
            next(err)
            return
        }
        context.result = JSON.stringify(rows);
        res.send(context);
    });
    console.log("Getting result for departments");
    
});

//Get teachers
app.get('/teachers', function(req, res,next){
    var context = {}
    /*select teacherID, teachers.name, teachers.subject, 
    departments.name as department from teachers join departments on teachers.departID = departments.departID;"
    */
    mysql.pool.query('SELECT teacherID, teachers.name, teachers.subject, departments.name as department from teachers left join departments on teachers.departID = departments.departID;'
        , (err, rows, field)=>{
        if(err){
            next(err)
            return
        }
        context.result = JSON.stringify(rows);
        res.send(context);
    });
    console.log("Getting result for teachers");
});
///search 
app.post('/departments_search', function(req, res,next){
    var context = {}
    console.log(req);
    let my_query = `SELECT * FROM departments WHERE name like '${req.body.name}%'`;
    mysql.pool.query(my_query, (err, rows, field)=>{
        if(err){
            next(err)
            return
        }
        context.result = JSON.stringify(rows);
        res.send(context);
    });
    console.log("Getting result");
});
app.post('/find_teacher', function(req,res,next){
    let context = {}
    let name = req.body.name;
    let my_query = `SELECT teacherID, teachers.name, teachers.subject,\
                    departments.name as department from teachers left join departments on \
                    teachers.departID = departments.departID WHERE teachers.name like '${name}%';`;
    mysql.pool.query(my_query, function(err, result){
        context.result = JSON.stringify(result);
        res.send(context);
    });
});
///teachers-add
app.post('/teachers', function(req,res,next){
    console.log('here in postt adding ')
    var context = {}
    console.log("Request for add teachers" + req.body);
    mysql.pool.query("INSERT INTO teachers (`name`,`subject`,`departID`) VALUES (?,?,?)",[req.body.name, req.body.subject, req.body.departID],
        function(err, result){
            if(err){
                next(result);
                return;
            }
            mysql.pool.query('SELECT * FROM teachers', (err, rows, field)=>{
                if(err){
                    next(err)
                    return;
                }
                context.result = JSON.stringify(rows);
                res.send(context);
            });
        }
        
    );

});
app.post('/departments', function(req, res,next){
    var context = {}
    console.log("Request" + req.body);
    mysql.pool.query("INSERT INTO departments (`name`, `funding`) VALUES (?,?)",[req.body.name, req.body.funding],
        function(err, result){
            if(err){
                next(result);
                return;
            }
            mysql.pool.query('SELECT * FROM departments', (err, rows, field)=>{
                if(err){
                    next(err)
                    return;
                }
                context.result = JSON.stringify(rows);
                res.send(context);
            });
        }
        
    );

});
app.put('/edit_students', function(req,res,next){
    var context = {}
    console.log('reqest to put: ', req.body);
    var name = req.body.name;
    var ID = req.body.ID;
    var majorID = req.body.majorID;
    var graduation_plan = req.body.graduation_plan;
    var gpa = req.body.gpa;
    mysql.pool.query("update Students set `name`=?, `graduation_plan`=?, `gpa` =?, `majorID`=? where `ID` = ?",[req.body.name,
    req.body.graduation_plan, req.body.gpa, req.body.majorID, req.body.ID], function(err,rows, field){
        if(err){
            next(err);
            return;
        }
        else{
            mysql.pool.query("SELECT * FROM Students WHERE `ID`=?", [req.body.ID], function(err, rows, field){
                if(err){
                    next(err)
                    
                }
                else{
                    context= JSON.stringify(rows);
                    res.send(context);
                }
            })
        }
    });




});

app.post('/add_students', function(req, res, next){
    var context = {};
    mysql.pool.query("INSERT INTO Students (`name`, `gpa`, `majorID`,`graduation_plan`) values(?,?,?,?);", [req.body.name, req.body.gpa, req.body.majorID,req.body.graduation_plan],
    function(err, rows, field){
        if(err){
            next(err);
            return
        }
        else{
            mysql.pool.query("SELECT * FROM Students", (err, rows, field)=>{
                if(err){
                    next(err)
                }
                else{
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            }); 
        }

    });
});
app.post('/delete_students', function(req,res,next){
    mysql.pool.query("DELETE FROM Students WHERE `ID`=?;",[req.body.ID], function(err, rows, field){
        if(err){
            next(err)
        }
        else{
            var context = {};
            mysql.pool.query("SELECT * FROM Students", (err, rows, field)=>{
                if(err){
                    next(err)
                }
                else{
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            });
        }
  
    });
});
app.get('/students', function(req, res, next){
    var context = {};
    var create_query = "create table  if not exists Students (`ID` int(11) primary key AUTO_INCREMENT, `name` varchar(50), graduation_plan varchar(50) DEFAULT NULL ,gpa float(3,2) DEFAULT NULL , `majorID` int(11) DEFAULT NULL,CONSTRAINT StudentsToMajors FOREIGN KEY(`majorID`) REFERENCES departments(`departID`));";
    mysql.pool.query(create_query,(err, rows, field)=>{
       if(err){
           next(err);
       } 
       else{ 
        mysql.pool.query("SELECT * FROM Students", (err, rows, field)=>{
            if(err){
                next(err)
            }
            else{
                context = JSON.stringify(rows);
                res.send(context);
            }
        });
       }
    });
});
app.post('/student_search', function(req, res, next){
    let my_query = `SELECT * FROM Students WHERE name like '${req.body.name}%'`;
    mysql.pool.query(my_query, function(err, rows, field){
       var context = {}
       if(err){
           next(err);
       } 
       else{
           context = JSON.stringify(rows);
           res.send(context);
       }
    });
});
app.get('/majors', function(req, res, next){
    let query =  "CREATE TABLE IF NOT EXISTs`Majors`(\
        `majorID` int(11) NOT NULL AUTO_INCREMENT,\
        `name` varchar(255),\
        `creditsRequired` int(11) DEFAULT NULL,\
        `electivesRequired` int(11) DEFAULT NULL,\
         PRIMARY KEY (`majorID`)\
     );";
    mysql.pool.query(query, function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query("SELECT * FROM Majors", function(err, rows, field){
                if(err){
                    next(err);
                }
                else{
                    var context = {};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            });
        }
    });
});
app.post('/majors',function(req, res, next){
    let query ="INSERT INTO Majors(`name`, `creditsRequired`, `electivesRequired`) VALUES(?,?,?);";
    mysql.pool.query(query, [req.body.name, req.body.creditsRequired,req.body.electivesRequired], function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query("SELECT * FROM Majors", function(err, rows, field){
                if(err){
                    next(err);
                }
                else{
                    var context = {};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            }); 
        }
    });
});
app.post('/majors_search', function(req, res, next){
    let my_query = `SELECT * FROM Majors WHERE name like '${req.body.name}%';`;
    mysql.pool.query(my_query, function(err, rows, field){
        if(err){
            next(err);
            return;
        }
        else{
            context = {};
            context = JSON.stringify(rows);
            res.send(context);
        }
    })
})
app.put('/majors', function(req, res, next){
    let query = "UPDATE Majors SET `name`=?, `creditsRequired`=?, `electivesRequired`=? WHERE `majorID`=?;";
    mysql.pool.query(query,[req.body.name, req.body.creditsRequired, req.body.electivesRequired, req.body.majorID], function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query("SELECT * FROM Majors", function(err, rows, field){
                if(err){
                    next(err);
                }
                else{
                    var context = {};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            });  
        }
    });
});

app.delete('/majors', function(req, res, next){
    mysql.pool.query("DELETE FROM Majors WHERE `majorID`=?;",[req.body.majorID], function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query("SELECT * FROM Majors", function(err, rows, field){
                if(err){
                    next(err);
                }
                else{
                    var context = {};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            });   
        }
    });
});
//Gradution plan
app.get('/graduation_plan', function(req, res, next){
    let my_query = "CREATE TABLE IF NOT EXISTS GraduationPlan (name varchar(255) NOT NULL PRIMARY KEY,\
     totalCredits int(11) DEFAULT NULL, graduationDate DATE DEFAULT (CURRENT_DATE + INTERVAL 1 YEAR));"
    mysql.pool.query(my_query, function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query("SELECT * FROM  GraduationPlan", function(err, rows, field){
                if(err){
                    next(err);
               
                }
                else{
                    context ={};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            });
        }
    });
});

app.post('/graduation_plan', function(req, res, next){
    let my_query = "INSERT INTO GraduationPlan (`name`, `totalCredits`, `graduationDate`) VALUES(?,?,?);";
    mysql.pool.query(my_query, [req.body.name, req.body.totalCredits, req.body.graduationDate],function(err, rows, field){
        if(err){
            next(err);
        }
        else{
            mysql.pool.query("SELECT * FROM GraduationPlan", function(err, rows, field){
                if(err){
                    next(err);
                    res.render('404');
                    return;
               
                }
                else{
                    context ={};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            }); 
        }
    });
});

app.post('/graduation_plan_search', function(req, res, next){
    //let query = "SELECT * FROM GraduationPlan WHERE `name` like '%?'";
    let my_query = `SELECT * FROM GraduationPlan WHERE name like '${req.body.name}%'`; 
    mysql.pool.query(my_query, function(err, rows, field){
        if(err){
            next(err);
            return
        }
        else{
            context = {} 
            context = JSON.stringify(rows);
            res.send(context);
            
        }
    });
});

app.put('/graduation_plan', function(req, res, next){
    let my_query = "UPDATE GraduationPlan SET `name`= ?, `totalCredits`=?, `graduationDate`= ? WHERE `name`=?;";
    mysql.pool.query(my_query, [req.body.name, req.body.totalCredits, req.body.graduationDate, req.body.name], function(err, rows, field){
        if(err){
            next(err);
            return;
        }
        else{
            mysql.pool.query("SELECT * FROM GraduationPlan", function(err, rows, field){
                if(err){
                    next(err);
               
                }
                else{
                    context ={};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            });  
        }
    });
});

app.delete('/graduation_plan', function(req, res, next){
    mysql.pool.query("DELETE FROM GraduationPlan WHERE `name`=?;", [req.body.name],function(err, rows, field){
        if(err){
            next(err);
            return;
        }
        else{
            mysql.pool.query("SELECT * FROM GraduationPlan", function(err, rows, field){
                if(err){
                    next(err);
               
                }
                else{
                    context ={};
                    context = JSON.stringify(rows);
                    res.send(context);
                }
            }); 
        }
    });
});

app.use(function(req,res){
    res.status(404);
    res.render('404');
  });
  
  app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
  });
  
  app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
  });
