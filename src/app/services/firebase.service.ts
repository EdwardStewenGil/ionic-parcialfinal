// firebase.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  

  constructor(
    private firestore: AngularFirestore
  ) { }

  create_NewStudent(record) {
    return this.firestore.collection('Students').add(record);
  }
 
  read_Students() {
    return this.firestore.collection('Students').snapshotChanges();
  }


  read_Students1(correop) {
    return this.firestore.collection('Students' ,ref => ref. where ('Correo','==',correop) ).snapshotChanges();
  }
 
 
  update_Student(recordID,record){
    this.firestore.doc('Students/' + recordID).update(record);
  }
 
  delete_Student(record_id) {
    this.firestore.doc('Students/' + record_id).delete();
  }



  create_Cafeteria(record) {
    return this.firestore.collection('Cafeteria').add(record);
  }


 
  read_Cafeteria() {
    return this.firestore.collection('Cafeteria').snapshotChanges();
  }
 
  update_Cafeteria(recordID,record){
    this.firestore.doc('Cafeteria/' + recordID).update(record);
  }
 
  delete_Cafeteria(record_id) {
    this.firestore.doc('Cafeteria/' + record_id).delete();
  }


  
  create_Combo(record) {
    return this.firestore.collection('Combo').add(record);
  }


 
  read_Combo() {
    return this.firestore.collection('Combo').snapshotChanges();
  }
 
  update_Combo(recordID,record){
    this.firestore.doc('Combo/' + recordID).update(record);
  }
 
  delete_Combo(record_id) {
    this.firestore.doc('Combo/' + record_id).delete();
  }




  create_Compra(record) {
    return this.firestore.collection('Compra').add(record);
  }


 
  read_Compra() {
    return this.firestore.collection('Compra').snapshotChanges();
  }
 
  update_Compra(recordID,record){
    this.firestore.doc('Compra/' + recordID).update(record);
  }
 
  delete_Compra(record_id) {
    this.firestore.doc('Compra/' + record_id).delete();
  }
}
