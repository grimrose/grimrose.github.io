import * as m from "mithril";
import * as hljs from "highlight.js";


import {GitHubRepositoryViewModel, GitHubModel} from "./github";

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

    github: GitHubModel;

    repositories: Array<GitHubRepositoryViewModel>;

    constructor() {
        this.children = [
            new ChildViewModel("Blog", "Life and Tech log(2015~)", "http://grimrose.github.io/blog/"),
            new ChildViewModel("Speaker Deck", "Shared Presentations", "https://speakerdeck.com/grimrose"),
            new ChildViewModel("Tech Log", "Past Tech log(~2016)", "http://grimrose.bitbucket.org/"),
            new ChildViewModel("Blogger", "Past Life log(~2015)", "http://grimrose.blogspot.jp/")
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
        this.github = new GitHubModel();

        this.repositories = [];
    }

    public loadGitHubRepositories(): void {

        m.startComputation();
        this.github.fetchGitHubRepositories()
            .then((list) => {

                this.repositories = list;
                m.endComputation();
            });
    }
}

export class MainComponent implements Mithril.Component<MainController> {
    controller: () => MainController;

    view: (ctrl?: MainController, ...args: any[]) => Mithril.VirtualElement;


    constructor() {
        this.controller = () => {
            const ctrl = new MainController();

            ctrl.loadGitHubRepositories();
            return ctrl;
        };

        this.view = (ctrl) => {
            const children = ctrl.children;
            const code = ctrl.code;
            const repositories = ctrl.repositories;

            hljs.configure({
                useBR: false,
            });

            const parsed = hljs.highlightAuto(code.text, [code.className]);

            return m(".hero-body",
                m(".container.has-text-centered", [
                    m(".tile.is-ancestor", [
                        m(".tile.is-parent.is-2", []),
                        m(".tile.is-parent.is-5", [
                            m(".tile.is-child", [
                                m("h1.title",
                                    code.title
                                ),
                                m("pre", {className: "has-text-left"}, [
                                    m("code.hljs.groovy", m.trust(parsed.value))
                                ]),
                            ]),
                        ]),
                        m(".tile.is-parent.is-vertical.is-4", [
                            m(".tile.is-child", [
                                m("h2.title", "Repositories"),
                            ]),
                            repositories.map((repo) => {
                                return m(".tile.is-child", [
                                    m("article.media", [
                                        m(".media-content", [
                                            m("p", [
                                                m("a", {
                                                    href: repo.url,
                                                    target: "_black"
                                                }, [
                                                    m("i.fa.fa-github", {"aria-hidden": true}),

                                                ]),
                                                " ",
                                                repo.name
                                            ])
                                        ])
                                    ]),
                                ]);
                            })
                        ]),
                    ]),
                    m(".tile.is-ancestor", [
                        m(".tile.is-parent", children.map((child: ChildViewModel) => {
                            return m(".tile.is-child", [
                                m("h2.title", child.title),
                                m("p", [
                                    m("a", {
                                        href: child.url,
                                        target: "_blank"
                                    }, [
                                        child.description,
                                        " ",
                                        m("span.icon.is-small",
                                            m("i.fa.fa-external-link", {"aria-hidden": true})
                                        ),
                                    ])
                                ]),
                            ]);
                        })),
                    ]),
                ])
            );
        };
    }

}
