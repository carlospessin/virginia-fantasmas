# Virginia — site estático

Site promocional da banda Virginia, de Maringá (PR), com foco no single
**Fantasmas**. O projeto não usa framework nem etapa de compilação: os
arquivos HTML, CSS, JavaScript e imagens são publicados diretamente.

## Começo rápido

Para visualizar a experiência principal, abra [`index.html`](index.html) em
um navegador ou sirva a pasta por HTTP:

```powershell
python -m http.server 8000
```

Depois acesse `http://localhost:8000/`.

Não há `package.json`, dependências locais, testes automatizados ou pipeline de
build configurados no estado atual.

## Estrutura atual

```text
.
├── index.html                 # Home atual: perfil e links da Virginia
├── styles.css                 # Estilos da home da raiz
├── script.js                  # Melhorias de acessibilidade para links externos
├── assets/                    # Imagens e ícones usados pelas páginas
└── pages/
    └── fantasmas/
        ├── index.html         # Landing page alternativa do lançamento
        ├── styles.css         # Sistema visual da landing page
        ├── script.js          # Countdown até 03/10/2026 às 06:00 BRT
        └── DESIGN.md          # Direção visual dessa experiência
```

### Qual página editar?

- Edite a raiz (`index.html`, `styles.css`, `script.js`) para mudanças na
  página inicial de links, que é a experiência atualmente exposta na raiz do
  site.
- Edite `pages/fantasmas/` somente para a landing page de lançamento acessível
  em `/pages/fantasmas/`. Ela é uma experiência independente, com outro
  layout, outra folha de estilos e outro script.
- Não mova ou renomeie assets sem atualizar todos os caminhos relativos. Os
  caminhos são resolvidos a partir do arquivo CSS ou HTML que os referencia.

## Arquitetura e fluxo

### Home da raiz

`index.html` é uma composição sem componentes reutilizáveis: hero, identidade,
cards de links, seção de mídia e rodapé. Os cards são links `<a>` completos,
com `target="_blank"` e `rel="noopener noreferrer"`.

`styles.css` concentra os tokens visuais em `:root`, o layout mobile-first e o
comportamento responsivo para telas maiores que 620px. O estado destacado usa
`.link-card--featured`; o foco usa `:focus-visible`.

`script.js` percorre os links que abrem nova aba e acrescenta um
`aria-label` informando esse comportamento quando o usuário clica.

### Landing page de Fantasmas

`pages/fantasmas/index.html` é uma página de lançamento com capa, contador,
data de lançamento e links de plataformas. O countdown é calculado no cliente
em `pages/fantasmas/script.js` a partir de
`2026-10-03T06:00:00-03:00`. Quando a data chega, o contador zera, recebe a
classe `.done` e o texto de disponibilidade é atualizado.

## Conteúdo e links conhecidos

| Conteúdo | Local | Destino/data |
| --- | --- | --- |
| Pré-save de Fantasmas | home da raiz | `https://sndo.ffm.to/do0aq3z` · 03.10.26 |
| Plataformas de escuta | home da raiz | Spotify agregador |
| Clipe “Quando Não Está” | home da raiz | YouTube |
| Matérias de imprensa | home da raiz | YouTube e PDF do Jornal O Maringá |
| Lançamento | landing page | 03/10/2026 às 06:00, horário de Brasília |

Ao alterar a data do lançamento, atualize o texto visível na home, o conteúdo
da landing page e a constante `releaseDate` do countdown. Prefira o formato
ISO com offset no JavaScript para não depender do fuso local do navegador.

## Sistema visual

A direção visual é escura, monocromática e editorial: carvão/preto, papel
envelhecido e ferrugem como cor de ação. A home usa Bebas Neue para display,
Manrope para leitura e DM Mono para metadados. A landing page documenta sua
direção em [`pages/fantasmas/DESIGN.md`](pages/fantasmas/DESIGN.md).

Ao adicionar um link:

1. Use um `<a>` nativo envolvendo o card inteiro.
2. Preserve `target="_blank"` com `rel="noopener noreferrer"` para destinos
   externos.
3. Mantenha `:hover` e `:focus-visible`; não dependa apenas de cor.
4. Escreva um título curto e uma linha secundária que explique o destino.
5. Confira o comportamento em viewport estreita e em teclado.

## Verificação manual

Como não há suíte automatizada, antes de publicar:

1. Abra a página raiz por HTTP e verifique imagens, fontes e todos os links.
2. Teste cada card com mouse e teclado; confirme o foco visível e a abertura em
   nova aba.
3. Teste em largura móvel e desktop.
4. Abra `/pages/fantasmas/` e confira o countdown, a virada para o estado
   disponível e os ícones das plataformas.
5. Em uma ferramenta de acessibilidade, confira idioma `pt-BR`, textos
   alternativos e contraste.
6. Rode `git diff --check` antes de entregar.

## Pontos de atenção para o futuro

- Existem duas experiências visuais e dois conjuntos de scripts. Antes de
  refatorar, defina se ambas continuarão públicas ou se uma será arquivada.
- Os assets são relativamente pesados, especialmente `assets/foto.jpg` e
  `assets/fantasmas.jpg`; otimização de imagens pode melhorar o carregamento.
- A landing page referencia ícones em caminhos CSS relativos a
  `../assets/`. Como os ícones estão em `assets/` na raiz, valide esses URLs se
  a landing page voltar a ser usada.
- O projeto não possui lint, testes, validação de links, CI ou instruções de
  deploy. Qualquer automação futura deve partir do fato de que a publicação é
  atualmente estática.
- Preserve alterações de conteúdo não relacionadas ao trabalhar na home; não
  use restaurações amplas do Git para “limpar” o diretório.

## Convenções de alteração

Faça mudanças pequenas e localizadas. Para conteúdo da home, prefira alterar
`index.html`; para tokens e layout, `styles.css`; para comportamento, o
`script.js` correspondente à experiência. Evite introduzir dependências para
interações que podem permanecer em HTML/CSS/JavaScript nativo.

Commits devem descrever o resultado, por exemplo: `add Fantasmas pre-save
card` ou `update release countdown date`.
