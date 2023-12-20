const studenti = [
    {
        ime: "Ivan",
        prezime: "Ivanić",
        JMBAG: "328409840"
    }
]


function addStudent (newStudent) {
    studenti.push(newStudent)
    return;
}

export const methods = {
    addStudent,
    studenti
}