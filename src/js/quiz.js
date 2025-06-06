let currentQuestion = 0;
let questionsQuiz = [
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "General Knowledge",
        "question": "Qual destas ações ajuda diretamente a evitar alagamentos urbanos?",
        "correct_answer": "Não jogar lixo nas ruas",
        "incorrect_answers": [
            "Lavar calçadas com mangueira",
            "Construir muros altos",
            "Usar sacolas plásticas"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Environment",
        "question": "O que é uma ‘área de permeabilidade do solo’?",
        "correct_answer": "Área onde a água da chuva pode infiltrar no solo",
        "incorrect_answers": [
            "Área usada para estacionamento",
            "Região sem cobertura vegetal",
            "Local onde ocorrem alagamentos frequentes"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Environment",
        "question": "Qual medida urbana contribui para evitar enchentes?",
        "correct_answer": "Instalação de jardins de chuva",
        "incorrect_answers": [
            "Aumento de calçamento impermeável",
            "Cobertura de rios com concreto",
            "Retirada de áreas verdes"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Environment",
        "question": "Qual é a função principal dos bueiros nas cidades?",
        "correct_answer": "Coletar e escoar a água da chuva",
        "incorrect_answers": [
            "Servir como canal para esgoto doméstico",
            "Armazenar água potável",
            "Reduzir a poluição do ar"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "General Knowledge",
        "question": "Por que não se deve jogar lixo em rios e córregos?",
        "correct_answer": "Porque contribui para o entupimento e alagamentos",
        "incorrect_answers": [
            "Porque deixa a água mais salgada",
            "Porque pode causar secas",
            "Porque atrai mosquitos"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Environment",
        "question": "Como as árvores ajudam a reduzir enchentes?",
        "correct_answer": "Facilitam a infiltração da água no solo",
        "incorrect_answers": [
            "Criam sombras que secam a água",
            "Retêm o lixo nas calçadas",
            "Diminuem a velocidade da chuva"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Environment",
        "question": "Qual dessas soluções é baseada na infraestrutura verde?",
        "correct_answer": "Construção de telhados verdes",
        "incorrect_answers": [
            "Ampliação de ruas asfaltadas",
            "Instalação de cercas de concreto",
            "Uso de sistemas de ar condicionado"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "medium",
        "category": "Environment",
        "question": "O que significa dizer que um solo está impermeabilizado?",
        "correct_answer": "A água da chuva não consegue infiltrar nele",
        "incorrect_answers": [
            "Ele está protegido contra erosão",
            "É mais fértil que o normal",
            "Absorve mais água que o natural"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "hard",
        "category": "Environment",
        "question": "Qual é a principal causa dos alagamentos em centros urbanos?",
        "correct_answer": "Impermeabilização excessiva do solo",
        "incorrect_answers": [
            "Quantidade de chuva constante",
            "Pouca arborização em áreas rurais",
            "Ausência de bueiros com tampa"
        ]
    },
    {
        "type": "multiple",
        "difficulty": "easy",
        "category": "General Knowledge",
        "question": "Uma atitude cidadã para ajudar a prevenir enchentes é:",
        "correct_answer": "Separar e descartar corretamente o lixo",
        "incorrect_answers": [
            "Acumular entulho no quintal",
            "Queimar folhas secas na rua",
            "Usar mais plásticos no dia a dia"
        ]
    }
]
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

function loadQuestion() {
    if (currentQuestion < questionsQuiz.length) {
        const currentQuiz = questionsQuiz[currentQuestion];
        questionElement.textContent = currentQuiz.question;
        optionsElement.innerHTML = "";

        const allOptions = [...currentQuiz.incorrect_answers, currentQuiz.correct_answer];
        shuffleArray(allOptions);

        allOptions.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => selectAnswer(option, currentQuiz.correct_answer));
            optionsElement.appendChild(button);
        });

        nextButton.classList.add("hidden");
    } else {
        mensagem = ""
        if (score > 7){
            mensagem = "\nParabéns, você está devidamente conscientizado."
        } else if (score > 5) {
            mensagem = "\nParabéns, você sabe os conceitos fundamentais da conscientização."
        } else {
            mensagem = "\nQue pena... É necessário rever os seus conceitos."
        }
        
        questionElement.textContent = `Quiz Completo! 🎉 O seu Score é: ${score} de ${questionsQuiz.length}. ${mensagem}`;
        optionsElement.innerHTML = "";
        nextButton.classList.add("hidden");
        restartButton.classList.remove("hidden");
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function selectAnswer(selectedOption, correctOption) {
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach((button) => {
        button.disabled = true;
        if (button.textContent === correctOption) {
            button.classList.add("correct");
        } else if (button.textContent === selectedOption) {
            button.classList.add("wrong");
        }
    });

    if (selectedOption === correctOption) {
        score++;
    }

    nextButton.classList.remove("hidden");
}

nextButton.addEventListener("click", () => {
    currentQuestion++;
    loadQuestion();
});

restartButton.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0; 
    loadQuestion();
    restartButton.classList.add("hidden");
    nextButton.classList.add("hidden");
});

loadQuestion();
