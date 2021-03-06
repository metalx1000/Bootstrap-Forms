function submit(url,form, scroll){
  if(typeof url === 'undefined'){url = "update.php"}
  if(typeof form === 'undefined'){form = $("#mainForm")}
  if(typeof scroll === 'undefined'){scroll = false}

  //set timestamp and pid
  $("#pid").val(genPID());
  $("#date").val(timeStamp());

  //check if comments exist and encode them
  if( $("#comments") ){
    var comments = $("#comments").val(); 
    comments = htmlEncode(comments);
    //comments = encodeURIComponent(comments);
    $("#comments").val(comments);
  }
 
  $.post(url, form.serialize(),function(data){
    //console.log(data);
  }).done(function(){
    form.val("");
    updateList();
    if(scroll){
      $('html, body').animate({
          scrollTop: $(document).height()
      }, 'slow');          
    }
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

function htmlEncode(str){
  str = str.replace(/'/g,"&#39;");
  str = str.replace(/>/g,"&#62;");
  str = str.replace(/</g,"&#60;");
  return str;
}

function autoCreate(form){
  if(!$("#pid").length){
    form.append('<input type="text" class="form-control" name="pid" id="pid" style="display:none">');
  }

  if(!$("#date").length){
    form.append('<input type="text" class="form-control" name="date" id="date" style="display:none">');
  } 

} 
