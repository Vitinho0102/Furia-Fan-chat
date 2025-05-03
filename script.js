// FURIA Fan Chat - Script.js
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const chatMessages = document.getElementById('chatMessages');
    const messageInput = document.getElementById('messageInput');
    const sendBtn = document.getElementById('sendBtn');
    const notificationPanel = document.getElementById('notificationPanel');
    const closeNotification = document.getElementById('closeNotification');
    const twitchBtn = document.getElementById('twitchBtn');

    // Sample user data
    const currentUser = {
        username: 'FuriaFan123',
        avatar: 'imagens/profile.jpeg'
    };

    // Match state data (simulated live data)
    let matchData = {
        team1Score: 12,
        team2Score: 9,
        currentMap: 'Inferno',
        round: 21,
        timeRemaining: 35,
        isLive: true
    };

    // Chat messages array (for demo purposes)
    const predefinedMessages = [
        {
            username: 'CSMaster99',
            message: 'Vamos FURIA! Hoje é dia de vitória!',
            time: '14:15',
            avatar: 'imagens/profile.jpeg'
        },
        {
            username: 'BRazilPower',
            message: 'KSCERATO está com 25 frags já, absurdo!',
            time: '14:17',
            avatar: 'imagens/profile.jpeg'
        },
        {
            username: 'FuriaLover',
            message: 'Quem vai assistir ao próximo jogo contra a Liquid?',
            time: '14:20',
            avatar: 'imagens/profile.jpeg'
        },
        {
            username: 'CSGOLover',
            message: 'VAMOS FURIA! Precisa fechar esse primeiro half com vantagem!',
            time: '14:22',
            avatar: 'imagens/profile.jpeg'
        },
        {
            type: 'system',
            message: 'FURIA acaba de ganhar mais um round! 13-9',
            highlight: true,
            time: '14:24'
        }
    ];

    // Event Listeners
    sendBtn.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    closeNotification.addEventListener('click', function() {
        notificationPanel.style.display = 'none';
    });

    if (twitchBtn) {
        twitchBtn.addEventListener('click', function () {
            window.open('https://www.twitch.tv/furiatv', '_blank');
        });
    }

    // Initialize
    initialize();

    // Functions
    function initialize() {
        setTimeout(function() {
            showNotification();
        }, 5000);

        setInterval(updateMatchData, 15000);
        setTimeout(simulateIncomingMessages, 8000);
        setInterval(updateTimeRemaining, 1000);
    }

    function sendMessage() {
        const message = messageInput.value.trim();
        if (message === '') return;

        addMessageToChat({
            username: currentUser.username,
            avatar: currentUser.avatar,
            message: message,
            isCurrentUser: true,
            time: getCurrentTime()
        });

        messageInput.value = '';
        scrollToBottom();

        setTimeout(function() {
            const responses = [
                'Concordo totalmente!',
                'Ótimo ponto!',
                'Vamos torcer juntos!',
                'FURIA é o melhor time!',
                'Que round incrível!',
                'Será que conseguimos a vitória?'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            addMessageToChat({
                username: 'FuriaSupporter22',
                avatar: 'imagens/profile.jpeg',
                message: randomResponse,
                time: getCurrentTime()
            });

            scrollToBottom();
        }, 1500);
    }

    function addMessageToChat(messageData) {
        const messageElement = document.createElement('div');

        if (messageData.type === 'system') {
            messageElement.className = messageData.highlight ? 'message system highlight' : 'message system';
            messageElement.innerHTML = `<p>${messageData.message}</p>`;
        } else {
            messageElement.className = messageData.isCurrentUser ? 'message user' : 'message';
            messageElement.innerHTML = `
                <div class="message-avatar">
                    <img src="${messageData.avatar || 'imagens/profile.jpeg'}" alt="User">
                </div>
                <div class="message-content">
                    <div class="message-header">
                        <span class="message-username">${messageData.username}</span>
                        <span class="message-time">${messageData.time}</span>
                    </div>
                    <p>${messageData.message}</p>
                </div>
            `;
        }

        chatMessages.appendChild(messageElement);
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function updateMatchData() {
        if (matchData.isLive) {
            const scoreUpdate = Math.random() > 0.6;

            if (scoreUpdate) {
                if (Math.random() < 0.7) {
                    matchData.team1Score++;

                    addMessageToChat({
                        type: 'system',
                        message: `FURIA vence o round! Placar atual: ${matchData.team1Score}-${matchData.team2Score}`,
                        highlight: true,
                        time: getCurrentTime()
                    });

                    document.querySelector('.team1-score').textContent = matchData.team1Score;

                    if (matchData.team1Score === 15) {
                        showNotification('Match Point para FURIA!', 'Um round para a vitória!');
                    } else if (matchData.team1Score === 16) {
                        showNotification('FURIA VENCEU!', 'GG! FURIA 16 x ' + matchData.team2Score + ' NAVI');
                        matchData.isLive = false;
                    }
                } else {
                    matchData.team2Score++;

                    addMessageToChat({
                        type: 'system',
                        message: `NAVI vence o round. Placar atual: ${matchData.team1Score}-${matchData.team2Score}`,
                        time: getCurrentTime()
                    });

                    document.querySelector('.team2-score').textContent = matchData.team2Score;
                }

                matchData.round++;
                matchData.timeRemaining = 115;

                scrollToBottom();
            }
        }
    }

    function updateTimeRemaining() {
        if (matchData.isLive && matchData.timeRemaining > 0) {
            matchData.timeRemaining--;
        }
    }

    function showNotification(title = 'Round Decisivo!', message = 'FURIA vs NAVI - Match Point para FURIA!') {
        const notificationTitle = notificationPanel.querySelector('h3');
        const notificationMessage = notificationPanel.querySelector('p');

        if (notificationTitle) notificationTitle.textContent = title;
        if (notificationMessage) notificationMessage.textContent = message;

        notificationPanel.style.display = 'block';

        setTimeout(function() {
            notificationPanel.style.display = 'none';
        }, 8000);
    }

    function simulateIncomingMessages() {
        let messageIndex = 0;

        const interval = setInterval(function() {
            if (messageIndex < predefinedMessages.length) {
                const message = predefinedMessages[messageIndex];

                if (message.type === 'system') {
                    addMessageToChat({
                        type: 'system',
                        message: message.message,
                        highlight: message.highlight,
                        time: message.time
                    });
                } else {
                    addMessageToChat({
                        username: message.username,
                        avatar: message.avatar || 'imagens/profile.jpeg',
                        message: message.message,
                        time: message.time
                    });
                }

                scrollToBottom();
                messageIndex++;
            } else {
                clearInterval(interval);
            }
        }, 5000);
    }
    
    // Easter Egg: Secret commands in chat
    messageInput.addEventListener('input', function() {
        const text = messageInput.value.trim().toLowerCase();

        if (text === '/stats') {
            addMessageToChat({
                type: 'system',
                message: 'Comando especial: Estatísticas dos jogadores da FURIA:<br>KSCERATO: Rating 1.15, K/D 1.2<br>Fallen: Rating 1.08, K/D 0.95<br>VINI: Rating 1.11, K/D 1.1<br>drop: Rating 1.07, K/D 1.0<br>saffee: Rating 1.20, K/D 1.3',
                time: getCurrentTime()
            });
            messageInput.value = '';
            scrollToBottom();
        } else if (text === '/próximos') {
            addMessageToChat({
                type: 'system',
                message: 'Próximos jogos da FURIA:<br>FURIA vs Liquid - Amanhã, 16:00<br>FURIA vs NAVI - Sexta-feira, 14:30<br>FURIA vs Astralis - Domingo, 11:00',
                time: getCurrentTime()
            });
            messageInput.value = '';
            scrollToBottom();
        }
    });

    scrollToBottom();
});
