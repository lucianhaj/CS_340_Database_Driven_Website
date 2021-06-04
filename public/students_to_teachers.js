document.addEventListener('DOMContentLoaded', bindFunction);
function bindFunction(){
  getAllData();
  let table = document.getElementById('show_table_table');
  document.getElementById('connect_icon').addEventListener('click', function(event){
    //make a post request
    let student_input = document.getElementById('add_student_name');
    let teacher_input = document.getElementById('add_teacher_name');
    let student_name = document.getElementById('add_student_name').value;
    let teacher_name = document.getElementById('add_teacher_name').value;

    let student_data = {name:student_name}
    let teacher_data = {name:teacher_name}
    let data = {studentID: "", teacherID:""}
    url_student = "http://flip2.engr.oregonstate.edu:2300/studentID";
    url_teacher = "http://flip2.engr.oregonstate.edu:2300/teacherID";
    let req_s =  new XMLHttpRequest();
    let req_t = new XMLHttpRequest();
    req_s.open('post', url_student, false);
    req_s.setRequestHeader('Content-Type', 'application/json');
    req_s.send(JSON.stringify(student_data));
    let result = JSON.parse(req_s.responseText);
    data.studentID=result[0].ID;
    //console.log('student_result', result);
    req_t.open('post', url_teacher, false);
    req_t.setRequestHeader('Content-Type', 'application/json');
    req_t.send(JSON.stringify(teacher_data))
    result = JSON.parse(req_t.responseText);
    data.teacherID = result[0].teacherID;
  //  console.log('Teacher_result', result );
    student_input.value = "";
    teacher_input.value = "";

    //make post request
    let url = "http://flip2.engr.oregonstate.edu:2300/studentTeacher";
    let req =new XMLHttpRequest();
    req.open('post', url, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data))
    // TODO: build the table
    result = JSON.parse(req.responseText);
    //console.log(result);
    make_st_list(result);
  });

  //search box
  document.getElementById('search_input_st').addEventListener('focus', function(event){
    document.getElementById('search_input_st').addEventListener('keyup', function(event){
      let data = {name:event.target.value};
      let url = "http://flip2.engr.oregonstate.edu:2300/search_studentTeacher";

      let req = new XMLHttpRequest();
      req.open('post', url,false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_st_list(result);
    })
  });

  table.addEventListener('click', function(event){
    if(event.target.innerHTML == 'DELETE'){
      let row = event.target.parentNode.parentNode;
      let student_name = row.children[0].innerHTML;
      let teacher_name =  row.children[2].innerHTML;

      let student_data = {name:student_name}
      let teacher_data = {name:teacher_name}
      url_student = "http://flip2.engr.oregonstate.edu:2300/studentID";
      url_teacher = "http://flip2.engr.oregonstate.edu:2300/teacherID";
      url_delete = "http://flip2.engr.oregonstate.edu:2300/studentTeacher";

      let req_s =  new XMLHttpRequest();
      let req_t = new XMLHttpRequest();
      req_s.open('post', url_student, false);
      req_s.setRequestHeader('Content-Type', 'application/json');
      req_s.send(JSON.stringify(student_data));
      let result = JSON.parse(req_s.responseText);
      let studentID = result
      req_t.open('post', url_teacher, false);
      req_t.setRequestHeader('Content-Type', 'application/json');
      req_t.send(JSON.stringify(teacher_data))
      result = JSON.parse(req_t.responseText);
      let teacherID  = result;
      let data = {studentID:studentID[0].ID, teacherID:teacherID[0].teacherID};
      let req = new XMLHttpRequest();
      req.open('delete', url_delete, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let data_result = JSON.parse(req.responseText);
      make_st_list(data_result);
    }
  })


}

//delete show_table
function deleteTable(table,row_zero = 1){
  //get number of rows
  let rows_num = table.rows.length
  if(row_zero == 0){
    for(let i = 0;i < rows_num; i++){
      table.deleteRow(0);
    }
  }
  else{
    for(let i = 1;i < rows_num; i++){
      table.deleteRow(1);
    }
  }
}

//make table
function make_st_list(result){
  let table  = document.getElementById('show_table_table');
  deleteTable(table, 0);
  let student =  document.createElement('th');
  let description =  document.createElement('th');
  let teacher =  document.createElement('th');
  let row = table.insertRow(0);
  row.appendChild(student);
  row.appendChild(description);
  row.appendChild(teacher);
  student.innerHTML = "Student's Name";
  description.innerHTML = "Description";
  teacher.innerHTML = "Teacher's Name"
  for( let i = 1 ; i <= result.length; i++){
    let row = table.insertRow(i);
    let student_cell = row.insertCell(0);
    let description_cell = row.insertCell(1);
    let teacher_cell = row.insertCell(2);
    let delete_button =row.insertCell(3);
    student_cell.innerHTML = result[i-1].student_name;
    description_cell.innerHTML = "  is taking classes with  ";
    teacher_cell.innerHTML = result[i-1].teacher_name
    delete_button.innerHTML = "<button class='delete_button'>DELETE</button>";
  }
}

//get all getAllData
function getAllData(){
  let table = document.getElementById('show_table_table');
  let url = "http://flip2.engr.oregonstate.edu:2300/studentTeacher";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_st_list(data);

  });
}
