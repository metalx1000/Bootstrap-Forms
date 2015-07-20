function submit(url,form){
    if(!$("#pid").length)){
      form.append('<input type="text" class="form-control" name="pid" id="pid" style="display:none">');
    }

    if(!$("#date").length)){
      form.append('<input type="text" class="form-control" name="date" id="date" style="display:none">');
    }  

    $("#pid").val(genPID());
    $("#date").val(timeStamp());
  
    $.post(url, form.serialize(),function(data){
      //console.log(data);
    }).done(function(){
      form.val("");
      updateList();
      $('html, body').animate({
          scrollTop: $(document).height()
      }, 'slow');          
    });
}

function genPID() {
  var length = 8,
      charset = "abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
  }

  var stamp = timeStamp();
  return stamp + retVal;
}

//Get Date/Time in 12 Hour AM/PM format
function formatAMPM(date) {
  var d = new Date(0);
  date = d.setTime(date);
  date = new Date(date);
  var day = date.toDateInputValue();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = day + " " + hours + ':' + minutes + ampm;
  return strTime;
}

//Formatted Date
Date.prototype.toDateInputValue = (function() {
  var local = new Date(this);
  local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
  return local.toJSON().slice(0,10);
}); 

function timeStamp(){
  return new Date().getTime()
} 
