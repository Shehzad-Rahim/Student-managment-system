#! /usr/bin/env node

import inquirer from "inquirer";

// Student Managment System

const randomNum:number = Math.floor(Math.random() * 100000);

let myBalance:number = 0;

let answer = await inquirer.prompt([{
    name: 'student',
    type: 'input',
    message: 'Enter student name',
    validate: function (value) {
        if (value.trim() !== '') {
            return true;
        } else {
            return 'Please enter student name';
        }
    }
},
    {
        name: 'courses',
        type: 'list',
        message: 'Select your course',
        choices: ['Graphic designing','Video editing','Web development','Freelancing', 'Content writing']
    }
]
);

const tutionFees: {[key: string]: number} = {
    'Graphic designing': 2000,
    'Video editing': 3000,
    'Web development': 5000,
    'Freelancing': 4000,
    'Content writing': 3500,
}

console.log(`\nTution Fees: ${tutionFees[answer.courses]}/- \n`);
console.log(`Balance: ${myBalance}\n`);

let paymentType = await inquirer.prompt([
    {
        name: 'payment',
        type: 'list',
        message: 'Select payment type',
        choices: ['Cash', 'Card', 'Jazzcash', 'Bank transfer', 'Raast']
    },
    {
        name: 'amount',
        type: 'input',
        message: 'Enter amount',
        validate: function (value) {
            if (value.trim()!== '') {
                return true;
            } else {
                return 'Please enter amount';
            }
        }
    }
])

console.log(`You Selected payment type: ${paymentType.payment}\n`);

const tutionFee = tutionFees[answer.courses]
const paymentAmount = parseFloat(paymentType.amount)

if(tutionFee === paymentAmount){
    console.log(`Congratulations ${answer.student} you have successfully enrolled in ${answer.courses} Course.\n`); 

    let ans = await inquirer.prompt([
        {
            name: 'select',
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View Status', 'Exit']
        }
    ])

    if (ans.select === 'View Status') {
        console.log('\n********* Student Status *********\n');
        console.log(`Student Name: ${answer.student}`);
        console.log(`Student Id: ${randomNum}`);
        console.log(`Course: ${answer.courses}`);
        console.log(`Paid Tution Fees ${paymentAmount}`);
        console.log(`Balance: ${myBalance =+ paymentAmount}`);  

    }else{
        console.log('**** Exited ****');
        
        console.log(`\nThank you ${answer.student} for having our academic services\n`);
        
    }

}else if(tutionFee > paymentAmount){
    console.log(`Your balance is insufficient for ${answer.courses} you have to pay ${tutionFee} for enrollment`);
    
}else {
    console.log(`Please pay only ${tutionFee} to enroll in ${answer.courses}.\n`);
    
}
