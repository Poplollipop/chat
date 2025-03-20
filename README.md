# Chat WebSocket System

## 專案簡介
這是一個基於 WebSocket 的即時聊天系統，提供簡單的用戶間消息交換功能。使用者可以在不同的聊天室中發送、接收消息，並進行即時交流。這個專案展示了如何使用 WebSocket 來實現即時雙向通信。

## 技術
- **前端**: HTML, CSS, JavaScript
- **後端**: Java (Spring Boot)
- **即時通信**: WebSocket

## 啟動指南
1. 安裝所需依賴：
   ```bash
   mvn install
   ```
   
2. 啟動後端：
   ```bash
   mvn spring-boot:run
   ```

```
/chat
 ├── src
 │    ├── main
 │    │    └── java
 │    │        └── com
 │    │            └── user
 │    │                └── chat
 │    │                    ├── config
 │    │                    │    ├── WebSocketConfig.java
 │    │                    │    └── WebSocketEventListener.java
 │    │                    ├── controller
 │    │                    │    ├── ChatController.java
 │    │                    │    ├── MessageType.java
 │    │                    │    └── ChatMessage.java
 │    │                    └── resources
 │    │                        └── static
 │    │                            ├── css
 │    │                            │    └── main.css
 │    │                            └── js
 │    │                                └── main.js
 ├── README.md
 ├── pom.xml
 ├── .gitignore

```
 ## 總結
本專案展示了如何使用 WebSocket 技術實現即時聊天系統。前端和後端通過 WebSocket 進行實時通信，提供用戶間的消息發送和接收。這個系統可擴展為更多功能，比如聊天室、私人消息、消息存儲等。
