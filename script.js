const socket = io();

// Mengambil elemen DOM
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');
const messagesContainer = document.getElementById('messages');

// Mengirim pesan saat tombol diklik
sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('message', message); // Mengirim pesan ke server
        messageInput.value = ''; // Mengosongkan input
    }
});

// Mengirim pesan saat Enter ditekan
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click(); // Memanggil klik tombol
    }
});

// Menerima pesan dari server
socket.on('message', (msg) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = msg; // Menampilkan pesan
    messagesContainer.appendChild(messageElement); // Menambahkan ke kontainer pesan
});
