document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  //search search_box
  document.getElementById('search_input').addEventListener('focusin', function(event){
    search_container = document.getElementById('search_container');
    search_result= document.getElementById('search_result');
    search_container.classList.add('search_container_focus');
    search_result.classList.add('search_result_focus');
    event.target.classList.add( 'search_input_focus');

    //edit the search resutl
  });
  document.getElementById('search_input').addEventListener('focusout', function(event){
    search_container = document.getElementById('search_container');
    search_result= document.getElementById('search_result');
    search_container.classList.remove('search_container_focus');
      search_result.classList.remove('search_result_focus');
    event.target.classList.remove( 'search_input_focus');
    search_result.addEventListener('click', function(event){
      // TODO: add event lister to all elements
      console.log('you click on the search at: ', event.target);
    })
  });

  document.getElementById("search_container_student").addEventListener('keyup', function(event){
    console.log('event in search result is : ', event.target);
    let data = {name:event.target.value}
    url = "http://flip2.engr.oregonstate.edu:2300/student_search";
    let req =  new XMLHttpRequest();
    req.open('post', url, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let result = JSON.parse(req.responseText);
    make_students_list(result);
    console.log('result from search: ', req.responseText, 'And send data is', data);
  });

  //add buttons
  document.getElementById('add_student').addEventListener('click', function(event){
    if(event.target.value =='add'){
      document.getElementById('add_icon').innerHTML = "close";
      let add_textarea = document.getElementById('add_textarea');
      event.target.value='done';
      add_textarea.style.display = 'block';
      let submit = document.getElementById('submit_add_student');
      submit.addEventListener('click', function(event){
        let name = document.getElementById('student_name_value').value;
        let gpa = document.getElementById('student_gpa_value').value;
        let graduation_plan= document.getElementById('student_plan_value').value;
        let majorID = document.getElementById('student_major_value').value;
        console.log('value added is ', majorID);
        data = {name:name, gpa:gpa, graduation_plan:graduation_plan, majorID:'54' }
        url = "http://flip2.engr.oregonstate.edu:2300/add_students";
        var req = new XMLHttpRequest();
        req.open('post', url,false);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));
        result = JSON.parse(req.responseText);
        make_students_list(result);
      /*  let table = document.getElementById('students_table')
        for(let i =2 ; i< result.length;i++){
          let row = table.insertRow(i);
          let id = row.insertCell(0);
          let name = row.insertCell(1);
          let gpa = row.insertCell(2);
          let major = row.insertCell(3);
          let edit_button =  row.insertCell(4);
          let delete_button = row.insertCell(5);
          id.innerHTML = result[i].ID;
          name.innerHTML = result[i].name;
          gpa.innerHTML = result[i].gpa;
          major.innerHTML = result.majorID;
          edit_button.innerHTML = "<button class='edit_button'>EDIT</button>";
          delete_button.innerHTML = "<button class='delete_button'>DELETE</button>";
        }*/
      });
    }
    else if(event.target.value == 'done'){
      //event.target.firstChild.children[0].innerHTML = 'close';
      console.log(event.target);
      document.getElementById('add_icon').innerHTML = "add_circle";
      let add_textarea = document.getElementById('add_textarea');
      add_textarea.classList.remove('add_textarea_focus')
      event.target.value='add';
      add_textarea.style.display ='none';
    }

  });

  document.getElementById('list_students').addEventListener('click', function(event){
    let list_icon = document.getElementById('list_icon');
    let students_table_parent = document.getElementById('students_table_parent');
    let students_table = document.getElementById('students_table');
    if(event.target.value == 'show'){
      list_icon.innerHTML ='close';
      students_table_parent.style.display = 'block';
      students_table.style.display = 'block';
      getAllData();
      event.target.value ='done';
      students_table.addEventListener('click', function(event){
        let row= (event.target.parentNode).parentNode;
        let id=row.children[0].innerHTML;
        let name =row.children[1].innerHTML;
        let name_var = row.children[1].children[0];
        let gpa_var = row.children[2].children[0];
        let major_var = row.children[3].children[0];
        let gpa = row.children[2].innerHTML;
        let majorID =row.children[3].innerHTML;

        if(event.target.innerHTML =='EDIT'){
          row.deleteCell(1);
          let edit_name = row.insertCell(1);
          edit_name.innerHTML = `<input type='text' class='edit_input' value=${name}>`;
          row.deleteCell(2);
          let edit_gpa = row.insertCell(2);
          edit_gpa.innerHTML =`<input type='number' class='edit_input' value=${gpa}>`;
          row.deleteCell(3);
          let major_edit = row.insertCell(3);
          major_edit.innerHTML =`<select class='edit_input'><option>one</option></select>`;
          event.target.innerHTML='DONE'
        }
        else if(event.target.innerHTML =='DONE'){
          let data = {ID:id, name:name_var.value, major:major_var.value, gpa:gpa_var.value}
          console.log('data sent: ', data)
          url = "http://flip2.engr.oregonstate.edu:2300/edit_students";
          req = new XMLHttpRequest();
          req.open('put',url,false);
          req.setRequestHeader('Content-Type', 'application/json');
          req.send(JSON.stringify(data));
          let result = JSON.parse(req.responseText);

          event.target.innerHTML='EDIT'
          name_var.parentNode.innerHTML = result[0].name;
          gpa_var.parentNode.innerHTML = result[0].gpa;
          major_var.parentNode.innerHTML = result[0].majorID;

        }
        else if(event.target.innerHTML == 'DELETE'){
          let data = {ID:id}
          console.log('id deleted', id);
          url = "http://flip2.engr.oregonstate.edu:2300/delete_student";

          let req = new XMLHttpRequest();
          req.open('post', url,false);
          req.setRequestHeader('Content-Type', 'application/json');
          req.send(JSON.stringify(data));
          let result = JSON.parse(req.responseText);
          console.log(result);
          make_students_list(result);
        }
        console.log('event students table: ', id);
      });
    }
    else if(event.target.value =='done'){
      students_table_parent.style.display = 'none';
      students_table.style.display = 'none';
      event.target.value = 'show';
      list_icon.innerHTML="view_list";
    }

  });

}
function make_students_list(result){
  let table= document.getElementById('students_table');
  deleteTable(table,0);
  let name = document.createElement('th');
  let ID = document.createElement('th');
  let gpa = document.createElement('th');
  let major = document.createElement('th');
  let row = table.insertRow(0);
  row.appendChild(ID);
  row.appendChild(name)
  row.appendChild(gpa);
  row.appendChild(major);
  name.innerHTML='Name';
  ID.innerHTML = 'ID';
  major.innerHTML = 'Major';
  gpa.innerHTML = "GPA";
  for(let i =1 ; i <= result.length;i++){
    let row = table.insertRow(i);
    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let gpa = row.insertCell(2);
    let major = row.insertCell(3);
    let edit_button =  row.insertCell(4);
    let delete_button = row.insertCell(5);
    id.innerHTML = result[i-1].ID;
    name.innerHTML = result[i-1].name;
    gpa.innerHTML = result[i-1].gpa;
    major.innerHTML = result[i-1].majorID;
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
  deleteTable(table,1);
  let url = "http://flip2.engr.oregonstate.edu:2300/students";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_students_list(data);
    console.log('result from all data ', data)

  })

}
