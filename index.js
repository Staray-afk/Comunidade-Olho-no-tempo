document.getElementById('chat-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const inputMensagem = document.getElementById('mensagem-input');
    const inputFoto = document.getElementById('upload-foto');
    const chatBox = document.getElementById('chat-box');

    let temConteudo = false;
    
    let novaMensagem = document.createElement('div');
    novaMensagem.className = 'd-flex justify-content-end mb-3';
    let conteudoMensagem = '<div class="p-2 bg-primary rounded text-light" style="max-width: 75%;">';

    // Texto
    if (inputMensagem.value.trim() !== '') {
        conteudoMensagem += `<p class="mb-1">${inputMensagem.value}</p>`;
        temConteudo = true;
    }

    // Imagem
    if (inputFoto.files && inputFoto.files[0]) {
        const leitor = new FileReader(); 
        
        leitor.onload = function(evento) {
            const img = document.createElement('img');
            img.src = evento.target.result;
            img.className = 'img-fluid rounded mt-2';
            img.style.maxHeight = '200px';

            conteudoMensagem += img.outerHTML + '</div>';
            novaMensagem.innerHTML = conteudoMensagem;
            
            chatBox.appendChild(novaMensagem);
            chatBox.scrollTop = chatBox.scrollHeight; 
        };
        leitor.readAsDataURL(inputFoto.files[0]);
        temConteudo = true;
        
    } else if (temConteudo) {
        conteudoMensagem += '</div>';
        novaMensagem.innerHTML = conteudoMensagem;
        chatBox.appendChild(novaMensagem);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    inputMensagem.value = '';
    inputFoto.value = '';
});