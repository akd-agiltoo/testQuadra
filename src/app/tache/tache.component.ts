



import { Component, ViewChild,  OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';
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
        console.log("======================")
        console.log('data', data)
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: err => {
        console.error(err);
      }
    });
  }

  openDialog(action: string,obj:any) {
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
    this.tacheService.createTache(row_obj).subscribe({
      next: data => {
        this.getTaches(); 
      },
      error: err => {
        console.error(err.error.message);
      }
    });
  }

  updateRowData(row_obj:any){
    this.tacheService.updateTache(row_obj).subscribe({
      next: data => {
        this.getTaches(); 
      },
      error: err => {
        console.error(err.error.message);
      }
    });
  }

  deleteRowData(row_obj:any){
    this.tacheService.deleteTacheById(row_obj.todo_id).subscribe({
      next: data => {
        this.getTaches(); 
      },
      error: err => {
      }
    });
  }

  removeSelectItems(){
  }

  ngAfterViewInit() {

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}


