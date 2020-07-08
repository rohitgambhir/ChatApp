const socket = io()   

// Elements 
const $messageForm = document.querySelector('#signup');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocation = document.querySelector('#send-location');


// we get this because ,
// client is listening of event of message which server must be emitting and with event data , so we print it on client side.
// remember that , 'rohit' path is equivalent to 'Message'
socket.on('rohit' , (msg)=>{
    console.log(msg);
})
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