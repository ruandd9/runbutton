// Array de perguntas
const questions = [
    "Você me ama?",
    "Tem certeza que não?",
    "Sério mesmo?",
    "Pensa bem...",
    "Última chance!",
    "Não vai se arrepender?",
    "Por favor? 🥺",
    "Reconsidere sua decisão!",
    "Mesmo? 😢",
    "Volta aqui!"
];

let currentQuestionIndex = 0;

// Selecionar elementos
let yesButton = document.querySelector('#yesBtn');
let noButton = document.querySelector('#noBtn');
let questionElement = document.querySelector('#question');

if (!yesButton) {
    console.log('Yes button not found');
} else {
    console.log('Yes button found:', yesButton);

    // Detectar se é mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;

    if (isMobile) {
        // Versão Mobile - botão se move aleatoriamente ao tentar tocar
        let moveCount = 0;
        let currentOffsetX = 0;
        let currentOffsetY = 0;
        
        yesButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            moveCount++;
            
            // Obter dimensões do botão
            const buttonWidth = yesButton.offsetWidth;
            const buttonHeight = yesButton.offsetHeight;
            
            // Definir margens seguras
            const margin = 20;
            const topMargin = 150; // Espaço para o título
            const bottomMargin = 150; // Espaço para não sair da tela
            
            // Calcular área disponível para movimento
            const availableWidth = window.innerWidth - buttonWidth - (margin * 2);
            const availableHeight = window.innerHeight - buttonHeight - topMargin - bottomMargin;
            
            // Gerar deslocamento aleatório dentro dos limites
            // Centralizado em 0, então vai de -metade a +metade da área disponível
            const maxOffsetX = availableWidth / 2;
            const maxOffsetY = availableHeight / 2;
            
            let newOffsetX, newOffsetY;
            do {
                newOffsetX = (Math.random() - 0.5) * availableWidth;
                newOffsetY = (Math.random() - 0.5) * availableHeight;
            } while (
                Math.abs(newOffsetX - currentOffsetX) < 80 && 
                Math.abs(newOffsetY - currentOffsetY) < 80
            ); // Garantir movimento mínimo de 80px
            
            currentOffsetX = newOffsetX;
            currentOffsetY = newOffsetY;
            
            yesButton.style.transition = 'all 0.3s ease';
            yesButton.style.transform = `translate(${newOffsetX}px, ${newOffsetY}px)`;
            
            // Após 5 tentativas, mostrar mensagem
            if (moveCount >= 5) {
                alert('Desiste! Clica no "Não" logo! 😄');
                moveCount = 0;
            }
        });
        
        // Prevenir clique no mobile
        yesButton.addEventListener('click', (e) => {
            e.preventDefault();
        });
        
    } else {
        // Versão Desktop - comportamento original
        function distanceBetween(p1x, p1y, p2x, p2y) {
            let dx = p1x - p2x,
                dy = p1y - p2y;
            return Math.sqrt(dx * dx + dy * dy);
        }

        function updateButtonPosition() {
            let rect = yesButton.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };
        }

        let radius = 200;

        document.addEventListener('mousemove', (e) => {
            let buttonPos = updateButtonPosition();
            let dist = distanceBetween(e.clientX, e.clientY, buttonPos.x, buttonPos.y);
            let angle = Math.atan2(e.clientY - buttonPos.y, e.clientX - buttonPos.x);
            let ox = -1 * Math.cos(angle) * Math.max(radius - dist, 0);
            let oy = -1 * Math.sin(angle) * Math.max(radius - dist, 0);
            let rx = oy / 2;
            let ry = -ox / 2;

            yesButton.style.transition = 'all 0.05s ease-out';
            yesButton.style.transform = `translate(${ox}px, ${oy}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
            yesButton.style.boxShadow = `0px ${Math.abs(oy)}px ${(Math.abs(oy) / radius) * 40}px rgba(0, 0, 0, 0.15)`;
        });
    }
}

// Adicionar evento de clique no botão "Não"
if (noButton && questionElement) {
    noButton.addEventListener('click', () => {
        currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
        questionElement.textContent = questions[currentQuestionIndex];
    });
}