# Sistema Operacional Ubuntu

O Ubuntu é uma das distribuições Linux mais populares do mundo, baseada no Debian. Lançado em 2004 pela Canonical Ltd., o Ubuntu rapidamente ganhou popularidade devido ao seu compromisso com a usabilidade e acessibilidade.

## 1. Sistema Operacional de Código Aberto

O Ubuntu exemplifica perfeitamente o conceito de sistema operacional de código aberto:

- **Código aberto e gratuito**: Todo o código-fonte está disponível para visualização, modificação e redistribuição
- **Comunidade ativa**: Milhares de desenvolvedores contribuem voluntariamente
- **Ciclo de lançamento regular**: Novas versões são lançadas a cada 6 meses (em abril e outubro)
- **Versões LTS**: A cada dois anos é lançada uma versão com suporte de longo prazo (5 anos)
- **Transparência**: O desenvolvimento é aberto e público

O sistema de nomenclatura do Ubuntu segue o padrão "[AA.MM](http://aa.mm/)" (ano.mês de lançamento). Por exemplo, Ubuntu 20.04 foi lançado em abril de 2020. Adicionalmente, cada versão recebe um codinome com um adjetivo e um animal, em ordem alfabética (como "Focal Fossa" para 20.04 ou "Jammy Jellyfish" para 22.04).

**Curiosidade**: Mark Shuttleworth, fundador da Canonical e do Ubuntu, foi o primeiro sul-africano a viajar ao espaço, como turista espacial em 2002.

## 1.4. Modo Gráfico (Interface Gráfica)

O Ubuntu utiliza o ambiente de desktop GNOME como sua interface padrão desde a versão 17.10 (anteriormente usava Unity, desenvolvido pela própria Canonical).

### 1.4.1. Área de Trabalho

A área de trabalho do Ubuntu com GNOME apresenta um design limpo e moderno:

**Elementos principais da área de trabalho**:

- **Barra superior (Top Bar)**: Contém:
    - Menu de Sistema (canto direito) com acesso a configurações e desligamento
    - Relógio e calendário (centro)
    - Indicadores de status (rede, volume, bateria, etc.)
- **Dock lateral (Ubuntu Dock)**: Localizado à esquerda da tela
    - Contém ícones de aplicativos favoritos e em execução
    - Ícone do "Mostrar aplicativos" (9 pontos) no topo
    - Comportamento inteligente de ocultação automática (configurável)
- **Atividades**: Ao clicar em "Atividades" (canto superior esquerdo) ou pressionar a tecla Super (Windows):
    - Visualização de todos os aplicativos abertos
    - Campo de pesquisa para encontrar aplicativos, arquivos e configurações
    - Áreas de trabalho virtuais (lado direito)

**Personalização da área de trabalho**:

1. Clique com o botão direito na área de trabalho → "Configurações de aparência"
2. Para mudar o papel de parede: Configurações → Aparência → Papel de parede
3. Para personalizar o comportamento do dock: Configurações → Aparência → Dock
4. Instalação de temas: `sudo apt install gnome-tweaks` para ter acesso a mais opções

**Exemplo prático**:
Para adicionar um aplicativo ao dock:

1. Abra o aplicativo
2. Clique com o botão direito no ícone do aplicativo no dock
3. Selecione "Adicionar aos favoritos"

### 1.4.2. Trabalho com Janelas

O GNOME oferece várias formas eficientes de gerenciar janelas no Ubuntu:

**Controle básico de janelas**:

- **Botões de controle**: Localizados no canto superior direito
    - ✕ (vermelho): Fechar a janela
    - □ (verde): Maximizar/restaurar
    - _ (amarelo): Minimizar (ocultar na dock)

**Técnicas de gerenciamento de janelas**:

1. **Arrastar e soltar**:
    - Arraste a barra de título para mover a janela
    - Arraste qualquer borda para redimensionar
2. **Atalhos de teclado** (alguns dos mais úteis):
    - `Alt+Tab`: Alternar entre janelas
    - `Alt+F4`: Fechar a janela ativa
    - `Super+Seta para cima`: Maximizar janela
    - `Super+Seta para baixo`: Restaurar/minimizar
    - `Super+Seta para esquerda/direita`: Acoplar à esquerda/direita da tela
    - `Super+H`: Minimizar todas as janelas e mostrar a área de trabalho
    - `Ctrl+Alt+Seta para cima/baixo`: Mudar entre áreas de trabalho
3. **Divisão de tela (snap)**:
    - Arraste a janela para a borda esquerda: ocupa metade esquerda
    - Arraste a janela para a borda direita: ocupa metade direita
    - Arraste a janela para o topo: maximiza
    - Arraste para os cantos: ocupa um quadrante da tela
4. **Áreas de trabalho virtuais**:
    - Acesse clicando em Atividades (ou tecla Super)
    - Arraste janelas entre áreas de trabalho
    - Crie novas áreas arrastando uma janela para o "+" à direita

**Exemplo prático**:
Para trabalhar com duas aplicações lado a lado:

1. Clique e arraste a primeira janela para o lado esquerdo da tela até ver um contorno azul
2. Solte o botão do mouse para encaixá-la na metade esquerda
3. Faça o mesmo com a segunda janela, arrastando-a para o lado direito
4. Agora você tem duas aplicações ocupando exatamente metade da tela cada uma
