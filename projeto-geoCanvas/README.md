# GeoCanvas - Projeto Educacional de APIs HTML5

Este projeto foi criado como material educacional para demonstrar e ensinar as principais APIs HTML5 modernas através de exemplos práticos e interativos. O aplicativo "GeoCanvas" permite que os alunos experimentem e aprendam sobre diversas APIs do HTML5 em um único lugar.

## Tecnologias e APIs Demonstradas

### 1. APIs HTML5
- **1.5.1 Drag and Drop API**: Permite arrastar e soltar elementos na interface
- **1.5.2 API de Câmera**: Captura e manipula imagens da câmera do dispositivo
- **1.5.3 API de Geolocalização**: Obtém a localização do usuário
- **1.6 Canvas API**: Permite desenhar gráficos e imagens dinamicamente
- **1.7 Requisições Assíncronas**: Demonstra diferentes métodos de requisições AJAX
- **1.8 Web Storage**: Armazena dados localmente (localStorage e sessionStorage)

### 2. Tecnologias de Build e Empacotamento
- **1.9 Webpack**: Empacota os recursos e gerencia dependências

## Instalação

1. Clone este repositório
2. Instale as dependências:
```bash
npm install
```

## Execução

Para iniciar o servidor de desenvolvimento:
```bash
npm start
```

Para construir o projeto para produção:
```bash
npm run build
```

## Estrutura do Projeto

```
projeto-geoCanvas/
  ├── src/                  # Código fonte
  │   ├── index.html        # HTML principal
  │   ├── js/               # Arquivos JavaScript
  │   │   ├── index.js      # Ponto de entrada
  │   │   ├── camera.js     # Implementação da API de Câmera
  │   │   ├── geolocation.js # Implementação da API de Geolocalização
  │   │   ├── dragdrop.js   # Implementação de Drag and Drop
  │   │   ├── canvas.js     # Implementação da API Canvas
  │   │   └── storage.js    # Implementação de Web Storage
  │   ├── css/              # Estilos
  │   │   └── styles.css    # CSS principal
  │   └── assets/           # Recursos estáticos (imagens, etc.)
  ├── webpack.config.js     # Configuração do Webpack
  ├── package.json          # Dependências e scripts
  └── README.md             # Este arquivo
```

## Guia de APIs e Exemplos

### 1.5.1 Drag and Drop API
- Permite que elementos HTML sejam arrastáveis
- Demonstra eventos: `dragstart`, `dragover`, `dragleave`, `drop`
- Exemplo: Arraste os blocos coloridos para a área designada

### 1.5.2 API de Câmera
- Acessa a câmera do dispositivo via `navigator.mediaDevices.getUserMedia()`
- Captura fotos usando canvas
- Exemplo: Tire uma foto com sua webcam e salve-a

### 1.5.3 API de Geolocalização
- Acessa a localização do usuário via `navigator.geolocation`
- Fornece dados de latitude, longitude e precisão
- Exemplo: Veja sua localização atual em um mapa

### 1.6 Canvas API
- Permite desenho programático via JavaScript
- Demonstra desenho livre, formas básicas e manipulação de pixels
- Exemplo: Desenhe livremente com diferentes cores e tamanhos de pincel

### 1.7 Requisições Assíncronas
- Demonstra diferentes métodos de fazer requisições AJAX:
  - Fetch API (moderno)
  - XMLHttpRequest (legado)
  - Async/await (sintaxe moderna)
- Exemplo: Busque dados de uma API externa e veja a diferença entre métodos

### 1.8 Web Storage
- Demonstra o uso de localStorage (persistente) e sessionStorage (temporário)
- Inclui operações CRUD básicas (Criar, Ler, Atualizar, Deletar)
- Exemplo: Salve diferentes dados e veja como persistem (ou não) entre sessões

### 1.9 Webpack
- Empacota todos os recursos em bundles otimizados
- Gerencia dependências e módulos
- Provê um ambiente de desenvolvimento com hot-reload

## Projeto Integrado

A seção "Projeto Integrado" combina todas as APIs em uma única aplicação interativa, permitindo que os alunos vejam como essas tecnologias podem trabalhar juntas para criar experiências ricas.

## Compatibilidade de Navegadores

Este projeto funciona melhor em navegadores modernos como:
- Google Chrome (recomendado)
- Mozilla Firefox
- Microsoft Edge
- Safari (algumas funcionalidades podem ter comportamento diferente)

## Licença

Este projeto é disponibilizado sob a licença MIT.

## Notas de Ensino

- Cada seção inclui explicações sobre como a API funciona
- O código é extensivamente comentado para fins educacionais
- Encoraje os alunos a explorarem o código-fonte e fazerem modificações
