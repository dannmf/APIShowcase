# Edição de Arquivos com Nano e Gerenciamento de Permissões no Ubuntu

## Edição de Arquivos com Nano

O **Nano** é um editor de texto simples e amigável para iniciantes, disponível na maioria das distribuições Linux, incluindo o Ubuntu. Sua interface é mais intuitiva que editores como Vim ou Emacs.

### Instalação do Nano

Embora o Nano venha pré-instalado na maioria das distribuições Ubuntu, caso precise instalá-lo manualmente, o processo é simples:

```bash
# Atualizar os repositórios
sudo apt update

# Instalar o Nano
sudo apt install nano
```

Para verificar se a instalação foi bem-sucedida:

```bash
# Verificar a versão do Nano instalada
nano --version
```

Após a instalação, você pode iniciar o editor simplesmente digitando `nano` seguido do nome do arquivo que deseja editar:

```bash
nano novo_arquivo.txt
```

### Abrindo o Nano

```bash
$ nano arquivo.txt
```

Quando não existe, o Nano cria o arquivo automaticamente. Quando já existe, abre para edição.

### Interface do Nano

```
  GNU nano 6.2                     arquivo.txt
[Aqui fica o texto que você está editando]

^G Ajuda    ^O Gravar   ^W Onde está ^K Recortar  ^J Justificar ^C Local atual
^X Sair     ^R Ler arq  ^\ Substituir^U Colar     ^T Ortografia ^_ Ir p/ linha
```

Na parte inferior da tela estão os atalhos principais. O símbolo `^` representa a tecla Ctrl.

### Comandos básicos do Nano

1. **Navegação**:
    - Use as setas do teclado para mover o cursor
    - `Ctrl+A`: Ir para o início da linha
    - `Ctrl+E`: Ir para o final da linha
    - `Ctrl+Y`: Página acima
    - `Ctrl+V`: Página abaixo
    - `Ctrl+_`: (Ctrl+Shift+hífen): Ir para linha específica
2. **Edição**:
    - Simplesmente digite para inserir texto
    - `Ctrl+K`: Recortar a linha atual (ou texto selecionado)
    - `Ctrl+U`: Colar o texto recortado
    - `Alt+6`: Copiar texto (começa seleção, mova o cursor e pressione novamente)
    - `Ctrl+\`: Buscar e substituir texto
    - `Alt+U`: Desfazer última ação
    - `Alt+E`: Refazer
3. **Salvamento e saída**:
    - `Ctrl+O`: Salvar arquivo (também pede confirmação de nome)
    - `Ctrl+X`: Sair (pede para salvar se houver alterações)
4. **Configurações úteis**:
    - `Alt+#`: Mostrar número das linhas
    - `Alt+P`: Ativar colorização de sintaxe (quando disponível)
    - `Alt+X`: Modo de ajuda do Nano

### Exemplo prático

Criando um script bash simples com Nano:

```bash
$ nano ~/hello.sh
```

Digite o seguinte conteúdo:

```bash
#!/bin/bash
# Meu primeiro script

echo "Olá, mundo!"
echo "Hoje é $(date)"
echo "Usuário: $USER"
```

Para salvar: Pressione `Ctrl+O`, confirme o nome do arquivo com Enter
Para sair: Pressione `Ctrl+X`

Após salvar, dê permissão de execução e execute:

```bash
$ chmod +x ~/hello.sh
$ ~/hello.sh
Olá, mundo!
Hoje é Seg Mar 24 20:14:43 -03 2025
Usuário: usuario
```

### Configurações avançadas

O Nano pode ser configurado através do arquivo `~/.nanorc`. Exemplo de configuração:

```
set linenumbers      # Mostra números de linha
set autoindent       # Auto-indentação
set tabsize 4        # Define tamanho do tab como 4 espaços
set tabstospaces     # Converte tab para espaços
set constantshow     # Mostra posição do cursor constantemente
```

## Gerenciamento de Permissões de Arquivos e Diretórios

No Linux, o controle de permissões é uma parte fundamental da segurança do sistema. Cada arquivo e diretório possui um conjunto de permissões que define quem pode ler, escrever ou executar.

### Visualizando Permissões

Para ver as permissões de arquivos e diretórios, use o comando `ls -l`:

```bash
$ ls -l
drwxr-xr-x 2 usuario grupo 4096 mar 26 14:30 Documentos
-rw-r--r-- 1 usuario grupo  123 mar 26 14:35 arquivo.txt
```

**Decodificando as permissões**:

- Primeiro caractere: tipo (d = diretório, - = arquivo, l = link simbólico)
- Próximos 9 caracteres: permissões em 3 grupos (proprietário, grupo, outros)
  - r = leitura (read)
  - w = escrita (write)
  - x = execução (execute)

