const { spawn } = require('child_process');
const request = require('supertest');
const expect = require('chai').expect;

describe('Node.js Application', () => {
  let appProcess;
  const appUrl = 'http://localhost:8000'; // Replace with the actual URL of your application

  // Start your Node.js application using nodemon before running tests
  before((done) => {
    appProcess = spawn('node', ['app.js']); // Replace 'app.js' with your entry file
    appProcess.stdout.on('data', (data) => {
      if (data.toString().includes('App running on port 3000...')) {
        done();
      }
    });
  });

  // Stop the Node.js application after running tests
  after(() => {
    appProcess.kill();
  });

//   it('should start without errors', async () => {
//     const response = await request(appUrl).get('/');
//     expect(response.status).to.equal(200);
//     expect(response.text).to.include('Welcome to my API!'); // Adjust based on your application's response
//   });

  // Add more test cases as needed
});
