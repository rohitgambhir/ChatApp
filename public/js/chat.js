const socket = io()   

// Elements 
const $messageForm = document.querySelector('#signup');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocation = document.querySelector('#send-location');
// location where to message be put on 
const $messages = document.querySelector('#messages');

// Templates

// script ke andr wali html hai ye .
const messageTemplate=document.querySelector('#message-template').innerHTML;
const locationTemplate=document.querySelector('#location-template').innerHTML;

// Options join page bnaane ke baad ,console mh location.search krenge toh , jo username aur konsa room mh entry hui hai uski info , hme miljaayegi , things will be done .!
const {username , room}= Qs.parse(location.search , {ignoreQueryPrefix : true}) ;
// it will delete ? from location.search from prefix.
// ab username aur room ko backend pe bhejdenge emit at bottom of file .


// we get this because ,
// client is listening of event of message which server must be emitting and with event data , so we print it on client side.
// remember that , 'rohit' path is equivalent to 'message' ,as we know that written in line 20 , now where we want client to see that ? we can control that . 

// now this msg is object after utils file and emiting object from index.js file .
socket.on('message' , (msg)=>{
    console.log(msg);
    const html = Mustache.render(messageTemplate,{
        message:msg.text,
        // createdAt: msg.createdAt
        createdAt:moment(msg.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend' , html);
    // with this much 24 line , we are able to render the script tag html to our client side html . we want text of input to be rendered , so we need to inject our text to that script tag ,where is that text ? it's  present inside , emiting send button .i guess , but we will take it initially and inject it to script id = "message-template" having html.line no 24 will pass params to index.html which is to be rendered.

})
// url is now object
socket.on('locationMessage' , (url)=>{
    console.log(url.url);
    const html = Mustache.render(locationTemplate,{
        url:url.url,
        createdAt:moment(url.createdAt).format('h:mm a') // the url we have defined in index.html wants to have this url which server is sending to it , which client had sent to server .
    });
    $messages.insertAdjacentHTML('beforeend' , html);
 });





socket.on('location' , (obj)=>{
     console.log(obj.lat);
     console.log(obj.long);
})
var x = document.querySelector('#signup');
if(x){
    x.addEventListener('submit' , (e) => {
        e.preventDefault();
        // form to disabled at this moment after submitting button is clicked once .
        $messageFormButton.setAttribute('disabled' , 'disabled');



        let val = document.querySelector('input');
        // for all the input tag of form , so each input has name property , so we can use it's name as : let val = e.target.elements.name (add name of that input) and done.
        let msg = val.value;
        // socket.emit('sendMessage' , msg);
        // now we are going to emit msg with acknowldegment .
        socket.emit('sendMessage' , msg , (error)=>{
            // form to be enabled ,
            $messageFormButton.removeAttribute('disabled');
            $messageFormInput.value='';
            $messageFormInput.focus();
             if(error){
                  return console.log(error);
             }
              console.log('Message delivered');
        })
         
    });
}
document.querySelector('#send-location').addEventListener('click' , () => {
    //  all browsers don't support it
    if(!navigator.geolocation){
        return alert('GeoLocation is not supported by your browser');
    }
    // getCurrentPostion doesnot support promise async function
    // we are going to now fetch it so , disabled it right now after clicking , before fetching
    $sendLocation.setAttribute('disabled' , 'disabled');
    navigator.geolocation.getCurrentPosition( (position) =>{
         console.log(position);
        //  it gives us coords object , we just need it's latitude and longitude.
        let latt = position.coords.latitude;
        let longg = position.coords.longitude;
        let posobj = {
           lat: latt,
           long: longg
        }
        // expecting acknowldegment
        socket.emit('sendLocation' , posobj , ()=>{
            //  make button enabled here
            $sendLocation.removeAttribute('disabled');
             console.log('Location Shared');

        });
    })


})






// for bad words , simply install npm install bad-words and then import it to your server and then from there we will send that this is bad or good .

socket.emit('join' , {username , room});