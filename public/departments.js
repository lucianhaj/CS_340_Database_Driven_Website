document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  getAllData();

  //add a department
  document.getElementById('add_depart').addEventListener('click', function(event){
    let name = document.getElementById('add_depart_name').value;
    let funding = document.getElementById('add_depart_funding').value;
    let data = {name:name, funding:funding};
    let add_url = "http://flip2.engr.oregonstate.edu:2300/departments";
    let req = new XMLHttpRequest();
    req.open('post', add_url, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let result = JSON.parse(req.responseText);
    event.preventDefault();
    make_departments_list(JSON.parse(result.result));
  });

  //edit and delete
  document.getElementById('show_table_departments').addEventListener('click', function(event){
    let id = event.target.parentNode.parentNode.children[0].innerHTML;
    let row = event.target.parentNode.parentNode;
    if(event.target.innerHTML == 'DELETE'){
      let data = {departID:id}
      let add_url = "http://flip2.engr.oregonstate.edu:2300/departments";
      let req = new XMLHttpRequest();
      req.open('delete', add_url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      event.preventDefault();
      make_departments_list(JSON.parse(result.result));
    }
    else if (event.target.innerHTML =='EDIT'){
      event.target.innerHTML = "DONE";
      let name =row.children[1].innerHTML;
      let funding  = row.children[2].innerHTML;
      row.children[1].innerHTML = `<input type='text' class='input_departments' value='${name}'>`;
      row.children[2].innerHTML = `<input type='number' class='input_departments' value='${funding}'>`;
    }
    else if (event.target.innerHTML == 'DONE'){
      let data = {departID:id, name:row.children[1].children[0].value, funding:row.children[2].children[0].value};
      let url = "http://flip2.engr.oregonstate.edu:2300/departments";
      let req = new XMLHttpRequest();
      req.open('put', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      event.preventDefault();
      make_departments_list(JSON.parse(result.result));
    }
  });

  //search
  document.getElementById('search_input_departments').addEventListener('focusin', function(event){
    document.getElementById('search_input_departments').addEventListener('keyup', function(event){
      data = {name:event.target.value}
      console.log(data);
      let url = "http://flip2.engr.oregonstate.edu:2300/departments_search";
      let req = new XMLHttpRequest();
      req.open('post', url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      make_departments_list(JSON.parse(result.result));
      console.log('my search result ', result);

    });

  });
}



function make_departments_list(result){

  console.log(result);
  let table= document.getElementById('show_table_table');
  deleteTable(table,0);
  let id = document.createElement('th');
  let name = document.createElement('th');
  let funding = document.createElement('th');
  let row = table.insertRow(0);
  row.appendChild(id);
  row.appendChild(name)
  row.appendChild(funding);
  name.innerHTML='Name';
  id.innerHTML = 'DepartID';
  funding.innerHTML = 'Funding';
  for(let i =1 ; i <= result.length;i++){
    let row = table.insertRow(i);
    let id = row.insertCell(0);
    let name = row.insertCell(1);
    let funding = row.insertCell(2);
    let edit_button =  row.insertCell(3);
    let delete_button = row.insertCell(4);
    id.innerHTML = result[i-1].departID;
    name.innerHTML = result[i-1].name;
    funding.innerHTML = result[i-1].funding;
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
  let url = "http://flip2.engr.oregonstate.edu:2300/departments";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_departments_list(JSON.parse(data.result));

  });
}
