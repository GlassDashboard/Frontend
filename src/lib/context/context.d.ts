/*

class: new ContextMenu(HTMLElement, Item | null[])
-> install()
-> uninstall()

Item: {
	text: string,
	submenu?: ContextMenu,
	onclick?: (event: ContextEvent) => void,
	hotkey?: string,
	subitems?: Item | null[]
}

ContextEvent: {
	data: Item,
	handled: boolean,
	hotkey: HTMLElement,
	item: HTMLElement,
	items: Item | null[],
	label: HTMLElement,
	nodes: HTMLElement[]
}

*/

declare class ContextMenu {
	constructor(element: HTMLElement, items: (Item | null)[]);

	install(): void;
	uninstall(): void;
}

interface Item {
	text: string;
	submenu?: ContextMenu;
	onclick?: (event: ContextEvent) => void;
	hotkey?: string;
	subitems?: (Item | null)[];
	disabled?: boolean;
}

interface ContextEvent {
	data: Item;
	handled: boolean;
	hotkey: HTMLElement;
	item: HTMLElement;
	items: (Item | null)[];
	label: HTMLElement;
	nodes: HTMLElement[];
}
