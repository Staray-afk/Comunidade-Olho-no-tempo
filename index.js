let fotoBase64 = '';

const uploadInput = document.getElementById('upload-foto');
const previewContainer = document.getElementById('preview-container');
const previewImg = document.getElementById('preview-img');
const btnRemoverFoto = document.getElementById('btn-remover-foto');
const ocorrenciaForm = document.getElementById('ocorrencia-form');
const feedContainer = document.getElementById('feed-container');

feedContainer.addEventListener('click', function(event) {
    const btnCurtir = event.target.closest('.btn-curtir');
    if (btnCurtir) {
        const curtiu = btnCurtir.getAttribute('aria-pressed') === 'true';
        btnCurtir.setAttribute('aria-pressed', String(!curtiu));
        btnCurtir.classList.toggle('text-danger', !curtiu);
        btnCurtir.classList.toggle('text-secondary', curtiu);
        btnCurtir.innerHTML = curtiu
            ? '<i class="bi bi-heart me-1"></i> Curtir'
            : '<i class="bi bi-heart-fill me-1"></i> Curtido';
        return;
    }

    const btnComentar = event.target.closest('.btn-comentar');
    if (btnComentar) {
        const comentarios = btnComentar.closest('.card').querySelector('.comentarios');
        comentarios.classList.toggle('d-none');
        if (!comentarios.classList.contains('d-none')) {
            comentarios.querySelector('input').focus();
        }
    }
});

feedContainer.addEventListener('submit', function(event) {
    if (!event.target.matches('.form-comentario')) return;
    event.preventDefault();

    const input = event.target.querySelector('input');
    const textoComentario = input.value.trim();
    if (!textoComentario) return;

    const comentario = document.createElement('p');
    comentario.className = 'mb-1 text-light';
    comentario.textContent = textoComentario;
    event.target.closest('.comentarios').querySelector('.lista-comentarios').append(comentario);
    input.value = '';
});

uploadInput.addEventListener('change', function() {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        fotoBase64 = event.target.result;
        previewImg.src = fotoBase64;
        previewContainer.classList.remove('d-none');
    };
    reader.readAsDataURL(file);
});

btnRemoverFoto.addEventListener('click', function() {
    fotoBase64 = '';
    uploadInput.value = '';
    previewImg.removeAttribute('src');
    previewContainer.classList.add('d-none');
});

ocorrenciaForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const textoInput = document.getElementById('texto-input');
    const tipoAlerta = document.getElementById('tipo-alerta').value;
    const texto = textoInput.value.trim();

    if (!texto && !fotoBase64) {
        alert('Digite uma mensagem ou selecione uma foto!');
        return;
    }

    const coresAlerta = {
        'Alagamento': 'bg-danger',
        'Árvore Caída': 'bg-success',
        'Acidente': 'bg-warning text-dark',
        'Alerta': 'bg-info'
    };
    const novoPost = document.createElement('div');
    novoPost.className = 'card card-custom p-3 mb-3';
    novoPost.innerHTML = `
        <div class="d-flex align-items-center mb-2">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px; font-weight: bold;">VC</div>
            <div>
                <h6 class="mb-0 fw-bold text-light">Você</h6>
                <small class="text-secondary">Sua localização • Agora mesmo</small>
            </div>
        </div>
        <div><span class="badge ${coresAlerta[tipoAlerta] || 'bg-info'} mb-2"></span></div>
        ${texto ? '<p class="card-text text-light mb-2"></p>' : ''}
        ${fotoBase64 ? '<img class="img-fluid rounded mb-2 w-100" style="max-height: 250px; object-fit: cover;">' : ''}
        <div class="d-flex justify-content-around border-top border-secondary pt-2 mt-2 text-secondary">
            <button type="button" class="btn btn-sm text-secondary text-decoration-none btn-curtir" aria-pressed="false"><i class="bi bi-heart me-1"></i> Curtir</button>
            <button type="button" class="btn btn-sm text-secondary text-decoration-none btn-comentar"><i class="bi bi-chat me-1"></i> Comentar</button>
            <button type="button" class="btn btn-sm text-secondary text-decoration-none"><i class="bi bi-share me-1"></i> Compartilhar</button>
        </div>
        <div class="comentarios d-none mt-2">
            <div class="lista-comentarios small mb-2"></div>
            <form class="form-comentario d-flex gap-2">
                <input type="text" class="form-control form-control-sm bg-transparent text-light border-secondary" placeholder="Escreva um comentário..." aria-label="Escreva um comentário">
                <button type="submit" class="btn btn-primary btn-sm">Enviar</button>
            </form>
        </div>
    `;

    novoPost.querySelector('.badge').textContent = tipoAlerta;
    const textoPost = novoPost.querySelector('.card-text');
    if (textoPost) textoPost.textContent = texto;
    const imagemPost = novoPost.querySelector('img');
    if (imagemPost) imagemPost.src = fotoBase64;
    feedContainer.prepend(novoPost);

    textoInput.value = '';
    uploadInput.value = '';
    fotoBase64 = '';
    previewImg.removeAttribute('src');
    previewContainer.classList.add('d-none');
});