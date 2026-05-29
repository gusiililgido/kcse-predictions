const buyBtn = document.getElementById("buyBtn");

buyBtn.onclick = async function () {

    const phone = prompt("Enter Phone Number");

    if (!phone) {
        alert("Enter phone number");
        return;
    }

    try {

        const response = await fetch("https://kcse-backend-an26.onrender.com/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                phone: phone
            })
        });

        const text = await response.text();

        alert(text);

    } catch (err) {

        alert("Server Error");
        console.log(err);
    }
};