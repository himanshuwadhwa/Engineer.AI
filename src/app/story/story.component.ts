import { Component, OnInit, ViewChild, ElementRef,  DoCheck } from '@angular/core';
import { StoryService } from './story.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit, DoCheck {

  constructor(private storyService: StoryService) { }
  public storyList: any;
  public story;
  public filteredList = [];
  public tempList;
  public storyTimer;
  public searchTimer;
  public pageNumber = 0;
  public delay = 10000;
  public hasError;
  @ViewChild('search', { static: true}) searchInput: ElementRef<HTMLInputElement>;
  @ViewChild('modal', { static: true}) modalDialog;
  @ViewChild('fetchPost', { static: true}) fetchDialog;
  public debounce = this.onKeyupHandler(this.onKeyup, 300);


  ngOnInit() {
    this.getStoryList();
  }

  ngDoCheck() {
    this.updateStoryList(this.hasError);
  }

  /*
    Function Name: getStoryList();
    Parameter: Page Number
    Functionality: Fetching records from the server
  */

  getStoryList() {
    this.storyService.getStoryList(this.pageNumber).subscribe((data: any) => {
      this.storyList = data.hits;
      this.filteredList = [...this.storyList];
    }, (err) => {
       this.hasError = true;
       console.log(err);
    });
  }

  /*
    Function Name: updateStoryList();
    Parameter: One
    Functionality: Fetching records from the server periodically after every 10 seconds
  */

  updateStoryList(error) {
      clearTimeout(this.storyTimer);
      if(!error) {
        this.storyTimer = setTimeout(() => {
          if (this.pageNumber >= 50) {
                this.pageNumber = 1;
          } else {
            this.pageNumber++;
          }
          let isStoryModalOpen = this.modalDialog.isOpen;
          if (isStoryModalOpen) {
            isStoryModalOpen = false;
          }
          this.fetchDialog.isOpen = true;
          this.storyService.getStoryList(this.pageNumber).subscribe((data: any) => {
            this.storyList = data.hits;
            this.filteredList = [...this.storyList];
            setTimeout(() => {
              this.fetchDialog.isOpen = false;
            }, 3000);
          }, (err) => {
            console.log(err);
          });
        }, this.delay);
      }
  }

  /*
    Function Name: onKeyup();
    Parameter: none
    Functionality: Filtering list on the basis of search
  */

  onKeyup() {
   const query = this.searchInput.nativeElement.value.toLowerCase().trim();
   if (query) {
    this.tempList = this.filteredList.filter(story => {
      return story.title.toLowerCase().indexOf(query) > -1;
    });
    this.storyList = this.tempList;
   } else {
    this.storyList = this.filteredList;
   }
  }

   /*
    Function Name: onKeyupHandler();
    Parameter: expect two parameter function and delay
    Functionality: Wait for onkeyup prees between the 3000ms to fetch data from the server
  */

  onKeyupHandler(fn, d) {
    return () => {
      clearTimeout(this.searchTimer);
      const context = this;
      this.searchTimer = setTimeout(() => {
        fn.call(context);
      }, d);
    };
  }

  openModal(story) {
    this.story = story;
    this.modalDialog.isOpen = true;
  }

}
