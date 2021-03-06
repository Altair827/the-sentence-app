import { SentenceActions } from '../actions/SentenceActions'

const initialState = {
  Sentence : "",
  JumbledWords : [],
  answerWords : [],
  enableUpdateButton : false,
  showJumbledWords : false,
  isSentenceCorrect : null,
  sentenceLength : 0,
  wordsRemaining : 0,
  showResult : false
}

export default function SentenceReducer(state = initialState,action){
  switch (action.type) {

    case SentenceActions.UPDATE_SENTECE:
        return Object.assign({}, state, {
          Sentence : action.sentence.replace(/\s\s+/g, ' ').trim(),
          enableUpdateButton : action.sentence.split(" ").length > 1,
          showJumbledWords : false,
          JumbledWords : [],
          answerWords : [],
          showResult : false,
          isSentenceCorrect : null
        })

    case SentenceActions.JUMBLE_WORDS:

        return Object.assign({}, state, {
          showJumbledWords : true,
          JumbledWords : action.wordArray,
          answerWords : [],
          sentenceLength : action.wordArray.length,
          wordsRemaining : action.wordArray.length,
          isSentenceCorrect : null,
          showResult : false
        })

    case SentenceActions.ADD_TO_ANSWER:

        let wordSelected = state.JumbledWords.filter((word) => word.id === action.id)[0];
        let jumbledArray = state.JumbledWords.filter((word) => word.id !== action.id);
        let answerWords = state.answerWords;
        answerWords.push(wordSelected);

        return Object.assign({}, state, {
          JumbledWords : jumbledArray,
          answerWords : answerWords,
          wordsRemaining : state.wordsRemaining-1,
          isSentenceCorrect : answerWords.map((word) => word.word).join(' ') === state.Sentence,
          showResult : state.wordsRemaining-1 === 0
        })

    case SentenceActions.REMOVE_FROM_ANSWER:

        let wordToRemove = state.answerWords.filter((word) => word.id === action.id)[0];
        let answerArray = state.answerWords.filter((word) => word.id !== action.id);
        let JumbledWords = state.JumbledWords;
        JumbledWords.push(wordToRemove);

        return Object.assign({}, state, {
          JumbledWords : JumbledWords,
          answerWords : answerArray,
          wordsRemaining : state.wordsRemaining+1,
          showResult : state.wordsRemaining + 1 === 0
        })

    default:
      return state;
  }
}
