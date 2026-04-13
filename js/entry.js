const dateIn = document.getElementById('entryDate');
dateIn.value = today;

function autoFillOpeningCash() {
    const selectedDate = dateIn.value;
    let d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    const prevDateStr = d.toISOString().split('T')[0];
    const prevEntry = history.find(h => h.date === prevDateStr);

    if (prevEntry) {
        document.getElementById('s1_open').value = prevEntry.s1_close || "";
        document.getElementById('s2_open').value = prevEntry.s2_close || "";
    }
}

function shareToWhatsApp() {
    const v = (id) => parseFloat(document.getElementById(id).value) || 0;

    const totalSale =
        (v('s1_home') + v('s1_close') + v('s1_exp') - v('s1_open')) +
        (v('s2_home') + v('s2_close') + v('s2_exp') - v('s2_open')) +
        v('s1_gpay') + v('s2_gpay');

    window.open(`https://wa.me/?text=Total Sale ₹${totalSale}`, '_blank');
}

async function saveEntry() {
    const v = (id) => parseFloat(document.getElementById(id).value) || 0;

    const entry = {
        date: dateIn.value,
        sale:
        (v('s1_home') + v('s1_close') + v('s1_exp') - v('s1_open')) +
        (v('s2_home') + v('s2_close') + v('s2_exp') - v('s2_open')) +
        v('s1_gpay') + v('s2_gpay'),

        cash: Math.round((((v('s1_home') + v('s1_close') + v('s1_exp') - v('s1_open')) +
        (v('s2_home') + v('s2_close') + v('s2_exp') - v('s2_open'))) * 0.40) / 100) * 100,

        bank: Math.round(((v('s1_gpay') + v('s2_gpay')) * 0.40) / 100) * 100,

        netCash:
        (v('s1_home') + v('s2_home')) -
        Math.round((((v('s1_home') + v('s1_close') + v('s1_exp') - v('s1_open')) +
        (v('s2_home') + v('s2_close') + v('s2_exp') - v('s2_open'))) * 0.40) / 100) * 100 -
        v('jeb_pay_out'),

        totalExp: v('s1_exp') + v('s2_exp') + v('gpay_exp'),
        jebOut: v('jeb_pay_out'),
        id: Date.now()
    };

    history.push(entry);
    localStorage.setItem('jmd_traders_v5', JSON.stringify(history));

    showToast("Saved!");
}
