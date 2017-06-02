import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe }            from '@angular/common';

@Pipe({name: 'day'})
export class DayPipe extends DatePipe implements PipeTransform {

  transform( value: string ): string {
    var today = super.transform(new Date(Date.now()), 'EEEE, MMM d' );
    var yesterday = super.transform(new Date(Date.now() - 86400000), 'EEEE, MMM d' );

    if ( value == today) { return 'Today' }
    else if (value == yesterday ) { return 'Yesterday' }
    else { return value; }
  }

}
