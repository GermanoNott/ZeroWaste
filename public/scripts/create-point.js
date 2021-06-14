function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {
        for (const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selectione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        
        for (const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
    
}



document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)

    //Ítens de Coleta

    const itemsToCollect = document.querySelectorAll(".items-grid li")

    for (let item of itemsToCollect) {
        item.addEventListener("click", handleSelectedItem)
    }

    const collectedItems = document.querySelector("input[name=itens]")

    let selectedItems = []

    function handleSelectedItem(event) {

        const itemLi = event.target
        // adicionar ou remover uma classe usando o JS

        itemLi.classList.toggle("selected")
    
        const itemId = itemLi.dataset.id

    
        


        // verificar se existem ítens selecionados
        //Se sim pegar os ítens
        const alreadySelected = selectedItems.findIndex( item => {
            const itemFound = item == itemId //Isso será true ou False
            return itemFound
        })

        //Se já estiver selecionado, tirar da seleção
        if(alreadySelected >= 0){
            //tirar da seleção
            const filteredItems = selectedItems.filter(item => {
                const itemIsDifferent = item != itemId
                return itemIsDifferent
            })
            
            selectedItems = filteredItems
            
        } else {
            //se não estiver selecionado, adicionar na seleção
            selectedItems.push(itemId)
        }
        
        
        //Atualizar o campo escondido com os ítens selecionados
        collectedItems.value = selectedItems
    }
