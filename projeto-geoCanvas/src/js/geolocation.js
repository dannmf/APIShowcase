/**
 * Módulo para a API de Geolocalização (1.5.3)
 * Permite acessar a localização do usuário através do navegador
 */

document.addEventListener('DOMContentLoaded', () => {
    const getLocationButton = document.getElementById('get-location');
    const latitudeElement = document.getElementById('latitude');
    const longitudeElement = document.getElementById('longitude');
    const accuracyElement = document.getElementById('accuracy');
    const mapContainer = document.getElementById('map-container');
    
    if (!getLocationButton || !latitudeElement || 
        !longitudeElement || !accuracyElement || !mapContainer) return;
    
    let watchId = null; // Para armazenar o ID do monitoramento contínuo
    let map = null; // Para armazenar uma possível instância de mapa
    
    // Verifica se a API de Geolocalização é suportada
    const isSupported = () => {
        return 'geolocation' in navigator;
    };
    
    // Obtém a localização atual do usuário (uma única vez)
    const getCurrentPosition = () => {
        if (!isSupported()) {
            showError('Seu navegador não suporta a API de Geolocalização.');
            return;
        }
        
        // Mostra um indicador de carregamento
        showLoading();
        
        // Opções para a API de Geolocalização
        const options = {
            enableHighAccuracy: true, // Tenta obter a localização mais precisa
            timeout: 10000,          // Tempo máximo (ms) para obter a localização
            maximumAge: 0            // Não usa cache da localização
        };
        
        // Solicita a localização atual
        navigator.geolocation.getCurrentPosition(
            positionSuccess,
            positionError,
            options
        );
    };
    
    // Inicia o monitoramento contínuo da localização
    const watchPosition = () => {
        if (!isSupported()) {
            showError('Seu navegador não suporta a API de Geolocalização.');
            return;
        }
        
        // Se já estiver monitorando, para o monitoramento anterior
        if (watchId !== null) {
            stopWatchPosition();
        }
        
        // Opções para a API de Geolocalização
        const options = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        };
        
        // Atualiza o texto do botão
        getLocationButton.textContent = 'Parar Monitoramento';
        getLocationButton.classList.add('monitoring');
        
        // Inicia o monitoramento contínuo
        watchId = navigator.geolocation.watchPosition(
            positionSuccess,
            positionError,
            options
        );
    };
    
    // Para o monitoramento contínuo
    const stopWatchPosition = () => {
        if (watchId !== null) {
            navigator.geolocation.clearWatch(watchId);
            watchId = null;
            
            // Atualiza o texto do botão
            getLocationButton.textContent = 'Obter Localização';
            getLocationButton.classList.remove('monitoring');
        }
    };
    
    // Callback para quando a localização é obtida com sucesso
    const positionSuccess = (position) => {
        // Esconde o indicador de carregamento
        hideLoading();
        
        // Extrai as informações de geolocalização
        const {
            latitude,
            longitude,
            accuracy,
            altitude,
            altitudeAccuracy,
            heading,
            speed
        } = position.coords;
        
        // Atualiza os elementos na página
        latitudeElement.textContent = latitude.toFixed(6);
        longitudeElement.textContent = longitude.toFixed(6);
        accuracyElement.textContent = Math.round(accuracy);
        
        // Cria um objeto com todos os dados da posição para uso posterior
        const positionData = {
            latitude,
            longitude,
            accuracy,
            altitude: altitude ? altitude.toFixed(2) : 'N/A',
            altitudeAccuracy: altitudeAccuracy ? Math.round(altitudeAccuracy) : 'N/A',
            heading: heading ? heading.toFixed(2) : 'N/A',
            speed: speed ? (speed * 3.6).toFixed(2) : 'N/A', // Converte m/s para km/h
            timestamp: position.timestamp
        };
        
        // Armazena a posição no localStorage para uso posterior
        savePositionToStorage(positionData);
        
        // Renderiza a localização em um mapa simples
        renderMap(latitude, longitude, accuracy);
        
        return positionData;
    };
    
    // Callback para quando ocorre um erro ao obter a localização
    const positionError = (error) => {
        // Esconde o indicador de carregamento
        hideLoading();
        
        // Processar diferentes tipos de erro
        let message;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                message = 'Acesso à localização foi negado pelo usuário.';
                break;
            case error.POSITION_UNAVAILABLE:
                message = 'Informações de localização não estão disponíveis.';
                break;
            case error.TIMEOUT:
                message = 'Tempo esgotado ao tentar obter a localização.';
                break;
            case error.UNKNOWN_ERROR:
                message = 'Ocorreu um erro desconhecido ao obter a localização.';
                break;
        }
        
        showError(message);
    };
    
    // Renderiza um mapa simples mostrando a localização
    const renderMap = (latitude, longitude, accuracy) => {
        // Aqui implementamos um mapa básico
        // Em uma aplicação real, você usaria uma biblioteca como Leaflet ou Google Maps
        
        // Limpa o conteúdo anterior
        mapContainer.innerHTML = '';
        
        // Cria um mapa básico usando uma imagem estática do OpenStreetMap
        const mapImage = document.createElement('img');
        const zoom = 15; // Nível de zoom (1-19)
        const size = '600x300'; // Tamanho da imagem
        
        // URL para uma imagem de mapa estática (exemplo)
        mapImage.src = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&markers=color:red%7C${latitude},${longitude}&key=YOUR_API_KEY`;
        mapImage.alt = 'Mapa de localização';
        mapImage.style.width = '100%';
        mapImage.style.borderRadius = '8px';
        
        // Adiciona a imagem ao container
        mapContainer.appendChild(mapImage);
        
        // Nota educacional sobre a API Key
        const note = document.createElement('p');
        note.textContent = 'Nota: Para um mapa interativo real, é necessário usar uma API key do Google Maps ou outra biblioteca de mapas.';
        note.style.fontSize = '0.8rem';
        note.style.marginTop = '0.5rem';
        mapContainer.appendChild(note);
        
        // Adiciona um link para ver a localização no Google Maps
        const link = document.createElement('a');
        link.href = `https://www.google.com/maps?q=${latitude},${longitude}`;
        link.textContent = 'Ver no Google Maps';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'map-link';
        mapContainer.appendChild(link);
    };
    
    // Mostra um indicador de carregamento
    const showLoading = () => {
        const loadingElement = document.createElement('div');
        loadingElement.id = 'geolocation-loading';
        loadingElement.textContent = 'Obtendo localização...';
        loadingElement.style.textAlign = 'center';
        loadingElement.style.padding = '1rem';
        loadingElement.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
        loadingElement.style.borderRadius = '4px';
        loadingElement.style.marginBottom = '1rem';
        
        // Insere antes do container de informações de localização
        const locationInfo = document.getElementById('location-info');
        locationInfo.parentNode.insertBefore(loadingElement, locationInfo);
    };
    
    // Esconde o indicador de carregamento
    const hideLoading = () => {
        const loadingElement = document.getElementById('geolocation-loading');
        if (loadingElement) {
            loadingElement.parentNode.removeChild(loadingElement);
        }
    };
    
    // Mostra uma mensagem de erro
    const showError = (message) => {
        // Cria um elemento para a mensagem de erro
        const errorElement = document.createElement('div');
        errorElement.className = 'geo-error';
        errorElement.textContent = message;
        errorElement.style.backgroundColor = 'rgba(231, 76, 60, 0.8)';
        errorElement.style.color = 'white';
        errorElement.style.padding = '10px';
        errorElement.style.borderRadius = '4px';
        errorElement.style.marginBottom = '1rem';
        
        // Insere no início do container de geolocalização
        const container = document.getElementById('geolocation-container');
        container.insertBefore(errorElement, container.firstChild);
        
        // Remove após alguns segundos
        setTimeout(() => {
            errorElement.style.opacity = '0';
            errorElement.style.transition = 'opacity 0.5s';
            setTimeout(() => {
                if (errorElement.parentNode) {
                    errorElement.parentNode.removeChild(errorElement);
                }
            }, 500);
        }, 5000);
    };
    
    // Salva a posição no localStorage
    const savePositionToStorage = (positionData) => {
        // Obtém o histórico existente ou cria um novo array
        let positions = JSON.parse(localStorage.getItem('geoPositions') || '[]');
        
        // Adiciona a nova posição ao histórico
        positions.push({
            ...positionData,
            savedAt: new Date().toISOString()
        });
        
        // Limita o histórico a 10 entradas
        if (positions.length > 10) {
            positions = positions.slice(-10);
        }
        
        // Salva o histórico atualizado
        localStorage.setItem('geoPositions', JSON.stringify(positions));
    };
    
    // Event listener para o botão de obter localização
    getLocationButton.addEventListener('click', () => {
        if (watchId === null) {
            // Se não estiver monitorando, inicia o monitoramento
            watchPosition();
        } else {
            // Se estiver monitorando, para o monitoramento
            stopWatchPosition();
        }
    });
    
    // Exporta funções para uso em outras partes do aplicativo
    window.geolocationUtils = {
        getCurrentPosition,
        watchPosition,
        stopWatchPosition,
        isSupported
    };
});
