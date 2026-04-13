const today = new Date().toISOString().split('T')[0];
let history = JSON.parse(localStorage.getItem('jmd_traders_v5')) || [];

function showToast(msg) {
    alert(msg);
}

async function fetchSheetData() {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyuIgJpUnkBegcB1lRxZkEB7F4WPRWKwvX9BuOVFwZV0Nq2lBheDG5QSYVeJVcmyZClPA/exec';
    try {
        const res = await fetch(scriptURL);
        const data = await res.json();
        history = data;
    } catch (e) {
        console.log("offline");
    }
}
