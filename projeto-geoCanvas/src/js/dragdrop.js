/**
 * Módulo para a API de Drag and Drop (1.5.1)
 * Permite arrastar e soltar elementos HTML em áreas específicas
 */

document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const droppableArea = document.getElementById('droppable-area');
    const resetButton = document.getElementById('reset-drag-drop');
    
    if (!draggables.length || !droppableArea || !resetButton) return;
    
    // Função para registrar estado inicial para reset
    const initialState = {
        container: document.getElementById('draggable-container'),
        items: Array.from(draggables).map(item => ({ id: item.id, element: item.cloneNode(true) }))
    };
    
    // Adiciona event listeners para eventos de drag para cada elemento arrastável
    draggables.forEach(draggable => {
        // Evento disparado quando o usuário começa a arrastar um elemento
        draggable.addEventListener('dragstart', (e) => {
            // Define o efeito de arrastar (move, copy, link)
            e.dataTransfer.effectAllowed = 'move';
            
            // Adiciona dados ao dataTransfer para identificar o elemento
            e.dataTransfer.setData('text/plain', draggable.id);
            
            // Adiciona uma classe para estilização visual durante o arrasto
            draggable.classList.add('dragging');
            
            // Define uma imagem de arrasto personalizada (opcional)
            // Poderia ser usado: e.dataTransfer.setDragImage(img, xOffset, yOffset);
        });
        
        // Evento disparado quando o arrasto termina (independente de drop ou não)
        draggable.addEventListener('dragend', () => {
            // Remove a classe de estilização
            draggable.classList.remove('dragging');
        });
    });
    
    // Evento disparado quando um elemento arrastável entra na área de soltura
    droppableArea.addEventListener('dragenter', (e) => {
        // Previne o comportamento padrão que poderia impedir o drop
        e.preventDefault();
        // Adiciona estilo visual para indicar que a área aceita o drop
        droppableArea.classList.add('drag-over');
    });
    
    // Evento disparado continuamente enquanto um elemento arrastável está sobre a área
    droppableArea.addEventListener('dragover', (e) => {
        // IMPORTANTE: Precisa prevenir o comportamento padrão para permitir o drop
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    });
    
    // Evento disparado quando um elemento arrastável sai da área de soltura
    droppableArea.addEventListener('dragleave', () => {
        // Remove o estilo visual
        droppableArea.classList.remove('drag-over');
    });
    
    // Evento disparado quando um elemento é solto na área de drop
    droppableArea.addEventListener('drop', (e) => {
        // Previne o comportamento padrão (que pode ser abrir o arquivo como link)
        e.preventDefault();
        // Remove o estilo visual da área
        droppableArea.classList.remove('drag-over');
        
        // Obtém o ID do elemento que está sendo solto
        const id = e.dataTransfer.getData('text/plain');
        const draggedElement = document.getElementById(id);
        
        // Verifica se o elemento existe e não está já na área de soltura
        if (draggedElement && !droppableArea.contains(draggedElement)) {
            // Adiciona o elemento à área de soltura
            droppableArea.appendChild(draggedElement);
            
            // Opcional: Mostra feedback para o usuário
            const feedback = document.createElement('div');
            feedback.className = 'drop-feedback';
            feedback.textContent = `Item "${draggedElement.textContent}" foi adicionado!`;
            feedback.style.position = 'absolute';
            feedback.style.top = `${e.clientY + 10}px`;
            feedback.style.left = `${e.clientX + 10}px`;
            feedback.style.backgroundColor = 'rgba(46, 204, 113, 0.8)';
            feedback.style.color = 'white';
            feedback.style.padding = '5px 10px';
            feedback.style.borderRadius = '4px';
            feedback.style.transition = 'opacity 1s';
            
            document.body.appendChild(feedback);
            
            // Remove o feedback após 2 segundos
            setTimeout(() => {
                feedback.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(feedback);
                }, 1000);
            }, 2000);
        }
    });
    
    // Funcionalidade de reset para retornar ao estado inicial
    resetButton.addEventListener('click', () => {
        // Encontra todos os elementos arrastáveis que estão na área de soltura
        const droppedElements = droppableArea.querySelectorAll('.draggable');
        
        // Move-os de volta para o contêiner original
        droppedElements.forEach(element => {
            initialState.container.appendChild(element);
        });
    });
    
    // Exemplo de código educacional: como fazer um elemento não-arrastável ser arrastável
    const makeElementDraggable = (element) => {
        element.setAttribute('draggable', 'true');
        
        element.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', element.id);
            element.classList.add('dragging');
        });
        
        element.addEventListener('dragend', () => {
            element.classList.remove('dragging');
        });
    };
    
    // Esta função poderia ser exportada para uso em outras partes do código
    window.makeElementDraggable = makeElementDraggable;
    
    // Este objeto contém utilidades para trabalhar com drag and drop
    window.dragDropUtils = {
        // Verifica se a API de Drag and Drop é suportada pelo navegador
        isSupported: () => {
            const div = document.createElement('div');
            return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
        },
        
        // Cria um novo elemento arrastável
        createDraggable: (text, id) => {
            const element = document.createElement('div');
            element.classList.add('draggable');
            element.setAttribute('draggable', 'true');
            element.id = id || `draggable-${Date.now()}`;
            element.textContent = text;
            
            // Adiciona os listeners de evento
            element.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', element.id);
                element.classList.add('dragging');
            });
            
            element.addEventListener('dragend', () => {
                element.classList.remove('dragging');
            });
            
            return element;
        }
    };
});
