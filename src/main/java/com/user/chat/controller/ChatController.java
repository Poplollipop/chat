package com.user.chat.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;

@Controller
public class ChatController {
    
    @MessageMapping("/chat.sendMessage")
    @SendTo("/topic/public")

    public ChatMessage sendMessage(@Payload ChatMessage chatmessage){
        return chatmessage;
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public ChatMessage addUser(@Payload ChatMessage chatMessage,SimpMessageHeaderAccessor headerAccessor){
        
        // 新增使用者名稱，在Websocket暫存
        headerAccessor.getSessionAttributes().put("username" , chatMessage.getSender());
        return chatMessage;
    }

}
