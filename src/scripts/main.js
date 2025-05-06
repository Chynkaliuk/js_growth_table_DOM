'use strict';

const table = document.querySelector('table.field');
const appendRowBtn = document.querySelector('button.append-row');
const removeRowBtn = document.querySelector('button.remove-row');
const appendColumnBtn = document.querySelector('button.append-column');
const removeColumnBtn = document.querySelector('button.remove-column');

let tbody = table.querySelector('tbody');

if (!tbody) {
  tbody = document.createElement('tbody');

  const directRows = Array.from(table.children).filter(
    (child) => child.tagName === 'TR',
  );

  directRows.forEach((row) => tbody.appendChild(row));
  table.appendChild(tbody);
}

function updateButtonStates() {
  const rowCount = tbody.rows.length;
  const colCount = rowCount > 0 ? tbody.rows[0].cells.length : 0;

  appendRowBtn.disabled = rowCount >= 10;
  removeRowBtn.disabled = rowCount <= 2;

  appendColumnBtn.disabled = colCount >= 10;
  removeColumnBtn.disabled = colCount <= 2;
}

function appendRow() {
  const currentRows = tbody.rows.length;

  if (currentRows < 10) {
    const newRow = document.createElement('tr');
    const columnCount = tbody.rows.length > 0 ? tbody.rows[0].cells.length : 0;

    for (let i = 0; i < columnCount; i++) {
      const newCell = document.createElement('td');

      newRow.appendChild(newCell);
    }
    tbody.appendChild(newRow);
    updateButtonStates();
  }
}

function removeRow() {
  const rowCount = tbody.rows.length;

  if (rowCount > 2) {
    if (tbody.lastElementChild) {
      tbody.lastElementChild.remove();
    }
    updateButtonStates();
  }
}

function appendColumn() {
  const colCount = tbody.rows.length > 0 ? tbody.rows[0].cells.length : 0;

  if (colCount < 10) {
    for (const row of tbody.rows) {
      const newCell = document.createElement('td');

      row.appendChild(newCell);
    }
    updateButtonStates();
  }
}

function removeColumn() {
  const colCount = tbody.rows.length > 0 ? tbody.rows[0].cells.length : 0;

  if (colCount > 2) {
    for (const row of tbody.rows) {
      if (row.cells.length > 0) {
        if (row.lastElementChild && row.lastElementChild.tagName === 'TD') {
          row.lastElementChild.remove();
        }
      }
    }
    updateButtonStates();
  }
}

appendRowBtn.addEventListener('click', appendRow);
removeRowBtn.addEventListener('click', removeRow);
appendColumnBtn.addEventListener('click', appendColumn);
removeColumnBtn.addEventListener('click', removeColumn);

updateButtonStates();
