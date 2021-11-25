De um forma bem simples, em Ruby, o operador **`yield`** é responsável por executar, dentro de um método, um bloco de código passado como argumento.

A definição acima é bem sucinta, mas talvez não seja lá muito óbvia e é natural supor que algumas pessoas estejam agora se perguntando: mas o que é um bloco de código? Ou, como é que se passa um bloco como argumento? Vejamos: 

Em Ruby, é bem comum a criação de blocos de código _do lado direito_ da invocação de um método. Você provavelmente deve estar familiarizado com scripts como esse:

```
[0, 1, 2].each do |i|
  puts i
end

0.upto(2) do |i|
  puts i
end

3.times { |i| puts i }

```

Em todos os casos acima, os blocos, iniciados pela palavra reservada **`do`** ou pela chave **`{`**, são passados, respectivamente, para os métodos **`each`**, **`upto`** e **`times`** e, então, executados dentro desses métodos.

E aqui entra o **`yield`**, embora ele não seja o único a permitir que isso aconteça (v.g. também é possível executar _pedaços de código_ com procs, lambdas e enumerators), o **`yield`** é provavelmente a forma mais simples e eficiente de se fazer isso. Veja os seguintes exemplos:

```
#Exemplo 1:
def execute_algo
  yield
end

execute_algo do
  puts "Oi"
end

# saída:
# "Oi"


#Exemplo 2:
def produza_o_valor_zero
  yield 0    
end

produza_o_valor_zero do |i|
  puts i
end

# saída:
# 0  

#Exemplo 3:
def itere_um_array(array)
  array.each do |valor|
    yield valor
  end
end

itere_um_array([1, 2, 3]) do |valor|
  print "#{valor} "
end

# saída:
# 1 2 3
```

O _Exemplo 1_ é o método mais simples possível de ser criado contendo o **`yield`**. Ele funciona da seguinte maneira, quando o  **`yield`** é executado, Ruby roda o bloco passado como argumento e por isso imprime no terminal a palavra _Oi_.

O _Exemplo 2_, por sua vez, demonstra que o **`yield`** pode passar um (ou mais argumentos) para o bloco que de código. No caso, é passado o valor _0_ para o parâmetro **`i`** do bloco.

E no _Exemplo 3_, é possível perceber que o método que contém o **`yield`** pode receber outros argumentos além do bloco. No script, o método **`itere_um_array`** recebe um array como parâmetro e _yielda_ (ou produz, em bom português) cada um dos valores contidos nesse array.

Outro detalhe importante é que se um método contém o operador **`yield`**, ele não precisa necessariamente ser invocado com um bloco – o bloco é opcional. Contudo, se o bloco não for utilizado, o **`yield`** não poderá ser executado dentro do método. Para evitar que isso ocorra, existe o método **`block_given?`**, o qual retorna verdadeiro se um bloco foi passado, ou falso, caso contrário. Confira-se o seguinte exemplo:

```
def verifique_se_tem_bloco
  if block_given?
    yield "tenho um bloco"
  else
    puts "não tenho um bloco"
  end
end

verifique_se_tem_bloco()

# saida:
# não tenho um bloco
```

Note que na cláusula **`else`** foi usada a instrução **`puts "não tenho um bloco"`** e não algo como **`yield "não tenho um bloco"`**, porque, como não foi passado nenhum bloco de código, se o **`yield`** fosse executado dentro do método, Ruby irá lançar um erro do tipo **`LocalJumpError`**.

Mostrado o funcionamento básico desse operador, outros pontos importantes que precisam ser esclarecidos são: _que tipo de problemas práticos o **`yield`** resolve ou quando é aconselhado o seu uso?_

Um possível uso do **`yield`** seria criar um iterador flexível de estruturas de dados, onde as operações executadas em cada iteração podem variar. 

Um exemplo, suponhamos o seguinte problema: eu tenho um array multidimensional de inteiros e preciso saber se esse array contem mais valores pares ou ímpares. Se contiver mais valores pares, eu devo dividir todos os valores pares do array por _2_. E se tiver mais valores impares, eu devo multiplicar todos os valores ímpares por 3 e depois somar a 1.

Sem usar o **`yield`**, uma solução possível seria:

```
tabela = [[8, 17, 13], [24, 9, 11], [32, 46, 15]]
pares = 0
impares = 0

tabela.each do |linha|
  linha.each do |valor|
    if valor.even?
      pares+= 1
    else
      impares+= 1
    end
  end
end
 
tabela.each_index do |i|
  tabela[i].each_index do |j|
    if pares > impares && tabela[i][j].even?
      tabela[i][j] /= 2
    elsif impares > pares && tabela[i][j].odd?
      tabela[i][j] = tabela[i][j] * 3 + 1
    end    
  end
end

print tabela

# saida
# [[8, 52, 40], [24, 28, 34], [32, 46, 46]]
```

No script acima, observe que é necessário a criação, duas vezes, de dois laços de repeticão para iterar o array multidimensional. Agora confira, no exemplo abaixo, como o **`yield`** pode ser uma ótima ferramenta para deixar o código mais limpo e elegante:

```
tabela = [[8, 17, 13], [24, 9, 11], [32, 46, 15]]
pares = 0
impares = 0

def iterar_array(tabela)
  tabela.each_index {|i| tabela[i].each_index {|j| yield [i, j] }}
end

iterar_array(tabela) do |i, j|
  if tabela[i][j].even?
    pares+= 1
  else
    impares+= 1
  end
end

iterar_array(tabela) do |i, j|
  if pares > impares && tabela[i][j].even?
    tabela[i][j] /= 2
  elsif impares > pares && tabela[i][j].odd?
    tabela[i][j] = tabela[i][j] * 3 + 1
  end
end

print tabela

# saída
# [[8, 52, 40], [24, 28, 34], [32, 46, 46]]
```

Ainda tem dúvidas? Gostaria de fazer uma sugestão? Encontrou algum erro? sinta-se livre para enviar uma mensagem através do [formulário de contato](#contato) ou mande um email para vanderms.84@gmail.com.  
