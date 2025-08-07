
let addForm = document.getElementById("add-question-form");
let resForm = document.getElementById("respond-question-form");
let questionContainer = document.getElementById("questions");
let questionIdx = null;
const addQuestion= document.getElementById("add-question-form");
const addResponse = document.getElementById("respond-question-form");
    addForm.addEventListener("submit", addQuestion);
    resForm.addEventListener("submit",addResponse);
    function displayQuestions(){
        let savedData = JSON.parse(localStorage.getItem("questions")) || [];
        let questionsDiv = document.getElementById("questions");
        console.log(savedData)
         let questionItem = document.createElement("div");
        savedData.forEach((question)=>{
            let div = document.createElement("div");
            div.classList.a
            div.innerHTML = `
                <h2>${question.title}</h2>
                <p>${question.body}</p>
            `;
               questionItem.onclick = ()=>{
            showQuestionBody(question);
            questionIdx = i
        }

            questionContainer.appendChild(div);
        })
    }
    displayQuestions();
    
function showQuestionBody(question){
    let questionBody = document.getElementById("question-body");
    questionBody.style.display = "block";
    addForm.style.display = "none";
    questionBody.innerHTML = ''
    

    let questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.innerHTML =
    `
        <h3>Question</h3>
        <div class='question'>
            <h4>${question.title}</h4>
            <p>${question.question}</p>
        </div>
        <button onclick="showRespondForm()">Resolve</button>
    `;
    
    let responseDiv = document.createElement("div");
    responseDiv.className = "responses";
    responseDiv.innerHTMl = `
    <h3>Responses</h3>
    `;
    question.responses.map(r=>{
        let div = document.createElement("div");
        div.innerHTML = `
        <h2>${r.name}</h2>
        <p>${r.comment}</p>
        `;
        responseDiv.appendChild(div);
    })

    questionBody.appendChild(questionDiv);
    questionBody.appendChild(responseDiv);
    
  function showRespondForm(){
    let resForm = document.getElementById("respond-question-form");
    resForm.style.display='block';
}

function addResponse(e){
    e.preventDefault();

    let nameTag = document.getElementsByName("name")[0];
    let commentTag = document.getElementsByName("comment")[0];

    let obj = {
        name:nameTag.value,
        comment:commentTag.value
    }
    let savedData = JSON.parse(localStorage.getItem("questions")) || [];
    console.log(savedData)
    savedData[questionIdx].responses.push(obj)
    localStorage.setItem("questions",JSON.stringify(savedData));
    displayQuestions();
}

    function addQuestion(e) {
        e.preventDefault();
        let title = document.getElementsByName('title')[0].value;
        let body = document.getElementsByName('body')[0].value;
        
        let obj = {
            title,body, responses: []
        }
        //let savedData = JSON.parse(localStorage.getItem("questions")) || [];

        savedData.push(obj);
        localStorage.setItem("questions",JSON.stringify(savedData));
            document.getElementsByName("subject")[0].value = "";
    document.getElementsByName("question")[0].value = "";

        displayQuestions();
    }

    

  
}


