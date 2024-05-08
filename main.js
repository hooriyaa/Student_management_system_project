#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
class Student {
    static counter = 30000;
    id;
    name;
    courses;
    balance;
    constructor(n) {
        this.name = n;
        this.id = Student.counter++;
        this.courses = []; //initialize an empty array for courses
        this.balance = 1000;
    }
    //method to enroll a student in a course
    enroll_course(course) {
        this.courses.push(course);
    }
    //method to view a student Balance:
    view_balance() {
        console.log(`Balance for '${(chalk.bold.magentaBright.italic(this.name))}' is : '${(chalk.bold.green.italic(this.balance))}'`);
    }
    //method to pay student fees:
    pay_Fees(amount) {
        this.balance -= amount;
        console.log(`'$ ${(chalk.bold.green(amount))}' Fees paid sucessfully for '${(chalk.bold.magenta.italic(this.name))}'`);
        console.log(`Remaining Balance: '$ ${(chalk.bold.green(this.balance))}'`);
    }
    //method to display student fees:
    show_status() {
        console.log(`ID: ${(chalk.yellow(this.id))}`);
        console.log(`Name: ${(chalk.magentaBright(this.name))}`);
        console.log(`Courses: [${(chalk.green(this.courses))}]`);
        console.log(`Balance: $ ${(chalk.cyanBright(this.balance))}`);
    }
}
//Defining a student_manager Class to Manage students
class student_manager {
    students;
    constructor() {
        this.students = [];
    }
    //Method to add a new Student:
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: '${(chalk.bold.magentaBright.italic(name))}' added sucessfully. student ID '${(chalk.bold.green.italic(student.id))}'`);
    }
    enroll_student(student_id, course) {
        let student = this.find_student(student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`'${(chalk.bold.magentaBright.italic(student.name))}' enrolled in '${(chalk.bold.green.italic(course))}' sucessfully`);
        }
    }
    // Method to view a student balance.
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log(chalk.bold.blue.italic("student not found. Please enter a correct student ID"));
        }
    }
    //Method to pay student fees
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_Fees(amount);
        }
        else {
            console.log(chalk.bold.magenta.italic("student not found. Please enter a correct student ID"));
        }
    }
    // Method to display student status:
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    // Method to find student by student_id
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
// Main function to run a program:
async function main() {
    console.log(chalk.bold.cyan.italic("\t<<<", "-".repeat(50), ">>>"));
    console.log(chalk.bold.yellow(` \t  Welcome to "CodeWithHooriya": Student Management System`));
    console.log(chalk.bold.cyan.italic("\t<<<", "-".repeat(50), ">>>"));
    let Student_manager = new student_manager();
    //While loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("Select an option:"),
                choices: [
                    "Add student",
                    "Enroll student",
                    "View student balance",
                    "Pay Fees",
                    "Show status",
                    "Exit",
                ],
            },
        ]);
        // Using Switch case to handle user choice:
        switch (choice.choice) {
            case "Add student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student Name:",
                    },
                ]);
                Student_manager.add_student(name_input.name);
                break;
            case "Enroll student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student id:"
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a course name:"
                    }
                ]);
                Student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View student balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID:"
                    }
                ]);
                Student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID:"
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay:"
                    }
                ]);
                Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID:"
                    }
                ]);
                Student_manager.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.red("Exiting...."));
                process.exit();
        }
    }
}
// calling  a main function:
main();
