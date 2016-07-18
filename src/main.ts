import * as m from "mithril";

class CodeViewModel {
    constructor(public title: string, public className: string, public text: string) {
    }
}

class ChildViewModel {
    constructor(public title: string, public description: string, public url: string) {
    }
}

class MainController implements Mithril.Controller {
    children: Array<ChildViewModel>;

    code: CodeViewModel;

    constructor() {
        this.children = [
            new ChildViewModel("Blog(2015~)", "Life and Tech log", "http://grimrose.github.io/blog/"),
            new ChildViewModel("Speaker Deck", "Shared Presentations", "https://speakerdeck.com/grimrose"),
            new ChildViewModel("Tech Log(~2015)", "Past Tech log", "http://grimrose.bitbucket.org/"),
            new ChildViewModel("Blogger(~2015)", "Past Life log", "http://grimrose.blogspot.jp/")
        ];
        this.code = new CodeViewModel("About me", "groovy", `
import groovy.json.*

def json = new JsonBuilder()
json {
    AboutMe {
        "@grimrose" {
            favorite {
                lang "Groovy"
                ide "IntelliJ IDEA"
            }
            community {
                name "Yokohama.groovy"
                tag "#yokohamagroovy"
            }
        }
    }
}

def pretty = json.toPrettyString()

println StringEscapeUtils.unescapeJava(pretty)
`
        );
    }
}

export class MainComponent implements Mithril.Component<MainController> {
    controller: () => MainController;

    view: (ctrl?: MainController, ...args: any[]) => Mithril.VirtualElement;


    constructor() {
        this.controller = () => {
            return new MainController();
        };

        this.view = (ctrl) => {
            const children = ctrl.children;
            const code = ctrl.code;
            return m(".hero-body",
                m(".container.has-text-centered", [
                    m(".tile.is-ancestor", [
                        m(".tile.is-parent.is-2", []),
                        m(".tile.is-parent.is-4", [
                            m(".tile.is-child", [
                                m("h1.title",
                                    code.title
                                ),
                                m("pre", {className: "has-text-left"}, [
                                    m("code", {className: code.className},
                                        code.text
                                    )
                                ])
                            ]),
                        ]),
                        m(".tile.is-parent.is-4.is-vertical", children.map((child: ChildViewModel) => {
                            return m(".tile.is-child", [
                                m("p.title", child.title),
                                m("p", child.description),
                                m("a", child.url)
                            ]);
                        })),
                    ]),
                ])
            );
        };
    }

}
