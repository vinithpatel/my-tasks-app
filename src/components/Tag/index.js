import './index.css'

const Tag = props => {
  const {isActive, tagDetails, updatedActiveTag} = props
  const {optionId, displayText} = tagDetails

  const onClickButton = () => {
    updatedActiveTag(optionId)
  }

  const activeTagClassName = isActive ? 'active-button' : ''

  return (
    <li className="tag-item">
      <button
        className={`tag-button ${activeTagClassName}`}
        type="button"
        onClick={onClickButton}
      >
        {displayText}
      </button>
    </li>
  )
}

export default Tag
