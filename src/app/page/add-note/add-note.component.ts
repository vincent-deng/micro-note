import { Http } from '@angular/http';
import { TagListService } from './../../services/tag-list/tag-list.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { dropdownItem } from '../../component/dropdown/dropdown.component';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddNoteComponent implements OnInit {
  dropdownMenu = this.tagListService.tagList
  _title = ''
  _content = ''
  _labelList = []

  constructor(
    private tagListService: TagListService,
    private http: Http
  ) { }

  ngOnInit() {
  }
  
  selectItem(data){
    this._labelList.push(data)
  }
  
  delectLabelItem(index){
    this._labelList.splice(index, 1)
  }

  markdownValueChange(data){
    // console.log(data)
    this._content = data
  }
  
  // 保存笔记
  _save(){
    this.http.post('/api/addNote', {
      title: this._title,
      content: this._content,
      tag: this._labelList,
      date: new Date()
    })
    .map(res => res.json())
    .subscribe((data) => {
      console.log(data)
    })
  }
}
