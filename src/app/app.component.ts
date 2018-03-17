import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	beginTypingSubtitle: Boolean = false;

	onComplete() {
		setTimeout(() => this.beginTypingSubtitle = true, 500);
	}
}
