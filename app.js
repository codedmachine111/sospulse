const seconds= document.querySelector(".time");
const start = document.getElementById("start")
var time=10;
let lat
let lon

window.addEventListener('load', ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        lon= position.coords.longitude;
        lat=position.coords.latitude; 
        console.log(lon)
        console.log(lat)
        })  
    }
})

function showLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var latlongvalue = position.coords.latitude + ","+ position.coords.longitude;
    var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="+latlongvalue+"&amp;zoom=14&amp;size=400x300&amp;key=AIzaSyAz0ozJnKEQYdnz0Fr2dl_fLmekvuurmtw";
 }

function errorHandler(err) {
    if(err.code == 1) {
       alert("Error: Access is denied!");
    } else if( err.code == 2) {
       alert("Error: Position is unavailable!");
    }
 }
function getLocation(){
    if(navigator.geolocation){
       // timeout at 60000 milliseconds (60 seconds)
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition
       (showLocation, errorHandler, options);
    } else{
       alert("Sorry, browser does not support geolocation!");
    }
 
function timer(e) {
    if (time!=0) {
        time--;    
    }
    if (time==0) {
        alertmsg()
        
    }
    seconds.innerHTML=time;
}
function alertmsg(ev){
    clearInterval(starttime);
    sendEmail();
}
start.addEventListener('click', function(){
    function startinterval(){
        starttime=setInterval(() => {
            timer()
        }, 1000);
        
    }
    startinterval(); 
})


function sendEmail() {
    Email.send({
      Host: "smtp.gmail.com",
      Username: "akashdev1309@gmail.com",
      Password: "Akash1309#dev",
      To: 'charlesbabbage1709@gmail.com',
      From: "akashdev1309@gmail.com",
      Subject: "Emergency Message",
      Body: "Help me!"+"\n"+"Latitude : " +lat +"\n"+","+"Longitude : "+lon+img_url,
    })
      .then(function (message) {
        alert("Mail sent successfully!")
        endmsg= document.createElement("p")
        endmsg.classList.add("endmsg")
        endmsg.innerHTML="Mail Sent Successfully!"
        seconds.append(endmsg)
      });
  }
