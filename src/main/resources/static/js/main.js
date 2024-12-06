'use strict'; // 使用嚴格模式，避免潛在的錯誤

// 選取頁面上的元素
var usernamePage = document.querySelector('#username-page'); // 用戶名頁面容器
var chatPage = document.querySelector('#chat-page'); // 聊天頁面容器
var usernameForm = document.querySelector('#usernameForm'); // 用戶名表單
var messageForm = document.querySelector('#messageForm'); // 訊息表單
var messageInput = document.querySelector('#message'); // 訊息輸入框
var messageArea = document.querySelector('#messageArea'); // 訊息顯示區域
var connectingElement = document.querySelector('.connecting'); // 連接提示元素

// WebSocket 客戶端和用戶名變數
var stompClient = null; 
var username = null;

// 定義隨機生成用戶頭像顏色的顏色列表
var colors = [
    '#4F4F4F', '#750075', '#CA8EFF', '#006000',
    '#009393', '#0000C6', '#D26900', '#FFFF37',
    '#FF6347', '#FFD700', '#32CD32', '#1E90FF',
    '#8A2BE2', '#FF4500', '#2E8B57', '#FF1493',
    '#00BFFF', '#800080', '#C71585', '#7FFF00'
];

/**
 * 用戶連接到 WebSocket
 * @param {Event} event 提交事件
 */
function connect(event) {
    // 獲取用戶名並去掉前後空格
    username = document.querySelector('#name').value.trim();

    // 如果用戶名有效，開始連接
    if (username) {
        // 隱藏用戶名頁面，顯示聊天頁面
        usernamePage.classList.add('hidden');
        chatPage.classList.remove('hidden');

        // 創建 WebSocket 連接
        var socket = new SockJS('/ws'); // 使用 SockJS 創建 WebSocket 連接
        stompClient = Stomp.over(socket); // 使用 Stomp 客戶端封裝連接

        // 建立連接，成功後執行 onConnected，失敗則執行 onError
        stompClient.connect({}, onConnected, onError);
    }
    event.preventDefault(); // 防止表單默認提交
}

/**
 * 連接成功後的回調
 */
function onConnected() {
    // 訂閱公眾話題
    stompClient.subscribe('/topic/public', onMessageReceived);

    // 向伺服器發送加入訊息
    stompClient.send("/app/chat.addUser", 
        {}, 
        JSON.stringify({ sender: username, type: 'JOIN' })
    );

    // 隱藏連接提示
    connectingElement.classList.add('hidden');
}

/**
 * 連接失敗後的回調
 * @param {Object} error 錯誤信息
 */
function onError(error) {
    // 顯示錯誤信息
    connectingElement.textContent = '無法連接到 WebSocket 伺服器，請刷新頁面重試！';
    connectingElement.style.color = 'red'; // 設置錯誤字體顏色為紅色
}

/**
 * 發送訊息
 * @param {Event} event 提交事件
 */
function sendMessage(event) {
    var messageContent = messageInput.value.trim(); // 獲取輸入訊息並去掉空格
    if (messageContent && stompClient) { // 如果訊息不為空且連接已建立
        var chatMessage = {
            sender: username, // 發送者
            content: messageInput.value, // 訊息內容
            type: 'CHAT' // 訊息類型
        };
        stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage)); // 發送訊息到伺服器
        messageInput.value = ''; // 清空輸入框
    }
    event.preventDefault(); // 防止表單默認提交
}

/**
 * 接收訊息
 * @param {Object} payload 收到的訊息內容
 */
function onMessageReceived(payload) {
    var message = JSON.parse(payload.body); // 解析訊息內容

    var messageElement = document.createElement('li'); // 創建列表元素

    if (message.type === 'JOIN') { 
        // 用戶加入事件
        messageElement.classList.add('event-message'); // 添加樣式
        message.content = message.sender + ' 加入了聊天！'; // 設置內容
    } else if (message.type === 'LEAVE') {
        // 用戶離開事件
        messageElement.classList.add('event-message'); // 添加樣式
        message.content = message.sender + ' 離開了聊天！'; // 設置內容
    } else {
        // 普通聊天訊息
        messageElement.classList.add('chat-message'); // 添加樣式

        // 創建頭像元素
        var avatarElement = document.createElement('i');
        var avatarText = document.createTextNode(message.sender[0]); // 使用用戶名的第一個字母作為頭像
        avatarElement.appendChild(avatarText);
        avatarElement.style['background-color'] = getAvatarColor(message.sender); // 設置頭像背景顏色

        messageElement.appendChild(avatarElement); // 添加頭像到訊息

        // 添加用戶名
        var usernameElement = document.createElement('span');
        var usernameText = document.createTextNode(message.sender);
        usernameElement.appendChild(usernameText);
        messageElement.appendChild(usernameElement);
    }

    // 添加訊息內容
    var textElement = document.createElement('p');
    var messageText = document.createTextNode(message.content);
    textElement.appendChild(messageText);

    messageElement.appendChild(textElement); // 將訊息內容添加到訊息元素
    messageArea.appendChild(messageElement); // 將訊息添加到訊息區域
    messageArea.scrollTop = messageArea.scrollHeight; // 自動滾動到最新訊息
}

/**
 * 根據用戶名生成頭像顏色
 * @param {string} messageSender 發送者用戶名
 * @returns {string} 對應顏色
 */
function getAvatarColor(messageSender) {
    var hash = 0; // 初始化hash值
    for (var i = 0; i < messageSender.length; i++) {
        hash = 31 * hash + messageSender.charCodeAt(i); // 計算hash
    }
    var index = Math.abs(hash % colors.length); // 計算顏色索引
    return colors[index]; // 返回顏色
}

// 綁定表單提交事件
usernameForm.addEventListener('submit', connect, true);
messageForm.addEventListener('submit', sendMessage, true);
