function saveData() {
    // Obtener los datos del formulario
    var formData = new FormData(document.getElementById('medicalForm'));

    // Convertir los datos del formulario en un objeto
    var data = {};
    formData.forEach((value, key) => data[key] = value);

    // Guardar los datos en el almacenamiento local (localStorage)
    var storedData = JSON.parse(localStorage.getItem('medicalRecords')) || [];
    var existingIndex = storedData.findIndex(record => record.lastName === data.lastName);

    if (existingIndex !== -1) {
        if (confirm("El registro ya existe. ¿Desea sobrescribirlo?")) {
            storedData[existingIndex] = data;
            alert("Registro sobrescrito con éxito.");
        }
    } else {
        storedData.push(data);
        alert("Registro guardado con éxito.");
    }

    localStorage.setItem('medicalRecords', JSON.stringify(storedData));
}

function closeForm() {
    window.close();
}

function searchByLastName() {
    var lastName = prompt("Ingrese el apellido a buscar:");
    if (lastName) {
        var storedData = JSON.parse(localStorage.getItem('medicalRecords')) || [];
        var result = storedData.find(record => record.lastName.toLowerCase() === lastName.toLowerCase());

        if (result) {
            alert("Registro encontrado:\n\n" + JSON.stringify(result, null, 2));
        } else {
            alert("No se encontró ningún registro con ese apellido.");
        }
    }
}
