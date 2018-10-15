import { Injectable } from '@angular/core';
import { User } from '../../shared/models/user';
import { AngularFireAuth } from '../../../node_modules/angularfire2/auth';


@Injectable({
    providedIn: 'root'
})
export class LoginUserProvider {
    profe: boolean;
    SesionInAlum: boolean;

    constructor(private afAuth: AngularFireAuth) {
        console.log('Hello LoginUserProvider Provider');
    }

    login(user: User) {

        this.SesionInAlum = false;
        this.profe = false;

        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => {
            if (result) {
                this.SesionInAlum = true;
                if (user.email === "alfonso_56_@unipoli.edu.mx",
                    "franciscoalfonso.martinez@unipoli.edu.mx") {
                    this.profe = true;
                }
            }
        });
    }

    register(user: User) {
        this.SesionInAlum = false;
        this.profe = false;

        return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(result => {
            if (result) {
                this.SesionInAlum = true;
            }
        });
    }
}