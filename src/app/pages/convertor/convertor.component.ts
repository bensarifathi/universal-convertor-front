import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {ConvertorUploadService} from "../../services/convertor-upload.service";
import {HttpClientModule} from "@angular/common/http";
import {ConvertorTrackerService} from "../../services/convertor-tracker.service";
import {Subscription, switchMap} from "rxjs";
import {MediaRequestDto} from "../../dto/media-request-dto";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-convertor',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    HttpClientModule,
  ],
  templateUrl: './convertor.component.html',
  styleUrl: './convertor.component.css',
  providers: [
    ConvertorUploadService,
    ConvertorTrackerService,
  ]
})
export class ConvertorComponent {
  title: string = "Convertor Page";
  file: File | null | undefined;
  showImage: boolean = false;
  imageUrl: string | null = null;
  selectedOption: string = "";
  mediaSubscriber?: Subscription;
  loader: boolean = false;
  submitButtonText: string = "Convert";

  constructor(
    private convertorUploadService: ConvertorUploadService,
    private convertorTrackerService: ConvertorTrackerService,
    private router: Router,
    private toastr: ToastrService,
    private titleService: Title,
  ) {
  }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  onSubmit(): void {
    if (!this.file)
      return
    const payload: MediaRequestDto = {
      file: this.file,
      format: this.selectedOption
    };
    this.loader = true;
    this.submitButtonText = "Uploading ..."
    this.mediaSubscriber = this.convertorUploadService.uploadMedia(payload)
      .pipe(
        switchMap(response => {
          this.toastr.success("File uploaded successfully 🚨");
          return this.convertorTrackerService.getTaskStatus(response.taskId);
        })
      )
      .subscribe(
        statusResponse => {
          if (statusResponse.status === 'DONE' || statusResponse.status === "FAILED") {
            this.mediaSubscriber?.unsubscribe();
            this.loader = false;
            this.submitButtonText = "Convert";
            this.router.navigate([`download`], {queryParams: {link: statusResponse.outputFile}});
          } else
              this.submitButtonText = "Converting ..."
        },
        error => {
          console.log('Error: ', error);
          this.loader = false;
          this.submitButtonText = "Convert"
        }
      );
  }

  handleImageChange(event: Event) {
    console.log(event);
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        this.showImage = true;
      };
      reader.readAsDataURL(this.file);
    }
  }

  removeUpload() {
    this.file = null;
    this.imageUrl = null;
    this.showImage = false

    this.cleanFileInputField();
  }

  private cleanFileInputField() {
    // Clear the input value to allow the same file to be selected again
    const fileInput = document.querySelector('.file-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    // Trigger change event manually to ensure handleImageChange is called
    fileInput.dispatchEvent(new Event('change'));
  }

  ngOnDestroy(): void {
    this.mediaSubscriber?.unsubscribe();
  }
}
