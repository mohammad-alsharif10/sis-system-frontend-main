import {Component, Input, OnInit} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Constants} from '../../shared/constants';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  @Input() sideMenu: MatSidenav;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  public logout(): void {
    localStorage.removeItem(Constants.authHeader);
    localStorage.removeItem(Constants.loggedInUser);
    localStorage.removeItem(Constants.screens);
    this.router.navigate(['/login']).then(_ => {
    });
  }
}
