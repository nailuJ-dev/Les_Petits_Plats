// function to create HTML elements with tag and anyone node

const createDomElements = (tag, ...childs) => {
	const element = document.createElement(tag)
	childs.forEach(child => {
		if (typeof child === 'string') {
			const nodeText = document.createTextNode(child);
			element.append(nodeText);
		} else if (child instanceof HTMLElement) {
			element.append(child);
		} else if (child instanceof Object) {
			Object.entries(child).forEach(([key, value]) => {
				element.setAttribute(key, value);
			});
		};
	});
	return element;
};