import { Component } from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-download-file',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './download-file.component.html',
  styleUrl: './download-file.component.css'
})
export class DownloadFileComponent {

  link = this.route.snapshot.queryParams["link"];
  title = "Download Page";

  constructor(
    private route: ActivatedRoute,
    private titleService: Title
    ) {}

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

}
