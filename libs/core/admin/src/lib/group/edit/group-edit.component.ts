import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { WebAngularDataStore } from '@webdjangular/core/services';
import { GroupModel, PermissionModel } from '@webdjangular/core/users-models';
import { ModelPaginatorControls } from 'libs/core/builder/src/lib/model-paginator/model-paginator.controls';




@Component({
  selector: 'webdjangular-group-edit',
  styleUrls: ['./group-edit.component.scss'],
  templateUrl: './group-edit.component.html',
})

export class GroupEditComponent {
  public form = new GroupModel.formClassRef(this.datastore);
  public group: GroupModel;

  public modelPaginatorConfig = {
    modelToPaginate: PermissionModel,
    useDatastore: this.datastore,
    pageSize: 12
  };

  public modelPaginatorControls: ModelPaginatorControls;


  constructor(
    private activatedRoute: ActivatedRoute,
    private datastore: WebAngularDataStore,
  ) {
    this.form.generateForm();

  }


  ngOnInit(): void {
    if (this.activatedRoute.params['value'].id != null) {
      this.datastore.findRecord(GroupModel, this.activatedRoute.params['value'].id, {
        include: 'permissions'
      }).subscribe(
        (group: GroupModel) => {
          this.group = group;
          this.form.populateForm(this.group);
        }
      );
    }
  }

  onSubmit() {
    if (this.activatedRoute.params['value'].id != null) {
      this.update();
    }
    else {
      this.create();
    }
  }

  update() {
    this.form.updateModel(this.group);

    let sub = this.group.save().subscribe(
      (result) => {
        sub.unsubscribe();
      }
    )
  }

  create() {
    this.group = this.datastore.createRecord(GroupModel, this.form.value);
    let sub = this.group.save().subscribe(
      (result) => {
        sub.unsubscribe();
      }
    )
  }

  modelPaginatorControlsGetter($event) {
    this.modelPaginatorControls = $event;
  }
}
