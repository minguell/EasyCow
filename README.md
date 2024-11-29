# EasyCow

**EasyCow** é uma aplicação voltada para o agronegócio, focada em facilitar o comércio de gado. Este projeto foi desenvolvido como parte do trabalho prático para a disciplina de Engenharia de Software, seguindo os requisitos e diretrizes estabelecidos ao longo das etapas de análise e desenvolvimento.

## Sobre o Projeto

O **EasyCow** tem como objetivo principal digitalizar um mercado tradicionalmente analógico, conectando compradores e vendedores de gado para tornar as transações mais acessíveis e seguras. O sistema implementa funcionalidades como cadastro, pesquisa e transação de lotes de gado, além de oferecer indicadores de qualidade baseados na saúde e infraestrutura dos animais.

### Diferenciais:
- **Índice de Qualidade:** Avaliação baseada no status de vacinação do gado e na infraestrutura de criação.
- **Sistema de Avaliações:** Feedbacks entre usuários para promover transparência e confiança.
- **Facilidade de Uso:** Filtros para busca personalizada e navegação intuitiva pelo catálogo.

## Funcionalidades Implementadas

De acordo com as especificações da **Etapa 2**, o grupo desenvolvedor priorizou os seguintes casos de uso:
- **Cadastro de Lotes de Gado:** Permitir que anunciantes adicionem novos lotes à plataforma.
- **Pesquisa de Lotes:** Proporcionar filtros para busca de lotes baseados em critérios como preço, raça e localização.
- **Transações Comerciais:** Facilitar tanto a compra quanto a venda de lotes de gado.
- **Gerenciamento de Recursos:** Permitir que anunciantes editem ou excluam anúncios existentes.

### Simplificações
Foram adotadas algumas simplificações para o escopo desta etapa:
- Apenas transações de compra direta foram implementadas.
- Pagamentos são simulados, sem integração com sistemas externos.
- Funcionalidades de validação de anúncios e selos de qualidade foram implementadas de forma básica.

## Arquitetura do Sistema

A arquitetura preliminar foi projetada com base em princípios de modularidade e extensibilidade, utilizando diagramas de pacotes para definir subsistemas e suas interdependências.

### Estilo Arquitetural
Adotamos um estilo arquitetural baseado em camadas:
- **Camada de Apresentação:** Interface com o usuário.
- **Camada de Negócio:** Lógica para gestão de transações e validação de dados.
- **Camada de Dados:** Persistência de informações relacionadas a usuários, lotes e transações.


## Requisitos Técnicos

- **Linguagem:** JavaScript
- **Frameworks/Bibliotecas:** React
- **Ferramenta CASE:** StarUML

## Como Executar

1. Clone o repositório:

git clone <link-do-repositorio>

2. Acesse o diretório do projeto:
   
cd EasyCow

3. Siga as instruções no arquivo `docs/setup.md` para configurar o ambiente.

## Equipe


## Licença

Este projeto foi desenvolvido exclusivamente para fins acadêmicos e não possui uma licença comercial.

---
