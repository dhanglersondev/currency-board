# Currency Board

Aplicação React + TypeScript + Vite para monitorar preços de criptomoedas em tempo real.

## Visão geral

O `currency-board` consome a API pública do CoinCap para listar ativos digitais, mostrar detalhes de cada moeda e permitir busca por nome ou símbolo.

### Funcionalidades

- Lista de criptomoedas com rank, market cap, preço, volume 24h e variação 24h
- Busca por moeda usando nome ou símbolo
- Página de detalhe da moeda com preço atual e métricas
- Rotas com `react-router-dom`
- Layout simples e responsivo

## Estrutura do projeto

- `src/pages/Home` — página principal com tabela de moedas e busca
- `src/pages/Coin` — página de detalhe da moeda
- `src/services/api.ts` — chamadas à API do CoinCap
- `src/routes.tsx` — configuração de rotas
- `src/components/Layout` — wrapper de rotas

## Dependências principais

- `react`
- `react-dom`
- `react-router-dom`
- `react-icons`
- `vite`
- `typescript`
- `eslint`

## Requisitos

- Node.js instalado
- `npm` ou `pnpm`
- Chave de API do CoinCap (opcional, dependendo do uso)

> A aplicação usa `VITE_API_KEY` para o endpoint `/assets` do CoinCap.

## Como executar

1. Instale as dependências:

```bash
npm install
```

2. Crie um arquivo `.env` na raiz do projeto (opcional):

```env
VITE_API_KEY=seu_token_aqui
```

3. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse o endereço exibido no terminal, normalmente `http://localhost:5173`

## Scripts úteis

- `npm run dev` — inicia o servidor de desenvolvimento
- `npm run build` — gera o build para produção
- `npm run preview` — pré-visualiza o build de produção
- `npm run lint` — executa o ESLint

## Rotas da aplicação

- `/` — homepage com tabela de moedas e busca
- `/coin/:id` — detalhes da moeda selecionada
- `*` — rota de página não encontrada

## API usada

- `GET https://rest.coincap.io/v3/assets?limit=&offset=` — lista de ativos
- `GET https://rest.coincap.io/v3/assets/:id` — busca detalhe da moeda

## Melhorias possíveis

- implementar paginação completa
- adicionar testes unitários/componentes
- melhorar tratamento de erros e estados de carregamento
- adicionar histórico de preços ou gráficos

## Licença

Projeto de estudo sem licença definida.
