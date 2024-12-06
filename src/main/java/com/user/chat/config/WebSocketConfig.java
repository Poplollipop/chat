package com.user.chat.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration // 表示這是一個Spring的配置類
@EnableWebSocketMessageBroker // 啟用WebSocket消息代理
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * 註冊STOMP端點，供客戶端連接WebSocket使用
     * StompEndpointRegistry物件，用於配置端點
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 添加一個名為 /ws 的端點，並啟用SockJS作為備援選項
        registry.addEndpoint("/ws").withSockJS();
    }

    /**
     * 配置消息代理
     * @param registry MessageBrokerRegistry物件，用於配置消息路由
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 設定應用程序目的地，發往服務器的消息需要以 /app 開頭
        registry.setApplicationDestinationPrefixes("/app");
        // 啟用簡單的內存消息代理，訂閱 /topic 的消息
        registry.enableSimpleBroker("/topic");
    }
}
