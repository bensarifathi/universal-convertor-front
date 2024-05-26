import { Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {ConvertorComponent} from "./pages/convertor/convertor.component";
import { DownloadFileComponent } from "./pages/download-file/download-file.component";

export const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "convertor", component: ConvertorComponent },
  { path: "download", component: DownloadFileComponent}
];
