// --- 替换为您的密钥信息 ---
const AUTH_TOKEN = 'OqSFS2EppKQRi0DYBOTFNEQgW7pljRjT'; 

// Blynk 的服务器地址
const BLYNK_HOST = 'blynk.cloud'; 
// 您在 ESP32 代码中设置的虚拟引脚
const VIRTUAL_PIN = 'v1'; 

// 舵机转到最大角度（改为 90）
const PICKUP_ANGLE = 90;  // ← ← ← 在这里改！！！

// 舵机返回初始角度（重置云端状态）
const RETURN_ANGLE = 0;


/**
 * 构造并发送 HTTP GET 请求到 Blynk API，并立即重置云端状态
 * @param {number} value 要设置的舵机角度 (应为 90)
 */
async function sendCommand(value) {
    const url_push = `https://${BLYNK_HOST}/external/api/update?token=${AUTH_TOKEN}&${VIRTUAL_PIN}=${value}`;
    const url_reset = `https://${BLYNK_HOST}/external/api/update?token=${AUTH_TOKEN}&${VIRTUAL_PIN}=${RETURN_ANGLE}`;

    document.getElementById('status').innerText = `Status: Sending ${value} degrees...`;

    try {
        let response_push = await fetch(url_push);
        if (!response_push.ok) {
            document.getElementById('status').innerText = `Status: PUSH Failed! (Code: ${response_push.status})`;
            return;
        }

        document.getElementById('status').innerText = `Status: PUSH Success. Resetting cloud...`;

        let response_reset = await fetch(url_reset);
        if (response_reset.ok) {
            document.getElementById('status').innerText = `Status: Command ${value}° Sent & Cloud Reset Successfully!`;
        } else {
            document.getElementById('status').innerText = `Status: PUSH Success, but RESET Failed! (Code: ${response_reset.status})`;
        }

    } catch (error) {
        document.getElementById('status').innerText = `Status: Network Error!`;
    }
}

// --- 事件监听器 ---
document.getElementById('pickUpButton').addEventListener('click', () => {
    sendCommand(PICKUP_ANGLE);  // 这里用的是 90°！
});
