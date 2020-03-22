const initalState = {
    showMenu: false,
    posMenu: { x:0, y:0 }
}

const reducer = (state=initalState, action) => {
    const prevState = { ...state }
    let prevPos = { ...state.posMenu }

    switch(action.type) {
        case ('MENU_SWITCH'):
        // console.log('[reducer] open/close menu')
        return { ...state, showMenu: !prevState.showMenu }

        case ('MENU_MOVE'):
        // console.log('[reducer] menu moving')
            switch(action.dir) {
                case ('dx'):
                return { ...state, posMenu: { x: prevPos.x + 1, y: prevPos.y} }
                case ('sx'):
                return { ...state, posMenu: { x: prevPos.x - 1, y: prevPos.y} }
                case ('top'):
                return { ...state, posMenu: { x: prevPos.x, y: prevPos.y + 1} }
                case ('bot'):
                return { ...state, posMenu: { x: prevPos.x, y: prevPos.y - 1} }
            }
    }


    return state
}

export default reducer