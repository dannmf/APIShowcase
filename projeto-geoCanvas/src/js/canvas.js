/**
 * Módulo para a API Canvas (1.6)
 * Permite desenhar e manipular gráficos diretamente no navegador
 */

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('drawing-canvas');
    const brushColorInput = document.getElementById('brush-color');
    const brushSizeInput = document.getElementById('brush-size');
    const clearCanvasButton = document.getElementById('clear-canvas');
    const saveCanvasButton = document.getElementById('save-canvas');
    const savedDrawings = document.getElementById('saved-drawings');
    
    if (!canvas || !brushColorInput || !brushSizeInput || 
        !clearCanvasButton || !saveCanvasButton || !savedDrawings) return;
    
    // Obtém o contexto de renderização 2D
    const ctx = canvas.getContext('2d');
    
    // Variáveis para controlar o desenho
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    
    // Define os valores iniciais
    ctx.strokeStyle = brushColorInput.value;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = brushSizeInput.value;
    
    // Função para iniciar o desenho
    const startDrawing = (e) => {
        isDrawing = true;
        // Atualiza as coordenadas iniciais
        [lastX, lastY] = getCoordinates(e);
    };
    
    // Função para desenhar
    const draw = (e) => {
        // Se não estiver desenhando, não faz nada
        if (!isDrawing) return;
        
        // Previne o scroll em dispositivos móveis
        e.preventDefault();
        
        // Obtém as coordenadas atuais
        const [x, y] = getCoordinates(e);
        
        // Desenha a linha
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        
        // Atualiza as últimas coordenadas
        [lastX, lastY] = [x, y];
    };
    
    // Função para parar de desenhar
    const stopDrawing = () => {
        isDrawing = false;
    };
    
    // Função para obter as coordenadas do mouse ou toque
    const getCoordinates = (e) => {
        const rect = canvas.getBoundingClientRect();
        
        // Verifica se é um evento de mouse ou toque
        if (e.touches) {
            return [
                e.touches[0].clientX - rect.left,
                e.touches[0].clientY - rect.top
            ];
        } else {
            return [
                e.clientX - rect.left,
                e.clientY - rect.top
            ];
        }
    };
    
    // Função para limpar o canvas
    const clearCanvas = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
    
    // Função para salvar o desenho
    const saveDrawing = () => {
        // Converte o canvas para uma URL de dados (formato base64)
        const drawingDataUrl = canvas.toDataURL('image/png');
        
        // Cria um elemento de imagem com o desenho
        const drawingElement = document.createElement('img');
        drawingElement.src = drawingDataUrl;
        drawingElement.alt = 'Desenho salvo';
        drawingElement.className = 'saved-drawing';
        
        // Adiciona metadados (opcional)
        const timestamp = new Date().toISOString();
        drawingElement.setAttribute('data-timestamp', timestamp);
        
        // Adiciona a imagem ao container de desenhos salvos
        savedDrawings.prepend(drawingElement);
        
        // Adiciona funcionalidade de clique para ampliar a imagem
        drawingElement.addEventListener('click', () => {
            showDrawingModal(drawingDataUrl, timestamp);
        });
        
        // Salva o desenho no localStorage
        saveDrawingToStorage(drawingDataUrl, timestamp);
        
        // Mostra uma mensagem de sucesso
        showMessage('Desenho salvo com sucesso!');
        
        return drawingDataUrl;
    };
    
    // Função para mostrar um modal com o desenho ampliado
    const showDrawingModal = (dataUrl, timestamp) => {
        const modal = document.createElement('div');
        modal.className = 'drawing-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${dataUrl}">
                <div class="drawing-details">
                    <p>Salvo em: ${new Date(timestamp).toLocaleString()}</p>
                    <button class="download-drawing">Download</button>
                    <button class="delete-drawing">Excluir</button>
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
        modal.querySelector('.download-drawing').addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `drawing_${new Date().getTime()}.png`;
            link.click();
        });
        
        // Botão de exclusão
        modal.querySelector('.delete-drawing').addEventListener('click', () => {
            // Remove a imagem do DOM
            const drawings = Array.from(savedDrawings.children);
            const drawingToRemove = drawings.find(img => 
                img.getAttribute('data-timestamp') === timestamp
            );
            
            if (drawingToRemove) {
                savedDrawings.removeChild(drawingToRemove);
            }
            
            // Remove o desenho do localStorage
            removeDrawingFromStorage(timestamp);
            
            // Fecha o modal
            document.body.removeChild(modal);
            
            // Mostra uma mensagem
            showMessage('Desenho removido!');
        });
    };
    
    // Função para salvar o desenho no localStorage
    const saveDrawingToStorage = (dataUrl, timestamp) => {
        // Obtém os desenhos existentes ou cria um novo array
        let drawings = JSON.parse(localStorage.getItem('canvasDrawings') || '[]');
        
        // Adiciona o novo desenho
        drawings.push({
            dataUrl,
            timestamp,
            savedAt: new Date().toISOString()
        });
        
        // Limita o número de desenhos salvos (para evitar exceder o limite de armazenamento)
        if (drawings.length > 10) {
            drawings = drawings.slice(-10);
        }
        
        // Salva no localStorage
        localStorage.setItem('canvasDrawings', JSON.stringify(drawings));
    };
    
    // Função para remover um desenho do localStorage
    const removeDrawingFromStorage = (timestamp) => {
        // Obtém os desenhos existentes
        let drawings = JSON.parse(localStorage.getItem('canvasDrawings') || '[]');
        
        // Remove o desenho específico
        drawings = drawings.filter(drawing => drawing.timestamp !== timestamp);
        
        // Salva a lista atualizada
        localStorage.setItem('canvasDrawings', JSON.stringify(drawings));
    };
    
    // Função para carregar desenhos salvos do localStorage
    const loadDrawingsFromStorage = () => {
        // Obtém os desenhos existentes
        const drawings = JSON.parse(localStorage.getItem('canvasDrawings') || '[]');
        
        // Limpa o container de desenhos
        savedDrawings.innerHTML = '';
        
        // Adiciona cada desenho ao container
        drawings.forEach(drawing => {
            const drawingElement = document.createElement('img');
            drawingElement.src = drawing.dataUrl;
            drawingElement.alt = 'Desenho salvo';
            drawingElement.className = 'saved-drawing';
            drawingElement.setAttribute('data-timestamp', drawing.timestamp);
            
            // Adiciona funcionalidade de clique para ampliar a imagem
            drawingElement.addEventListener('click', () => {
                showDrawingModal(drawing.dataUrl, drawing.timestamp);
            });
            
            // Adiciona ao container
            savedDrawings.appendChild(drawingElement);
        });
    };
    
    // Exibe uma mensagem para o usuário
    const showMessage = (message) => {
        const messageElement = document.createElement('div');
        messageElement.className = 'canvas-message';
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
    
    // Exemplos de formas básicas que podem ser desenhadas no canvas
    const drawExamples = {
        // Desenha um retângulo
        rectangle: (x, y, width, height, color = 'black', fill = false) => {
            ctx.save();
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            
            if (fill) {
                ctx.fillRect(x, y, width, height);
            } else {
                ctx.strokeRect(x, y, width, height);
            }
            
            ctx.restore();
        },
        
        // Desenha um círculo
        circle: (x, y, radius, color = 'black', fill = false) => {
            ctx.save();
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.strokeStyle = color;
            ctx.fillStyle = color;
            
            if (fill) {
                ctx.fill();
            } else {
                ctx.stroke();
            }
            
            ctx.restore();
        },
        
        // Desenha uma linha
        line: (x1, y1, x2, y2, color = 'black', lineWidth = 1) => {
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = color;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            ctx.restore();
        },
        
        // Desenha um texto
        text: (text, x, y, font = '16px Arial', color = 'black') => {
            ctx.save();
            ctx.font = font;
            ctx.fillStyle = color;
            ctx.fillText(text, x, y);
            ctx.restore();
        }
    };
    
    // Event Listeners para o canvas
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Suporte para dispositivos móveis (touch)
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);
    
    // Event Listeners para os controles
    brushColorInput.addEventListener('change', () => {
        ctx.strokeStyle = brushColorInput.value;
    });
    
    brushSizeInput.addEventListener('input', () => {
        ctx.lineWidth = brushSizeInput.value;
    });
    
    clearCanvasButton.addEventListener('click', clearCanvas);
    saveCanvasButton.addEventListener('click', saveDrawing);
    
    // Carrega os desenhos salvos ao iniciar
    loadDrawingsFromStorage();
    
    // Exporta funções para uso em outras partes do aplicativo
    window.canvasUtils = {
        clearCanvas,
        saveDrawing,
        drawExamples
    };
});
