import {Component, OnInit} from '@angular/core';
import {eformDashboardPnSettingsService} from '../../services';
import {eformDashboardBaseSettingsModel} from '../../models';

@Component({
  selector: 'app-eform-dashboard-settings',
  templateUrl: './eform-dashboard-settings.component.html',
  styleUrls: ['./eform-dashboard-settings.component.scss']
})
export class eformDashboardSettingsComponent implements OnInit {
  settingsModel: eformDashboardBaseSettingsModel = new eformDashboardBaseSettingsModel();

  constructor(private insightDashboardPnSettingsService: eformDashboardPnSettingsService) {
  }

  ngOnInit() {
    this.getSettings();
  }


  getSettings() {
    this.insightDashboardPnSettingsService.getAllSettings().subscribe((data) => {
      if (data && data.success) {
        this.settingsModel = data.model;
      }
    });
  }

  updateSettings() {
    this.insightDashboardPnSettingsService.updateSettings(this.settingsModel)
      .subscribe((data) => {
        if (data && data.success) {

        }
      });
  }
}
