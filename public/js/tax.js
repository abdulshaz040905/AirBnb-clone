let tax = document.getElementById('flexSwitchCheckDefault');

tax.addEventListener("click", () => {
    let tax_amt = document.getElementsByClassName("tax-amt");

    for (let t of tax_amt) {
        if (t.style.display === "none" || t.style.display === "") {
            t.style.display = "inline";  // show it
        } else {
            t.style.display = "none";    // hide it
        }
    }
});
