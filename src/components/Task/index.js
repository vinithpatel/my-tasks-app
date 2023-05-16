import './index.css'

const Task = props => {
  const {taskDetails} = props
  const {name, tagText} = taskDetails

  return (
    <li className="task-item">
      <p className="task-name">{name}</p>
      <p className="task-tag-text">{tagText}</p>
    </li>
  )
}

export default Task
