// Форма
// Список задач
const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];



(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});


  // Elemnts UI
  const listContainer = document.querySelector(
    '.tasks-list-section .list-group',
  );
  const listSectionContainer = document.querySelector('.tasks-list-section .container');
  const form = document.forms['addTask'];
  const inputTitle = form.elements['title'];
  const inputBody = form.elements['body'];
  



  // Events
  isTasks(objOfTasks);
  renderAllTasks(objOfTasks);
  createSortButtons ();

  const allTasksBtn = document.querySelector('.sort-all-btn');
  const unfinTasksBtn = document.querySelector('.sort-unfin-btn');

  form.addEventListener('submit', onFormSubmitHandler);
  listContainer.addEventListener('click', onDeletehandler);
  unfinTasksBtn.addEventListener('click', onSortUnfinHadler);
  allTasksBtn.addEventListener('click', onSortAllHadler);
  


  function isTasks(tasksList) {
    if (tasksList.lenght === 0 || Object.keys(tasksList).length === 0) {
      const p = document.createElement('p');
      p.classList.add('no-tasks');
      p.textContent = 'Ура! У Вас нет незавершенных задач!';
      listContainer.appendChild(p);
    }
    return
  }

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error('Передайте список задач!');
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).sort((prev, next) => (prev.completed - next.completed)).forEach(task => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, body, completed} = {}) {
    const li = document.createElement('li');
    li.classList.add(
      'list-group-item',
      'd-flex',
      'align-items-center',
      'flex-wrap',
      'mt-2',
      'all-tasks'
    );
    li.setAttribute('data-task-id', _id);

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100');

    const completedBtn = document.createElement('button');
    completedBtn. classList.add('btn', 'btn-success', 'ml-auto', 'completed-btn');
    completedBtn.textContent = 'Completed';

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article);
    li.appendChild(completedBtn);

    if (completed === true) {
      li.classList.add('completed');
      li.style.backgroundColor = "lightgreen";
      completedBtn.style.display = 'none';
      createComplAgain(li);
    } else {
      completedBtn.style.display = 'inline-block';
      createComplAgain(li).style.display = 'none';
    }
    

    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;

    if (!titleValue || !bodyValue) {
      alert('Пожалуйста введите title и body');
      return;
    }

    const task = createNewTask(titleValue, bodyValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement('afterbegin', listItem);
    form.reset();

    const p = document.querySelector('.no-tasks');
    p.remove();
  }

  function createNewTask(title, body) {
    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirm = confirm(`Точно вы хотите удалить задачу: ${title}`);
    if (!isConfirm) return isConfirm;
    delete objOfTasks[id];
    return isConfirm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeletehandler({ target }) {
    const parent = target.closest('[data-task-id]');
    const id = parent.dataset.taskId;
    if (target.classList.contains('delete-btn')) {
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
      isTasks(objOfTasks);
    } else if (target.classList.contains('completed-btn')) {
        onCompleteTask(parent, target, objOfTasks, id);
    } else if (target.classList.contains('complAgain-btn')) {
        onComplAgain(parent, target, objOfTasks, id);
    }
  }

 function onCompleteTask(parent, target, tasksList, id) {
     moveComplTask(parent);
     if (!parent.classList.contains('all-tasks')) {
      parent.classList.remove('d-flex');
      parent.classList.add('d-none');
     }
     parent.style.backgroundColor = "lightgreen";
     parent.classList.add('completed');
     target.style.display = 'none';
     if (tasksList[id]['completed'] === false) {
      tasksList[id]['completed'] = true;
     }
     createComplAgain(parent);
     
     
 }

 function createComplAgain (parent) {
   const complAgainBtn = document.createElement('button');
   complAgainBtn.classList.add('btn', 'btn-secondary', 'ml-auto', 'complAgain-btn');
   complAgainBtn.textContent = 'Complete the task again';
   parent.appendChild(complAgainBtn);
   return complAgainBtn;
 }

 function onComplAgain(parent, target, tasksList, id) {
  moveUnfinTask(parent);
  parent.style.backgroundColor = "white";
  parent.classList.remove('completed');
  target.style.display = 'none';
  if (tasksList[id]['completed'] === true) {
    tasksList[id]['completed'] = false;
   }
  parent.querySelector('.completed-btn').style.display = 'inline-block';
 }
     
 function createSortButtons () {
   const allTasksBtn = document.createElement('button');
   allTasksBtn.classList.add('btn', 'btn-info', 'sort-all-btn');
   allTasksBtn.textContent = 'показать все задачи';

   const unfinTasksBtn = document.createElement('button');
   unfinTasksBtn.classList.add('btn', 'btn-info', 'sort-unfin-btn');
   unfinTasksBtn.textContent = 'показать незавершенные задачи';

   listSectionContainer.insertAdjacentElement('afterbegin', unfinTasksBtn);
   listSectionContainer.insertAdjacentElement('afterbegin', allTasksBtn);
 }

 function onSortUnfinHadler (e) {
  const filterTasks = Object.values(objOfTasks).forEach(task => {
    if (task['completed'] === true) {
      const liAll = document.querySelectorAll('li');
      
      liAll.forEach(li => {
        if (li.dataset.taskId === task['_id']) { 
          li.classList.remove('d-flex');
          li.classList.add('d-none');
        } 
        li.classList.remove('all-tasks');
      })
    }
  })
 }

 function onSortAllHadler(e) {
  const liAll = document.querySelectorAll('li');
  liAll.forEach(li => {
    if (li.classList.contains('d-none')) {
      li.classList.remove('d-none');
      li.classList.add('d-flex');
    }
  })
 }

 function moveComplTask(parent) {
  const completedLi = listContainer.querySelector('.completed');
  listContainer.insertBefore(parent, completedLi);
 }

 function moveUnfinTask(parent) {
  const completedLi = listContainer.firstElementChild;
  listContainer.insertBefore(parent, completedLi);
 }


})(tasks);


