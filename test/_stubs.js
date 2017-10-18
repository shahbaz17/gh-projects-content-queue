import sinon from 'sinon';
import config from '../config.default.json';
import DataStoreHolder from '../lib/data-store-holder';
import getGithubClient from './_github-client';
import Source from '../lib/sources/source';

const getConfig = () => config[0];

const getDataStoreHolder = () => {
    const Dsh = class extends DataStoreHolder {
        constructor() {
            super();
            this.updateSpy = sinon.stub();
        }
        async update() {
            this.updateSpy();
            return super.update();
        }
    };
    return new Dsh();
};

const getIssueData = () => ({
    id: 0,
    number: 1,
    owner: "test",
    repo: "foo",
    content: 'lorem ipsum',
    updated_at: new Date().toString(),
    assignee: null,
    labels: [],
    title: 'bar',
    state: true
});

const getSource = () => new Source();

const allCards = new Map();

const getColumn = (id, name) => ({
    id,
    name,
    allCards,
    issues: {},
    cards: new Set(),
    config: getConfig(),
    githubClient: getGithubClient()
});

const getColumns = (columns) => {
    const columnInstances = {};
    for(const columnName in columns) {
        columnInstances[columns[columnName]] = getColumn(columns[columnName], columnName);
    }
    return columnInstances;
};

const getBoard = (columns) => ({
    cards: allCards,
    ready: Promise.resolve(),
    columns: Promise.resolve(getColumns(columns)),
    columnIds: Promise.resolve(columns),
    config: getConfig(),
    githubClient: getGithubClient()
});

const getIssue = (content = 'lorem ipsum') => {
    //TODO should use an actual issue instance instead with a no-op github client.
    const labels = new Set();
    return {
        content,
        addLabel: sinon.spy((label) => labels.add(label)),
        hasLabel: sinon.spy((label) => labels.has(label)),
        removeLabel: sinon.spy((label) => labels.delete(label)),
        comment: sinon.spy()
    };
};

const getIssues = () => ({
    firstRun: false,
    ready: Promise.resolve(),
    issues: Promise.resolve(new Map()),
    closedIssues: Promise.resolve(new Map()),
    config: getConfig(),
    githubClient: getGithubClient()
});

const getRepo = (columns) => ({
    ready: Promise.resolve(),
    board: getBoard(columns),
    issues: getIssues(),
    config: getConfig(),
    githubClient: getGithubClient()
});

export {
    getConfig,
    getDataStoreHolder,
    getGithubClient,
    getIssueData,
    getSource,
    getColumn,
    getBoard,
    getIssue,
    getIssues,
    getRepo
};
