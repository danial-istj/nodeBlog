import fs from 'fs'

// //read
// fs.readFile('./docs/text.txt',(err,data)=>{
//     if (err)throw err;

//     console.log(data.toString())


// })

// //write
// fs.writeFile('./docs/text.txt','hello ninjas',(err)=>{
//         if (err)throw err;
//             console.log('file written')
// })

// //directories
// if (!fs.existsSync('./assets')) {
//     fs.mkdir('./assets', (err) => {
//         if (err) throw err;

//         console.log('folder created')
//     })
// }
// else {
//     fs.rmdir('./assets', (err) => {
//         if (err) throw err;

//         console.log('folder deleted')
//     })
// }

// //deleting files
// if(fs.existsSync('./docs/deleteme.txt')){
//     fs.unlink('./docs/deleteme.txt',()=>{
//         console.log('file deleted')
//     })
// }



