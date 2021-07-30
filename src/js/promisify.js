'use strict';
import '../sass/promisify.scss';

// Task 3.1

const delay = (ms) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(ms);
        }, ms);
    })
};

const logger = time => console.log(`Fulfilled after ${time}ms`);

// Tests
delay(2000).then(logger); // Fulfilled after 2000ms
delay(1000).then(logger); // Fulfilled after 1000ms
delay(1500).then(logger); // Fulfilled after 1500ms



// Task 3.2

const users = [
    { name: 'Mango', active: true },
    { name: 'Poly', active: false },
    { name: 'Ajax', active: false },
];



function toggleUserState(allUsers, userName) {
    return new Promise((resolve) => {

        const updatedUsers = allUsers.map((user) =>
            user.name === userName
                ? { ...user, active: !user.active }
                : user);

        resolve(updatedUsers);
    })
};

toggleUserState(users, 'Mango').then(console.table);
toggleUserState(users, 'Ajax').then(console.table);




// Task 3.3

const randomIntegerFromInterval = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
};

const makeTransaction = (transaction) => {
    const delay = randomIntegerFromInterval(200, 500);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const canProcess = Math.random() > 0.3;

            if (canProcess) {
                resolve({ id: transaction.id, time: delay });
            } else {
                reject(transaction.id);
            }
        }, delay);
    })
};

const logSuccess = ({ id, time }) => {
    console.log(`Transaction ${id} processed in ${time}ms`);
};

const logError = id => {
    console.warn(`Error processing transaction ${id}. Please try again later.`);
};

// // The function should work like this
makeTransaction({ id: 70, amount: 150 }).then(logSuccess).catch(logError);
makeTransaction({ id: 71, amount: 230 }).then(logSuccess).catch(logError);