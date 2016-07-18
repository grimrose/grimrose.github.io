import * as m from "mithril";

import * as conf from "config";

class FooterViewModel {
    url: string;

    constructor() {
        this.url = `${conf.GITHUB_URL}/${conf.ACCOUNT_NAME}`;
    }
}

class FooterController implements Mithril.Controller {
    vm: FooterViewModel;

    constructor() {
        this.vm = new FooterViewModel();
    }
}

export class FooterComponent implements Mithril.Component<FooterController> {
    controller: () => FooterController;
    view: (ctrl?: FooterController, ...args: any[]) => Mithril.VirtualElement;

    constructor() {
        this.controller = () => {
            return new FooterController();
        };
        this.view = (ctrl) => {
            return m(".hero-foot",
                m(".container",
                    [
                        m("p",
                            [
                                "Copyright ",
                                m.trust("&copy;"),
                                m("a", {
                                        href: ctrl.vm.url,
                                        target: "_blank"
                                    },
                                    "grimrose")
                            ]
                        )
                    ]
                )
            );
        };
    }
}
