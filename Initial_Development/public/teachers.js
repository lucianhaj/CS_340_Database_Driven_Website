
document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  getAllData();

  //search for a teacher
  document.getElementById('search_input').addEventListener('focus', function(event){
    input = event.target;
    document.getElementById('search_result').setAttribute('class', "search_result");
    document.getElementById('search_result').style.display = 'block';
    list = document.getElementById('list');
    deleteList(list);
    input.addEventListener('keyup', function(){
      console.log('Now searching for: ',input.value);
      let url = 'http://flip2.engr.oregonstate.edu:2300/find_teacher';
      data = {name:input.value};
      let req = new XMLHttpRequest();
      req.open('post', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data))
      var response = JSON.parse(req.responseText);
      var result = JSON.parse(response.result);
      console.log(result);
      deleteList(list);
      makeList(list,result);
    });
  });
  document.getElementById('search_input').addEventListener('focusout', function(){
    document.getElementById('search_result').style.display = 'none';

  })

  document.getElementById('add_teacher').addEventListener('click', function(event){
    let add_teacherBox = document.getElementById('add_teacherBox');
    if(event.target.value == 'add'){
      add_teacherBox.style.display = 'block';
      event.target.innerHTML ='Done';
      event.target.value = 'done';

      //get options from the database - from departments(id-name)
      department_options = document.getElementById('teacher_departmentOptions');
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


      //add teachers
      document.getElementById('add_teacher_button').addEventListener('click', function(event){
        let name = document.getElementById('teacher_name').value;
        let subject =document.getElementById('teacher_subject').value;
        let department = document.getElementById('teacher_departmentOptions').value;
        let data = {name:name, subject:subject, departID:department};

        let url_add = "http://flip2.engr.oregonstate.edu:2300/teachers";
        let req = new XMLHttpRequest();
        req.open('post', url_add, false);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));
        let response =JSON.parse(req.responseText);
        var result = JSON.parse(response.result);
        console.log('result from adding' + result);
        deleteTable(table);
        getAllData();

        event.preventDefault();

      })

    }
    else if(event.target.value =='done'){
      add_teacherBox.style.display = 'none';
      event.target.innerHTML ='Add Teachers';
      event.target.value = 'add'
    }
  });

}

function getAllData(){
  let url = "http://flip2.engr.oregonstate.edu:2300/teachers";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    var result  = JSON.parse(data.result);
    console.log(result);

    //build table
    let rows_num = result.length;
    let table = document.getElementById('teachers_table');
    for(i = 0; i < rows_num; i++){
      let row = table.insertRow(i+1);
      let cell_id = row.insertCell(0);
      let cell_name = row.insertCell(1);
      let cell_subject = row.insertCell(2);
      let cell_department = row.insertCell(3)
      let cell_edit = row.insertCell(4);
      let cell_remove = row.insertCell(5);
      cell_id.innerHTML = result[i].teacherID;
      cell_name.innerHTML = result[i].name;
      cell_subject.innerHTML = result[i].subject;
      cell_department.innerHTML = result[i].department;
      cell_edit.innerHTML = "<button class='form_buttons'>EDIT</button>";
      cell_remove.innerHTML = "<button  class='delete_button'>DELETE</button>";
    }
});
}
function deleteList(list){
  var items = list.getElementsByTagName("li");
  while(items.length > 0){
    items[0].parentNode.removeChild(items[0]);
  }
}

function makeList(list, result){
  var size = result.length;
  //list = list.getElementById('li');
  for(let i =0; i < size; i++){
    console.log('name ', result[i].name );
    let item = document.createElement("li");
    let item_value = document.createTextNode(result[i].name);
    item.append(item_value);
    list.append(item);
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
