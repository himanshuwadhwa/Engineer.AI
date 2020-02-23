import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoryComponent } from './story.component';
import { StoryService } from './story.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [HttpClientModule, CommonModule, SharedModule],
  declarations: [StoryComponent],
  providers: [StoryService],
  exports: [StoryComponent]
})

export class StoryModule {

}
