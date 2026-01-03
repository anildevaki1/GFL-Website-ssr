import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'Homepage',
        pathMatch: 'full'
    },
    {
        path: 'Homepage',
        loadComponent: () => import('./Component/homepage/homepage').then(m => m.Homepage)
    },
    {
        path: 'About',
        loadComponent: () => import('./Component/about/about').then(m => m.About)
    },
    {
        path: 'Product',
        loadComponent: () => import('./Component/product/product').then(m => m.Product)
    },
    {
        path: 'Contact',
        loadComponent: () => import('./Component/contact/contact').then((m) => m.Contact)
    },
    {
        path: 'ProductInfo',
        loadComponent: () => import('./Component/product-info/product-info').then((m) => m.ProductInfo)
    },
     {
        path: 'Download-App',
        loadComponent: () => import('./Component/download-app/download-app').then((m) => m.DownloadApp)
    },  
    {
  path: '**',
   redirectTo:'Homepage'
}
];
