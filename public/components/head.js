class Head extends HTMLElement {

	connectedCallback() {

		document.head.innerHTML += `
			<meta name="description" content="Personal projects and interests">
			<meta name="viewport" content="width=device-width, initial-scale=1">

			<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
			<link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png">
			<link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png">
			<link rel="manifest" href="/favicons/site.webmanifest">
		`;

		this.remove();
	}

}

window.customElements.define("portfolio-head", Head);
