import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'folder',
    loadChildren: () =>
      import('./folder/folder.module').then((m) => m.FolderPageModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((route) => route.HomePageModule),
  },
  {
    path: 'precovery',
    loadChildren: () => import('./precovery/precovery.module').then( m => m.PrecoveryPageModule)
  },
  {
    path: 'otp-verify',
    loadChildren: () => import('./otp-verify/otp-verify.module').then( m => m.OtpVerifyPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
