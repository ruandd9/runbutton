// Array de perguntas
const questions = [
    "A Karina e uma pessoa humilde?",
    "Ela e uma Pessoa legal?",
    "Sou egocentrico?",
    "Vai aplicar um armlock em mim? 😰",
    "Vai passar minha guarda hj? 🥋",
    "Admite que muay thai! > jiujitsu  🤼",
    "Última chance antes do mata leão! 😵"
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
            
            // Obter dimensões do botão e da tela
            const buttonWidth = yesButton.offsetWidth;
            const buttonHeight = yesButton.offsetHeight;
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            
            // Margens seguras mais conservadoras
            const sideMargin = 30; // Margem lateral
            const topMargin = 120; // Espaço para o título
            const bottomMargin = 120; // Espaço inferior
            
            // Calcular limites seguros (área onde o botão pode estar)
            const minX = sideMargin;
            const maxX = screenWidth - buttonWidth - sideMargin;
            const minY = topMargin;
            const maxY = screenHeight - buttonHeight - bottomMargin;
            
            // Obter posição central do container (posição inicial do botão)
            const container = yesButton.parentElement.getBoundingClientRect();
            const containerCenterX = container.left + container.width / 2;
            const containerCenterY = container.top + container.height / 2;
            
            // Calcular posição atual do botão na tela
            const currentX = containerCenterX + currentOffsetX;
            const currentY = containerCenterY + currentOffsetY;
            
            // Gerar nova posição aleatória dentro dos limites seguros
            let newX, newY, newOffsetX, newOffsetY;
            let attempts = 0;
            
            do {
                // Gerar posição aleatória dentro da área segura
                newX = minX + Math.random() * (maxX - minX);
                newY = minY + Math.random() * (maxY - minY);
                
                // Calcular offset necessário para chegar nessa posição
                newOffsetX = newX - containerCenterX + (buttonWidth / 2);
                newOffsetY = newY - containerCenterY + (buttonHeight / 2);
                
                attempts++;
                
                // Garantir movimento mínimo de 100px ou após 10 tentativas aceitar qualquer posição
            } while (
                attempts < 10 &&
                Math.abs(newX - currentX) < 100 && 
                Math.abs(newY - currentY) < 100
            );
            
            // Atualizar posição atual
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