const API_KEY = 'AIzaSyCYiNKF-OQO_R_Ic7_c8Y2XHLNYShATSRI'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const chatBox = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('send-btn');

// Função para adicionar mensagem ao chat
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);

    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    bubble.textContent = text;

    messageElement.appendChild(bubble);
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Função para enviar pergunta para API do Gemini
async function getGeminiResponse(prompt) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Desculpe, não consegui entender a resposta.';
        addMessage(botResponse, 'bot');
    } catch (error) {
        console.error('Erro ao buscar resposta do Gemini:', error);
        addMessage('Desculpe, não consegui processar sua pergunta. Tente novamente.', 'bot');
    }
}

// Função para processar envio de mensagem
function processUserMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, 'user');
    userInput.value = '';
    getGeminiResponse(text);
}

// Event listeners
chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    processUserMessage();
});

sendBtn.addEventListener('click', processUserMessage);

userInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        processUserMessage();
    }
});
