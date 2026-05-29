const buyBtn = document.getElementById("buyBtn");

buyBtn.addEventListener("click", async () => {

    const phone = prompt("Enter M-PESA Number");

    if (!phone) {
        alert("Phone number required");
        return;
    }

    try {

        const response = await fetch("YOUR_RENDER_BACKEND_URL/pay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ phone })
        });

        const data = await response.json();

        alert(data.message);

    } catch (error) {
        alert("Server Error");
    }
});