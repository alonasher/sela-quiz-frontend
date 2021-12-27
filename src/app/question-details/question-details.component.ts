import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit, OnChanges {
  @Input() questionId!: number;
  currentQuestion: any;
  @Output() closeDetails = new EventEmitter();
  
  constructor(private questionService: QuestionsService) {}
  ngOnChanges(): void {
    if (this.questionId || this.questionId > 0) {
      this.questionService
        .getQuestion(this.questionId)
        .subscribe((question) => (this.currentQuestion = question));
    }
  }

  ngOnInit(): void {
    if (this.questionId || this.questionId > 0) {
      this.questionService
        .getQuestion(this.questionId)
        .subscribe((question) => (this.currentQuestion = question));
    }
  }

  exit() {
    this.closeDetails.emit();
  }
}
