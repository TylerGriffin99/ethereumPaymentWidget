export function hideSelectToken(){
 return {
    type: "UTIL.HIDE_TOKEN_MODAL",
  } 
}

export function toggleNotify(){
  return {
    type: 'UTIL.TOGGLE_NOTIFY'
  }
}

export function openInfoModal(title, content){
  return {
    type: "UTIL.OPEN_INFO_MODAL",
    payload: {title: title, content: content}
  }
}

export function closeInfoModal(){
  return {
    type: "UTIL.EXIT_INFO_MODAL"
  }
}
