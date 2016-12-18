import * as m from "mithril";
import * as conf from "./config";
import XHROptions = Mithril.XHROptions;
import Promise = Mithril.Promise;

export class GitHubRepositoryViewModel {
    name: string;
    url: string;

    constructor(name: string, url: string) {
        this.name = name;
        this.url = url;
    }
}


export class GitHubModel {
    constructor() {
    }

    public fetchGitHubRepositories(): Mithril.Promise<Array<GitHubRepositoryViewModel>> {

        let deferred = m.deferred<Array<GitHubRepositoryViewModel>>();

        this.getRepos()
            .then((list: Array<any>) => {

                const repos = list.map((element) => {
                    return new GitHubRepositoryViewModel(element.name, element.html_url);
                });

                deferred.resolve(repos);
            });

        return deferred.promise;
    }

    private getRepos(): Promise<Array<any>> {

        const endpoint = conf.GITHUB_API_ENDPOINT;
        const user = conf.ACCOUNT_NAME;
        const limit = 5;

        const url = `${endpoint}/users/${user}/repos?sort=pushed&per_page=${limit}`;

        const options = <XHROptions>{
            method: "GET",
            url: url,
            background: true,
            initialValue: [],
        };

        return m.request(options);
    }
}
