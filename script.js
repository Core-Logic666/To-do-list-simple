 let tasks = [
    { id: 1, text: 'nonton yutub', cat: 'work', done: false },
    { id: 2, text: 'lari 2 jam', cat: 'health', done: false },
    { id: 3, text: 'main', cat: 'personal', done: true },
  ];
  let filter = 'all';
  let nextId = 4;

  document.getElementById('date-label').textContent =
    new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  function esc(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function render() {
    const list = document.getElementById('task-list');
    const visible = filter === 'all' ? tasks
      : filter === 'done' ? tasks.filter(t => t.done)
      : tasks.filter(t => !t.done);

    if (!visible.length) {
      list.innerHTML = `<div class="empty">${
        filter === 'done' ? 'No completed tasks yet.' :
        filter === 'active' ? 'No active tasks — add one above.' :
        'No tasks yet. Add one above!'
      }</div>`;
    } else {
      list.innerHTML = visible.map(t => `
        <div class="task-card${t.done ? ' done' : ''}">
          <div class="checkbox${t.done ? ' checked' : ''}" onclick="toggle(${t.id})">
            <div class="checkmark">
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M2 5.5L4.5 8L9 3" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <span class="task-text">${esc(t.text)}</span>
          <span class="badge ${t.cat}">${t.cat}</span>
          <button class="del-btn" onclick="deleteTask(${t.id})" title="Delete">&#x2715;</button>
        </div>
      `).join('');
    }

    const done = tasks.filter(t => t.done).length;
    document.getElementById('stat-total').textContent = tasks.length;
    document.getElementById('stat-done').textContent = done;
    document.getElementById('stat-left').textContent = tasks.length - done;
  }

  function toggle(id) {
    const t = tasks.find(t => t.id === id);
    if (t) { t.done = !t.done; render(); }
  }

  function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    render();
  }

  function addTask() {
    const input = document.getElementById('task-input');
    const cat = document.getElementById('cat-select').value;
    const text = input.value.trim();
    if (!text) { input.focus(); return; }
    tasks.unshift({ id: nextId++, text, cat, done: false });
    input.value = '';
    input.focus();
    render();
  }

  function setFilter(f, btn) {
    filter = f;
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    render();
  }

  document.getElementById('task-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') addTask();
  });

  render();