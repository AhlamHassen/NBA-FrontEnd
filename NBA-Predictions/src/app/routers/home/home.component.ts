import { Component, OnInit, OnDestroy } from '@angular/core';

import { NavService } from '../../services/nav-service.service';
import { HttpService } from '../../services/http-service.service';
import { CurrentTeamService } from '../../services/current-team.service';

import { Team } from '../../modules/team';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  buttonName = "Create";
  teams: Team[] = [];
  stringTeams = [];

  sortstring: string = 'FIRSTNAME';
  sorttype : string = 'ASC';

  constructor(private navService: NavService, private httpService: HttpService, private currentTeamService: CurrentTeamService) { }

  ngOnInit(): void {
    // Grab all teams everytime the landing page is loaded
    this.teams = this.httpService.GetAllTeams();
    
    document.body.classList.add('landingPageBackgroundImage');
  }

  ngOnDestroy() {
    document.body.classList.remove('landingPageBackgroundImage');
  }

  Navigate(teamName: string) {
    if(teamName == '' || teamName == null){
      alert('Please enter a team name');
      return;
    }
    this.currentTeamService.teamName = teamName;
    if (this.buttonName == "View") {

      this.navService.NavTeamSummary(teamName);

      this.currentTeamService.teamName = teamName;
      localStorage.setItem('teamname', JSON.stringify(teamName));

      this.currentTeamService.players = this.httpService.getTeamPlayers(teamName,this.sortstring,this.sorttype);
    }
    else {
      this.navService.NavManagePlayers(teamName);
      this.httpService.CreateTeam(teamName);

      this.currentTeamService.playerKeys = [];
      this.currentTeamService.players = [];
      localStorage.setItem('teamname', JSON.stringify(teamName));
    }
  }

  UpdateInput(userInput: string) {
    // Minor error, shouldnt need to call every time a user inputs, cant do in init 
    this.teams.forEach(team => {
      this.stringTeams.push(team.teamName.toLowerCase());
    });

    if (this.stringTeams.includes(userInput.toLowerCase())) {
      this.buttonName = "View";
    }
    else {
      this.buttonName = "Create";
    }

  }

}
