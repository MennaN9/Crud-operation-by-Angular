import { NgModule } from "@angular/core";
import { TestSharedComponent } from "./components/test-shared/test-shared.component";
import { NotFoundedComponent } from './components/not-founded/not-founded.component';

@NgModule({
    declarations: [TestSharedComponent, NotFoundedComponent],
    exports: [TestSharedComponent,NotFoundedComponent]
})
export class SharedModule{}
