import {
  Component,
  Inject,
  NgZone,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  SimpleChanges,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { QuestionsService } from '../services/questions.service';
import { Question } from '../models/question.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  private chart?: am4charts.XYChart;
  questions: any = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone,
    private questionsService: QuestionsService,
    private router: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.questionsService.getQuestions().subscribe((res: any) => {
      this.questions = res;
      this.router.params.subscribe((res) => {
        this.chart?.dispose();
        if (res['type'] === '0') {
          this.renderXYChart();
        } else {
          this.renderPieChart();
        }
      });
    });
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  private renderPieChart() {
    let chart = am4core.create('chartdiv', am4charts.PieChart);

    const data = [
      { title: 'Sunday', value: 0 },
      { title: 'Monday', value: 0 },
      { title: 'Tuesday', value: 0 },
      { title: 'Wednesday', value: 0 },
      { title: 'Thursday', value: 0 },
      { title: 'Friday', value: 0 },
      { title: 'Saturday', value: 0 },
    ];
    this.questions.forEach((question: Question) => {
      if (question.createdAt) {
        const day: number = new Date(question.createdAt).getDay() as number;
        data[day].value++;
      }
    });
    chart.data = data;

    let pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'value';
    pieSeries.dataFields.category = 'title';
  }
  private renderXYChart() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      const data = [
        { title: 'Sunday', value: 0 },
        { title: 'Monday', value: 0 },
        { title: 'Tuesday', value: 0 },
        { title: 'Wednesday', value: 0 },
        { title: 'Thursday', value: 0 },
        { title: 'Friday', value: 0 },
        { title: 'Saturday', value: 0 },
      ];
      this.questions.forEach((question: Question) => {
        if (question.createdAt) {
          const day: number = new Date(question.createdAt).getDay() as number;
          data[day].value++;
        }
      });
      chart.data = data;

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = 'title';
      categoryAxis.title.text = 'Day Of The Week';
      categoryAxis.renderer.grid.template.location = 0;
      categoryAxis.renderer.minGridDistance = 10;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = 'No. Of Questions';

      let series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = 'value';
      series.dataFields.categoryX = 'title';
      series.name = 'questions per day';
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
