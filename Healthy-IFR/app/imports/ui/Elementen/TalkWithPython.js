export function test() {
    // const spawner = require('child_process').spawn;
    var {spawn} = require('child_process')


    //string
    const data_to_pass_in = "send this ";
    console.log("data is ", data_to_pass_in)
    const pythonProces = spawn('python', ['./python.py', data_to_pass_in])

    pythonProces.stdout.on('data', (data) => {
        console.log("data received is ", data.toString());
    });
}