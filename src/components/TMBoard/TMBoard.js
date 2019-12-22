import React from 'react';
import './TMBoard.css'
const TODO_ENUM = '0';
const PRIORITIES = { '0': 0, '1': 1, '2': 2, '3': 3 };
const PRIORITIES_STRING = { '0':'Unknown', '1':'Low', '2':'Medium', '3':'High'}
const STATUS_STRING = {'0':'Todo', '1':'In Progress', '2':'In Review', '3': 'Closed'};
/**
 * React component for the board of issues
 */
class TMBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            issues: [],
            description: '',
            priority: '0',
            status: '',
            title: '',
            selectedIssueId: '',
            filter: 'alpha'
        };

        this.issueInfoCallback = this.issueInfoCallback.bind(this);
        this.issueEditHandler = this.issueEditHandler.bind(this);
    }

    /**
     * React lifecycle function that is called before the component loads.
     */
    componentDidMount() {
        fetch('http://142.66.140.65:8888/issues')
            .then(resp => resp.json())
            .then(data => {
                let issues = data.issues;
                this.setState({ issues: issues });
                console.log(this.state.issues);
            });
    }

    /**
     * Function to be called when there is a change of input in description
     * @param {The changed value} event
     */
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    /**
     * Function to be called when there is a change of input in title
     * @param {The changed value} event
     */
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    /**
     * Function to be called when there is a change of input in priority
     * @param {The changed value} event
     */
    handlePriorityChange(event) {
        this.setState({ priority: event.target.value });
    }
    /**
     * Function to be called when there is a change of input in the filter dropdown
     * @param {The changed value} event
     */
    handleFilterChange(event) {
        this.setState({ filter: event.target.value });
    }

    /**
     * Function that begins the drag and drop functionality. Transfers the
     * dragged issue information.
     * @param {The event to hold to info of issue} ev
     * @param {The issue being dragged} issue
     */
    onDragStart = (ev, issue) => {
        ev.dataTransfer.setData('id', issue.id);
        ev.dataTransfer.setData('title', issue.title);
        ev.dataTransfer.setData('description', issue.description);
        ev.dataTransfer.setData('status', issue.status);
        ev.dataTransfer.setData('priority', issue.priority);
    };

    /**
     * Function to cancel events that would occur while the issue is still
     * being dragged over.
     * @param {The event} ev
     */
    onDragOver = ev => {
        ev.preventDefault();
    };

    /**
     * Function to handle when an issue is dropped. Makes call to server
     * to change that issue's new status.
     * @param {The event captured} ev
     * @param {The new status we dropped the issue into} cat
     */
    onDrop = (ev, cat) => {
        let id = ev.dataTransfer.getData('id');
        let title = ev.dataTransfer.getData('title');
        let description = ev.dataTransfer.getData('description');
        let priority = ev.dataTransfer.getData('priority');

        let issues = this.state.issues.filter(issue => {
            if (issue.id == id) {
                issue.status = cat;
                console.log('New status: ' + issue.status);
                fetch(
                    'http://142.66.140.65:8888/issues?action=update&id=' +
                        id +
                        '&title=' +
                        title +
                        '&description=' +
                        description +
                        '&status=' +
                        issue.status +
                        '&priority=' +
                        priority,
                    {
                        method: 'post',
                        mode: 'no-cors',
                        body:
                            'update,' +
                            id +
                            ',' +
                            title +
                            ',' +
                            description +
                            ',' +
                            issue.status +
                            ',' +
                            priority
                    }
                );
            }
            return issue;
        });
        this.setState({
            ...this.state,
            issues
        });
    };

    /**
     * Function that sets the state of our selected issue, when an issue
     * is clicked.
     * @param {The selected issue} i
     */
    selectIssue(i) {
        this.setState({ selectedIssueId: i.id });
    }

    /**
     * Function that handles the submission of a new issue. Makes server
     * call.
     * @param {The event captured} e
     */
    handleIssueSubmit(e) {
        e.preventDefault();
        let title = this.state.title;
        let description = this.state.description;
        let priority = PRIORITIES[this.state.priority];
        fetch(
            'http://142.66.140.65:8888/issues?action=add&title=' +
                title +
                '&description=' +
                description +
                '&priority=' +
                priority,
            {
                method: 'post',
                mode: 'no-cors',
                body: 'add,' + title + ',' + description + ',' + priority
            }
        ).then(response => {
            // this.setState({ title: ''});
            this.componentDidMount();
        });
    }

    /**
     * Function to handle issue filter. Makes server call.
     */
    filterIssueHandler() {
        const filter = this.state.filter;
        if (filter != '') {
            fetch('http://142.66.140.65:8888/issues?sort=' + filter)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ issues: data.issues });
            });
        }
    }

    /**
     * Renders the issue form to webpage.
     */
    renderIssueForm() {
        return (
            <div className="issue-form-container">

            <form>
                <div>
                    <h4 className="quick-form">Create New Issue</h4>
                    <div className="quick-form">Title: </div>
                    <input
                        className="quick-form"
                        type="text"
                        value={this.state.title}
                        onChange={e => this.handleTitleChange(e)}
                        ></input>
                </div>
                <button
                    className="btn btn-dark quick-form"
                    onClick={e => this.handleIssueSubmit(e)}
                    >
                    Add Issue
                </button>
            </form>
                    </div>
        );
    }

    /**
     * Call back function to reset the issue form.
     */
    issueInfoCallback() {
        this.setState({ selectedIssueId: '' });
    }

    /**
     * On saving issue edit changes. Will reload component.
     */
    issueEditHandler() {
        this.componentDidMount();
    }

    /**
     * Renders overall component.
     */
    render() {
        let issues = {
            todo: [],
            inProgress: [],
            inReview: [],
            completed: []
        };
        if (this.state.issues !== null) {

            this.state.issues.forEach(i => {
                if (i.status == '0') {
                    issues.todo.push(
                        <tr key={i.id}>
                        <td
                            key={i.id}
                            onClick={() => this.selectIssue(i)}
                            onDragStart={e => this.onDragStart(e, i)}
                            draggable
                            className="draggable"
                            >
                            {i.title}
                        </td>
                    </tr>
                );
            } else if (i.status == '1') {
                issues.inProgress.push(
                    <tr key={i.id}>
                        <td
                            key={i.id}
                            onClick={() => this.selectIssue(i)}
                            onDragStart={e => this.onDragStart(e, i)}
                            draggable
                            className="draggable"
                            >
                            {i.title}
                        </td>
                    </tr>
                );
            } else if (i.status == '2') {
                issues.inReview.push(
                    <tr key={i.id}>
                        <td
                            key={i.id}
                            onClick={() => this.selectIssue(i)}
                            onDragStart={e => this.onDragStart(e, i)}
                            draggable
                            className="draggable"
                            >
                            {i.title}
                        </td>
                    </tr>
                );
            } else if (i.status == '3') {
                issues.completed.push(
                    <tr key={i.id}>
                        <td
                            key={i.id}
                            onClick={() => this.selectIssue(i)}
                            onDragStart={e => this.onDragStart(e, i)}
                            draggable
                            className="draggable"
                            >
                            {i.title}
                        </td>
                    </tr>
                );
            }
        });
    }

        return (
            <div>
                <h2 className="page-head">Issues</h2>
                <div className="filter-container">

                <select
                    value={this.state.filter}
                    onChange={e => this.handleFilterChange(e)}
                    className="form-control-md"
                    >
                    <option value="alpha">Alphabetically</option>
                    <option value="id">Issue Id</option>
                    <option value="priority">Priority</option>
                </select>
                <button
                    onClick={() => this.filterIssueHandler()}
                    className="btn btn-warning filter-btn"
                    >
                    Filter
                </button>
                    </div>

                <div className="TMBoard-container">
                    <div
                        className="table-container droppable"
                        onDrop={e => this.onDrop(e, '0')}
                        onDragOver={e => this.onDragOver(e)}
                    >
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="todo table-header" scope="col">
                                        Todo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{issues.todo}</tbody>
                        </table>
                    </div>
                    <div
                        className="table-container droppable"
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e, '1')}
                    >
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="inProgress table-header" scope="col">
                                        In Progress
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{issues.inProgress}</tbody> 
                        </table>
                    </div>
                    <div
                        className="table-container droppable"
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e, '2')}
                    >
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="inReview table-header" scope="col">
                                        In Review
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{issues.inReview}</tbody>   
                        </table>
                    </div>
                    <div
                        className="table-container droppable"
                        onDragOver={e => this.onDragOver(e)}
                        onDrop={e => this.onDrop(e, '3')}
                    >
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th className="completed table-header" scope="col">
                                        Completed
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{issues.completed}</tbody>
                        </table>
                    </div>
                    {/* Load Issue Form or Issue Info */}
                    {this.state.selectedIssueId != '' ? (
                        <IssueInfo
                            id={this.state.selectedIssueId}
                            resetIssueForm={this.issueInfoCallback}
                            onSaveEdit={this.issueEditHandler}
                        />
                    ) : (
                        this.renderIssueForm()
                    )}
                </div>
            </div>
        );
    }
}

