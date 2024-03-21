var stompClient=null
   function sendMessage(){
       /*// Get the current time
       let currentTime = new Date();

       // Format the time as needed (e.g., HH:mm:ss)
       let formattedTime = currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();*/
        // Get the current time and format it as HH:mm:ss
           let currentTime = new Date();
           let formattedTime = currentTime.toTimeString().split(' ')[0]; // Extract HH:mm:ss part


    let jsonOb={
        name:localStorage.getItem("name"),
        content:$("#message-value").val(),
        contentTime: formattedTime
    }
    /*   This "/app/message" we defined in the controller class of our backend application and this will help us to
       send the message to the server*/
       /* stompClient have features to connect send and revive the message from the server*/

    stompClient.send("/app/message",{},JSON.stringify(jsonOb));
   }
//   Once we clicked on the enter button from the html page we will connect to the server by the below javascript function
   function connect()
{
/*    This "/server1" we defined in the config class of our backend application and this will help us to
 connect to the server*/
        let socket=new SockJS("/server1")
/* This stomp have facility to send the message so we need to give the socket object to the stomp , here
stomp will work over the socket*/
        stompClient=Stomp.over(socket)
        /* Now here by the help of stomp we are going to connect with the server , once it got connected
         the function will call*/
        stompClient.connect({},function(frame){
            console.log("Connected : "+frame)
            /* This way we can hide the 1st screen which is the enter name screen after that we will enter
            chat room screen "#name-from" this is coming from the html page  */
            /* $("#name-from").addClass('d-none')
                            $("#chat-room").removeClass('d-none')
            like this we are using bcz if  name-from this page will come then chat-room this page will not come
            and if chat-room this page will come then the other page which is name-from will be hide*/
            $("#name-from").addClass('d-none')
              $("#chat-room").removeClass('d-none')
              /*    This "/topic/return-to" we defined in the controller class of our backend application and this will help us to subscribe so that we can receive messages
                   from the server*/
                   /* after that  defined a callback function so that we will get the response */
                //subscribe
                stompClient.subscribe("/topic/return-to",function(response){
                        showMessage(JSON.parse(response.body))
                })
        })
}
/*This function will give the time response from "11:49:07" this to Output: "11hr. 49min 07sec"*/
function formatTime(timeString) {
     // Parse the time string into hours, minutes, and seconds
     let [hours, minutes, seconds] = timeString.split(':');

     // Construct the formatted time string
     let formattedTime = '';
     if (parseInt(hours) > 0) {
         formattedTime += parseInt(hours) + 'hr. ';
     }
     if (parseInt(minutes) > 0) {
         formattedTime += parseInt(minutes) + 'min ';
     }
     if (parseInt(seconds) > 0) {
         formattedTime += parseInt(seconds) + 'sec';
     }

     return formattedTime;
 }
/* function showMessage(message)
 {
    $("#message-container-table").prepend(`<tr><td><b>${message.name} :</b> ${message.content} :</b>${message.contentTime}</td></tr>`);
 }*/
 function showMessage(message) {
     // Format the content time as HH:MM:SS
//     let formattedTime = new Date(message.contentTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
     let formattedTimeString = formatTime(message.contentTime);
     // Create a table row to display the message
     let messageRow = `
         <tr>
             <td>
                 <div style="display: flex; align-items: center;">
                     <div style="font-weight: bold; margin-right: 5px;">${message.name}:</div>
                     <div style="margin-right: 5px;">${message.content}</div>
                     <div style="font-style: italic; color: #888;">(${formattedTimeString})</div>
                 </div>
             </td>
         </tr>
     `;

     // Prepend the message row to the message container table
     $("#message-container-table").prepend(messageRow);
 }
 function formatTime(timeString) {
     // Parse the time string into hours, minutes, and seconds
     let [hours, minutes, seconds] = timeString.split(':');

     // Construct the formatted time string
     let formattedTime = '';
     if (parseInt(hours) > 0) {
         formattedTime += parseInt(hours) + 'hr. ';
     }
     if (parseInt(minutes) > 0) {
         formattedTime += parseInt(minutes) + 'min ';
     }
     if (parseInt(seconds) > 0) {
         formattedTime += parseInt(seconds) + 'sec';
     }

     return formattedTime;
 }

$(document).ready((e)=>{

/* this is for the login button*/

   $("#login").click(()=>{
       let name=$("#name-value").val()
       localStorage.setItem("name",name)
       $("#name-title").html(`Welcome , <b>${name} </b>`)
       connect();
   })

/* this is for the send button*/

   $("#send-btn").click(()=>{
    sendMessage()
   })

/* this is for the logout button*/

$("#logout").click(()=>{
    localStorage.removeItem("name")
    if(stompClient!==null)
    {
        stompClient.disconnect()
         $("#name-from").removeClass('d-none')
         $("#chat-room").addClass('d-none')
         console.log(stompClient)
    }
})
})