### Alterando Permissões com o Comando chmod

O comando `chmod` (change mode) é usado para modificar permissões de arquivos e diretórios.

**Sintaxe Simbólica** (mais intuitiva para iniciantes):

```bash
chmod [quem][operação][permissões] arquivo_ou_diretório
```

Onde:
- **quem**: 
  - u = proprietário (user)
  - g = grupo (group)
  - o = outros (others)
  - a = todos (all)
- **operação**:
  - + = adicionar permissão
  - - = remover permissão
  - = = definir permissão exata
- **permissões**: r, w, x

**Exemplos**:

```bash
# Dar permissão de execução ao proprietário
$ chmod u+x script.sh

# Remover permissão de escrita para outros usuários
$ chmod o-w arquivo.txt

# Definir permissões específicas (leitura/escrita para proprietário, somente leitura para grupo e outros)
$ chmod u=rw,g=r,o=r arquivo.txt
```

**Sintaxe Numérica** (também chamada de octal):

```bash
chmod [valor] arquivo_ou_diretório
```

Onde o valor é um número de 3 dígitos, representando:
- 1º dígito: permissões do proprietário
- 2º dígito: permissões do grupo
- 3º dígito: permissões de outros

Cada permissão tem um valor numérico:
- r (leitura) = 4
- w (escrita) = 2
- x (execução) = 1

Somamos os valores para obter o número desejado:
- 7 = 4+2+1 (rwx)
- 6 = 4+2 (rw-)
- 5 = 4+1 (r-x)
- 4 = 4 (r--)
- 0 = nenhuma permissão (---)

**Exemplos**:

```bash
# 755: rwxr-xr-x (proprietário tem controle total, todos os outros podem ler e executar)
$ chmod 755 script.sh

# 644: rw-r--r-- (proprietário pode ler e escrever, todos os outros só podem ler)
$ chmod 644 arquivo.txt

# 600: rw------- (apenas o proprietário pode ler e escrever, ninguém mais tem acesso)
$ chmod 600 arquivo_sensivel.txt
```

### Alterando Permissões Recursivamente

Para modificar permissões de todos os arquivos e subdiretórios dentro de um diretório:

```bash
# Usando a opção -R (recursiva)
$ chmod -R 755 /caminho/para/diretorio
```

### Alterando Proprietário e Grupo com chown e chgrp

Para alterar o proprietário e/ou grupo de um arquivo ou diretório:

```bash
# Alterar apenas o proprietário
$ sudo chown novo_usuario arquivo.txt

# Alterar proprietário e grupo
$ sudo chown novo_usuario:novo_grupo arquivo.txt

# Alterar apenas o grupo
$ sudo chgrp novo_grupo arquivo.txt

# Alterar recursivamente (diretório e todo seu conteúdo)
$ sudo chown -R usuario:grupo /caminho/para/diretorio
```

**Exemplo prático**:
Configurando permissões para um site web:

```bash
# Criar estrutura do site
$ sudo mkdir -p /var/www/meusite

# Definir propriedade para o usuário www-data (usuário do servidor web Apache)
$ sudo chown -R www-data:www-data /var/www/meusite

# Definir permissões adequadas para conteúdo web
$ sudo chmod -R 755 /var/www/meusite
```

### Permissões Especiais

Além das permissões básicas, existem permissões especiais:

- **SUID (Set User ID)**: Quando aplicado a um executável, ele roda com as permissões do proprietário do arquivo
  ```bash
  $ chmod u+s arquivo_executavel
  $ chmod 4755 arquivo_executavel  # 4 representa SUID
  ```

- **SGID (Set Group ID)**: Similar ao SUID, mas para grupos. Quando aplicado a um diretório, novos arquivos herdam o grupo do diretório
  ```bash
  $ chmod g+s diretorio
  $ chmod 2755 diretorio  # 2 representa SGID
  ```

- **Sticky Bit**: Quando aplicado a um diretório, apenas o proprietário de um arquivo pode excluí-lo
  ```bash
  $ chmod +t diretorio
  $ chmod 1755 diretorio  # 1 representa Sticky Bit
  ```

### Boas Práticas de Segurança

1. **Princípio do privilégio mínimo**: Conceda apenas as permissões necessárias
2. **Evite permissões 777**: Nunca use `chmod 777` (permissão total para todos) exceto em casos muito específicos
3. **Cuidado com permissões recursivas**: Ao usar `-R`, verifique se está no diretório correto
4. **Proteja arquivos sensíveis**: Use permissões restritivas para arquivos de configuração com senhas
5. **Verifique permissões após instalações**: Algumas aplicações podem definir permissões inseguras

Seguindo essas diretrizes, você pode garantir que seus arquivos e diretórios estejam adequadamente protegidos, permitindo acesso apenas a quem realmente precisa.
