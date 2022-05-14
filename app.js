const seconds= document.querySelector(".time");
const btn= document.querySelector(".btn");
const start = document.getElementById("start")
var time=5;
let lat
let lon

window.addEventListener('load', ()=>{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position)=>{
        lon= position.coords.longitude;
        lat=position.coords.latitude; 
        })  
    }
})
function showLocation(position) {
    lat=position.coords.latitude;
    lon=position.coords.longitude;
    latlon=new google.maps.LatLng(lat, lon)
    mapholder=document.getElementById('mapholder')
    mapholder.style.height='250px';
    mapholder.style.width='50%';
  
    var myOptions={
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    };
    var map=new google.maps.Map(document.getElementById("mapholder"),myOptions);
    var marker=new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
 }

function errorHandler(error) {
    switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
 }
 function getLocation(){
    if(navigator.geolocation){
       var options = {timeout:60000};
       navigator.geolocation.getCurrentPosition
       (showLocation, errorHandler, options);
    } else{
       alert("Sorry, browser does not support geolocation!");
    }
 }
function sendEmail() {
    Email.send({
        Host:"smtp.elasticemail.com",
        Username:"charlesbabbage1709@gmail.com",
        Password : "30E8AF10CC5B318BEDF4A4ADB78C627980F1",
        To: 'rajveermohite1@gmail.com',
        From: "charlesbabbage1709@gmail.com",
        Subject: "Emergency Message",
        Body: " HELP ME!! I AM HERE : https://www.google.com/maps?ll="+lat+","+lon+"&z=15&t=m&hl=en-GB&gl=US&mapclient=apiv3",
    }).then(function (message) {
        alert("Mail sent successfully!")
        endmsg= document.createElement("p")
        endmsg.classList.add("endmsg")
        endmsg.innerHTML="Mail Sent Successfully! Do not worry we are sending HELP soon!)"
        seconds.innerHTML= '<img src="./media/tick.png" width=100 />'
        refmsg= document.createElement("p")
        refmsg.classList.add("refmsg")
        refmsg.innerHTML="Refresh page to send an SOS again."
        seconds.append(endmsg)
        seconds.append(refmsg)
        btn.innerHTML=""
      });
  }
//AIzaSyCpRqQ66qCxGMGNK-0Xknv4U-SakVTpIgA
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
function timer(e) {
    if (time!=0) {
        time--;    
    }
    if (time==0) {
        alertmsg()
        
    }
    seconds.innerHTML=time;
}



