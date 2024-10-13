let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mode = 'create'
let tmp;
// getTotla()

function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor="#040";
        taxes.removeAttribute('disabled');
        ads.removeAttribute('disabled');
        discount.removeAttribute('disabled');
}
    else{
        total.innerHTML=''
        total.style.backgroundColor=" rgb(179, 41, 41)"
        taxes.setAttribute('disabled', '');
        ads.setAttribute('disabled', '');
        discount.setAttribute('disabled', '');
        
    }
}

// create Prodcut 

let dataPro;
if(localStorage.Product != null) {
     dataPro =JSON.parse(localStorage.Product)
}else
{ dataPro = []}

submit.onclick = function(){
    let newPro  = {
        title : title.value.toLowerCase(),
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase()
    }
    //count
    if(title.value != '' && price.value != '' && taxes.value != '' &&  taxes.value != '' && category.value != '' && count.value <= 100) {
    if (mode == 'create')
    {if(newPro.count > 1){
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro)
            }
        }else{
                dataPro.push(newPro)
    }}else{
            dataPro[tmp] = newPro
            mode = 'create'
            submit.innerHTML = 'Create'
            count.style.display = 'block'
    }clearData()
    }
    
    // Local Storage Save
    localStorage.setItem('Product'   , JSON.stringify(dataPro) )

    
    showData()
}
 
// reset Data

function clearData(){
    title.value = ''
    price.value = ''
    taxes.value = ''
    ads.value = ''
    discount.value = ''
    total.innerHTML = ''
    count.value = ''
    category.value = ''
}

//read
function showData(){
    getTotal()
    let table = ''
    for (let i = 0; i <dataPro.length; i++) {
        table += 
       `<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button id="delete" onClick="updateData(${i})">Update</button></td>
        <td><button id="update" onClick="deleteData(${i})">Delete</button></td>
        </tr>`
    }
     document.getElementById('tbody').innerHTML =table
     let deleteBtn = document.getElementById('deleteAll');
     if (dataPro.length > 0) {
        deleteBtn.innerHTML = `
        <button onClick="deleteAll()">delete All (${dataPro.length})</button>
        `
     }else{
        deleteBtn.innerHTML =''
     }
}   
 showData()


 // delete
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.Product = JSON.stringify(dataPro)
    showData()
}
// clean data

function  deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}

// update

function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    category.value = dataPro[i].category;
    submit.innerText = "Update"
    mode = 'update';
    tmp = i;
    scroll ({
        top: 0, 
        behavior : 'smooth'
    })
}




// search

let searchMode = 'title';

function getSearchMode(id){
    let search = document.getElementById('search')
    if(id == 'searchTitle'){
        searchMode = 'title';
        search.placeholder='Search By Title'
    }else{
        searchMode = 'category';
        search.placeholder='Search By Category'
    }
    search.focus();
    search.value = ''
    showData()
}

function searchDate(value){
    let table = ''
    if(searchMode == 'title'){
        for(let i = 0; i < dataPro.length; i++){
            if(dataPro[i].title.includes(value.toLowerCase())){
                table += 
            `<tr>
                <td>${i}</td>
                <td>${dataPro[i].title}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="delete" onClick="updateData(${i})">Update</button></td>
                <td><button id="update" onClick="deleteData(${i})">Delete</button></td>
                </tr>`
        }
}
}else{
    for(let i = 0; i < dataPro.length; i++){
        if(dataPro[i].category.includes(value.toLowerCase())){
            table += 
        `<tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="delete" onClick="updateData(${i})">Update</button></td>
            <td><button id="update" onClick="deleteData(${i})">Delete</button></td>
            </tr>`
    }
}
        }
        document.getElementById('tbody').innerHTML =table
}