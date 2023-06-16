const button = document.querySelector('#button-add')
const input = document.querySelector('#txt-task')
const fullList = document.querySelector('.list-tasks')

let list = []

function addNewTask() {
  if (input.value.length == 0) {
    alert('[ERRO] Digite alguma tarefa')
  } else {
    list.push({
      task: input.value,
      status: false
    })
    showTask()
    input.value = ''
    input.focus()
  }
}

function showTask() {
  let newLi = ''

  list.forEach((item, position) => {
    newLi += `
    <li class="task ${item.status == true ? 'done' : ''}">
      <img src="./assets/icon-check.png" alt="icon-check" onclick="finishTask(${position})"/>
      <p>${item.task}</p>
      <img src="./assets/icon-trash.png" alt="icon-trash" onclick="deleteItem(${position})" />
    </li>
    `
  })

  fullList.innerHTML = newLi

  localStorage.setItem('list', JSON.stringify(list))
}

function finishTask(position) {
  list[position].status = !list[position].status

  showTask()
}

function deleteItem(position) {
  list.splice(position, 1)

  showTask()
}

function reloadTask() {
  const localStorageTask = localStorage.getItem('list')

  if (localStorageTask) {
    list = JSON.parse(localStorageTask)
  }

  showTask()
}

reloadTask()
button.addEventListener('click', addNewTask)
