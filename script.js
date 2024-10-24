document.getElementById('studentForm').addEventListener('submit', addStudent);

function addStudent(event) {
    event.preventDefault();

    const studentId = document.getElementById('studentId').value;
    const studentName = document.getElementById('studentName').value;
    const studentGpa = document.getElementById('studentGpa').value;

    const student = { id: studentId, name: studentName, gpa: parseFloat(studentGpa) };

    let students = JSON.parse(localStorage.getItem('students')) || [];
    students.push(student);
    localStorage.setItem('students', JSON.stringify(students));

    displayStudents();
    document.getElementById('studentForm').reset();
}

function displayStudents() {
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const studentTable = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    studentTable.innerHTML = '';

    students.forEach(student => {
        const row = studentTable.insertRow();

        row.insertCell(0).innerText = student.id;
        row.insertCell(1).innerText = student.name;
        row.insertCell(2).innerText = student.gpa.toFixed(2);

        const actionsCell = row.insertCell(3);
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('delete-btn');
        deleteButton.onclick = () => deleteStudent(student.id);
        actionsCell.appendChild(deleteButton);
    });
}

function deleteStudent(id) {
    let students = JSON.parse(localStorage.getItem('students')) || [];
    students = students.filter(student => student.id !== id.toString());
    localStorage.setItem('students', JSON.stringify(students));
    displayStudents();
}

function searchStudent() {
    const searchId = document.getElementById('searchId').value;
    const students = JSON.parse(localStorage.getItem('students')) || [];
    const student = students.find(student => student.id === searchId);

    const searchResult = document.getElementById('searchResult');
    if (student) {
        searchResult.innerText = `Found: ID: ${student.id}, Name: ${student.name}, GPA: ${student.gpa.toFixed(2)}`;
    } else {
        searchResult.innerText = `Student with ID ${searchId} not found.`;
    }
}

// Display students on page load
displayStudents();
