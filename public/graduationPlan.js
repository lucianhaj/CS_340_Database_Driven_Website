document.addEventListener('DOMContentLoaded', bindFuntion());
function bindFuntion(){
  getAllData();
  //add to graudation table
  document.getElementById('add_plan').addEventListener('click', function(event){
    let name = document.getElementById('add_plan_name').value
    let graduationDate= document.getElementById('add_plan_date').value;
    let totalCredits = document.getElementById('add_plan_credits').value;
    let data = {name:name, graduationDate:graduationDate, totalCredits:totalCredits};
    let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan";
    console.log('data is', data)
    let req = new XMLHttpRequest();
    req.open('post',url, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let result = JSON.parse(req.responseText);
    console.log(result);
    make_plan_list(result);

  });

  //delete
  document.getElementById('show_table_table').addEventListener('click', function(event){
    if(event.target.value =='DELETE'){
      let row = event.target.parentNode.parentNode.children[0].children[0].value;
      console.log(row);
      data = {name:row}
      let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan";
      console.log('data is', data)
      let req = new XMLHttpRequest();
      req.open('delete',url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      console.log(result);
      make_plan_list(result);
    }
    else if(event.target.value=='EDIT'){
      let row = event.target.parentNode.parentNode;
      //let name = row.children[0].children[0]
      let totalCredits =row.children[1].children[0];
      let graduationDate = row.children[2].children[0];
      //name.disabled = false;
      totalCredits.disabled =false;
      graduationDate.disabled =false;
      //name.classList.add('input_plan_edit');
      totalCredits.classList.add('input_plan_edit');
      graduationDate.classList.add('input_plan_edit');
      event.target.classList.add('button_plan_edit');
      event.target.value = "DONE"
      event.target.innerHTML = "DONE"
      console.log(event.target.value)
    }
    else if (event.target.value =='DONE'){
      let row = event.target.parentNode.parentNode;
      let name= row.children[0].children[0];
      let totalCredits =row.children[1].children[0];
      let graduationDate = row.children[2].children[0];
      //name.disabled = true;
      totalCredits.disabled =true;
      graduationDate.disabled =true;
      //name.classList.remove('input_plan_edit');
      totalCredits.classList.remove('input_plan_edit');
      graduationDate.classList.remove('input_plan_edit');
      event.target.classList.remove('button_plan_edit');
      event.target.value='EDIT';
      event.target.classList.remove('button_plan_edit');
      data = {name:name.value, graduationDate:graduationDate.value, totalCredits:totalCredits.value}
      let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan";
      console.log('data is', data)
      let req = new XMLHttpRequest();
      req.open('put',url, false);
      req.setRequestHeader('Content-Type', 'application/json');
      req.send(JSON.stringify(data));
      let result = JSON.parse(req.responseText);
      console.log('result from search:',result);
      make_plan_list(result);
    }
  });

  document.getElementById('search_input').addEventListener('keyup', function(event){
    let data = {}
    data = {name:event.target.value}
    let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan_search";
    console.log('data is', data)
    let req = new XMLHttpRequest();
    req.open('post',url, false);
    req.setRequestHeader('Content-Type', 'application/json');
    req.send(JSON.stringify(data));
    let result = JSON.parse(req.responseText);
    console.log(result);
    make_plan_list(result);
  });

}
function getAllData(){
  document.getElementById('show_table_table');
  let result = {}
  let url = "http://flip2.engr.oregonstate.edu:2300/graduation_plan";
  fetch(url).then(function(response){
    return response.json();
  }).then(function(data){
    make_plan_list(data);
  });

}

function make_plan_list(result){
  let table= document.getElementById('show_table_table');
  deleteTable(table,0);
  let row = table.insertRow(0);
  let name = document.createElement('th')
  let credits =document.createElement('th');
  let date = document.createElement('th')
  name.innerHTML="Name";
  credits.innerHTML ="Total Credits";
  date.innerHTML = "Graduation Date"
  row.appendChild(name);
  row.appendChild(credits);
  row.appendChild(date);

  //row.appendChild(totalCredits);
  for(let i =1 ; i <= result.length;i++){
    let row = table.insertRow(i);
    let name = row.insertCell(0);
    let totalCredits = row.insertCell(1);
    let graduationDate = row.insertCell(2);
    let edit_button =  row.insertCell(3);
    let delete_button = row.insertCell(4);
    let input_name = document.createElement('INPUT');
    input_name.setAttribute('type', "text");
    input_name.setAttribute('value', result[i-1].name);
    input_name.setAttribute('disabled', true);
    input_name.setAttribute('class','input_plan');

    let input_totalCredits = document.createElement('INPUT')
    let input_graduationDate =  document.createElement('INPUT');
    input_totalCredits.setAttribute('type', "number");
    input_graduationDate.setAttribute('type', "date");
    input_totalCredits.setAttribute('value', result[i-1].totalCredits);
    input_graduationDate.setAttribute('value', result[i-1].graduationDate);
    input_graduationDate.setAttribute('class', 'input_plan');
    input_totalCredits.setAttribute('class', 'input_plan');

    name.appendChild(input_name);
    graduationDate.appendChild(input_graduationDate);
    totalCredits.appendChild(input_totalCredits);
    edit_button.innerHTML = "<button class='edit_button' value='EDIT'>EDIT</button>";
    delete_button.innerHTML = "<button class='delete_button' value='DELETE'>DELETE</button>";
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
