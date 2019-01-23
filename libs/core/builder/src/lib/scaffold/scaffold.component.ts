import { Component, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NbDialogService, NbDialogRef } from "@nebular/theme";
import { WebAngularSmartTableDataSource, WebAngularSmartTableDataSourceOptions } from "@core/data/src/lib/data-store";
import { WebAngularDataStore } from "@core/services/src/lib/WebAngularDataStore.service";


@Component({
  selector: 'wda-scaffold',
  styleUrls: ['./scaffold.component.scss'],
  templateUrl: './scaffold.component.html',
})
export class ScaffoldComponent implements OnInit {
  source: WebAngularSmartTableDataSource;
  current_model: any;
  base_path: any;
  title: string = ";D";
  loading = false;
  @ViewChild('dialog') dialogTemplate: TemplateRef<any>;
  protected dialogRef: NbDialogRef<any>;

  constructor(
    private route: ActivatedRoute,
    private datastore: WebAngularDataStore,
    private router: Router,
    private dialogService: NbDialogService,
  ) {

  }
  ngOnInit(): void {
    this.current_model = this.route.data['value'].model;
    this.title = this.route.data['value'].title;
    this.base_path = this.route.data['value'].path;


    this.startTableInformation()
  }
  openDialog(element) {
    // TODO IMplement Write id number for more
    this.dialogRef = this.dialogService.open(this.dialogTemplate,{
      context: {
        title: `Delete ${this.title} #${element.data.pk}`,
        body: `Please confirm that you would like to delete this ${this.title} with Id ${element.data.pk}`,
        element: element,
      },
    });
  }
  close() {
    this.dialogRef.close();
  }
  deleteRecord(element:any){
    this.loading = true;
    if(element){
      this.datastore.deleteRecord(this.current_model, element.data.pk).subscribe(
        (r) => {
          this.source.remove(element);
          this.close();
          this.loading = false;
        }
      );
    }
  }
  startTableInformation(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.source = new WebAngularSmartTableDataSource(this.datastore);
    this.source.model = this.current_model;
    this.source.conf = new WebAngularSmartTableDataSourceOptions({
      smartTableSettings: this.current_model.smartTableOptions,
      onEditButtonClick: ($event) => {
        this.router.navigate([this.base_path, 'edit', $event.data.pk]);
      },
      onDeleteButtonClick: ($event) => {
        this.openDialog($event);
      },
      onCreateButtonClick: () => {
        this.router.navigate([this.base_path, 'new']);
      }
    });

  }

}
