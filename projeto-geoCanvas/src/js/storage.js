/**
 * Módulo para a API Web Storage (1.8)
 * Demonstra o uso de localStorage e sessionStorage para armazenar dados no navegador
 */

document.addEventListener('DOMContentLoaded', () => {
    // Elements para localStorage
    const localKeyInput = document.getElementById('local-key');
    const localValueInput = document.getElementById('local-value');
    const localSaveButton = document.getElementById('local-save');
    const localItemsList = document.getElementById('local-items');
    const localClearButton = document.getElementById('local-clear');
    
    // Elements para sessionStorage
    const sessionKeyInput = document.getElementById('session-key');
    const sessionValueInput = document.getElementById('session-value');
    const sessionSaveButton = document.getElementById('session-save');
    const sessionItemsList = document.getElementById('session-items');
    const sessionClearButton = document.getElementById('session-clear');
    
    // Elements para as tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Verifica se todos os elementos necessários existem
    if (!localKeyInput || !localValueInput || !localSaveButton || !localItemsList || !localClearButton ||
        !sessionKeyInput || !sessionValueInput || !sessionSaveButton || !sessionItemsList || !sessionClearButton) {
        return;
    }
    
    // Verifica se Web Storage é suportado
    const isLocalStorageSupported = () => {
        try {
            localStorage.setItem('test', 'test');
            localStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    };
    
    const isSessionStorageSupported = () => {
        try {
            sessionStorage.setItem('test', 'test');
            sessionStorage.removeItem('test');
            return true;
        } catch (e) {
            return false;
        }
    };
    
    // Funções para localStorage
    const saveToLocalStorage = (key, value) => {
        if (!key || !value) {
            showMessage('Por favor, forneça uma chave e um valor.', 'error');
            return false;
        }
        
        try {
            localStorage.setItem(key, value);
            showMessage(`Item "${key}" salvo no localStorage.`, 'success');
            updateLocalStorageList();
            return true;
        } catch (error) {
            showMessage(`Erro ao salvar no localStorage: ${error.message}`, 'error');
            return false;
        }
    };
    
    const getFromLocalStorage = (key) => {
        return localStorage.getItem(key);
    };
    
    const removeFromLocalStorage = (key) => {
        try {
            localStorage.removeItem(key);
            showMessage(`Item "${key}" removido do localStorage.`, 'success');
            updateLocalStorageList();
            return true;
        } catch (error) {
            showMessage(`Erro ao remover do localStorage: ${error.message}`, 'error');
            return false;
        }
    };
    
    const clearLocalStorage = () => {
        try {
            localStorage.clear();
            showMessage('Todo o localStorage foi limpo.', 'success');
            updateLocalStorageList();
            return true;
        } catch (error) {
            showMessage(`Erro ao limpar localStorage: ${error.message}`, 'error');
            return false;
        }
    };
    
    const updateLocalStorageList = () => {
        localItemsList.innerHTML = '';
        
        if (localStorage.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Nenhum item salvo.';
            emptyMessage.className = 'empty-message';
            localItemsList.appendChild(emptyMessage);
            return;
        }
        
        // Itera sobre todas as chaves no localStorage
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            
            // Ignora itens que são para outras funcionalidades do aplicativo
            if (key === 'canvasDrawings' || key === 'geoPositions') continue;
            
            const value = localStorage.getItem(key);
            
            // Cria o elemento de lista
            const listItem = document.createElement('li');
            
            // Cria o conteúdo do item
            const keySpan = document.createElement('span');
            keySpan.className = 'item-key';
            keySpan.textContent = key;
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'item-value';
            valueSpan.textContent = value.length > 30 ? value.substring(0, 30) + '...' : value;
            valueSpan.title = value; // Mostra o valor completo ao passar o mouse
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.className = 'remove-item';
            removeButton.addEventListener('click', () => removeFromLocalStorage(key));
            
            // Adiciona os elementos ao item da lista
            listItem.appendChild(keySpan);
            listItem.appendChild(valueSpan);
            listItem.appendChild(removeButton);
            
            // Adiciona o item à lista
            localItemsList.appendChild(listItem);
        }
    };
    
    // Funções para sessionStorage
    const saveToSessionStorage = (key, value) => {
        if (!key || !value) {
            showMessage('Por favor, forneça uma chave e um valor.', 'error');
            return false;
        }
        
        try {
            sessionStorage.setItem(key, value);
            showMessage(`Item "${key}" salvo no sessionStorage.`, 'success');
            updateSessionStorageList();
            return true;
        } catch (error) {
            showMessage(`Erro ao salvar no sessionStorage: ${error.message}`, 'error');
            return false;
        }
    };
    
    const getFromSessionStorage = (key) => {
        return sessionStorage.getItem(key);
    };
    
    const removeFromSessionStorage = (key) => {
        try {
            sessionStorage.removeItem(key);
            showMessage(`Item "${key}" removido do sessionStorage.`, 'success');
            updateSessionStorageList();
            return true;
        } catch (error) {
            showMessage(`Erro ao remover do sessionStorage: ${error.message}`, 'error');
            return false;
        }
    };
    
    const clearSessionStorage = () => {
        try {
            sessionStorage.clear();
            showMessage('Todo o sessionStorage foi limpo.', 'success');
            updateSessionStorageList();
            return true;
        } catch (error) {
            showMessage(`Erro ao limpar sessionStorage: ${error.message}`, 'error');
            return false;
        }
    };
    
    const updateSessionStorageList = () => {
        sessionItemsList.innerHTML = '';
        
        if (sessionStorage.length === 0) {
            const emptyMessage = document.createElement('li');
            emptyMessage.textContent = 'Nenhum item salvo.';
            emptyMessage.className = 'empty-message';
            sessionItemsList.appendChild(emptyMessage);
            return;
        }
        
        // Itera sobre todas as chaves no sessionStorage
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key);
            
            // Cria o elemento de lista
            const listItem = document.createElement('li');
            
            // Cria o conteúdo do item
            const keySpan = document.createElement('span');
            keySpan.className = 'item-key';
            keySpan.textContent = key;
            
            const valueSpan = document.createElement('span');
            valueSpan.className = 'item-value';
            valueSpan.textContent = value.length > 30 ? value.substring(0, 30) + '...' : value;
            valueSpan.title = value; // Mostra o valor completo ao passar o mouse
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.className = 'remove-item';
            removeButton.addEventListener('click', () => removeFromSessionStorage(key));
            
            // Adiciona os elementos ao item da lista
            listItem.appendChild(keySpan);
            listItem.appendChild(valueSpan);
            listItem.appendChild(removeButton);
            
            // Adiciona o item à lista
            sessionItemsList.appendChild(listItem);
        }
    };
    
    // Função para mostrar mensagens
    const showMessage = (message, type = 'success') => {
        const messageElement = document.createElement('div');
        messageElement.className = `storage-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.position = 'fixed';
        messageElement.style.bottom = '20px';
        messageElement.style.left = '50%';
        messageElement.style.transform = 'translateX(-50%)';
        messageElement.style.backgroundColor = type === 'success' ? 'rgba(46, 204, 113, 0.8)' : 'rgba(231, 76, 60, 0.8)';
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
    
    // Função para demonstrar as diferenças entre localStorage e sessionStorage
    const demonstrateDifferences = () => {
        const now = new Date().toISOString();
        
        // Salva a mesma informação em ambos os storages
        localStorage.setItem('last_visit', now);
        sessionStorage.setItem('last_visit', now);
        
        console.log('Demonstração das diferenças entre localStorage e sessionStorage:');
        console.log('1. Os dados foram salvos em ambos os storages.');
        console.log('2. localStorage: os dados persistem mesmo após fechar o navegador.');
        console.log('3. sessionStorage: os dados são removidos quando a sessão termina (navegador fechado).');
        console.log('4. Tente fechar e reabrir a página para ver a diferença.');
    };
    
    // Event listeners para tabs
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe ativa de todos os botões e tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Adiciona a classe ativa ao botão clicado
            button.classList.add('active');
            
            // Ativa o conteúdo correspondente
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Event listeners para localStorage
    localSaveButton.addEventListener('click', () => {
        const key = localKeyInput.value.trim();
        const value = localValueInput.value.trim();
        
        if (saveToLocalStorage(key, value)) {
            localKeyInput.value = '';
            localValueInput.value = '';
        }
    });
    
    localClearButton.addEventListener('click', clearLocalStorage);
    
    // Event listeners para sessionStorage
    sessionSaveButton.addEventListener('click', () => {
        const key = sessionKeyInput.value.trim();
        const value = sessionValueInput.value.trim();
        
        if (saveToSessionStorage(key, value)) {
            sessionKeyInput.value = '';
            sessionValueInput.value = '';
        }
    });
    
    sessionClearButton.addEventListener('click', clearSessionStorage);
    
    // Verifica se as APIs são suportadas
    if (!isLocalStorageSupported()) {
        document.getElementById('local-storage').innerHTML = '<p class="error">Seu navegador não suporta localStorage.</p>';
    }
    
    if (!isSessionStorageSupported()) {
        document.getElementById('session-storage').innerHTML = '<p class="error">Seu navegador não suporta sessionStorage.</p>';
    }
    
    // Inicializa as listas
    updateLocalStorageList();
    updateSessionStorageList();
    
    // Executa a demonstração
    demonstrateDifferences();
    
    // Exporta funções para uso em outras partes do aplicativo
    window.storageUtils = {
        // LocalStorage
        saveToLocalStorage,
        getFromLocalStorage,
        removeFromLocalStorage,
        clearLocalStorage,
        
        // SessionStorage
        saveToSessionStorage,
        getFromSessionStorage,
        removeFromSessionStorage,
        clearSessionStorage,
        
        // Helpers
        isLocalStorageSupported,
        isSessionStorageSupported
    };
});
