import {Component} from '@angular/core';
import {Location} from '@angular/common';
import { CouchbaseProvider } from '../providers/couchbase.provider';

@Component({
    selector: 'app-create-product',
    templateUrl: './create-product.component.html',
})
export class CreateProductComponent {

    private database: any;
    public product: any;

    public constructor(private location: Location, private couchbase: CouchbaseProvider) {
        this.database = this.couchbase.getDatabase();
        this.product = {
            name: '',
            price: '',
            inventory: '',
            sku: ''
        }
    }

    public save() {
        if (this.product.name && this.product.price && this.product.inventory && this.product.sku) {
            this.database.createDocument(this.product, this.product.sku);
            this.location.back();
        }
    }
}
