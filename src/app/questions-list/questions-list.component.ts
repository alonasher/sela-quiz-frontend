import {
  Component,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
} from '@costlydeveloper/ngx-awesome-popup';
import { Question } from '../models/question.model';
import { QuestionSortService } from '../services/question-sort.service';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.css'],
})
export class QuestionsListComponent implements OnInit, OnChanges {
  @Output() showDetails = new EventEmitter();
  @Output() editQuestion = new EventEmitter<any>();
  questions: any = [];
  options = [
    { id: 0, title: 'Sort by...' },
    { id: 1, title: 'date' },
    { id: 2, title: 'name' },
  ];
  term = '';
  sort = this.options[0];

  constructor(
    private questionService: QuestionsService,
    private questionSortService: QuestionSortService
  ) {}
  ngOnChanges(): void {
    this.questionService
      .getQuestions()
      .subscribe((questions) => (this.questions = questions));
  }

  ngOnInit(): void {
    this.questionService
      .getQuestions()
      .subscribe((questions) => (this.questions = questions));
  }

  details(id: number) {
    this.showDetails.emit();
    this.editQuestion.emit(id)
  }
  edit(id: number) {
    this.editQuestion.emit(id);
    this.showDetails.emit();
  }

  delete(question: any) {
    this.questionService.deleteQuestion(question.id).subscribe((res) => {
      this.questionService
        .getQuestions()
        .subscribe((questions) => (this.questions = questions));
    });
  }

  search() {
    console.log('Search', this.term);
    console.log('sort', this.sort);
  }

  onSortChange() {
    if (this.sort.title === 'name') {
      this.questions = this.questionSortService.sortByName(this.questions);
    } else if (this.sort.title === 'date') {
      this.questions = this.questionSortService.sortByDateDesc(this.questions);
    }
  }

  confirmBox(question: any) {
    const confirmBox = new ConfirmBoxInitializer();
    confirmBox.setTitle('Are You Sure?');
    confirmBox.setMessage(`Confirm to delete question " ${question.name} " `);
    confirmBox.setButtonLabels('Yes', 'No');

    confirmBox.setConfig({
      LayoutType: DialogLayoutDisplay.DANGER,
    });

    confirmBox.openConfirmBox$().subscribe((res) => {
      if (res.Success) {
        this.delete(question);
      }
    });
  }
}
