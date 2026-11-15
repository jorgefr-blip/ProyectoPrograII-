import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AnunciosListaComponent } from './anuncios-lista/anuncios-lista.component';
import { PantallaNoticiaComponent } from './pantalla-noticia/pantalla-noticia.component';
import { ExamenComponent } from './examen/examen.component';
import { IngredienteComponent } from './ingrediente/ingrediente.component';
import { ListaIngredientesComponent } from './lista-ingredientes/lista-ingredientes.component';
import { PantallaIngredinetesComponent } from './pantalla-ingredinetes/pantalla-ingredinetes.component';
import { PlatilloComponent } from './platillo/platillo.component';
import { VistaPlatilloComponent } from './vista-platillo/vista-platillo.component';
import { EdicionPlatillosComponent } from './edicion-platillos/edicion-platillos.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { EditarPerfilComponent } from './cambiarclave/cambiarclave.component';
import { TipoAdminComponent } from './tipo-admin/tipo-admin.component';
import { TiposListaComponent } from './tipos-lista/tipos-lista.component';

export const routes: Routes = [
  { path: '', component: LoginComponent},   
  { path: 'welcome', component: BienvenidaComponent},
  { path: 'creaAnuncio', component: AnunciosComponent},
  { path: 'vistaAnuncio', component: AnunciosListaComponent},
  { path: 'pantallaNoticia', component: PantallaNoticiaComponent},
  {path :  'examen', component: ExamenComponent},
  {path :  'creaIngrediente', component: IngredienteComponent},
  {path :  'vistaIngrediente', component: ListaIngredientesComponent},
  {path :  'pantallaIngrediente', component: PantallaIngredinetesComponent},
  {path :  'platillos', component: PlatilloComponent},
  {path :  'editarPlatillo', component: EdicionPlatillosComponent},
  {path :  'vistaPlatillo', component: VistaPlatilloComponent},
  {path :  'miPerfil', component: MiPerfilComponent},
  {path: 'cambiarClave', component: EditarPerfilComponent },
  {path: 'tipoAdmin', component: TipoAdminComponent },
  {path: 'listaTiposAdmin', component: TiposListaComponent }
];                
