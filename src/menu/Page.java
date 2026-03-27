package menu;

public class Page {  // Page contains multiple PageElement objects like buttons and sliders
	
	private PageElement[] page;

	public Page() {
		this.page = new PageElement[] {};
	}
	
	public void update() {
		for (int i = 0; i < this.page.length; i++) {
			this.page[i].update();
		}
	}

}
