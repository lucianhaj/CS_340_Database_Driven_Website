document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  getAllData();
  document.getElementById('add_major').addEventListener('click', function(event){
    let name =document.getElementById('add_major_name').value;
    let creditsRequired = document.getElementById('add_major_required').value;
    let electivesRequired = document.getElementById('add_major_electives').value;
    let data = {name:name, creditsRequired:creditsRequired, electivesRequired:electivesRequired};
    let url = "http://flip2.engr.oregonstate.edu:2300/majors";
    console.log(data);
    let req = new XMLHttpRequest();
    req.open('post', url,false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let result = JSON.parse(req.responseText);
    console.log('data', data, '\nResult: ', result);
    make_majors_list(result);
  });

  //edit and delete buttons
  document.getElementById('show_table_majors').addEventListener('click', function(event){
    let id = (event.target).parentNode.parentNode.children[0].innerHTML;
    if(event.target.innerHTML == 'DELETE'){
      data = {majorID:id};
      let url = "http://flip2.engr.oregonstate.edu:2300/majors";
      let req = new XMLHttpRequest();
      req.open('delete', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_majors_list(result);
    }
    else if(event.target.innerHTML == 'EDIT'){
      event.target.innerHTML = "DONE";
      let row = event.target.parentNode.parentNode;
      let name_value = row.children[1].innerHTML;
      let required_value = row.children[2].innerHTML;
      let electives_value = row.children[3].innerHTML;
      console.log(name_value, required_value, electives_value);
      row.children[1].innerHTML = `<input type='text' class = 'input_major input_major_edit' value='${name_value}''>`
      row.children[2].innerHTML = `<input type='text' class = 'input_major input_major_edit' value='${required_value}''>`
      row.children[3].innerHTML = `<input type='text' class = 'input_major input_major_edit' value='${electives_value}''>`
    }
    else if(event.target.innerHTML =='DONE'){
      event.target.innerHTML = 'EDIT';
      let row = event.target.parentNode.parentNode;
      row.children[1].innerHTML = row.children[1].children[0].value;
      row.children[2].innerHTML = row.children[2].children[0].value;
      row.children[3].innerHTML = row.children[3].children[0].value;
      let data = {majorID:id, name:row.children[1].innerHTML,creditsRequired:row.children[2].innerHTML,
                  electivesRequired:row.children[3].innerHTML}
      console.log(data);
      let url = "http://flip2.engr.oregonstate.edu:2300/majors";
      let req = new XMLHttpRequest();
      req.open('put', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_majors_list(result);
    }

  });

  //searchBox
  document.getElementById('search_input_major').addEventListener('focusin', function(event){
    document.getElementById('search_input_major').addEventListener('keyup', function(event){
      data = {name:event.target.value}
      console.log(data);
      let url = "http://flip2.engr.oregonstate.edu:2300/majors_search";
      let req = new XMLHttpRequest();
      req.open('post', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_majors_list(result);

    });

  });

}

function make_majors_list(result){
  let table= document.getElementById('show_table_table');
  deleteTable(table,0);
  let name = document.createElement('th');
  let id = document.createElement('th');
  let required = document.createElement('th');
  let electives = document.createElement('th');
  let row = table.insertRow(0);
  row.appendChild(id);
  row.appendChild(name)
  row.appendChild(required);
  row.appendChild(electives);
  name.innerHTML='Name';
  id.innerHTML = 'ID';
  required.innerHTML = 'Required Credits';
  electives.innerHTML = "Elective Credits";
  for(let i =1 ; i <= result.length;i++){
    let row = table.insertRow(i);
    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let required = row.insertCell(2);
    let electives = row.insertCell(3);
    let edit_button =  row.insertCell(4);
    let delete_button = row.insertCell(5);
    id.innerHTML = result[i-1].majorID;
    name.innerHTML = result[i-1].name;
    electives.innerHTML = result[i-1].electivesRequired;
    required.innerHTML = result[i-1].creditsRequired;
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
  let url = "http://flip2.engr.oregonstate.edu:2300/majors";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_majors_list(data);
    console.log('result from all data ', data)

  });
}
