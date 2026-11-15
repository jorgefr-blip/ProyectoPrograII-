import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiposUsuario',
  standalone: true
})
export class TiposUsuarioPipe implements PipeTransform {

  transform(value: number, tipos: any[]): string {
    let t: any;
    for(t of tipos){
      if(t.idtipoUsuario == value){
        return t .descripcion;
      }
    }
    return "no existe";
  }

}
