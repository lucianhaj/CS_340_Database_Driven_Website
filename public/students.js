document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  //getall majors for adding new student_search
  getAllMajors();
  getAllData();
  getAllPlans();
  //search search_box

document.getElementById('search_input_student').addEventListener('focusin', function(event){

    document.getElementById("search_input_student").addEventListener('keyup', function(event){
      console.log('event in search result is : ', event.target.value);
      let data = {name:event.target.value}
      url = "http://flip2.engr.oregonstate.edu:2300/student_search";
      let req =  new XMLHttpRequest();
      req.open('post', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_students_list(result);
      //console.log('result from search: ', req.responseText, 'And send data is', data);
  });
});

  let submit = document.getElementById('submit_add_student');
  submit.addEventListener('click', function(event){
    let name = document.getElementById('student_name_value').value;
    let gpa = document.getElementById('student_gpa_value').value;
    let graduation_plan= document.getElementById('student_plan').value;
    let majorID = document.getElementById('student_major_value').value;
    console.log('value added is ', majorID);
    console.log('plan added is ', graduation_plan);
    data = {name:name, gpa:gpa, graduation_plan:graduation_plan, majorID:majorID }
    url = "http://flip2.engr.oregonstate.edu:2300/add_students";
    var req = new XMLHttpRequest();
    req.open('post', url,false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    result = JSON.parse(req.responseText);
    make_students_list(result);
  }); //just added

  let students_table = document.getElementById('students_table');
  students_table.addEventListener('click', function(event){
    let row= (event.target.parentNode).parentNode;
    let id=row.children[0].innerHTML;
    let name =row.children[1].innerHTML;
    let name_var = row.children[1].children[0];
    let gpa_var = row.children[2].children[0];
    let plan_var = row.children[3].children[0]
    let major_var = row.children[4].children[0];
    let gpa = row.children[2].innerHTML;
    let majorID =row.children[4].innerHTML;

    if(event.target.innerHTML =='EDIT'){
      row.deleteCell(1);
      let edit_name = row.insertCell(1);
      edit_name.innerHTML = `<input type='text' class='edit_input' value=${name}>`;

      row.deleteCell(2);
      let edit_gpa = row.insertCell(2);
      edit_gpa.innerHTML =`<input type='number' class='edit_input' value=${gpa}>`;

      row.deleteCell(3);
      let edit_plan =  row.insertCell(3);
      edit_plan.innerHTML = `<select id='student_plan_select'></select>`;

      row.deleteCell(4)
      let major_edit = row.insertCell(4);
      major_edit.innerHTML =`<select class='edit_input' id='student_major_select'></select>`;

      getAllPlans_select();
      getAllMajors_select();
      event.target.innerHTML='DONE'
    }
    else if(event.target.innerHTML =='DONE'){
      let data = {ID:id, name:name_var.value, majorID:major_var.value, gpa:gpa_var.value, graduation_plan:plan_var.value}
      console.log('major: ', major_var.value)
      url = "http://flip2.engr.oregonstate.edu:2300/edit_students";
      req = new XMLHttpRequest();
      req.open('put',url,false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      console.log(result);
      event.target.innerHTML='EDIT'
      name_var.parentNode.innerHTML = row.children[1].children[0].value;
      gpa_var.parentNode.innerHTML = row.children[2].children[0].value;
      major_var.parentNode.innerHTML = result[0].majorName;
      plan_var.parentNode.innerHTML = row.children[3].children[0].value;
      console.log(result);

    }
    else if(event.target.innerHTML == 'DELETE'){
      let data = {ID:id}
      console.log('id deleted', id);
      url = "http://flip2.engr.oregonstate.edu:2300/delete_students";

      let req = new XMLHttpRequest();
      req.open('post', url,false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_students_list(result);
    }
    console.log('event students table: ', id);
  });

}
function make_students_list(result){
  let table= document.getElementById('students_table');
  deleteTable(table,0);
  let name = document.createElement('th');
  let ID = document.createElement('th');
  let gpa = document.createElement('th');
  let plan = document.createElement('th')
  let major = document.createElement('th');
  let row = table.insertRow(0);
  row.appendChild(ID);
  row.appendChild(name)
  row.appendChild(gpa);
  row.appendChild(plan)
  row.appendChild(major);
  name.innerHTML='Name';
  ID.innerHTML = 'ID';
  major.innerHTML = 'Major';
  gpa.innerHTML = "GPA";
  plan.innerHTML = "Graduation Plan"
  for(let i =1 ; i <= result.length;i++){
    let row = table.insertRow(i);
    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let gpa = row.insertCell(2);
    let plan =  row.insertCell(3)
    let major = row.insertCell(4);
    let edit_button =  row.insertCell(5);
    let delete_button = row.insertCell(6);
    id.innerHTML = result[i-1].ID;
    name.innerHTML = result[i-1].name;
    gpa.innerHTML = result[i-1].gpa;
    plan.innerHTML = result[i-1].graduation_plan;
    major.innerHTML = result[i-1].majorName;
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
  let table = document.getElementById('students_table');
  deleteTable(table,0);
  let url = "http://flip2.engr.oregonstate.edu:2300/students";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_students_list(data);
    console.log('result from all data ', data)

  });
}

function getAllMajors(){
  let url = "http://flip2.engr.oregonstate.edu:2300/majors";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
  //  console.log('result from all data for majors ', data)
    let select = document.getElementById('student_major_value');
    for( let i = 0; i < data.length;i++){
      let option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].majorID;
    //  console.log('print ', data[i].name, data[i].majorID );
      select.add(option);

    }
  });
}
function getAllMajors_select(){
  let url = "http://flip2.engr.oregonstate.edu:2300/majors";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
  //  console.log('result from all data for majors ', data)
    let select = document.getElementById('student_major_select');
    for( let i = 0; i < data.length;i++){
      let option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].majorID;
    //  console.log('print ', data[i].name, data[i].majorID );
      select.add(option);

    }
  });
}
function getAllPlans(){
  let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
  //  console.log('result from all data for plans ', data)
    let select = document.getElementById('student_plan');
    for( let i = 0; i < data.length;i++){
      let option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
    //  console.log('print ', data[i].name, data[i].name );
      select.add(option);
    }
  });
}
function getAllPlans_select(){
  let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
  //  console.log('result from all data for plans ', data)
    let select = document.getElementById('student_plan_select');
    for( let i = 0; i < data.length;i++){
      let option = document.createElement('option');
      option.text = data[i].name;
      option.value = data[i].name;
    //  console.log('print ', data[i].name, data[i].name );
      select.add(option);
    }
  });
}
