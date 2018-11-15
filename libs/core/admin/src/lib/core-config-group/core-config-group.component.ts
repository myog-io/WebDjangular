import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, } from "@angular/router";
import { WebAngularDataStore } from "@webdjangular/core/services";
import { CoreConfigGroupModel } from "libs/core/data/src/lib/models/CoreConfigGroup.model";
import { CoreConfigInputModel } from "libs/core/data/src/lib/models/CoreConfigInput.model";
import { JsonApiQueryData } from "angular2-jsonapi";


@Component({
  selector: 'wda-core-config-group',
  styleUrls: ['./core-config-group.component.scss'],
  templateUrl: './core-config-group.component.html',
})
export class CoreConfigGroupComponent implements OnInit, OnDestroy {
  id: string;
  private sub: any;
  public group: CoreConfigGroupModel;
  public inputs: CoreConfigInputModel[];
  constructor(
    private route: ActivatedRoute,
    private datastore: WebAngularDataStore,
  ) {
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      if(this.id){
        this.loadForm();
      }else{
        // Redirect to Dashboard
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  loadForm() {
    this.datastore.findRecord(CoreConfigGroupModel,this.id).subscribe((data:CoreConfigGroupModel) => {
      this.group = data;
    })
    this.datastore.findAll(CoreConfigInputModel,{group:this.id}).subscribe((data:JsonApiQueryData) => {

      this.inputs = data.getModels();
      console.log(this.inputs);
    })
  }
}
