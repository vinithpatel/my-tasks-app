import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import Tag from './components/Tag'
import Task from './components/Task'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    inputValue: '',
    optionId: tagsList[0].optionId,
    activeTagOptionId: '',
    tasksList: [],
  }

  getTagDisplayText = optionId => {
    const tagObj = tagsList.find(eachTag => eachTag.optionId === optionId)
    return tagObj.displayText
  }

  getFilteredTasksList = () => {
    const {tasksList, activeTagOptionId} = this.state

    return tasksList.filter(eachTask =>
      eachTask.tagId.includes(activeTagOptionId),
    )
  }

  onChangeInputValue = event => {
    this.setState({inputValue: event.target.value})
  }

  onChangeDropDownValue = event => {
    this.setState({optionId: event.target.value})
  }

  onClickAddTask = event => {
    event.preventDefault()

    this.setState(prevState => {
      const {inputValue, optionId, tasksList} = prevState

      const tagText = this.getTagDisplayText(optionId)

      // creating task object
      const task = {
        id: uuidv4(),
        name: inputValue,
        tagId: optionId,
        tagText,
      }

      console.log(task)

      // adding task object into tasks list

      const updatedTasksList = [...tasksList, task]
      return {
        inputValue: '',
        optionId: tagsList[0].optionId,
        tasksList: updatedTasksList,
      }
    })
  }

  updatedActiveTag = optionId => {
    this.setState(prevState => {
      const {activeTagOptionId} = prevState

      if (activeTagOptionId === optionId) {
        return {activeTagOptionId: ''}
      }

      return {activeTagOptionId: optionId}
    })
  }

  renderCreateTaskForm = () => {
    const {inputValue, optionId} = this.state

    return (
      <div className="form-bg-container">
        <h1 className="create-task-heading">Create a task!</h1>
        <form className="input-form" onSubmit={this.onClickAddTask}>
          <div className="input-card">
            <label htmlFor="userInput" className="input-name">
              Task
            </label>
            <input
              type="text"
              id="userInput"
              className="user-input"
              placeholder="Enter the task here"
              value={inputValue}
              onChange={this.onChangeInputValue}
            />
          </div>
          <div className="input-card">
            <label htmlFor="dropDown" className="input-name">
              Tags
            </label>
            <select
              id="dropDown"
              className="user-input"
              value={optionId}
              onChange={this.onChangeDropDownValue}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-task-button">
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderTagsList = () => {
    const {activeTagOptionId} = this.state

    return (
      <ul className="tags-list-container">
        {tagsList.map(eachTag => (
          <Tag
            key={eachTag.optionId}
            tagDetails={eachTag}
            isActive={activeTagOptionId === eachTag.optionId}
            updatedActiveTag={this.updatedActiveTag}
          />
        ))}
      </ul>
    )
  }

  renderNoTaskView = () => (
    <div className="no-task-view">
      <p className="no-task-heading">No Tasks Added Yet</p>
    </div>
  )

  renderTasksList = () => {
    const filteredTasksList = this.getFilteredTasksList()

    if (filteredTasksList.length === 0) {
      return this.renderNoTaskView()
    }

    return (
      <ul className="task-list-container">
        {filteredTasksList.map(eachTask => (
          <Task key={eachTask.id} taskDetails={eachTask} />
        ))}
      </ul>
    )
  }

  render() {
    return (
      <div className="app-bg-container">
        <div className="create-task-container">
          {this.renderCreateTaskForm()}
        </div>
        <div className="tags-and-task-view-bg-container">
          <h1 className="tags-and-task-view-heading">Tags</h1>
          {this.renderTagsList()}
          <h1 className="tags-and-task-view-heading">Tasks</h1>
          {this.renderTasksList()}
        </div>
      </div>
    )
  }
}

export default App
