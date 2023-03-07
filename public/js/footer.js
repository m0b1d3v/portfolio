class Footer extends HTMLElement {

	connectedCallback() {
		this.innerHTML = `
			<hr/>

			<footer>
				<a href="mailto:mail@mobiusk.com">Email</a>
				<br>
				<a href="feed.xml">RSS</a>
			</footer>
		`;
	}

}

window.customElements.define("portfolio-footer", Footer);
