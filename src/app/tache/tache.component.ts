



import {AfterViewInit, Component, ViewChild,  OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort, Sort} from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import { Tache } from '../_models/tache.model';
import { TacheService } from '../_services/tache.service';
import { DialogTacheComponent } from '../components/dialog-tache/dialog-tache.component';
import { DialogBoxData } from '../_models/dialog-box-data.model';





/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-tache',
  templateUrl: './tache.component.html',
  styleUrls: ['./tache.component.css']
})
export class TacheComponent implements OnInit {

  outputData!: DialogBoxData;
  displayedColumns: string[] = ['select', 'todo_id', 'todo_date', 'todo_label','todo_is_done', 'actions'];
  dataSource!: MatTableDataSource<Tache>;  

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  //clickedRows = new Set<Tache>();
  selection = new SelectionModel<Tache>(true, []);
    
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data!.length;
      return numSelected === numRows;
    }
  

    masterToggle() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }
      this.selection.select(...this.dataSource.data);
    } 

  constructor(private tacheService: TacheService, //private _liveAnnouncer: LiveAnnouncer, 
    
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTaches(); 
  }


  getTaches(){
    this.tacheService.getTaches().subscribe({
      next: data => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log('liste tache= ');
        console.log(data);
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  openDialog(action: string,obj:any) {
    //this.outputData.action = action;
    //this.outputData.data= obj;
    const dialogRef = this.dialog.open(DialogTacheComponent, {
      width: '550px',
      data: {action: action, data: obj},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: any){
    console.log('tache a ajoute');
    console.log(row_obj);
    this.tacheService.createTache(row_obj).subscribe({
      next: data => {
        console.log(data);
        this.getTaches(); 
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  updateRowData(row_obj:any){
    console.log('tache a maj');
    console.log(row_obj);
    this.tacheService.updateTache(row_obj).subscribe({
      next: data => {
        console.log(data);
        this.getTaches(); 
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  deleteRowData(row_obj:any){
    console.log('tache a supprime');
    console.log(row_obj);
    this.tacheService.deleteTacheById(row_obj.todo_id).subscribe({
      next: data => {
        console.log("suppression ok");
        this.getTaches(); 
      },
      error: err => {
        console.log(err.error.message);
      }
    });
  }

  removeSelectItems(){
    console.log(this.selection.selected);
  }

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    //this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



}


