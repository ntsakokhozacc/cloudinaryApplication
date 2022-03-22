import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';

const routes: Routes = [
  {path:'images', component:ImageUploadComponent},
  {path:'', redirectTo:'images'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
