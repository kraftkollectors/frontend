
async function test() {
    const req = await fetch('https://backends-865y.onrender.com/users');
    const res = await req.text();
    console.log(res);
}

setInterval(async () => {
    await test();
}, 1000 * 60 * 6);