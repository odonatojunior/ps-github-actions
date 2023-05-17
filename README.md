GitHub Actions PS
---
- [O que são as Actions?](#o-que-são-as-actions)
- [Utilidades \& vantagens](#utilidades--vantagens)
- [Exemplos](#exemplos)
- [Preço](#preço)
- [Anatomia](#anatomia)
- [Exemplo prático](#exemplo-prático)

# O que são as Actions?
> "GitHub Actions é uma plataforma de integração contínua e entrega contínua (CI/CD) que permite automatizar a sua compilação, testar e pipeline de implantação. É possível criar fluxos de trabalho que criam e testam cada pull request no seu repositório, ou implantar pull requests mesclados em produção. [^1]"

# Utilidades & vantagens
- Roda na maioria dos [sistemas operacionais](https://docs.github.com/en/actions/using-jobs/choosing-the-runner-for-a-job) atuais
- Suporte a automações em [conteineres Docker](https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container)
- Integrações com APIs externas, webhooks
- Baseado na comunidade
- **Automatize tudo!**

# Exemplos
- [Dynacover - Capas dinâmicas p/ Twitter](https://github.com/erikaheidi/dynacover-actions)
- [ImportDevTo](https://github.com/erikaheidi/importDevTo)
- [Deploy Automático com GITHUB ACTIONS em Hospedagem Compartilhada em 12 minutos](https://github.com/gabrielfroes/github-actions-ftp)

# Preço
[![Tabela de preços do GitHub Actions](https://i.imgur.com/4cGT0Aa.png)](https://github.com/features/actions)

# Máquina
[![image](https://github.com/odonatojunior/ps-github-actions/assets/53847430/eb7e3eab-9126-4dc8-b69f-10b32d4cd840)](https://docs.github.com/pt/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources)

# Anatomia
As actions utilizam a sintaxe de arquivos `yml` para seu funcionamento

```yml
name: Release

on:
  push:
    branches:
      - main
  pull_request:
    branches: ['main']

jobs:
  release:
    name: Release

    strategy:
      matrix:
        os: ['ubuntu-latest', 'windows-latest']
     runs-on: ${{ matrix.os }} 

    - name: Lint
      run: yarn lint

    - name: Release
      env:
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
        GIT_CREDENTIALS: ${{ secrets.GIT_CREDENTIALS }}
      run: npx semantic-release
```

# Exemplo prático
Vamos rodar uma action que faça um deploy automático de um site usando [Astro](https://astro.build/) dentro do [GitHub Pages](https://pages.github.com/)

```yaml

name: Build and deploy

on:
  push:
    branches:
      - main
  workflow_dispatch:
  

jobs:
  build:
    name: Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "lts/*"

      - name: GitHub Action for Yarn
        uses: Borales/actions-yarn@v4.2.0
        with:
          cmd: install --frozen-lockfile

      - name: Build Astro
        run: yarn build

      - name: Upload Pages Artifact
        uses: actions/upload-pages-artifact@v1
        with:
          path: ./dist

  deploy:
    name: Deploy
    
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
      
    permissions:
      contents: read
      pages: write
      id-token: write
      
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v1
      

```


[^1]: https://docs.github.com/pt/actions/learn-github-actions/understanding-github-actions
