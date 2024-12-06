package com.user.chat.controller;

/**
 * 定義消息的類型枚舉，用於標識不同的消息事件。
 */
public enum MessageType {

    /**
     * 聊天消息，用戶之間的普通聊天內容。
     */
    CHAT,

    /**
     * 加入消息，用戶進入聊天室時的通知消息。
     */
    JOIN,

    /**
     * 離開消息，用戶退出聊天室時的通知消息。
     */
    LEAVE
}
