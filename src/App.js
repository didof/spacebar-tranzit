import React from 'react'
import './App.css'
import { connect } from 'react-redux'

// css
import css from './style/Menu.module.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPosition: null
    }

    this.ref_menu = React.createRef()
    this.ref_tranzit = React.createRef()
  }

  componentDidMount() {
    // console.log('[App] mount')
    this.enable_showMenu()
    this.setState({ currentPosition: this.props.posMenu })
  }

  componentDidUpdate() {
    console.log('[App] update')
    // menu is opened?
    if(this.props.showMenu) {
      this.ref_menu.current.style.transform = "translateZ(-800px)"
      this.ref_menu.current.style.opacity = "0.7"
    } else {
      this.ref_menu.current.style.transform = "translateZ(0px)"
      this.ref_menu.current.style.opacity = "1"
    }

    // menu was moved?

      // check the difference con state position
      let diffX = this.props.posMenu.x - this.state.currentPosition.x
      let diffY = this.props.posMenu.y - this.state.currentPosition.y
      let template = { x: "", y: ''}

      if(diffX === 0) { template.x = 'translateX(0)' }
      if(diffY === 0) { template.y = 'translateY(0)' }
      if(diffX > 0) { template.x = `translateX(-${diffX}00vw)` }
      if(diffY > 0) { template.y = `translateY(${diffY}00vh)` }
      if(diffX < 0) { template.x = `translateX(${diffX}00vw)` }
      if(diffY < 0) { template.y = `translateY(${diffY}00vh)` }

      // apply the template
      this.ref_tranzit.current.style.transform = template.x + template.y

      //this if for the selection via click instead of keys (something like this, I'll implement)
      // // calculate how much x-turn needs to correct
      // let differenceOfPages = this.props.posMenu.x - this.state.currentPosition.x
      // console.log(differenceOfPages)
      // // every page is wide
      // for( let i = differenceOfPages; i > 0; i-- ) {
      //   console.log('turn')
      // }
  }

  enable_showMenu = () => document.addEventListener('keypress', this.do_ZoomMenu)
  prevent_showMenu = () => {
    document.removeEventListener('keypress', this.do_ZoomMenu)
    setTimeout(this.enable_showMenu, 1000)
  }

  enable_moveMenu = () => document.addEventListener('keypress', this.do_moveMenu)
  prevent_moveMenu = () => {
    document.removeEventListener('keypress', this.do_moveMenu)
    setTimeout(this.enable_moveMenu, 500)
  }

  do_ZoomMenu = e => {
    if(e.keyCode === 32) {
        this.props.menu_switch()
        this.prevent_showMenu()
        if(this.props.showMenu) {
          this.enable_moveMenu()
        }
      }
  }

  do_moveMenu = e => {
    switch(e.keyCode) {
      case 100: {
        this.props.menu_move('dx')
        break
        }
      case 97: {
        this.props.menu_move('sx')
        break
        }
      case 119: {
        this.props.menu_move('top')
        break
        }
      case 115: {
        this.props.menu_move('bot')
        break
        }
      default: console.log('nope')
    }
    this.prevent_moveMenu()
  }


  render() {
    // let bright = (this.props.showMenu ? <div className={css.bright}></div> : null) 

    return (
      <div className="App">
        <div className={css.scene}>
          <div className={css.menu} ref={this.ref_menu}>
            {/* {bright} */}
            <div className={css.tranzit} ref={this.ref_tranzit}>
              <div className={css.content1}>HOME</div>
              <div className={css.content2}>PRODUCTS</div>
              <div className={css.sub_content2}>HUGE OFFERT!</div>
              <div className={css.content3}>CONTACT US</div>
              {/* each of the contents will be a component */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    showMenu: state.showMenu,
    posMenu: state.posMenu
  }
}

const mapDispatchToProps = dispatch => {
  return {
    menu_switch: () => dispatch({type: 'MENU_SWITCH'}),
    menu_move: (dir) => dispatch({type: 'MENU_MOVE', dir})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
