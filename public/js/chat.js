const socket = io()   
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
        let val = document.querySelector('input');
        // for all the input tag of form , so each input has name property , so we can use it's name as : let val = e.target.elements.name (add name of that input) and done.
        let msg = val.value;
        socket.emit('texts' , msg);
    });
}
document.querySelector('#send-location').addEventListener('click' , () => {
    //  all browsers don't support it
    if(!navigator.geolocation){
        return alert('GeoLocation is not supported by your browser');
    }
    // getCurrentPostion doesnot support promise async function
    navigator.geolocation.getCurrentPosition( (position) =>{
         console.log(position);
        //  it gives us coords object , we just need it's latitude and longitude.
        let latt = position.coords.latitude;
        let longg = position.coords.longitude;
        let posobj = {
           lat: latt,
           long: longg
        }
        socket.emit('sendLocation' , posobj);
    })


})






