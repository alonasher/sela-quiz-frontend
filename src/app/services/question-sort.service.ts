import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QuestionSortService {
  constructor() {}

  sortByName(array: any[]) {
    return array.sort((a: any, b: any) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  sortByDateDesc(array:any[]){
    return array.sort((a: any, b: any) => {
      let aTime = new Date(),
        bTime = new Date();
      if (a.createdAt && b.createdAt) {
        aTime = new Date(a.createdAt);
        bTime = new Date(b.createdAt);
      }
      return aTime < bTime ? 1 : bTime < aTime ? -1 : 0;
    });
  }
}
