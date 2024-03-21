# Real-time-chat-application-using-Web-Socket
Here we are going to learn about the web socket concept by creating one chat application in spring boot where multiple user can chat with each other  in a single page 

# Overview
This document serves as a guide to understand and implement a real-time chat application using WebSocket in a Spring Boot environment. WebSocket enables full-duplex communication channels over a single TCP connection, making it ideal for real-time applications like chat systems.

# Technologies Used
# Spring Boot: A popular Java-based framework for building production-grade applications.
WebSocket: A protocol providing full-duplex communication channels over a single TCP connection.
STOMP (Simple Text Oriented Messaging Protocol): A subprotocol for WebSocket that defines message formats and communication patterns.
SockJS: A JavaScript library that provides a WebSocket-like object for browsers that do not support WebSocket directly.
WebJars: A client-side web libraries packaged into JAR files.
Implementation Details
1. Dependencies
The project utilizes several dependencies managed by Maven:

spring-boot-starter-websocket: Provides WebSocket support in Spring Boot.
webjars-locator-core: Locates WebJars by implementing the WebJar API.
sockjs-client: JavaScript library providing WebSocket emulation.
stomp-websocket: Library for providing STOMP support over WebSocket.
bootstrap: Frontend framework for designing responsive and mobile-first websites.
jquery: JavaScript library for simplifying HTML document traversing, event handling, and animation.
2. WebSocket Configuration
WebSocket is enabled and configured through a dedicated WebSocketConfig class. Key configurations include:

Stomp Endpoint Registration: Configuration for registering WebSocket endpoints, allowing clients to connect. In this implementation, the endpoint /server1 is registered with SockJS support.
Message Broker Configuration: Configuration for message brokers enabling message sending and receiving. The enableSimpleBroker method enables a simple memory-based message broker. The setApplicationDestinationPrefixes method specifies the prefix to use for client-side destinations.
3. Controller Logic
The MessageController class handles incoming messages and broadcasts them to subscribed clients. Annotations such as @MessageMapping and @SendTo are used to define the message handling and broadcast destinations, respectively.

4. Frontend Integration
The frontend of the chat application can be developed using HTML, CSS, and JavaScript. Bootstrap and jQuery libraries are utilized for responsive design and DOM manipulation, respectively. WebSocket connections are established using SockJS and STOMP libraries on the client-side.

# Conclusion
Implementing a real-time chat application using WebSocket in Spring Boot provides a scalable and efficient solution for facilitating instant communication between users. By leveraging WebSocket's bidirectional communication capabilities and Spring Boot's robust framework, developers can create responsive and interactive chat experiences for their users.


# MY NOTES ---->


#                                                           -- Real time chat application --


Here we are going to learn about the web socket concept by creating one chat application in spring boot where multiple user can chat with each other 
in a single page 

Normally in HTTP protocol a client will request something to the server and then server will send the response to the client as per the request
and also server will not recognise or save the request any where its like client will send and server will receive and send the response 

But in chat application scenario is not that here client and serevr are connected with each other if te client want to left then only client will 
disconnected from the server . So for that we are using web socket . This is a bidirectional protocol . This is a full duplex protocol . 

Here we will do something like if the client will send the request to the server we will accept the request and we will connect together
(client <-> server)
by the help of web socket , this will establish the connection in betweedn serverand the client .
This connection will be connected with each other for that time when no can can terminate with other 

This is the official doc for web socket -->

https://spring.io/guides/gs/messaging-stomp-websocket

I added all the doc for the class and the method in the application  we can refer from there 

In the application -->

To connect with server we have URL : "/server1"
To send the message we have URL : "/app/message" and here we will send the message {JSON}
To sybscribe so that we can receive messages we have URL : "/topic/return-to"
