function saveArrayToLocalStorage(key, array) {
  localStorage.setItem(key, JSON.stringify(array));
}

function getArrayFromLocalStorage(key) {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : [];
}

// let accesKey = "toDoList123";
// let array1 = [
//   { id: 1, name: "1st ToDO" },
//   { id: 2, name: "2nd ToDO" },
// ];

// saveArrayToLocalStorage(accesKey, array1);
// const retrievedData = getArrayFromLocalStorage(accesKey);
// console.log(retrievedData);

export { saveArrayToLocalStorage, getArrayFromLocalStorage };

// so here the key can stay the same.
// the array needs to be allProjects
// the main code needs to retrieve and store the data using the above functions
