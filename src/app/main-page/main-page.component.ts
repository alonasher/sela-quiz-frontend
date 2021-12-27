import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { QuestionDetailsComponent } from '../question-details/question-details.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  @ViewChild(QuestionsListComponent)
  private questionListComponent!: QuestionsListComponent;
  showDetails = false;
  showForm = false;
  currentQuestion: number = 0;

  constructor() {}

  ngOnInit(): void {}
  editQuestion(id: number) {
    this.showDetails = true;
    this.showForm = false;
    this.currentQuestion = id;
  }

  updateList() {
    this.showForm = false;
    this.questionListComponent.ngOnChanges();
  }
  onClickAdd() {
    this.showForm = true;
    this.showDetails = false;
  }
}
