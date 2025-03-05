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
