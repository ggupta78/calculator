const keyClick = (event) => {
  console.log(event.target.id);
};

const allKeys = document.querySelectorAll('.key');
allKeys.forEach(key => {
  key.addEventListener('click', keyClick);
});
