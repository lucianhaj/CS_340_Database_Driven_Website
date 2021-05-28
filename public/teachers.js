document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  getAllData()
  getOptions();
  //add teachers
  document.getElementById('add_teacher').addEventListener('click', function(event){
    let name = document.getElementById('add_teacher_name').value;
    let subject =document.getElementById('add_teacher_subject').value;
    let department = document.getElementById('add_select_teachers').value;
    let data = {name:name, subject:subject, departID:department};

    let url_add = "http://flip2.engr.oregonstate.edu:2300/teachers";
    let req = new XMLHttpRequest();
    req.open('post', url_add, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let response =JSON.parse(req.responseText);
    var result = JSON.parse(response.result);
    console.log('result from adding' + result);
    getAllData();
  });

  //delete and edit
  document.getElementById('show_table').addEventListener('click', function(event){
    let id = event.target.parentNode.parentNode.children[0].innerHTML;
    let row = event.target.parentNode.parentNode;
    if(event.target.innerHTML == 'DELETE'){
      let data = {teacherID:id};
      let url = "http://flip2.engr.oregonstate.edu:2300/teachers";
      let req = new XMLHttpRequest();
      req.open('delete', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let response =JSON.parse(req.responseText);
      var result = JSON.parse(response.result);
      getAllData();
    }
    else if(event.target.innerHTML == 'EDIT'){
      event.target.innerHTML='DONE';
      let name = row.children[1].innerHTML;
      let subject = row.children[2].innerHTML;
      row.children[1].innerHTML = `<input type='text' class='input_teachers' value='${name}'>`;
      row.children[2].innerHTML = `<input type='text' class='input_teachers' value='${name}'>`
      row.children[3].innerHTML = `<select id='edit_select_teachers'>`;
      getOptions_forEdit();
    }
    else if (event.target.innerHTML == 'DONE'){
      let data = {teacherID:id, name:row.children[1].children[0].value,
                  subject:row.children[2].children[0].value,
                  departID:row.children[3].children[0].value}
      let url = "http://flip2.engr.oregonstate.edu:2300/teachers";
      let req = new XMLHttpRequest();
      req.open('put', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let response =JSON.parse(req.responseText);
      var result = JSON.parse(response.result);
      getAllData();

    }
  });

  //search
  document.getElementById('search_input_teachers').addEventListener('focusin', function(event){
    document.getElementById('search_input_teachers').addEventListener('keyup', function(event){
      data = {name:event.target.value}
      console.log(data);
      let url = "http://flip2.engr.oregonstate.edu:2300/find_teacher";
      let req = new XMLHttpRequest();
      req.open('post', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_teachers_list(JSON.parse(result.result));
      console.log('my search result ', result);

    });

  });
}


function make_teachers_list(result){
  console.log(result);
  let table= document.getElementById('show_table_table');
  deleteTable(table,0);
  let id = document.createElement('th');
  let name = document.createElement('th');
  let subject = document.createElement('th');
  let department = document.createElement('th');
  let row = table.insertRow(0);
  row.appendChild(id);
  row.appendChild(name)
  row.appendChild(subject);
  row.appendChild(department);
  name.innerHTML='Name';
  id.innerHTML = 'ID';
  subject.innerHTML = 'Subject';
  department.innerHTML = "Department";
  for(let i =1 ; i <= result.length;i++){
    let row = table.insertRow(i);
    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let subject = row.insertCell(2);
    let department = row.insertCell(3);
    let edit_button =  row.insertCell(4);
    let delete_button = row.insertCell(5);
    id.innerHTML = result[i-1].teacherID;
    name.innerHTML = result[i-1].name;
    subject.innerHTML = result[i-1].subject;
    department.innerHTML = result[i-1].department;
    edit_button.innerHTML = "<button class='edit_button'>EDIT</button>";
    delete_button.innerHTML = "<button class='delete_button'>DELETE</button>";
  }
}

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

function getAllData(){
  let table = document.getElementById('show_table_table');
  deleteTable(table,0);
  let url = "http://flip2.engr.oregonstate.edu:2300/teachers";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_teachers_list(JSON.parse(data.result));

  });
}
function getOptions(){
  department_options = document.getElementById('add_select_teachers');
  let url = "http://flip2.engr.oregonstate.edu:2300/departments_options";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    let result = JSON.parse(data.result);
    for(let i = 0; i < result.length;i++){
      let option = document.createElement('option');
      option.text = result[i].name;
      option.value = result[i].departID;
      department_options.add(option);
    }
    console.log(result);
  });

}
function getOptions_forEdit(){
  department_options = document.getElementById('edit_select_teachers');
  let url = "http://flip2.engr.oregonstate.edu:2300/departments_options";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    let result = JSON.parse(data.result);
    for(let i = 0; i < result.length;i++){
      let option = document.createElement('option');
      option.text = result[i].name;
      option.value = result[i].departID;
      department_options.add(option);
    }
    console.log(result);
  });

}
