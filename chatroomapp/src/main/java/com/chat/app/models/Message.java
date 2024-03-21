package com.chat.app.models;

import java.time.LocalTime;

public class Message {
    private String name;
    private String content;
    private LocalTime contentTime;

    public Message(String name, String content, LocalTime contentTime) {
        this.name = name;
        this.content = content;
        this.contentTime = contentTime;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalTime getContentTime() {
        return contentTime;
    }

    public void setContentTime(LocalTime contentTime) {
        this.contentTime = contentTime;
    }
}
