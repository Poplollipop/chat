package com.user.chat.controller;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter // 自動生成所有字段的Getter方法
@Setter // 自動生成所有字段的Setter方法
@AllArgsConstructor // 自動生成帶所有參數的構造函數
@NoArgsConstructor // 自動生成無參構造函數
@Builder // 提供建造者模式，便於創建物件
public class ChatMessage {

    /**
     * 消息的內容
     */
    private String content;

    /**
     * 發送消息的用戶名稱
     */
    private String sender;

    /**
     * 消息的類型（例如：JOIN、LEAVE、CHAT）
     */
    private MessageType type;

}
