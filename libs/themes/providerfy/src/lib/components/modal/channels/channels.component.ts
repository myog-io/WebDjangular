import {Component, ElementRef, Inject, Input, OnInit, Renderer2} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {WebAngularDataStore} from "@webdjangular/core/services";
import {JsonApiQueryData} from "angular2-jsonapi";
import {ChannelModel} from "../../../../../../../plugins/provider/src/lib/data/models/Channel.model";

@Component({
  selector: 'webdjangular-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ThemeProviderfyModalChannelsComponent implements OnInit {

  @Input() product_id;
  public channels: ChannelModel[];

  public get_channels_current_page: number = 1;
  public loadingChannels = true;
  public search: string = '';
  public selected_type: string = '';

  constructor(public activeModal: NgbActiveModal,
              public datastore: WebAngularDataStore,
              public renderer: Renderer2,
              @Inject(ElementRef) public elementRef: ElementRef) {
    this.channels = [];
  }

  ngOnInit(): void {
    this.getChannels();
  }

  onSearch(event: any) {
    this.filterChannelBySelectedType();
    this.filterChannelBySearch();
  }

  filterChannelBySearch(){
     let search = this.search.toUpperCase();
     if (search) {
      this.elementRef.nativeElement.querySelectorAll('.channel:not([data-name*="' + search + '"])')
        .forEach((el) => {
          this.renderer.removeClass(el, 'active');
        }
      );
    }
  }

  toggleChannels(event: any, type: string) {
    this.elementRef.nativeElement.querySelectorAll('.nav-link').forEach((el) => {
      this.renderer.removeClass(el, 'active');
    });
    this.renderer.addClass(event.target, 'active');

    this.selected_type = type;
    this.filterChannelBySelectedType();
    this.filterChannelBySearch();
  }

  filterChannelBySelectedType() {

    // TODO: I really believe there is a better way to this

    if (this.selected_type) {
      this.elementRef.nativeElement.querySelectorAll('.channel:not(' + this.selected_type + ')').forEach((el) => {
        this.renderer.removeClass(el, 'active');
      });
      this.elementRef.nativeElement.querySelectorAll('.channel.' + this.selected_type).forEach((el) => {
        this.renderer.addClass(el, 'active');
      });
    } else {
      this.elementRef.nativeElement.querySelectorAll('.channel').forEach((el) => {
        this.renderer.addClass(el, 'active');
      });
    }
  }

  private getChannels() {

    let options = {
      fields: 'types,name,logo,number',
      products: this.product_id,
      page: {number: this.get_channels_current_page, size: 10}
    };

    this.datastore.findAll(ChannelModel, options).subscribe(
      (queryData: JsonApiQueryData<ChannelModel>) => {
        this.channels.push(...queryData.getModels());
        let meta = queryData.getMeta();

        if (meta.meta.pagination.page < meta.meta.pagination.pages) {
          this.get_channels_current_page++;
          this.getChannels();
        } else {
          this.channels.sort(function (a: ChannelModel, b: ChannelModel) {
            return a.number - b.number;
          });
          this.loadingChannels = false;
        }
      }
    )
  }

}
