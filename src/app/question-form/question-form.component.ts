import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Question } from '../models/question.model';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css'],
})
export class QuestionFormComponent implements OnInit {
  question: Question = new Question('', '');
  @Output() updateList = new EventEmitter<any>();
  constructor(private questionService: QuestionsService) {}

  ngOnInit(): void {}

  onSubmit() {
    this.questionService.addQuestion(this.question).subscribe((res) => {
      if (res) {
        this.updateList.emit();
        this.question=new Question("","")
      }
    });
  }
}
