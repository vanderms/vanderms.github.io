De um forma bem simples, em Ruby, o operador **`yield`** é responsável por executar, dentro de um método, um bloco de código passado como argumento.

A definição acima é bem curta, mas talvez não seja muito óbvia e é natural supor que algumas pessoas estejam agora se perguntando: mas o que é um bloco de código? Ou, como é que se passa um bloco como argumento? Vamos por partes. 

Em Ruby, é algo bem comum a criação de blocos de código _do lado direito_ da invocação de um método. Você provavelmente já deve ter visto scripts como esses:

```
[0, 1, 2].each do |i|
  puts i
end

0.upto(2) do |i|
  puts i
end

3.times { |i| puts i }

```

Em todos os casos acima, os blocos, iniciados pela palavra reservada **`do`** ou pela chave **`{`**, são passados, respectivamente, para os métodos **`each`**, **`loop`** e **`times`** e, então, executados dentro desses métodos.

E aqui entra o **`yield`**, embora ele não seja o único a permitir que isso aconteça (v.g. também é possível executar blocos com procs, lambdas e enumerators), o **`yield`** é provavelmente a forma mais simples e rápida de se fazer isso. Por exemplo, confira o seguinte código:

```
def produza_o_valor_zero
  yield 0    
end

produza_o_valor_zero do |i|
  puts i
end

# saída:
# 0  
```

No código acima, quando o operador **`yield`** é executado no método **`produza_o_valor_zero`**, Ruby _invoca_ o bloco de código e passa para ele como parâmetro **`i`** o valor 0.

O operador **`yield`** não precisa necessariamente estar em uma instrução isolada. Pelo contrário, uma posição comum para esse operador é ficar dentro de um laço de repetição. No caso abaixo, por exemplo, o metodo **`produza_infinitos_zeros`** produz, com efeito, um loop infinito de zeros.

```
def produza_infinitos_zeros 
  yield 0 while true
end

produza_infinitos_zeros do |i|
  print i
end

# saída
# 000000000000000000000000000000...
```

Ou dentro de um **`if`**. Confira-se:

```
def tipo_de_numero(numero)
  if numero.even?
    yield "par"
  else
    yield "ímpar"
  end
end

tipo_de_numero(5) do |tipo|
  puts tipo
end

# saída:
# ímpar
```

Um caso especial com o **`if`** (ou **`unless`**) é quando é necessário saber se um bloco foi passado como argumento para a função. Nesses casos, Ruby providencia o método **`block_given?`**. Confira-se:

```
def verifique_se_tem_bloco
  if block_given?
    yield "tenho um bloco"
  else
    puts "não tenho um bloco"
  end
end

verifique_se_tem_bloco #aqui o método é invocado sem que seja passado um bloco de código

# saida:
# não tenho um bloco
```

Note que na cláusula **`else`** é usado **`puts "não tem"`** e não o **`yield`**, porque, como não foi passado nenhum bloco de código, se o **`yield`** fosse executado, Ruby irá lançar um erro do tipo **`LocalJumpError`**.

Agora é hora para um exercício: com base nas informações acima, você poderia desenvolver um método, para iterar um array de duas dimensões. Por exemplo, considerando a tabela:

```
  tabela = [[8, 7, 3], [4, 9, 1], [2, 6, 5]]
```

O resultado esperado seria:

```
  8 7 3 4 9 1 2 6 5
```

Para isso, você deverá necessariamente usar o operador **`yield`**. Tente fazer por conta própria e se não conseguir (ou se não estiver tão interessado assim em tabelas), você poderá conferir uma possível solução logo abaixo.

.

.

.

.

**Solução**:

```
def iterar(tabela) 
    
  tabela.each do |linha|
    linha.each do |valor|
      yield valor

    end
  end
end

tabela = [[8, 7, 3], [4, 9, 1], [2, 6, 5]]

iterar(tabela) do |valor|
  print "#{valor} "
end
```

E aí como foi? Fácil, não é?

Dúvidas, sugestões ou erros ☺, sinta-se livre para enviar uma mensagem através do [formulário de contato](#contato).  