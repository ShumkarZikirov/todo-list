'use strict'
//Время дата
const dateShow = document.querySelector('.h6')

let date = new Date()
let options = {
	month: 'long',
	day: 'numeric',
	weekday: 'long',
	timezone: 'UTC',
}
dateShow.innerHTML = date.toLocaleDateString('ru', options)

const input = document.querySelector('input')
const btnAdd = document.querySelector('.btn-outline-success')
const blockList = document.querySelector('.list-div')
const btnDelete = document.querySelector('.btn-delete')
const btnCompl = document.querySelector('.completed')
// buttons
const btns = document.querySelectorAll('.main-nav-li')
const ulBtns = document.querySelector('.main-nav-ul')
// Блоки
// Главный блок
const mainBlock = document.querySelectorAll('.component')
const btnMain = document.querySelector('.main-block')
const blockCompleted = document.querySelector('.completed-main')
// Удаленный Блок
const divDelete = document.querySelector('.main-delete')
const blockDelete = document.querySelector('.block-delete')
const btnLeftDelete = document.querySelector('.delete-btn')

let todos = []

function addTodo(text) {
	const todo = {
		text,
		done: false,
		id: `${Math.random()}`,
	}
	todos.push(todo)
	render()
}

function deleteTodo(id) {
	todos.forEach(todo => {
		if (todo.id === id) {
			todo.done = true
		}
	})
}
function render() {
	let html = ''
	todos.forEach((todo) => {
		if (todo.done) {
			return
		}
		html += `
			<div class="block-div">
				<p>${todo.text}</p>
				<div>
					<a href="#" class="complted"><i data-id="${todo.id}" class="bi bi-check2-all"></i></a> 
					<button class="btn-delete"><i data-id="${todo.id}" class="bi bi-trash3"></i></button>
					
				</div>
			</div>
		`
	})
	blockList.innerHTML = html
}
function task(id) {
	todos.forEach(texts => {
		if (id == texts.id) {
			blockList.childNodes[1].childNodes[1].style.textDecoration =
				'line-through'
		}
	})
}
const removeItem = (index, id) =>{
	todos.splice(index, 1)
	console.log('asd');
	filt(id)
}
btnAdd.addEventListener('click', e => {
	const text = input.value
	input.value = ''
	if(text == 0){
		return
	}
	addTodo(text)
	render()
	e.preventDefault()
})
const filt = (id)=> {
	let deles = '';
	todos.forEach((compled, index) => {
		if(compled.id == id){
			deles += `
				<div class="block-div">
					<p style="text-decoration:line-through">${compled.text}</p>
					<div>
						<button class="btn-delete"><i onclick="removeItem(${index, compled.id})" data-id="${compled.id}" class="bi bi-trash3"></i></button>
					</div>
				</div>
			`;
		}
	})
	divDelete.innerHTML = deles
	
}
blockList.addEventListener('click', e => {
	if (e.target.className === 'bi bi-trash3') {
		const id = e.target.dataset.id;
		todos.forEach(delet => {
			if(delet.id == id){
				blockCompleted.innerHTML += `
					<div class="block-div">
						<p style="color: red;font-style: italic;">${delet.text}</p>
						<div>
							<p>${date.getHours()} часов ${date.getMinutes()} минут</p>
						</div>
					</div>
				`;
			}
		})
		deleteTodo(id)
		render()
	}
	if (e.target.className === 'bi bi-check2-all') {
		const id = e.target.dataset.id
		filt(id)
		deleteTodo(id)
		render()
	}
})

render()

ulBtns.addEventListener('click', function (e) {
	e.preventDefault()
	const clickBtn = e.target.closest('.main-nav-li')
	if (!clickBtn) return
	btns.forEach(button => {
		button.classList.remove('hover')
		clickBtn.classList.add('hover')
	})
	mainBlock.forEach(content => content.classList.remove('active'))
	mainBlock.forEach(content => content.classList.remove('hidden'))
	document
		.querySelector(`.block--${clickBtn.dataset.tab}`)
		.classList.add('active')
})


