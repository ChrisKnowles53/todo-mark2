function saveArrayToLocalStorage(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function getArrayFromLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : []; // I should change this to empty array to be hardcoded data when i create it
}

let accesKey = "toDoList123";
let array1 = [
  { id: 1, name: "1st ToDO" },
  { id: 2, name: "2nd ToDO" },
];

saveArrayToLocalStorage(accesKey, array1);
const retrievedData = getArrayFromLocalStorage(accesKey);
console.log(retrievedData);
