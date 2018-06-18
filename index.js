const $ = document.querySelector.bind(document);
const $input = $('#input');
const $queue = $('#queue');
const $preview = $('#preview');
const $addNewLine = $('#add-new-line');
const $switchMode = $('#switch-mode');

const sortableConfig = {
  group: 'omega',
  ghostClass: 'ghost',
  draggable: '.img-box',
};

Sortable.create($queue, sortableConfig);

$input.onchange = (e) => {
  const files = Array.prototype.slice.call(e.target.files);
  files.forEach(file => {
    const reader = new FileReader();
    
    const $imgBox = document.createElement('div');
    $imgBox.className = 'img-box';
    
    const $del = document.createElement('span');
    $del.className = 'del';
    $del.innerHTML = '×';
    
    const $size = document.createElement('span');
    $size.className = 'size';

    $del.onclick = () => {
      $imgBox.remove();
    }
    
    const $img = document.createElement('img');
    
    $img.onload = function () {
      $size.innerHTML = `${this.width}×${this.height}`;
    };

    $imgBox.append($img);
    $imgBox.append($del);
    $imgBox.append($size);
    $queue.append($imgBox);

    reader.addEventListener("load",() => {
      $img.src = reader.result;
    }, false);

    reader.readAsDataURL(file);
  });
}

$addNewLine.onclick = function() {
  const $line = document.createElement('div');
  $line.className = 'line';
  
  const $ctr = document.createElement('div');
  $ctr.className = 'ctr';

  const $select = document.createElement('select');
  $select.innerHTML = `
    <option value="default">default</option>
    <option value="gap">gap</option>
    <option value="polaroid">polaroid</option>
  `;
  $select.onchange = function() {
    $line.className = `line style-${this.value}`;
  };
  $ctr.append($select);

  const $button = document.createElement('button');
  $button.innerHTML = 'delete';
  $button.onclick = function () {
    $line.remove();
  };
  $ctr.append($button);

  $line.append($ctr);
  $preview.append($line);

  Sortable.create($line, sortableConfig);
}

$switchMode.onclick = function() {
  if (this.innerHTML.trim() === 'switch to print mode') {
    document.body.className = 'print-mode';
    this.innerHTML = 'switch to edit mode';
  } else {
    this.innerHTML = 'switch to print mode';
    document.body.className = 'edit-mode';
  }
}