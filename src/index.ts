import type {PersonInt} from "./entities/person/person.interface.js";
import {Professor} from "./entities/professor/professor.entity.js";
import {AssociateProfessor} from "./entities/AssociateProfessor/AssociateProfessor.entity.js";
import {Faculty} from "./entities/faculty/faculty.entity.js";
import {Student} from "./entities/student/student.entity.js";
import {Course} from "./entities/course/course.entity.js";
import {InMemoryStore} from "./entities/InMemoryStore/InMemoryStore.entity.js";

async function runDemonstration() {
    console.log("=== 0. Creating persons ===");

    const shevchenko: PersonInt = {
        name: {
            firstName: "Taras",
            lastName: "Shevchenko"
        },
        age: 45,
        email: "t.shevchenko@univ.edu"
    }
    const koval: PersonInt = {
        name: {
            firstName: "Olena",
            lastName: "Koval"
        },
        age: 28,
        email: "o.koval@univ.edu"
    }
    const ivan: PersonInt = {
        name: {
            firstName: "Ivan",
            lastName: "Melnik"
        },
        age: 17,
        email: "i.melnik@univ.edu"
    }
    const anna: PersonInt = {
        name: {
            firstName: "Anna",
            lastName: "Boiko"
        },
        age: 16,
        email: "a.boiko@univ.edu"
    }

    console.log(`Person: ${shevchenko.name.firstName[0]}. ${shevchenko.name.lastName}`);
    console.log(`Person: ${koval.name.firstName[0]}. ${koval.name.lastName}`);
    console.log(`Person: ${ivan.name.firstName[0]}. ${ivan.name.lastName}`);
    console.log(`Person: ${anna.name.firstName[0]}. ${anna.name.lastName}`);

    console.log("\n=== 1. Creating teachers ===");

    const profShevchenko = new Professor(shevchenko, 20000)
    const docentKoval = new AssociateProfessor(koval, 16000)

    console.log(`${profShevchenko.getRoleDescription()} | Salary: ${profShevchenko.calculateSalary()}`);
    console.log(`${docentKoval.getRoleDescription()} | Salary: ${docentKoval.calculateSalary()}`);

    console.log("\n=== 2. Creating faculty and groups ===");

    const csFaculty = new Faculty("Faculty of Computer Science")

    const group15 = csFaculty.createGroup('Group-15', docentKoval)

    console.log(`Created group: ${group15.name} at the faculty ${csFaculty.name}`);

    console.log("\n=== 3. Students and grades ===");

    const studentIvan = new Student(ivan, "KB159165")
    const studentAnna = new Student(anna, "KB674111")

    group15.addStudent(studentIvan);
    group15.addStudent(studentAnna);

    const tsCourse = new Course("TypeScript Course", 5, profShevchenko);

    studentIvan.grades = { score: 95, date: new Date(), courseId: tsCourse.id }
    studentIvan.grades = { score: 70, date: new Date(), courseId: tsCourse.id }

    studentAnna.grades = { score: 95, date: new Date(), courseId: tsCourse.id }
    studentIvan.grades = { score: 99, date: new Date(), courseId: tsCourse.id }

    console.log(`Ivan GPA: ${studentIvan.calculateGPA()}`);
    console.log(`Anna GPA: ${studentAnna.calculateGPA()}`);
    console.log(`Average group grade ${group15.name}: ${group15.getGroupAverageScore()}`)

    console.log("\n=== 4. Global storage of data ===");

    const studentRepo = new InMemoryStore<Student>();
    await studentRepo.save(studentIvan);
    await studentRepo.save(studentAnna);

    const foundStudent = await studentRepo.findById(studentAnna.id)
    console.log(`Found in repository: ${foundStudent?.fullName} (${foundStudent?.email})`);

    console.log(`Total students in the repository: ${(await studentRepo.findAll()).length}`)

    console.log("\n=== 5. My task ===");

    const foundStudentByAge = await studentRepo.findWhere(student => student.age >= 16);

    foundStudentByAge.forEach(student => {
        console.log(`Found student by age: ${student.age} (${student.fullName})`);
    })
}

runDemonstration().catch(console.error);