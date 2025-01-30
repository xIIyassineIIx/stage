import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'startTime',
  standalone: true
})
export class StartTimePipe implements PipeTransform {

  transform(value: string):string {
    let date_depot=new Date(value)
    let date1=new Date(date_depot.setDate(date_depot.getDate()+10))

  return date1.getDate()+"-"+ (date1.getMonth()+1)+"-"+date1.getFullYear();
    

  }


}
