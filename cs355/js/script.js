$(document).ready(function () {
    $("#navbar-frame").load("navbar.html");
});

 $(document).ready(function(){
   $.ajax({
     url:'https://venus.cs.qc.cuny.edu/~huxi8128/cs355/backend/status/',
     type:'GET',
     success:function(response){
       if(response.data["loggedin"]==true){
         document.getElementById("signin").style.display="none";
         document.getElementById("signup").style.display="none";
         document.getElementById("welcome").innerHTML="Welcome, " + response.data["username"];
         document.getElementById("logout").style.display="inline";
       } else {
         document.getElementById("signin").style.display="inline";
         document.getElementById("signup").style.display="inline";
         document.getElementById("welcome").style.display="none";
         document.getElementById("logout").style.display="none";
       }
     }
   });
 });
