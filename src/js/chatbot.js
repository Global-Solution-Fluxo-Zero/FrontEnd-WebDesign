const API_KEY = 'AIzaSyCYiNKF-OQO_R_Ic7_c8Y2XHLNYShATSRI'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messagesContainer = document.getElementById('chatbot-message'); 

// Função para adicionar mensagem na tela
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    // Rola para a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
}

// Função para enviar a pergunta para a API do Gemini
async function getGeminiResponse() {
    const userQuestion = userInput.value.trim(); 
    if (userQuestion === '') return;

    addMessage(userQuestion, 'user');
    userInput.value = '';
    addMessage('Analisando os céus...', 'bot-typing'); 


    //    Este texto instrui a IA sobre como ela deve se comportar
    const specialistPrompt = `
        Aja como um meteorologista especialista e amigável.
        Sua missão é fornecer previsões do tempo precisas e fáceis de entender.
        - Sempre que possível, inclua temperatura em Celsius (°C), sensação térmica, umidade e velocidade do vento.
        - Se o usuário não especificar uma cidade, pergunte qual a localização desejada.
        - Responda APENAS a perguntas relacionadas ao tempo e clima. Se a pergunta for sobre outro assunto, diga educadamente que você é um bot especialista em meteorologia e não pode responder.
        - Você entende de alagamento, e responde se a região pedida alaga ou não 

        Pergunta do usuário: "${userQuestion}"
    `;


    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: specialistPrompt
                    }]
                }],               
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        const typingIndicator = document.querySelector('.bot-typing-message');
        if (typingIndicator) {
            typingIndicator.remove();
        }

        if (botResponse) {
            addMessage(botResponse, 'bot');
        } else {
            addMessage('Não recebi uma resposta válida. Tente outra pergunta.', 'bot');
        }

    } catch (error) {
        const typingIndicator = document.querySelector('.bot-typing-message');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        console.error('Erro ao buscar resposta do Gemini:', error);
        addMessage('Desculpe, uma tempestade interferiu nos meus sistemas. Tente novamente.', 'bot');
    }
}

sendBtn.addEventListener('click', getGeminiResponse);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getGeminiResponse();
    }
});