const WEEK_LENGTH = 7;
const MONTHS = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
const DAYS = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];

function getDateArray(month,year){
  const firstDateOfMonth = new Date(year, month, 1);
  const lastDateOfMonth = new Date(year, month+1, 0);
  const firstDayOfMonth =firstDateOfMonth.getDay();
  let dateArray = new Array(42).fill(null);
  for(let i=firstDayOfMonth,j=1; j<=lastDateOfMonth.getDate(); i++,j++){
    dateArray[i]=j;
  }

  let splicedDateArray =[];
  while(dateArray.length>0){
    splicedDateArray.push(dateArray.splice(0,7));
  }

  return splicedDateArray;
}


module.exports={
  WEEK_LENGTH,
  MONTHS,
  DAYS,
  getDateArray
};