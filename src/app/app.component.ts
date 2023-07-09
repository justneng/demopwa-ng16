import {Component, OnInit, signal} from '@angular/core';
import {SwUpdate} from "@angular/service-worker";
import {interval} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'demopwa-ng16';
  isOnline: boolean = false;
  modalVersion: boolean = false;
  currentVersion = signal(undefined);

  constructor(private swUpdate: SwUpdate) {
    this.isOnline = false;
  }

  ngOnInit(): void {
    this.updateOnlineStatus();
    window.addEventListener('online', this.updateOnlineStatus.bind(this));
    window.addEventListener('offline', this.updateOnlineStatus.bind(this));

    console.log('this.swUpdate.isEnabled = ', this.swUpdate.isEnabled)
    if (this.swUpdate.isEnabled) {
      this.checkForUpdates();
      interval(300000) //check every 5 minutes
        .subscribe(() => this.swUpdate.checkForUpdate()
          .then(() => console.log('checking for updates'))
        );
      this.swUpdate.versionUpdates
        .subscribe(event => {
          console.log('versionUpdates event = ', event);
          if (event.type == 'VERSION_READY') {
            console.info(`currentVersion=[${event.currentVersion} | latestVersion=[${event.latestVersion}]`);
            this.currentVersion.set(event.currentVersion as any);
            this.modalVersion = true;
          } else if (event.type == 'NO_NEW_VERSION_DETECTED') {
            this.currentVersion.set(event.version.hash as any);
          }
        })
    }
  }

  private updateOnlineStatus(): void {
    this.isOnline = window.navigator.onLine;
    console.info(`isOnline=[${this.isOnline}]`);
  }

  public updateVersion(): void {
    this.modalVersion = false;
    window.location.reload();
  }

  public closeVersion(): void {
    this.modalVersion = false;
  }

  public checkForUpdates(): void {
    this.swUpdate.checkForUpdate().then()
  }
}
