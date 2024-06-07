
// async function test() {
//     const req = await fetch('https://backends-865y.onrender.com/users');
//     const res = await req.text();
//     console.log(res);
// }

// setInterval(async () => {
//     await test();
// }, 1000 * 60 * 6);

function formDataToObject(formData){
    return Object.fromEntries(formData.entries())
}


void function(){
    const a = new FormData();
    a.append('a', 'b');
    a.append('a', 'd');

    console.log(formDataToObject(a))
  }();