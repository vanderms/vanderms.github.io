Ecommerce Product é um dos desafios propostos no site [Frontend Mentor](https://www.frontendmentor.io). E embora eu tenha tido acesso ao design apenas no formato **.png**, a minha solução ficou extremamente próxima ao design original - houve apenas uma diferença mínima de espaçamento no texto - e o único erro detectado na avaliação automática da **Frontend Mentor** foi eu ter utilizado como **heading**  principal uma `<h2>`, ao invés, de uma `<h1>`  _- por alguma razão, eu imaginava que a `<h1>` era exclusiva da homepage ☺_.

O projeto marcou duas mudanças em relação aos meus anteriores. A primeira delas é que eu usei Typescript no lugar de JavaScript. E a segunda é que houve uma quase completa substituição do **Flexbox Layout** pelo **Grid Layout**.

Quanto ao TypeScript, a manipulação do DOM, às vezes, foi um pouco complicada com incontáveis _asserções de tipo (type assertions)_, tendo em vista os diversos tipos de elementos e nós HTML. Por outro lado, o `null check` me fez reconhecer mais de uma vez um erro prematuramente e o `autocomplete` do VSCODE funciona, com efeito, muito melhor com TypeScript. Por essas razões, eu pretendo continuar utilizando essa linguagem de programação nos próximos projetos web, inclusive, em SPA's ReactJS.

Quanto ao Grid Layout, por outro lado, eu não tenho nem _"contras"_ para colocar em uma balança. Usar o `grid` me pareceu simplesmente muito superior ao flex, em especial, por que a medida `fr` dispensa o uso de  complicados `calc()` para evitar que o elemento ocupe um espaço superior a 100% e a propriedade `gap` é muito mais simples para a criação de um espaço entre os elementos de um **grid container** do que o uso de `el:not(:first-child){margin-left:...}` para a criação dessa mesma distância entre elementos de um **flex-container**.

No mais, o projeto foi relativamente simples de se construir: levou aproximadamente umas dez horas para ficar pronto.

