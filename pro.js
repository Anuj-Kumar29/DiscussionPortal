let addForm = document.getElementById("add-question-form");
let resForm = document.getElementById("respond-question-form");
let questionContainer = document.getElementById("questions");
let questionIdx = null;
addForm.addEventListener("submit", addQuestion);
resForm.addEventListener("submit",addResponse);


 
function displayQuestions() {
  

    questionContainer.innerHTML = ''; 
    let savedData = JSON.parse(localStorage.getItem("questions")) || [];
    savedData.forEach((question,i) => {
        let questionItem = document.createElement("div");
        questionItem.classList.add("question-item");
        questionItem.innerHTML = `
            <h3>${question.title}</h3>
            <p>${question.question}</p>
        `;
        questionItem.onclick = ()=>{
            showQuestionBody(question);
            questionIdx = i
        }
        questionContainer.appendChild(questionItem);
    });
     
}
displayQuestions();
document.getElementById("search-input").addEventListener("input", displayFilteredQuestions);
document.getElementById("add-question-button").addEventListener("click", () => {
    let questionBody = document.getElementById("question-body");
    questionBody.style.display = "none";
    resForm.style.display = "none";
    addForm.style.display = "block";
});

    function displayFilteredQuestions() {
    let searchInput = document.getElementById("search-input").value.toLowerCase();
    let savedData = JSON.parse(localStorage.getItem("questions")) || [];
    questionContainer.innerHTML = '';
        
    let matcher = false;
    savedData.forEach((question, i) => {
        if (question.title.toLowerCase().includes(searchInput) || question.question.toLowerCase().includes(searchInput)) {
            matcher = true;
            let questionItem = document.createElement("div");
            questionItem.classList.add("question-item");
            questionItem.innerHTML = `
                <h3>${question.title}</h3>
                <p>${question.question}</p>
            `;
            questionItem.onclick = () => {
                showQuestionBody(question);
                questionIdx = i
            }
            questionContainer.appendChild(questionItem);
        }
        
    });
    if(!matcher) {
        questionContainer.innerHTML = "<p>No Match found.</p>";
    }
}

function showQuestionBody(question){
    let questionBody = document.getElementById("question-body");
    questionBody.style.display = "block";
    addForm.style.display = "none";
    resForm.style.display = "block";
    questionBody.innerHTML = '';
    

    let questionDiv = document.createElement("div");
    questionDiv.innerHTML =
    `
        <h3>Question</h3>
        <div class='question'>
            <h4>${question.title}</h4>
            <p>${question.question}</p>
        </div>
        <button onclick="resolveQuestion()">Resolve</button>
    `;
    
    let responseDiv = document.createElement("div");
    responseDiv.className = "responses";
    responseDiv.appendChild(document.createElement("h3")).textContent = "Responses";
   if (question.responses && question.responses.length > 0) {
        question.responses.forEach(r => {
        let div = document.createElement("div");
        let name= document.createElement("h2")
        name.textContent=r.name;
        let comment=document.createElement("p")
        comment.textContent=r.comment;
        comment.className="comment";
        let togglebtn=document.createElement("button")
        togglebtn.textContent="Read More";
        togglebtn.className="toggle-btn";
        togglebtn.onclick = () => {
            comment.classList.toggle("expanded");
            togglebtn.textContent=comment.classList.contains("expanded")
            ? "Read less"
            : "Read More";
        
        };
        div.appendChild(name);
        div.appendChild(comment);
        if (r.comment.length>200) div.appendChild(togglebtn)

        responseDiv.appendChild(div);
    });
}else {
    responseDiv.innerHTML += "<p>No Responses yet.</p>"
}

    questionBody.appendChild(questionDiv);
    questionBody.appendChild(responseDiv);
    
    
}

function resolveQuestion() {
    let savedData = JSON.parse(localStorage.getItem("questions")) || [];

    if (questionIdx !== null && questionIdx < savedData.length) {
        
        savedData.splice(questionIdx, 1);

        
        localStorage.setItem("questions", JSON.stringify(savedData));

        
        document.getElementById("question-body").style.display = "none";
        document.getElementById("respond-question-form").style.display = "none";
        addForm.style.display = "block";

        
        displayQuestions();
    }
}

function showRespondForm() {
    let resForm = document.getElementById("respond-question-form");
    
    document.getElementsByName("name")[0].value = '';
    document.getElementsByName("comment")[0].value = '';
    resForm.style.display = 'block';
}


function addResponse(e){
    e.preventDefault();

    let nameTag = document.getElementsByName("name")[0];
    let commentTag = document.getElementsByName("comment")[0];

    let obj = {
        name:nameTag.value,
        comment: commentTag.value
    }
    let savedData = JSON.parse(localStorage.getItem("questions")) || [];
   if (!savedData[questionIdx].responses) {
        savedData[questionIdx].responses = [];
    }
    savedData[questionIdx].responses.unshift(obj)
    localStorage.setItem("questions",JSON.stringify(savedData));
    nameTag.value = '';
    commentTag.value = '';

    showQuestionBody(savedData[questionIdx]);
    displayQuestions();
}
function addQuestion(e){
            e.preventDefault();
            
            let title = document.getElementsByName("subject")[0].value;
            let question = document.getElementsByName("question")[0].value;
            let savedData = JSON.parse(localStorage.getItem("questions")) || [];
            let obj = {
                title, question, responses:[]
            }
                 savedData.push(obj);
            localStorage.setItem("questions", JSON.stringify(savedData));
            document.getElementsByName("subject")[0].value = "";
            document.getElementsByName("question")[0].value = "";
            displayQuestions();
}