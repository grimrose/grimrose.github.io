require("font-awesome-webpack");
require("bulma/css/bulma.css");

require("highlight.js/styles/rainbow.css");

require("!style!css!./index.scss");

import * as m from "mithril";
import * as hljs from "highlight.js";

import {HeaderComponent} from "header";
import {MainComponent} from "main";
import {FooterComponent} from "footer";

const header = new HeaderComponent();
const main = new MainComponent();
const footer = new FooterComponent();


class AppController implements Mithril.Controller {
    constructor() {
        hljs.configure({
            useBR: false,
        });
        hljs.initHighlightingOnLoad();
    }
}

class AppComponent implements Mithril.Component<AppController> {
    controller: () => AppController;
    view: (ctrl?: AppController, ...args: any[]) => Mithril.VirtualElement;

    constructor() {
        this.controller = () => {
            return new AppController();
        };
        this.view = (ctrl) => {
            return m("div", [
                header,
                main,
                footer
            ]);
        };
    }
}

m.mount(document.getElementById("app"), new AppComponent());
