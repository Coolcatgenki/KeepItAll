export function year(){
  let day = new Date();
  
  let Year = day.getFullYear();
  return Year;
  }

  export function FullTime(){
    let day = new Date();
    let minutes= new Date();
    
    let minutesOfDay= minutes.getMinutes();
    let hourOfDay = day.getHours();
    if(minutesOfDay>=10){
      return hourOfDay+":"+minutesOfDay;
    }else
    return hourOfDay+":"+"0"+minutesOfDay;
    }




export function color(hourOfDay){
  if ((5 > hourOfDay && hourOfDay>=0) || (hourOfDay >= 19)) {
    return "blue";
  }
  if (19 > hourOfDay && hourOfDay > 12) {
    return "orange";
  }
  
  if (12 >= hourOfDay && hourOfDay >= 5) {
    return "yellow";
  }
}





export function greeting(hourOfDay){
  if ( (5 > hourOfDay && hourOfDay>=0) || (hourOfDay >= 19)) {
    return "Evening";
  }
  if (19 > hourOfDay && hourOfDay > 12) {
    return "Afternoon";
  }
  
  if (12 >= hourOfDay && hourOfDay >= 5) {
    return "Morning";
  }
}