const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } else {
            //entry.target.classList.remove('show')

        }
    });
});


window.onload = function () {
    if (window.location.hash) {
        window.location.href = window.location.origin + window.location.pathname;
    }
};

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll(".question");

    questions.forEach((question) => {
        question.addEventListener("click", function () {
            const answer = this.nextElementSibling;
            const icon = this.querySelector(".iconQuestion");

            // Alterna a visibilidade da resposta
            answer.classList.toggle("show");
            icon.classList.toggle("show")

        });
    });
});

// === ChatBot Rasa Integration ===

// Quando o botão de envio for clicado
document.getElementById("buttonSend").addEventListener("click", handleUserMessage);

// Também permitir envio com Enter
document.getElementById("inputMessage").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        handleUserMessage();
    }
});

async function handleUserMessage() {
    const input = document.getElementById("inputMessage");
    const message = input.value.trim();

    if (!message) return;

    appendUserMessage(message);
    input.value = "";

    try {
        const response = await fetch("http://localhost:5005/webhooks/rest/webhook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                sender: "user_" + Math.floor(Math.random() * 10000),
                message: message
            })
        });

        const data = await response.json();
        if (data.length === 0) {
            appendBotMessage("Desculpe, não entendi. Pode repetir?");
        } else {
            data.forEach((msg) => {
                if (msg.text) {
                    appendBotMessage(msg.text);
                }
            });
        }
    } catch (error) {
        console.error("Erro ao se comunicar com o chatbot:", error);
        appendBotMessage("Ops! Ocorreu um erro ao conectar com o chatbot.");
    }
}

function appendUserMessage(message) {
    const chat = document.getElementById("chatbotTextArea");
    const div = document.createElement("div");
    div.className = "userMessage";
    div.innerHTML = `<p>${message}</p>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function appendBotMessage(message) {
    const chat = document.getElementById("chatbotTextArea");
    const div = document.createElement("div");
    div.className = "botMessage";
    div.innerHTML = `<p>${message}</p>`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

