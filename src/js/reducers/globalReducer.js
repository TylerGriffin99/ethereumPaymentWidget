import constants from '../services/constants';

var initState = {
  termOfServiceAccepted: false,
  showBalance: false,
  nodeName: "Infura Kovan",
  nodeURL: "https://kovan.infura.io/0BRKxQ0SFvAxGL72cbXi",
  count: {storageKey: constants.STORAGE_KEY},
  conn_checker: constants.CONNECTION_CHECKER,
  isVisitFirstTime: true,
  isOpenAnalyze: false,
  isAnalize: false,
  isAnalizeComplete: false,
  analizeError : {},
  selectedAnalyzeHash: '',
  network_error:"",
  metamask: {
    address: "",
    balance: "",
    error: "Address is loading"
  },
  params:{},
  haltPayment: false,
  errorsPayment:{},
  analytics: {
    callTrack : () => {return}
  }
}

const global = (state = initState, action) => {
  switch (action.type) {
    case "GLOBAL.TERM_OF_SERVICE_ACCEPTED": {
      return { ...state, termOfServiceAccepted: true }
    }
    case "GLOBAL.IDLE_MODE": {
      return { ...state, idleMode: true }
    }
    case "GLOBAL.EXIT_IDLE_MODE": {
      return { ...state, idleMode: false }
    }
    case "GLOBAL.TOGGLE_ANALYZE": {
      var oldStateOpenAnalyze = state.isOpenAnalyze
      return {...state, isOpenAnalyze: !oldStateOpenAnalyze}
    }
    case "GLOBAL.OPEN_ANALYZE": {
      var txHash = action.payload
      var newState = {...state}
      newState.selectedAnalyzeHash = txHash
      newState.isOpenAnalyze = true

      return newState
    }
    case "GLOBAL.SET_ANALYZE_ERROR": {
      const { networkIssues, reserveIssues, txHash } = action.payload
      var newState = {...state}
      newState.analizeError[txHash] = { networkIssues, reserveIssues }
      newState.isAnalize = false
      newState.isAnalizeComplete = true
      return newState
    }
    case "GLOBAL.CONNECTION_UPDATE_IS_CHECK":{
      var conn_checker = { ...state.conn_checker }
      conn_checker.isCheck = action.payload
      return Object.assign({}, state, { conn_checker: conn_checker })
    }
    case "GLOBAL.CONNECTION_UPDATE_COUNT":{
      var conn_checker = { ...state.conn_checker }
      conn_checker.count = action.payload
      return Object.assign({}, state, { conn_checker: conn_checker })
    }
    case "GLOBAL.SHOW_BALABCE_USD":{
      return Object.assign({}, state, { showBalance: true })
    }
    case "GLOBAL.HIDE_BALABCE_USD":{
      return Object.assign({}, state, { showBalance: false })
    }
    case "GLOBAL.VISIT_EXCHANGE":{
      return Object.assign({}, state, { isVisitFirstTime: false })
    }
    case "GLOBAL.THROW_ERROR_METAMASK":{
      const {err} = action.payload
      var metamask = {error: err}
      return Object.assign({}, state, { metamask: metamask })
    }
    case "GLOBAL.UPDATE_METAMASK_ACCOUNT":{
      const {address, balance} = action.payload
      const error = ""
      var metamask = {address, balance, error}
      return Object.assign({}, state, { metamask: metamask })
    }

    case "GLOBAL.SET_NOTI_HANDLER":{
      const {notiService} = action.payload
      return Object.assign({}, state, { notiService: notiService })
    }

    case "GLOBAL.SET_NETWORK_ERROR":{
      const {error} = action.payload
      return Object.assign({}, state, { network_error: error })
    }

    case "GLOBAL.INIT_PARAMS":{
      const {params} = action.payload
      return Object.assign({}, state, { params: {...params} })
    }

    case "GLOBAL.HALT_PAYMENT":{
      const {errors} = action.payload
      var newState = {...state}
      newState.haltPayment = true
      newState.errorsPayment = {...errors}
      return newState
    }
    case "GLOBAL.INIT_ANALYTICS":{
      const {analytics} = action.payload
      var newState = {...state}
      newState.analytics = analytics
      return newState
    }
  }
  return state
}

export {global, initState}

