import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiposAdmin',
  standalone: true
})
export class TiposAdminPipe implements PipeTransform {

  transform(value: number, tipoAdmin: any[]): string {
    let t: any;
    for(t of tipoAdmin){
      if(t.idtipoAdministrador == value){
        return t .descripcion;
      }
    }
    return "no existe";
  }

}
