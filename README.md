# Jogo da Memória — Linguagens de Programação

Aplicativo mobile em **React Native + Expo (SDK 57)** que implementa um jogo da
memória com figuras cadastradas pelo usuário, armazenadas localmente em
**SQLite**. Feito para a atividade de Programação Mobile.

## Como rodar

```bash
npm install          # instala as dependências
npx expo start       # inicia o Metro bundler
```

Abra no **Expo Go** (Android/iOS) lendo o QR Code, ou rode em um emulador com
`npx expo start --android` / `--ios`.

> Observação: o cadastro usa a galeria de fotos do aparelho (expo-image-picker),
> então o app funciona melhor em um dispositivo/emulador real.

## O que o app faz

- **Cadastro de figuras**: escolher uma imagem da galeria + digitar a descrição.
  Não deixa salvar sem imagem nem sem descrição. Lista e exclui figuras.
- **Partida**: sorteia 6 figuras, forma 6 pares e embaralha em 12 cartas.
  Cartas começam fechadas ("?"). Ao errar, conta o erro e vira as cartas de
  volta; ao acertar, o par fica visível.
- **Cronômetro** (bônus): tempo da partida em tempo real.
- **Animação** (bônus): cartas viram com animação (React Native `Animated`).
- **Ranking** (bônus): 5 melhores resultados, do melhor para o pior, salvos
  localmente.

## Arquitetura (divisão de responsabilidades)

O código fica todo em `src/`, separado por camadas — cada arquivo tem uma
responsabilidade clara, sem monolito e com o "CSS" (estilos) separado do JSX.

```
src/
  app/                 # ROTAS (Expo Router) — cada arquivo é uma tela
    _layout.js         # provider do banco + navegador (Stack)
    index.js           # menu inicial
    cadastro.js        # cadastro/listagem/exclusão de figuras
    jogo.js            # a partida (orquestra os hooks)
    ranking.js         # top 5 recordes

  components/           # COMPONENTES de UI reutilizáveis
    Botao.js
    Carta.js           # carta com animação de virar
    FiguraItem.js
    RankingItem.js

  styles/              # ESTILOS separados (um .styles.js por tela/componente)
    Botao.styles.js  Carta.styles.js  FiguraItem.styles.js
    RankingItem.styles.js  menu.styles.js  cadastro.styles.js
    jogo.styles.js  ranking.styles.js

  theme/               # TEMA central (evita valores soltos)
    cores.js  layout.js

  game/                # LÓGICA PURA do jogo (sem React, fácil de testar)
    montarPartida.js   # sortear 6, duplicar em pares, embaralhar 12
    pontuacao.js       # cálculo da pontuação

  hooks/               # ESTADO/comportamento reutilizável
    useCronometro.js   # tempo em tempo real
    useJogoMemoria.js  # regras da partida (viradas, erros, vitória)

  database/            # ACESSO A DADOS (SQLite) — as telas não usam SQL direto
    schema.js          # criação/migração das tabelas
    figurasRepository.js
    rankingRepository.js
```

### Por que essa separação

- **Rotas** só cuidam de navegação e de juntar as peças.
- **Componentes** cuidam só da aparência de um pedaço da tela.
- **Estilos** ficam em arquivos próprios (`.styles.js`), fora do JSX.
- **game/** tem funções puras: recebem dados e devolvem dados, sem React nem
  banco — por isso são fáceis de testar isoladamente.
- **hooks/** guardam o estado que muda ao longo do tempo.
- **database/** concentra o SQL; se um dia trocar o banco, muda só aqui.

## Banco de dados (SQLite)

Duas tabelas, criadas automaticamente na primeira execução (`src/database/schema.js`):

- `figuras (id, descricao, imagem_uri, criado_em)`
- `ranking (id, jogador, pontuacao, erros, tempo_segundos, data)`

## Verificação

```bash
npx expo lint        # sem erros
npx expo export --platform android   # bundle compila (1308 módulos)
```

A lógica pura de `game/` foi validada:
- `montarPartida` gera 12 cartas em 6 pares embaralhados;
- `calcularPontuacao` = 1000 − 50·erros − 2·segundos (mínimo 0).
