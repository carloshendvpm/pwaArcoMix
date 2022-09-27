const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const product = document.querySelector('#m-product')
const category = document.querySelector('#m-category')
const price = document.querySelector('#m-price')
const btnSave = document.querySelector('#btnSave')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    product.value = itens[index].product
    category.value = itens[index].category
    price.value = itens[index].price
    id = index
  } else {
    product.value = ''
    category.value = ''
    price.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.product}</td>
    <td>${item.category}</td>
    <td>R$ ${item.price}</td>
    <td class="action">
      <button style="color:blue;" onclick="editItem(${index})"><i class='bx bx-edit blue' ></i></button>
    </td>
    <td class="action">
      <button style="color:red; "onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSave.onclick = e => {
  
  if (product.value == '' || category.value == '' || price.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].product = product.value
    itens[id].category = category.value
    itens[id].price = price.value
  } else {
    itens.push({'product': product.value, 'category': category.value, 'price': price.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()