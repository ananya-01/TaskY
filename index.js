const taskContainer = document.querySelector(".task_container");

let globalStore = [];

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4" >
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-info rounded-pill">
          <i class="fas fa-pencil-alt"></i></button>
        <button type="button" class="btn btn-outline-danger rounded-pill" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
          <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
      </div>
      <img src=${taskData.imageurl} 
      class="card-img-top" alt="image">
      <div class="card-body">
        <h5 class="card-title">${taskData.tasktitle} </h5>
        <p class="card-text">${taskData.taskdescription}</p>
        <a href="#" class="btn btn-primary">${taskData.tasktype}</a>
      </div>
      <div class="card-footer">
        <button type="button" class="btn btn-outline-primary float-end rounded-pill">Open Task</button>
      </div>
    </div>
   </div>
</div>
`;

const loadInitialCardData = () =>{
  const getCardData = localStorage.getItem("tasky");
  
  const {cards} = JSON.parse(getCardData);
  cards.map((cardObject) => {
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    globalStore.push(cardObject);

  })
};

const saveChanges = () =>{
    const taskData ={
        id: `${Date.now()}`,//unique number for id
        imageurl: document.getElementById("imageurl").value,
        tasktitle: document.getElementById("tasktitle").value,
        tasktype: document.getElementById("tasktype").value,
        taskdescription: document.getElementById("taskdescription").value,
    };
    

    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); // accepts an object
};

const deleteCard = (event) => {
  event = window.event;

  const targetID = event.target.id;
  const tagname = event.target.tagName;

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID);
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));
   
  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

    
};