import * as m from "mithril";

import * as conf from "./config";


class HeaderViewModel {
    gitHubUrl: string;
    twitterUrl: string;
    bitBucketUrl: string;
    activeToggle: Mithril.BasicProperty<boolean>;

    constructor() {
        this.gitHubUrl = `${conf.GITHUB_URL}/${conf.ACCOUNT_NAME}`;
        this.twitterUrl = `${conf.TWITTER_URL}/${conf.ACCOUNT_NAME}`;
        this.bitBucketUrl = `${conf.BITBUCKET_URL}/${conf.ACCOUNT_NAME}`;
        this.activeToggle = m.prop<boolean>(false);
    }
}

export class HeaderController implements Mithril.Controller {
    vm: HeaderViewModel;

    constructor() {
        this.vm = new HeaderViewModel();
    }

    getToggleClassName(): string {
        const toggle = this.vm.activeToggle();
        if (toggle) {
            return "is-active";
        }
        return "";
    }

    onClickToggle: Function = () => {
        const toggle = this.vm.activeToggle();
        if (toggle) {
            this.vm.activeToggle = m.prop(false);
        } else {
            this.vm.activeToggle = m.prop(true);
        }
    };

}

export class HeaderComponent implements Mithril.Component<HeaderController> {
    controller: () => HeaderController;
    view: (ctrl?: HeaderController, ...args: any[]) => Mithril.VirtualElement;

    constructor() {
        this.controller = () => {
            return new HeaderController();
        };

        this.view = (ctrl) => {
            const vm = ctrl.vm;
            return m(".hero-head",
                m("header.nav.has-shadow",
                    m(".container",
                        [
                            m(".nav-left",
                                m("a.nav-item", {href: "#"}, m("span.title", "grimrose.org"))
                            ),
                            m("span",
                                {
                                    className: "nav-toggle " + ctrl.getToggleClassName(),
                                    onclick: ctrl.onClickToggle
                                },
                                [
                                    m("span", ""),
                                    m("span", ""),
                                    m("span", "")
                                ]
                            ),
                            m(".nav-right.nav-menu", {className: ctrl.getToggleClassName()},
                                [
                                    m("a.nav-item.is-tab", {href: "/"}, [
                                        m("span.icon",
                                            m("i.fa.fa-home")
                                        ),
                                        "Home"
                                    ]),
                                    m("a.nav-item.is-tab", {href: "/blog"}, [
                                        m("span.icon",
                                            m("i.fa.fa-pencil")
                                        ),
                                        "Blog"
                                    ]),
                                    m("a.nav-item.is-tab", {href: vm.twitterUrl}, [
                                        m("span.icon",
                                            m("i.fa.fa-twitter")
                                        ),
                                        "Twitter"
                                    ]),
                                    m("a.nav-item.is-tab", {href: vm.gitHubUrl}, [
                                        m("span.icon",
                                            m("i.fa.fa-github")
                                        ),
                                        "GitHub"
                                    ]),
                                    m("a.nav-item.is-tab", {href: vm.bitBucketUrl}, [
                                        m("span.icon",
                                            m("i.fa.fa-bitbucket")
                                        ),
                                        "Bitbucket"
                                    ]),
                                ]
                            )
                        ]
                    )
                )
            );
        };
    }
}
