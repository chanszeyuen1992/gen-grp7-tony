function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
const displayArea = document.querySelector('#cardArea');


//GET CARD function
const getCard = async(e) => {
    const data = await fetch('http://localhost:8080/todolist');
    const jsonResponse = await data.json();
    let displayHTML = "";
    for (let i of jsonResponse) {
        displayHTML = displayHTML + `
        
        <div class="col-12">
        <div id="card-section" data-id=${i.id}>
            <div class="card-custom">
                <div class="de-btn">
                    <button id="del-card" class="btn btn-outline-danger" type="button">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    <!-- Button trigger modal -->
                    <button id="edit-card" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#Task1Modal">
                        <i class="far fa-edit"></i>
                    </button>
                </div>
                <div class="left-container">
                    <h1 class="card-name">
                        ${i.name}
                    </h1>
                    <p class="DueDate">Due Date: ${i.duedate}</p>
                    <p class="status">Assigned To: ${i.assignedto}</p>
                </div>

                <div class="card-description">
                    <h2>Description:</h2>
                    <p>${i.description}</p>
                </div>
                

                <div class="center-container">
                    <h3>${i.status}</h3>    
                </div>

                
            </div>
        </div>
    </div>
            
        `
    }
    displayArea.innerHTML = displayHTML
}

getCard()

//Post the card list
const fetchCardData = document.querySelector('#cardSubmit')
fetchCardData.addEventListener('submit', async(e) => {
    e.preventDefault();
    const inputData = e.target;
    const cardOjb = {};
    cardOjb['id'] = Math.floor(Math.random()*1000)
    cardOjb['name'] = inputData.itemName.value;
    cardOjb['description'] = inputData.remarks.value;
    cardOjb['assignedto'] = inputData.assignedto.value;
    cardOjb['duedate'] = inputData.DueDate.value;
    cardOjb['status'] = inputData.inputState.value;

    const response = await fetch('http://localhost:8080/todolist', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardOjb),
    });
    let jsonResponse = await response.json();
    getCard()
})


displayArea.addEventListener('click', async (e) => {
    e.preventDefault();
    let delCardIsPressed = e.target.id == 'del-card'
    let editCardIsPressed = e.target.id == 'edit-card'

    let id = e.target.parentElement.parentElement.parentElement.dataset.id

    //Delete the card
    if(delCardIsPressed) {
        const response = await fetch(`http://localhost:8080/todolist/${id}`, {
        method: 'DELETE',
        // headers: {
        //     "Content-Type": "application/json",
        // },
        // body: JSON.stringify(cardOjb),
    });
    getCard()
    }

    if(editCardIsPressed) {
        
    }
})