
let id=0;

let myLibrary=[];

let library = document.querySelector("#library");

function Book(){
  this.title;
  this.author;
  this.pages=0;
  this.read=false;
  this.color;
  this.id=id++;
  this.info=function(){
    return this.title+" by "+this.author+", "+this.pages+" pages"+", "+this.read;
  }
}

function randColor(){
  let colors=["#FCDE9C","#C4D6B0","#D36582","#FFEECF","#C9A690", "#FCBA04",
              "#F3f3f3", "#EEE82C", "#91CB3E", "#AEA4BF", "#E3E4DB"];
  return colors[Math.floor(Math.random()*colors.length)];
}

function addBookToLibrary(title=document.querySelector("#inputTitle").value,
                    author=document.querySelector("#inputAuthor").value,
                    pages=document.querySelector("#inputPages").value,
                    read=document.querySelector("#inputRead").checked,
                    color=randColor()
                    ){
  
  if(title=="" || author=="" || pages==0){
    return;
  }
  
  
  let book=new Book();
  book.title= title
  book.author=author;
  book.pages=pages;
  book.read=read;
  book.color=color;
  myLibrary.push(book);
  setTimeout(render,1);
  
  hideForm();
  
  updateData();
}

function render(){
  document.querySelector("#library").innerHTML="";
  for(let i=0;i<myLibrary.length;i++){
    let book=myLibrary[i];
    
    let card=document.createElement("div");
    card.classList.add("book");
    let html=`<span class='title'>${book.title}</span><br>
      <span class='author'>By: ${book.author}</span><br>
      <span class='pages'>${book.pages}</span><br>`;
    if(!book.read){
      html+=`<button id='id${book.id}' class='read readBtn' onclick='toggleRead(${book.id})'>Read</button>`;
    }else{
      html+=`<button id='id${book.id}' class='notRead readBtn' onclick='toggleRead(${book.id})'>Not Read</button>`;
    }
    html+=`<button class="rmBtn" onclick="remove(${book.id})">Remove</button>`;
    card.innerHTML=html;
    
    card.style.backgroundColor=book.color;
    document.querySelector("#library").appendChild(card);
  }
}

function toggleRead(id){
  for(var i=0;i<myLibrary.length;i++){
    let book=myLibrary[i];
    if(book.id==id){
      book.read = !book.read;
      let btn=document.querySelector(`#id${book.id}`);
      if(!book.read){
        btn.classList.add("read");
        btn.classList.remove("notRead");
        btn.innerHTML="Read";
      }else{
        btn.classList.add("notRead");
        btn.classList.remove("read");
        btn.innerHTML="Not Read";
      }
      break;
    }
  }
  
  updateData();
}


function remove(id){
  let index;
  for(let i=0;i<myLibrary.length;i++){
    if(myLibrary[i].id==id){
      index=i;
      break;
    }
  }
  myLibrary.splice(index,1);
  render();
  
  updateData();
}


function showForm(){
   document.querySelector("#newBookForm").style.display="block";
   document.querySelector("#inputTitle").value="";
   document.querySelector("#inputAuthor").value="";
   document.querySelector("#inputPages").value="";
   document.querySelector("#inputRead").checked=false;
}


function hideForm(){
  if(document.querySelector('#newBookForm').style.display=='block')
  document.querySelector('#newBookForm').style.display='none';
}

function updateData(){
  localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
}


window.onload=function(){
  
  if(localStorage.getItem("myLibrary")==null){

    addBookToLibrary("RICH DAD, POOR DAD","Robert",600,false);
    addBookToLibrary("SAMPLE BOOK", "Me", 1, true);
    
    
    localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
  }else{
    let data=JSON.parse(localStorage.getItem("myLibrary"));
    console.log(data);
    for(let i=0;i<data.length;i++){
      let obj=data[i];
      addBookToLibrary(obj.title,obj.author,obj.pages,obj.read,obj.color);
    }
  }
}