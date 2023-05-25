import { FormGroup, Input, Label } from 'reactstrap'

const Answer = ({ answerText, onSelectAnswer }) => {
  return (
    <div className='answer ' onClick={() => onSelectAnswer(answerText)}>
      <FormGroup check className='answer-text'>
        <Input className='my-auto' name='radio1' type='radio' />{' '}
        <Label className='px-3'>{answerText}</Label>
      </FormGroup>
    </div>
  )
}

export default Answer
