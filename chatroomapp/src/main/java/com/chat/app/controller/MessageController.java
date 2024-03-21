package com.chat.app.controller;

import com.chat.app.models.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MessageController {
    /**
     * If someone wants to send a message then "/message" this url we will use with this @MessageMapping annotation
     * If someone subscribed with this url "/topic/return-to" then we will send all the messages to that user
     * so for that we will use @SendTo this annotation
     * In the config class we are using /topic so here also
     * registry.enableSimpleBroker("/topic"); (This is from the config class)
     * @param message
     * @return
     */
    @MessageMapping("/message")
    @SendTo("/topic/return-to")
    public Message getContent(@RequestBody Message message) {

        try {
//            processing means we can store the messages in db here or else get the messages
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        return message;
    }
}
