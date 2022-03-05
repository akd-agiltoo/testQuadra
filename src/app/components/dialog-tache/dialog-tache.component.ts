import { Component, Inject, Optional, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { DialogBoxData } from 'src/app/_models/dialog-box-data.model';



@Component({
  selector: 'app-dialog-tache',
  templateUrl: './dialog-tache.component.html',
  styleUrls: ['./dialog-tache.component.css']
})
export class DialogTacheComponent  implements OnInit{

  action!:string;
  local_data:any;
  formTache: FormGroup;
  currentId!:string;

  constructor(fb: FormBuilder,
    public dialogRef: MatDialogRef<DialogTacheComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public inputData: DialogBoxData) {

      this.formTache = fb.group({
        //id:null,
        todo_label: ['', [Validators.required]],
        todo_is_done: [''],
      });

      this.action = inputData.action;
      this.local_data = inputData.data;
      console.log(this.action);
      console.log(this.local_data);

      if (this.action=='Update') {
        this.currentId = this.local_data.todo_id ;
        this.formTache.setValue(
          {
           //'id': this.local_data.id,
            'todo_label':this.local_data.todo_label,
            'todo_is_done':this.local_data.todo_is_done
          }
        );
      }
    
  }

   
  public errorHandling = (control: string, error: string) => {
    return this.formTache.controls[control].hasError(error);
  }

 

  ngOnInit(): void {
  }

  doAction(){
    if (this.action !='Delete') {
       this.local_data.todo_label=this.formTache.value['todo_label'];
       this.local_data.todo_is_done=this.formTache.value['todo_is_done'];
    }
    if (this.action =='Add') {
      this.local_data.todo_id = null;
    }
    
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }

}
