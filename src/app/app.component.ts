import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CNueva';

  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute
  ) {
    //Evento que sirve para obtener el token que envia el Dashboard
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd) {
        let tokenLocalStorage = localStorage.getItem("token")
        // localStorage.setItem("token", "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJQcnVlYmExIiwianRpIjoiMzFkMDYzNTQtMTEzMi00OWIyLWIxOWUtZjFhNGNhM2E1NDcwIiwiaWF0IjoxNjQ3NTIzOTA0LCJQcm9maWxlSWQiOiIxIiwiQ29tcGFueUlkIjoiMSIsIlVzZXJJZCI6IjEiLCJGdWxsTmFtZSI6IkNMSU5JQ0EgUFJVRUJBUyIsIklzU3VwZXJBZG1pbiI6IlRydWUiLCJuYmYiOjE2NDc1MjM5MDQsImV4cCI6MTY0NzU0NTUwNCwiaXNzIjoiY2xpbmljYW51ZXZhLmNvbSIsImF1ZCI6IlB1YmxpYyJ9.6-lcU_5xdE1Q0GU0YzMx3oxm8dunJCD_XgPQybjUc3EfdWTYANhvOvrwYARgkul2tQ-CCAqGmKccr0zx0BUodg");
        if (this.activeRouter.snapshot.queryParams && this.activeRouter.snapshot.queryParams["CNuevaToken"])
          localStorage.setItem("token", this.activeRouter.snapshot.queryParams["CNuevaToken"]);
        else if (!tokenLocalStorage) {
          alert("unautorized");
        }
      }
    });
  }

}
