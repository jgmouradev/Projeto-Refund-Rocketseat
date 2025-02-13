// Seleciona todos os elementos do formulário.
const amount = document.getElementById("amount") // quantia ou valor
const form = document.querySelector("form")
const expense = document.getElementById("expense") // despesa
const category = document.getElementById("category")

// Seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const ExpensesQuantity = document.querySelector("aside header p span")
const expensesTotal = document.querySelector("aside header h2")

amount.oninput = () =>{
    // formatando o input para aceitar apenas números.
    let value = amount.value.replace(/\D/g, "")
    
    // Transforma o valor em centavos (Exemplo: 150/100 = 1.5, que é equivalente a R$ 1,50)
    value = Number(value) / 100 // transforma string em number
    // retorna o valor do input
    amount.value = formatCurrencyBRL(value)
    
}
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style:"currency",
        currency:"BRL",
    })
    return value
    
}

// Captura o evento de submit do form para obter os valores
form.onsubmit = (event) =>{
    // previne o comportamento padrão de recarregar a página
    event.preventDefault()

    // Cria um objeto co os detalhes da despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value, 
        category_id: category.value, 
        category_name: category.options[category.selectedIndex].text , //pega o texto selecionado na opção de categoria
        amount: amount.value,
        created_at: new Date()

    }
    expenseAdd(newExpense)
}
// Adiciona um novoitem na lista
function expenseAdd(newExpense){
    try {
        // cria o elemento para adicionar na lista
        const expenseItem = document.createElement('li') // adiciona o li na lista
        expenseItem.classList.add("expense") // adiciona a classe no li para obter a estilização

        // Cria o ícone da categoria
        const expenseIcon = document.createElement('img')
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`) // passa os atributos da img,de acordo com a categoria da despesa.
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // Cria a info da despesa.
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        // Cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        // Cria a categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        // Adiciona nome e categoria na div das informações da despesa
        expenseInfo.append(expenseName, expenseCategory)

        // Adiciona o valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        // // Adiciona o ícone de remover 
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "Remover")

        // Adiciona as informações no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)
        // Adiciona o item na lista
        expenseList.append(expenseItem)

        //Atualiza a quantidade e o total das despesas 
        UpdateTotals()
        formClear()


    } catch (error) {
        alert("Não foi possível atualizar a lista de despesas.")
        console.log(error)
        
    }
}

// Atualiza os totais das despesas (Quantidade de despesas e valor total)

function UpdateTotals(){
    try {
        
        // Busca todos os itens li na lista ul
        const items = expenseList.children

        // Atualiza a quantidade de itens na lista 

        ExpensesQuantity.textContent = `${items.length} ${items.length > 1 ?"despesas" : "despesa"}`

        // Variável para incrementar o total
        let total = 0

        // Percorre cada item (li) da lista (ul)
        for(let item=0;item < items.length; item++){
            const itemAmount = items[item].querySelector(".expense-amount")
        // Remove caracteres não numéricos e substitui a vírgula pelo ponto.
        let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".")
        
        // Converte o valor para float
        value = parseFloat(value)
        // Verifica se é um número válido
        if(isNaN(value)){
            return alert("Não foi possível calcular o total. O valor não parece ser um número") 
        }
        // Incrementando o valor total
        total+=Number(value)
        }
        // Cria a span para adicionar o símbolo R$ estilizado (class small)
        const symbolBRL= document.querySelector("small")
        symbolBRL.textContent ="R$"
        
        // Formata o valor e remove o R$ que será exibido pela classe small com um estilo personalizado.
        total=formatCurrencyBRL(total).toUpperCase().replace("R$","")
        // Limpa o conteúdo do elemento
        expensesTotal.innerHTML = ""
        // Adiciona o símbolo da moeda e o valor formatado.
        expensesTotal.append(symbolBRL, total)


    } catch (error) {
        console.log(error)
        alert("Não foi possível atualizar os valores totais!")
        
    }
}

// Evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {

    // Verificar se o elemento clicado é o ícone de remover
    if (event.target.classList.contains("remove-icon")) {
        
        // Obtem a li pai do elemento clicado
        const item = event.target.closest(".expense")
        // Remove o item da lista
        item.remove()
     }
     // Atualiza os valores totais
     UpdateTotals()
  
  
  })

  // Limpa os inputs do formulário 
function formClear() {
    expense.value = ""
    category.value = ""
    amount.value = ""
  
    // Coloca o foco no input de amount
    expense.focus()
  }




