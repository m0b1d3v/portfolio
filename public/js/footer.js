class Footer extends HTMLElement {

	connectedCallback() {
		this.innerHTML = `
			<hr/>

			<footer>
				<a href="mailto:mail@mobiusk.com">Email</a>
				<br>
				<a href="https://mobiusk.com/git">Github</a>
				<br>
				<a href="feed.xml">RSS</a>
				<br>
				<a href="https://mobiusk.com/twitter">Twitter</a>
			</footer>
		`;
	}

}

window.customElements.define("portfolio-footer", Footer);
