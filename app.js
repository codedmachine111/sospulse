const seconds= document.querySelector(".time");
const start = document.getElementById("start")
var time=60;
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
      Body: "Help me!"+"\n"+"Latitude : " +lat +"\n"+","+"Longitude : "+lon,
    })
      .then(function (message) {
        alert("Mail sent successfully!")
        endmsg= document.createElement("p")
        endmsg.classList.add("endmsg")
        endmsg.innerHTML="Mail Sent Successfully!"
        seconds.append(endmsg)
      });
  }