/**
 * Component for issue info
 */
class IssueInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            status: '',
            timestamp: '',
            assignee: '',
            assigneeField: '',
            priority: '',
            comments: [],
            commentText: '',
            commentEditText: '',
            issueEdit: false,
            commentEdit: false,
            commentEditIndex: null,
            userAssign: false
        };
    }

    /**
     * React lifecycle function.
     */
    componentDidMount() {
        fetch('http://142.66.140.65:8888/issues?id=' + this.props.id)
            .then(resp => resp.json())
            .then(data => {
                this.setState({ title: data.title });
                this.setState({ description: data.description });
                this.setState({ status: data.status });
                this.setState({ timestamp: data.timestamp });
                this.setState({ assignee: data.assignee });
                this.setState({ priority: data.priority });
                this.setState({ comments: data.comments });
            });
    }

    /**
     * React lifecycle function.
     * @param {The previous props before update} prevProps
     */
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            fetch('http://142.66.140.65:8888/issues?id=' + this.props.id)
                .then(resp => resp.json())
                .then(data => {
                    this.setState({ title: data.title });
                    this.setState({ description: data.description });
                    this.setState({ status: data.status });
                    this.setState({ timestamp: data.timestamp });
                    this.setState({ priority: data.priority });
                    this.setState({ assignee: data.assignee });
                    this.setState({ comments: data.comments });
                    this.setState({ issueEdit: false });
                });
        }
    }

    /**
     * Function to handle changed description input.
     * @param {The event of the changed input value} event
     */
    handleDescriptionChange(event) {
        this.setState({ description: event.target.value });
    }
    /**
     * Function to handle changed title input.
     * @param {The event of the changed input value} event
     */
    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    /**
     * Function to handle changed priority input.
     * @param {The event of the changed input value} event
     */
    handlePriorityChange(event) {
        this.setState({ priority: event.target.value });
    }
    /**
     * Function to handle changed assignee input.
     * @param {The event of the changed assignee value} event
     */
    handleAssigneeChange(event) {
        this.setState({ assigneeField: event.target.value });
    }
    /**
     * Function to handle changed comment input.
     * @param {The event of the changed comment value} event
     */
    handleCommentChange(event) {
        this.setState({ commentText: event.target.value });
    }
    /**
     * Function to handle changed comment edit input.
     * @param {The event of the changed comment edit value} event
     */
    handleCommentEditChange(event) {
        this.setState({ commentEditText: event.target.value });
    }

    /**
     * Function that assigns issue to user. Makes server call.
     * @param {Any unwanted events to cancel} e
     */
    assignUser(e) {
        e.preventDefault();
        let id = this.props.id;
        let assignee = this.state.assigneeField;
        fetch(
            'http://142.66.140.65:8888/issues?action=assign&ID=' +
                id +
                '&username=' +
                assignee,
            {
                method: 'post',
                mode: 'no-cors',
                body: 'update,' + id + ',' + assignee
            }
        ).then(() => this.componentDidMount());
        this.setState({assigneeField: '', userAssign: false})
    }

    /**
     * Function that saves an issues edit changes.
     * @param {Any unwanted events to cancel} e
     */
    saveChanges(e) {
        e.preventDefault();
        let id = this.props.id;
        let title = this.state.title;
        let description = this.state.description;
        if (description.length === 0) {
            description = "N/A";
        }
        let status = this.state.status;
        let priority = this.state.priority;
        fetch(
            'http://142.66.140.65:8888/issues?action=update&id=' +
                id +
                '&title=' +
                title +
                '&description=' +
                description +
                '&status=' +
                status +
                '&priority=' +
                priority,
            {
                method: 'post',
                mode: 'no-cors',
                body:
                    'update,' +
                    id +
                    ',' +
                    title +
                    ',' +
                    description +
                    ',' +
                    status +
                    ',' +
                    priority
            }
        );
        this.setState({ issueEdit: false });
        this.props.onSaveEdit();
    }

    /**
     * Function that sets flag for the issue edit to true.
     */
    renderIssueEdit() {
        this.setState({ issueEdit: true });
    }

    /**
     * Function that sets flag for the user assign to true.
     */
    renderUserAssign() {
        this.setState({ userAssign: true });
    }

    /**
     * Function to handle the deletion of a issue. Makes server call.
     */
    deleteIssue() {
        let { id } = this.props;
        fetch('http://142.66.140.65:8888/issues?action=delete&id=' + id, {
            method: 'post',
            mode: 'no-cors',
            body: 'delete,' + id + ','
        });
        this.props.resetIssueForm();
        this.props.onSaveEdit();
    }

    /**
     * Function to handle the addition of a comment to issue.
     * Makes server call.
     */
    addComment() {
        let { id } = this.props;
        let { commentText } = this.state;
        fetch(
            'http://142.66.140.65:8888/issues?action=addComment&id=' +
                id +
                '&comment=' +
                commentText,
            {
                method: 'post',
                mode: 'no-cors',
                body: 'addComment,' + id + ',' + commentText + ','
            }
        );
        this.setState({ commentText: '' });
        this.componentDidMount();
    }

    /**
     * Function to handle the deletion of a comment of an issue.
     * Makes server call.
     */
    deleteComment(index) {
        let { id } = this.props;
        fetch(
            'http://142.66.140.65:8888/issues?action=deleteComment&id=' +
                id +
                '&commentIndex=' +
                index,
            {
                method: 'post',
                mode: 'no-cors',
                body: 'deleteComment,' + id + ',' + index + ','
            }
        );
        this.componentDidMount();
    }

    /**
     * Function to handle the edit of a comment.
     * Makes server call.
     */
    saveCommentChanges() {
        let { commentEditText, commentEditIndex } = this.state;
        let { id } = this.props;
        fetch(
            'http://142.66.140.65:8888/issues?action=editComment&id=' +
                id +
                '&commentIndex=' +
                commentEditIndex +
                '&comment=' +
                commentEditText,
            {
                method: 'post',
                mode: 'no-cors',
                body:
                    'deleteComment,' +
                    id +
                    ',' +
                    commentEditIndex +
                    ',' +
                    commentEditText +
                    ','
            }
        );
        this.setState({commentEdit: false})
        this.componentDidMount();
    }

    /**
     * Function to render the comment form.
     */
    renderCommentForm() {
        return (
            <div className="comment-form-container">
                <input
                    value={this.state.commentText}
                    onChange={e => this.handleCommentChange(e)}
                    className="comment-form-input"
                ></input>
                <button
                    className="btn btn-dark"
                    onClick={() => this.addComment()}
                >
                    Comment!
                </button>
            </div>
        );
    }

    /**
     * Function to load component.
     */
    render() {
        return (
            <div className="issue-detail-container">
                {this.state.issueEdit ? (
                    <div>
                        <h3>Issue #{this.props.id}</h3>
                        <div>Title</div>
                        <input
                            value={this.state.title}
                            onChange={e => this.handleTitleChange(e)}
                        ></input>
                        <div>Description</div>
                        <input
                            value={this.state.description}
                            onChange={e => this.handleDescriptionChange(e)}
                        ></input>
                        <div>Status: {STATUS_STRING[this.state.status]}</div>
                        <div>
                            <div>Priority:</div>
                            <select
                                value={this.state.priority}
                                onChange={e => this.handlePriorityChange(e)}
                            >
                                <option value="0">Unset</option>
                                <option value="1">Low</option>
                                <option value="2">Medium</option>
                                <option value="3">High</option>
                            </select>
                        </div>

                        <button onClick={e => this.saveChanges(e)}>
                            Save!
                        </button>
                    </div>
                ) : (
                    <div className="">
                        <div className="title-wrapper">
                            <h3 className="issue-title">
                                Issue #{this.props.id}
                            </h3>
                            <div className="timestamp">
                                {this.state.timestamp}
                            </div>
                        </div>
                        <div>Title: {this.state.title}</div>
                        <div>Description: {this.state.description}</div>
                        <div>Status: {STATUS_STRING[this.state.status]}</div>
                        <div>Priority: {PRIORITIES_STRING[this.state.priority]}</div>
                        <div>Assignee: {this.state.assignee}</div>
                        {this.state.userAssign ? (
                            <div>
                                <input
                                    type="text"
                                    value={this.state.assigneeField}
                                    onChange={e => this.handleAssigneeChange(e)}
                                ></input>
                                <button onClick={e => this.assignUser(e)}>
                                    Assign!
                                </button>
                            </div>
                        ) : (
                            ''
                        )}
                        <div className="button-container">
                            <button
                                className="btn btn-light"
                                onClick={() => this.renderUserAssign()}
                            >
                                Assign
                            </button>
                            <button
                                className="btn btn-light"
                                onClick={() => this.props.resetIssueForm()}
                            >
                                Create New
                            </button>
                            <button
                                className="btn btn-light"
                                onClick={() => this.renderIssueEdit()}
                            >
                                Edit
                            </button>
                            <button
                                className="btn btn-danger"
                                onClick={() => this.deleteIssue()}
                            >
                                Delete
                            </button>
                        </div>
                        <div className="comment-container">
                            <h5>Comments: </h5>
                            {this.state.comments !== null
                                ? this.state.comments.map((comment, index) => (
                                      <div key={index}>
                                          <div className="comment">
                                              <div>
                                              <div>{comment.comment}</div>
                                                <div className="comment-timestamp">{comment.timestamp}</div>
                                              </div>
                                              <div className="comment-btn-container">
                                                  <button
                                                      className="btn btn-light"
                                                      onClick={() =>
                                                          this.setState({
                                                              commentEdit: true,
                                                              commentEditIndex: index,
                                                              commentEditText: this
                                                                  .state
                                                                  .comments[
                                                                  index
                                                              ].comment
                                                          })
                                                      }
                                                  >
                                                      Edit
                                                  </button>
                                                  <button
                                                      className="btn btn-danger"
                                                      onClick={() =>
                                                          this.deleteComment(
                                                              index
                                                          )
                                                      }
                                                  >
                                                      Delete
                                                  </button>
                                              </div>
                                          </div>
                                          <hr></hr>
                                      </div>
                                  ))
                                : 'None'}
                            {this.state.commentEdit ? (
                                <div>
                                    <input
                                        value={this.state.commentEditText}
                                        onChange={e =>
                                            this.handleCommentEditChange(e)
                                        }
                                    ></input>
                                    <button
                                        className="btn btn-dark"
                                        onClick={() =>
                                            this.saveCommentChanges()
                                        }
                                    >
                                        Save!
                                    </button>
                                </div>
                            ) : (
                                <div></div>
                            )}
                            {this.renderCommentForm()}
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default TMBoard;
