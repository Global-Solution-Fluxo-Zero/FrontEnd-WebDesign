const API_KEY = 'AIzaSyCYiNKF-OQO_R_Ic7_c8Y2XHLNYShATSRI'; 
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;

const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
// CORREÇÃO: O ID no seu HTML é 'chatbot-message', não 'chat-box'.
const messagesContainer = document.getElementById('chatbot-message'); 

// Função para adicionar mensagem na tela
function addMessage(text, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', `${sender}-message`);
    
    // Usar textContent diretamente é mais seguro e eficiente para texto puro.
    messageElement.textContent = text;
    
    messagesContainer.appendChild(messageElement);
    // Rola para a última mensagem
    messagesContainer.scrollTop = messagesContainer.scrollHeight; 
}

// Função para enviar a pergunta para a API do Gemini
async function getGeminiResponse() {
    const prompt = userInput.value.trim();
    if (prompt === '') return;

    addMessage(prompt, 'user');
    userInput.value = ''; // Limpa o input

    // Opcional: Adicionar um indicador de "digitando..." para melhor experiência do usuário
    addMessage('Digitando...', 'bot-typing');

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            }),
        });

        if (!response.ok) {
            throw new Error(`Erro na API: ${response.statusText}`);
        }

        const data = await response.json();
        
        // MELHORIA: Acessa a resposta de forma mais segura para evitar erros.
        const botResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        // Remove o indicador de "digitando..."
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
        // Remove o indicador de "digitando..." também em caso de erro
        const typingIndicator = document.querySelector('.bot-typing-message');
        if (typingIndicator) {
            typingIndicator.remove();
        }
        console.error('Erro ao buscar resposta do Gemini:', error);
        addMessage('Desculpe, não consegui processar sua pergunta. Tente novamente.', 'bot');
    }
}

// Event Listeners
sendBtn.addEventListener('click', getGeminiResponse);
userInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        getGeminiResponse();
    }
});