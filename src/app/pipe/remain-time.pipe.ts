import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'remainTime',
  standalone: true
})
export class RemainTimePipe implements PipeTransform {

  transform(value: string):string {
    let date=new Date();
    let date_depot=new Date(value)
    let date1=new Date(date_depot.setDate(date_depot.getDate()+10))
    date_depot.setDate(date_depot.getDate()-10)
    let date2=new Date(date_depot.setDate(date_depot.getDate()+15))
    date_depot.setDate(date_depot.getDate()-15)
    console.log(date1)
    console.log(date2)
    if(date2<date){
      return "auction ended"
    }
    else if(date1<date){
      return "Auction ends in "+ (date2.getDate()-date.getDate())+"D"+(date2.getHours()-date.getHours())+"H"+(date2.getMinutes()-date.getMinutes())+"Min"
    }
    else{
      return "auction unavailable"
    }

  }

}
