// Importando módulos
import './dragdrop.js';
import './camera.js';
import './geolocation.js';
import './canvas.js';
import './storage.js';
import '../css/styles.css';

// Função para navegação suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Implementação das requisições assíncronas (1.7)
document.addEventListener('DOMContentLoaded', () => {
    const apiEndpointSelect = document.getElementById('api-endpoint');
    const fetchButton = document.getElementById('fetch-data');
    const apiResults = document.getElementById('api-results');
    const loadingIndicator = document.getElementById('loading-indicator');
    const implementationButtons = document.querySelectorAll('.implementation-toggle button');
    
    let currentImplementation = 'fetch';
    
    // Toggle entre as implementações
    implementationButtons.forEach(button => {
        button.addEventListener('click', () => {
            implementationButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentImplementation = button.getAttribute('data-implementation');
        });
    });
    
    // Função para fazer requisição usando Fetch API
    const fetchWithFetch = async (endpoint) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Erro na requisição Fetch:', error);
            throw error;
        }
    };
    
    // Função para fazer requisição usando XMLHttpRequest
    const fetchWithXHR = (endpoint) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', `https://jsonplaceholder.typicode.com/${endpoint}`);
            xhr.onload = () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(new Error(`HTTP error! status: ${xhr.status}`));
                }
            };
            xhr.onerror = () => reject(new Error('Erro de rede'));
            xhr.send();
        });
    };
    
    // Função para fazer requisição usando async/await
    const fetchWithAsyncAwait = async (endpoint) => {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/${endpoint}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro na requisição Async/Await:', error);
            throw error;
        }
    };
    
    // Função para mostrar os resultados
    const showResults = (data) => {
        apiResults.innerHTML = '';
        
        // Limitar a quantidade de dados para não sobrecarregar a visualização
        const limitedData = data.slice(0, 10);
        
        limitedData.forEach(item => {
            const element = document.createElement('div');
            element.classList.add('result-item');
            
            let html = '<div class="result-header">';
            
            if (item.id) {
                html += `<span>ID: ${item.id}</span>`;
            }
            
            if (item.title) {
                html += `<h3>${item.title}</h3>`;
            } else if (item.name) {
                html += `<h3>${item.name}</h3>`;
            } else if (item.email) {
                html += `<h3>${item.email}</h3>`;
            }
            
            html += '</div>';
            
            if (item.body) {
                html += `<p>${item.body}</p>`;
            }
            
            if (item.username) {
                html += `<p>Usuário: ${item.username}</p>`;
            }
            
            if (item.email && !html.includes(item.email)) {
                html += `<p>Email: ${item.email}</p>`;
            }
            
            element.innerHTML = html;
            apiResults.appendChild(element);
        });
        
        if (data.length > 10) {
            const moreInfo = document.createElement('p');
            moreInfo.textContent = `Mostrando 10 de ${data.length} resultados.`;
            apiResults.appendChild(moreInfo);
        }
    };
    
    // Event listener para o botão de buscar dados
    fetchButton.addEventListener('click', async () => {
        const endpoint = apiEndpointSelect.value;
        loadingIndicator.classList.remove('hidden');
        apiResults.innerHTML = '';
        
        try {
            let data;
            
            // Executa a requisição de acordo com a implementação selecionada
            switch (currentImplementation) {
                case 'xhr':
                    data = await fetchWithXHR(endpoint);
                    break;
                case 'async-await':
                    data = await fetchWithAsyncAwait(endpoint);
                    break;
                case 'fetch':
                default:
                    data = await fetchWithFetch(endpoint);
                    break;
            }
            
            showResults(data);
        } catch (error) {
            apiResults.innerHTML = `<div class="error">Erro: ${error.message}</div>`;
        } finally {
            loadingIndicator.classList.add('hidden');
        }
    });
    
    // Projeto Integrado
    const startProjectButton = document.getElementById('start-project');
    const integratedApp = document.getElementById('integrated-app');
    
    startProjectButton.addEventListener('click', () => {
        if (integratedApp.classList.contains('hidden')) {
            integratedApp.classList.remove('hidden');
            startProjectButton.textContent = 'Ocultar Projeto Integrado';
            
            // Conteúdo do projeto integrado
            integratedApp.innerHTML = `
                <div class="integrated-container">
                    <div class="integrated-row">
                        <div class="integrated-col">
                            <h3>Capture e Desenhe</h3>
                            <video id="integrated-camera" autoplay playsinline></video>
                            <div class="integrated-controls">
                                <button id="integrated-capture">Capturar</button>
                                <button id="integrated-location">Adicionar Localização</button>
                            </div>
                        </div>
                        <div class="integrated-col">
                            <h3>Canvas Integrado</h3>
                            <canvas id="integrated-canvas" width="400" height="300"></canvas>
                            <div class="integrated-tools">
                                <input type="color" id="integrated-color" value="#3498db">
                                <input type="range" id="integrated-size" min="1" max="20" value="5">
                                <button id="integrated-clear">Limpar</button>
                                <button id="integrated-save">Salvar</button>
                            </div>
                        </div>
                    </div>
                    <div class="integrated-row">
                        <div class="integrated-gallery">
                            <h3>Galeria de Imagens</h3>
                            <div id="integrated-images" class="integrated-images-container"></div>
                        </div>
                    </div>
                </div>
            `;
            
            // Aqui você poderia inicializar as funcionalidades integradas
            // Isso seria implementado em uma aplicação real
        } else {
            integratedApp.classList.add('hidden');
            startProjectButton.textContent = 'Iniciar Projeto Integrado';
        }
    });
});
