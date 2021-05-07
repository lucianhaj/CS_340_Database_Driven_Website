var express = require('express');
var mysql = require('./dbcon2.js');

var app = express();
var CORS = require('cors');
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
app.post('/search', function(req, res,next){
    var context = {}
    console.log(req);
    
    mysql.pool.query("SELECT * FROM departments WHERE `name` = ?", [req.body.name], (err, rows, field)=>{
        if(err){
            next(err)
            return
        }
        context.result = JSON.stringify(rows);
        res.send(context);
    });
    console.log("Getting result");
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