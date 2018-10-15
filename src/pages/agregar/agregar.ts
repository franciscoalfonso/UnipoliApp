import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Camera} from "@ionic-native/camera";
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { ImagePicker } from '@ionic-native/image-picker';
import { Observable } from 'rxjs';
import { AngularFireStorage } from 'angularfire2/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { async } from 'rxjs/internal/scheduler/async';
import { normalizeURL } from 'ionic-angular/util/util';

@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {
  [x: string]: any;


  img: any;
  //Miniatura de la Imagen
  imagePreview: string = "";
  //Imagen en formato para subir
  imagen64: string;
  //Observables
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  constructor(private camera: Camera, public navCtrl: NavController,
    public firebaseServiceProvider: FirebaseServiceProvider,
    public toastCtrl: ToastController,
    public imagePicker: ImagePicker,
    public fireStorage: AngularFireStorage,
    public viewCtrl: ViewController) {
    }
 
    abririmagen(){
      this.imagePicker.hasReadPermission()
      .then((result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns
          async
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 5
          })
          .then((results) => {
            for (var i = 0; i < results.length; i++) {
              this.uploadImageToFirebase(results[i]);
            }
          }, (err) => console.log(err));
        }
      }, (err) => {
        console.log(err);
      });
    }
    
    openImagePickerCrop(){
      this.imagePicker.hasReadPermission()
      .then((result) => {
        if(result == false){
          // no callbacks required as this opens a popup which returns
          async    
          this.imagePicker.requestReadPermission();
        }
        else if(result == true){
          this.imagePicker.getPictures({
            maximumImagesCount: 1
          })
          .then((results) => {
            for (var i = 0; i < results.length; i++) {
              this.cropService.crop(results[i], {quality: 75})
              .then(newImage => {
                this.uploadImageToFirebase(newImage);
              }, error => console.error("Error cropping image", error));
            }
          }, (err) => console.log(err));
        }
      }, (err) => {
        console.log(err);
      });
    }
    
    uploadImageToFirebase(image){
      image = normalizeURL(image);
      //uploads img to firebase storage
      this.firebaseServiceProvider.uploadImage(image)
      .then(photoURL => {
        let toast = this.toastCtrl.create({
          message: 'la imagen se cargo correctamente',
          duration: 3000
        });
      toast.present();
      })
    }
}