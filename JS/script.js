
const loadApps = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    // displayApps(data.data.tools);
}