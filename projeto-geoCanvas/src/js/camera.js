/**
 * Módulo para a API de Câmera (1.5.2)
 * Permite acessar e capturar imagens da câmera do dispositivo
 */

document.addEventListener('DOMContentLoaded', () => {
    const cameraPreview = document.getElementById('camera-preview');
    const cameraCanvas = document.getElementById('camera-canvas');
    const startCameraButton = document.getElementById('start-camera');
    const capturePhotoButton = document.getElementById('capture-photo');
    const switchCameraButton = document.getElementById('switch-camera');
    const capturedPhotos = document.getElementById('captured-photos');
    
    if (!cameraPreview || !cameraCanvas || !startCameraButton || 
        !capturePhotoButton || !switchCameraButton || !capturedPhotos) return;
    
    let stream = null; // Armazena o stream de vídeo atual
    let facingMode = 'user'; // Inicializa com a câmera frontal
    const ctx = cameraCanvas.getContext('2d');
    
    // Verifica se as APIs necessárias estão disponíveis
    const isSupported = () => {
        return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    };
    
    // Inicializa a câmera com as configurações desejadas
    const startCamera = async () => {
        try {
            // Desativa qualquer stream anterior
            if (stream) {
                stopCamera();
            }
            
            // Configura as restrições para a câmera
            const constraints = {
                video: {
                    facingMode: facingMode,
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            };
            
            // Solicita acesso à câmera
            stream = await navigator.mediaDevices.getUserMedia(constraints);
            
            // Conecta o stream ao elemento de vídeo
            cameraPreview.srcObject = stream;
            
            // Ajusta o tamanho do canvas para corresponder ao vídeo
            cameraPreview.onloadedmetadata = () => {
                cameraCanvas.width = cameraPreview.videoWidth;
                cameraCanvas.height = cameraPreview.videoHeight;
            };
            
            // Ativa os botões relevantes quando a câmera está ativa
            capturePhotoButton.disabled = false;
            switchCameraButton.disabled = false;
            startCameraButton.textContent = 'Parar Câmera';
            
            // Adiciona classe para indicar que a câmera está ativa
            cameraPreview.classList.add('active');
            
            return true;
        } catch (error) {
            console.error('Erro ao acessar a câmera:', error);
            showError(`Não foi possível acessar a câmera: ${error.message}`);
            return false;
        }
    };
    
    // Para o stream da câmera
    const stopCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            stream = null;
            cameraPreview.srcObject = null;
            
            // Desativa os botões relevantes
            capturePhotoButton.disabled = true;
            switchCameraButton.disabled = true;
            startCameraButton.textContent = 'Iniciar Câmera';
            
            // Remove classe de câmera ativa
            cameraPreview.classList.remove('active');
        }
    };
    
    // Captura uma foto do stream de vídeo
    const capturePhoto = () => {
        if (!stream) return null;
        
        // Desenha o frame atual do vídeo no canvas
        ctx.drawImage(cameraPreview, 0, 0, cameraCanvas.width, cameraCanvas.height);
        
        // Converte o canvas para uma URL de dados (formato base64)
        const photoDataUrl = cameraCanvas.toDataURL('image/jpeg');
        
        // Cria um elemento de imagem com a captura
        const photoElement = document.createElement('img');
        photoElement.src = photoDataUrl;
        photoElement.alt = 'Foto capturada';
        photoElement.className = 'captured-photo';
        
        // Adiciona metadados (opcional)
        const timestamp = new Date().toISOString();
        photoElement.setAttribute('data-timestamp', timestamp);
        
        // Adiciona a imagem ao container de fotos capturadas
        capturedPhotos.prepend(photoElement);
        
        // Mostra uma mensagem de sucesso
        showMessage('Foto capturada com sucesso!');
        
        // Adiciona funcionalidade de clique para ampliar a imagem
        photoElement.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'photo-modal';
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <img src="${photoDataUrl}">
                    <div class="photo-details">
                        <p>Capturada em: ${new Date(timestamp).toLocaleString()}</p>
                        <button class="download-photo">Download</button>
                        <button class="delete-photo">Excluir</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Fecha o modal ao clicar no X
            modal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modal);
            });
            
            // Fecha o modal ao clicar fora da imagem
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                }
            });
            
            // Botão de download
            modal.querySelector('.download-photo').addEventListener('click', () => {
                const link = document.createElement('a');
                link.href = photoDataUrl;
                link.download = `photo_${new Date().getTime()}.jpg`;
                link.click();
            });
            
            // Botão de exclusão
            modal.querySelector('.delete-photo').addEventListener('click', () => {
                capturedPhotos.removeChild(photoElement);
                document.body.removeChild(modal);
                showMessage('Foto removida!');
            });
        });
        
        return photoDataUrl;
    };
    
    // Alterna entre câmera frontal e traseira
    const switchCamera = () => {
        facingMode = facingMode === 'user' ? 'environment' : 'user';
        startCamera(); // Reinicia a câmera com a nova configuração
    };
    
    // Exibe uma mensagem para o usuário
    const showMessage = (message) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'camera-message';
        messageElement.textContent = message;
        messageElement.style.position = 'fixed';
        messageElement.style.bottom = '20px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.backgroundColor = 'rgba(46, 204, 113, 0.8)';
        messageElement.style.color = 'white';
        messageElement.style.padding = '10px 20px';
        messageElement.style.borderRadius = '4px';
        messageElement.style.zIndex = '1000';
        
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.style.opacity = '0';
            messageElement.style.transition = 'opacity 0.5s';
            
            setTimeout(() => {
                document.body.removeChild(messageElement);
            }, 500);
        }, 3000);
    };
    
    // Exibe uma mensagem de erro
    const showError = (error) => {
        const errorElement = document.createElement('div');
        errorElement.className = 'camera-error';
        errorElement.textContent = error;
        errorElement.style.position = 'fixed';
        errorElement.style.bottom = '20px';
        errorElement.style.left = '50%';
        errorElement.style.transform = 'translateX(-50%)';
        errorElement.style.backgroundColor = 'rgba(231, 76, 60, 0.8)';
        errorElement.style.color = 'white';
        errorElement.style.padding = '10px 20px';
        errorElement.style.borderRadius = '4px';
        errorElement.style.zIndex = '1000';
        
        document.body.appendChild(errorElement);
        
        setTimeout(() => {
            errorElement.style.opacity = '0';
            errorElement.style.transition = 'opacity 0.5s';
            
            setTimeout(() => {
                document.body.removeChild(errorElement);
            }, 500);
        }, 5000);
    };
    
    // Event Listeners
    startCameraButton.addEventListener('click', () => {
        if (stream) {
            stopCamera();
        } else {
            if (!isSupported()) {
                showError('Seu navegador não suporta a API de câmera.');
                return;
            }
            startCamera();
        }
    });
    
    capturePhotoButton.addEventListener('click', capturePhoto);
    switchCameraButton.addEventListener('click', switchCamera);
    
    // Desativa os botões inicialmente
    capturePhotoButton.disabled = true;
    switchCameraButton.disabled = true;
    
    // Exporta funções para uso em outras partes do aplicativo
    window.cameraUtils = {
        startCamera,
        stopCamera,
        capturePhoto,
        switchCamera,
        isSupported
    };
});
