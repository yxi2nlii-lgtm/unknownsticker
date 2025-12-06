// --- 替换为您的密钥信息 ---
// 🚨 必须替换为您在 ESP32 代码中使用的相同的 BLYNK_AUTH_TOKEN 🚨
const AUTH_TOKEN = 'OqSFS2EppKQRi0DYBOTFNEQgW7pljRjT'; 

// Blynk 的服务器地址
const BLYNK_HOST = 'blynk.cloud'; 
// 您在 ESP32 代码中设置的虚拟引脚
const VIRTUAL_PIN = 'v1'; 
// 舵机转到最大角度（拾取）
const PICKUP_ANGLE = 90;
// 舵机返回初始角度（返回）
const RETURN_ANGLE = 0;


/**
 * 构造并发送 HTTP GET 请求到 Blynk API
 * @param {number} value 要设置的舵机角度
 */
function sendCommand(value) {
    // 构造 API URL: https://blynk.cloud/external/api/update?token={token}&v1={value}
    const url = `https://${BLYNK_HOST}/external/api/update?token=${AUTH_TOKEN}&${VIRTUAL_PIN}=${value}`;

    document.getElementById('status').innerText = `Status: Sending ${value} degrees...`;

    // 使用 fetch API 发送请求
    fetch(url)
        .then(response => {
            if (response.ok) {
                document.getElementById('status').innerText = `Status: Command ${value}° Sent Successfully!`;
                console.log(`Command ${value} sent successfully.`);
            } else {
                // 如果失败，显示状态码帮助调试
                document.getElementById('status').innerText = `Status: Failed! (Code: ${response.status})`;
                console.error('API request failed:', response.statusText);
            }
        })
        .catch(error => {
            document.getElementById('status').innerText = `Status: Network Error! Could not reach Blynk.`;
            console.error('Network error:', error);
        });
}


// --- 事件监听器：绑定点击事件 ---

// 1. "I pick it up" 按钮：发送 180 度指令
document.getElementById('pickUpButton').addEventListener('click', () => {
    sendCommand(PICKUP_ANGLE); 
});

// 2. "Return" 按钮：发送 0 度指令
document.getElementById('returnButton').addEventListener('click', () => {
    sendCommand(RETURN_ANGLE); 
});
