class Header extends HTMLElement {

	connectedCallback() {
		this.innerHTML = `
			<img src="logo.png" alt="Brand logo" width="320px" height="119px">

			<h1>MobiusK</h1>
			<hr>
		`;
	}

}

window.customElements.define("portfolio-header", Header);
