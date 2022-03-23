import { Component, OnInit } from '@angular/core';
// import {Cloudinary, CloudinaryImage} from '@cloudinary/url-gen';
// import {CloudConfig} from '@cloudinary/url-gen';

// Import required actions and qualifiers.


import { FileuploadserviceService } from 'src/app/services/fileuploadservice.service';
import { FormGroup,FormBuilder } from '@angular/forms';
import { concatAll } from 'rxjs';


@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {

  constructor(private fileuploadservice: FileuploadserviceService, private fb: FormBuilder) { }
  //  img!: CloudinaryImage;
  file: any = '';
  myForm: any;
  myFormVideo:any;
  spinnerState:boolean=false;
  video:any;
  //new FormGroup({
    
  // });;

  ngOnInit(): void {
     // Create a Cloudinary instance, setting some Cloud and URL configuration parameters.
     // Set the Cloud configuration and URL configuration
 
     // Instantiate and configure a CloudinaryImage object.
    //  this.img = new CloudinaryImage('cld-sample', cloudConfig, urlConfig);
     // The URL of the image is: https://res.cloudinary.com/demo/image/upload/docs/shoes
    //  const myUrl = this.img.toURL();
    //  console.log(myUrl);
    //  this.img
    
   
    this.myForm = this.fb.group({
      images: ''
    })

    this.myFormVideo = this.fb.group({
      videos: ''
    })

    
  }

  uploadImage() {
   
    console.log(this.myForm.value.images)

    const formData = new FormData()
    formData.append('images', this.file)
    console.log(formData.get('images'));

    this.fileuploadservice.uploadImage(formData).subscribe((data) => {
       console.log(data, 'uploaded');
       var dat = data.toString()
       let img = document.createElement('img')
       img.setAttribute('src', dat)
       console.log('this image')
       console.log(img.src)
       console.log('end of image')
       
       if(document.querySelector('.img-wrapper') != null ) {  
        document.querySelector('.img-wrapper')?.appendChild(img)
       }
       
    })

  }



  uploadVideo() {

   this.spinnerState=true
    console.log(this.myFormVideo.value.videos)

    const formData = new FormData()
    formData.append('videos', this.file)
    console.log(formData.get('videos'));

    this.fileuploadservice.uploadVideo(formData).subscribe((data) => {
       console.log(data, 'uploaded');
       var dat = data.toString()
       this.video = document.createElement('video')
       this.video.setAttribute('src', dat)
       console.log('this video')
       console.log(this.video.src)
       console.log('end of video')
       this.spinnerState=false
      //  if(document.querySelector('.img-wrapper') != null ) {  
      //   document.querySelector('.img-wrapper')?.appendChild(video)
      //  }
       
    })

  }

  selectThisImage(myEvent: any) {
    this.file = myEvent.target.files[0];
  }


}
