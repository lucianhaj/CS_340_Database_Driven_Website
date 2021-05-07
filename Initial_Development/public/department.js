console.log("hello world")
/*
document.querySelector("input").focus();
  console.log(document.activeElement.tagName);
*/
const url = "http://flip2.engr.oregonstate.edu:2300";

document.addEventListener('DOMContentLoaded', bindFuntion);
function bindFuntion(){
  getAllData();
  document.getElementById('add_new_department').addEventListener('click',function(event){
    console.log(event.target.value);

    if(event.target.value == 'add'){
      document.getElementById('add_department').style.display=
      'block';
      event.target.innerHTML = "Done";
      event.target.value = 'done'
      let table = document.getElementById('department_table');

      document.getElementById('submit').addEventListener('click', function(event){
        /*
        let myForm = new FormData(document.forms.add_department);
        myForm.append('name', 'azzam');
        for (var value of myForm.values()) {
          console.log(value);
        }
        */
        let name = document.getElementById('department_name').value;
        let funding = document.getElementById('department_funding').value;

      //  reqBody = `\?name=${name}&funding=${funding}`;

        let data = {name:name, funding:funding};
        let add_url = url + '/departments';
        let req = new XMLHttpRequest();
        req.open('post', add_url, false);
        req.setRequestHeader('Content-Type', 'application/json');
        req.send(JSON.stringify(data));
        var response =JSON.parse(req.responseText);
        console.log(response);
        event.preventDefault();
        //delete table and recreate the table
        deleteTable(table);
        getAllData();

      });   //end of event listner for submit

    }

    else if(event.target.value == 'done'){
      document.getElementById('add_department').style.display= 'none';
      event.target.innerHTML = "Add";
      event.target.value = 'add';
    }
  });

  //event lister for search
  document.getElementById('search_button').addEventListener('click', function(event){
    let table = document.getElementById('search_table');
    let search_box = document.getElementById('search_box');
    search_box.style.display = 'block' ;

    url_search = 'http://flip2.engr.oregonstate.edu:2300/search';
    let search_value = document.getElementById('search_value').value;
    console.log('now searching for'+ search_value);
    let data = {name: search_value, funding:10};
    let req = new XMLHttpRequest();
    req.open('post', url_search, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let response =JSON.parse(req.responseText);
    var result = JSON.parse(response.result);
    console.log('result from search box' + response);
    rows_num = result.length;
    //make table
    for(i = 0; i < rows_num; i++){
      let row = table.insertRow(i);
      let cell_id = row.insertCell(0);
      let cell_name = row.insertCell(1);
      let cell_funding = row.insertCell(2);
      let cell_edit = row.insertCell(3);
      let cell_remove = row.insertCell(4);
      cell_id.innerHTML = result[i].departID;
      cell_name.innerHTML = result[i].name;
      cell_funding.innerHTML = result[i].funding;
      cell_edit.innerHTML = "<button class='form_buttons'>EDIT</button>";
      cell_remove.innerHTML = "<button  class='delete_button'>DELETE</button>";
    }

    //clear search search_box
    document.getElementById('close_search').addEventListener('click', function(){
    //  deleteTable(table,0);
      search_box.style.display = 'none';
      deleteTable(table,0);
    })
  });


  //get all departments from the database

}
function getAllData(){
  let url_add = url+ '/departments';
  fetch(url_add).then(function(response){
    return response.json();
  }).then(function(data){
    var result  = JSON.parse(data.result);
    console.log(result);

    //build table
    rows_num = result.length;
    let table = document.getElementById('department_table');
    for(i = 0; i < rows_num; i++){
      let row = table.insertRow(i+1);
      let cell_id = row.insertCell(0);
      let cell_name = row.insertCell(1);
      let cell_funding = row.insertCell(2);
      let cell_edit = row.insertCell(3);
      let cell_remove = row.insertCell(4);
      cell_id.innerHTML = result[i].departID;
      cell_name.innerHTML = result[i].name;
      cell_funding.innerHTML = result[i].funding;
      cell_edit.innerHTML = "<button class='form_buttons'>EDIT</button>";
      cell_remove.innerHTML = "<button  class='delete_button'>DELETE</button>";
    }
});
}

function search(){
  //search function
  search_value = {};
  reqBody = `\?name=${search_value.name}&funding=${search_value.funding}`;
  fetch(url+reqBody).then(function(response){
    return response.JSON();
  }).then(function(data){
    let result = JSON.parse(data.result);
    console.log(result);
  });
}


function deleteTable(table,row_zero = 1){
  //get number of rows
  rows_num = table.rows.length
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
