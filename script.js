async function getCode() {
    const number = document.getElementById('num').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerText = "Waiting for code...";
    
    try {
        // Hapa utabadilisha na link ya Render yako baada ya kudeploy bot
        const response = await fetch(`https://bot-yako.onrender.com/code?number=${number}`);
        const data = await response.json();
        
        if(data.code) {
            resultDiv.innerText = "Your Code: " + data.code;
        } else {
            resultDiv.innerText = "Error: Could not get code.";
        }
    } catch (error) {
        resultDiv.innerText = "Bot is offline or error occured.";
    }
}

