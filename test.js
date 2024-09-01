
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


// void function(){
//     const a = new FormData();
//     a.append('a', 'b');
//     a.append('a', 'd');

//     console.log(formDataToObject(a))
//   }();


// const nums = [1,2,3];
// const nums2 = [4,5,6];
// const joined = [...nums, ...nums2];
// console.log(joined)

// const student = {
//     name: "ts",
//     age: 18,
// }

// const {name, } = student;

// console.log(others)