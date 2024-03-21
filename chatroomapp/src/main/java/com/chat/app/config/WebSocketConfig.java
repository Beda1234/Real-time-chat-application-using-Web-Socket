package com.chat.app.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

// This is for make this class a config class
@Configuration
// This is for enable the message broker
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * This is for configure the server
     * If a user wants to connect then the user will connect with which server that we will define here
     * We are using javaScript that's why .withSockJS();
     * and we can give anything here "/server1"
     * before connecting client wants to connect so client will connect with this "/server1"
     * @param registry
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/server1").setAllowedOriginPatterns("*").withSockJS();
    }

    /**
     * This is for send and receive the message
     *
     * @param registry
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
       /* By this url we will enable the simple broker
        TO broadcast we will use this url we can check /topic in the controller class where we are using @SendTo("/topic/return-to")
         so this /topic is that controller url , By the url /topic url we are enabling the broker so that we will receive
        message in "/topic/return-to" this URL
        so for receiving the message we wil use /topic/return*/
        registry.enableSimpleBroker("/topic");
        /*We can write anything here like we have written here as "/app" after this we will write the url
        * which we are using in the controller class "/message"
        * So for sending the message we will use /app/message (/app from here and /message from the controller)*/
        registry.setApplicationDestinationPrefixes("/app");
    }
}
