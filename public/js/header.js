class Header extends HTMLElement {

	connectedCallback() {
		this.innerHTML = `
			<img src="logo.png" alt="Brand logo" width="320px" height="119px">

			<h1>MobiusK</h1>

			<h2>
				<a href="mailto:mail@mobiusk.com">mail@mobiusk.com</a>
			</h2>

			<h3>
				<a href="https://git.mobiusk.com">git.mobiusk.com</a>
			</h3>

			<hr>
		`;
	}

}

window.customElements.define("portfolio-header", Header);
