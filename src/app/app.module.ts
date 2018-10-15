import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

//pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/Noticias/home/home';

import {
  VerDetallesPage,
  TabsPage,
  VerDetallesCroquisPage,
  AreasDeportivasYCafeteriasPage,
  ConoceUnipoliPage,
  Ud1Page,
  Ud2Page,
  Ud3Page,
  CentroInformacionPage,
  LaboratoriosPage,
  EnlacesPage,
  InformacionPage,
  InformacionEventosPage,
  LoginPage,
  SeleccionarCarreraPage,
  AlumnoPage,
  RegistroPage,
  OlvidarcontraceñaPage,
  HorariosPage,
  GruposPage,
  GrupoiswPage,
  HorariosIswPage,
  GrupoambPage,
  HorariosAmbPage,
  GrupocivPage,
  HorariosCivPage,
  GrupoirtPage,
  HorariosIrtPage,
  GrupoitmPage,
  HorariosItmPage,
  GrupopymesPage,
  HorariosPyMesPage,
    
} from '../pages/index.paginas';

//plugins angularfire2
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, EnablePersistenceToken } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { InAppBrowser } from '@ionic-native/in-app-browser';
import { LocalNotifications } from '@ionic-native/local-notifications';

//Camera
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
//import { FirebaseServiceProvider } from '../providers/firebase-service/firebase-service';
import { LoginUserProvider } from '../providers/login-user/login-user';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    VerDetallesPage,
    TabsPage,
    VerDetallesCroquisPage,
    AreasDeportivasYCafeteriasPage,
    ConoceUnipoliPage,
    Ud1Page,
    Ud2Page,
    Ud3Page,
    CentroInformacionPage,
    LaboratoriosPage,
    EnlacesPage,
    InformacionPage,
    InformacionEventosPage,
    SeleccionarCarreraPage,
    AlumnoPage,
    RegistroPage,
    OlvidarcontraceñaPage,
    HorariosPage,
    GruposPage,
    GrupoiswPage,
    HorariosIswPage,
    GrupoambPage,
    HorariosAmbPage,
    GrupocivPage,
    HorariosCivPage,
    GrupoirtPage,
    HorariosIrtPage,
    GrupoitmPage,
    HorariosItmPage,
    GrupopymesPage,
    HorariosPyMesPage,
    ],
  imports: [
    BrowserModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    VerDetallesPage,
    TabsPage,
    VerDetallesCroquisPage,
    AreasDeportivasYCafeteriasPage, ConoceUnipoliPage,
    Ud1Page,
    Ud2Page,
    Ud3Page,
    CentroInformacionPage,
    LaboratoriosPage,
    EnlacesPage,
    InformacionPage,
    InformacionEventosPage,
    SeleccionarCarreraPage,
    AlumnoPage,
    RegistroPage,
    OlvidarcontraceñaPage,
    HorariosPage,
    GruposPage,
    GrupoiswPage,
    HorariosIswPage,
    GrupoambPage,
    HorariosAmbPage,
    GrupocivPage,
    HorariosCivPage,
    GrupoirtPage,
    HorariosIrtPage,
    GrupoitmPage,
    HorariosItmPage,
    GrupopymesPage,
    HorariosPyMesPage,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    ImagePicker,
    InAppBrowser,
    LocalNotifications,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    LoginUserProvider,
    //FirebaseServiceProvider
  ]
})
export class AppModule { }
