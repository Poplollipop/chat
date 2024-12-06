package com.user.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller // 標註為Spring的控制器，用於處理WebSocket相關請求
public class ChatController {

    /**
     * 處理發送消息的請求
     * @param chatmessage ChatMessage物件，包含消息的內容和發送者信息
     * @return ChatMessage 返回消息，會發送給所有訂閱者
     */
    @MessageMapping("/chat.sendMessage") // 指定STOMP客戶端發送消息的目的地為 "/app/chat.sendMessage"
    @SendTo("/topic/public") // 指定消息發送的目標主題為 "/topic/public"
    public ChatMessage sendMessage(@Payload ChatMessage chatmessage) {
        return chatmessage; // 將收到的消息直接轉發
    }

    /**
     * 處理添加用戶的請求
     * @param chatMessage ChatMessage物件，包含用戶名等信息
     * @param headerAccessor SimpMessageHeaderAccessor，用於操作WebSocket會話頭部
     * @return ChatMessage 返回消息，通知所有訂閱者有新用戶加入
     */
    @MessageMapping("/chat.addUser") // 指定STOMP客戶端發送消息的目的地為 "/app/chat.addUser"
    @SendTo("/topic/public") // 指定消息發送的目標主題為 "/topic/public"
    public ChatMessage addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor) {
        // 將用戶名存入WebSocket會話的屬性中，方便後續操作
        headerAccessor.getSessionAttributes().put("username", chatMessage.getSender());
        return chatMessage; // 將加入用戶的消息廣播給所有訂閱者
    }

}
