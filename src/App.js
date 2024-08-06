import {Component} from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Gaming from './components/Gaming'
import Trending from './components/Trending'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemDetails from './components/VideoItemDetails'
import SavedVideos from './components/SavedVideos'
import NotFound from './components/NotFound'

import ThemeContext from './Context/ThemeContext'
import './App.css'

class App extends Component {
  state = {lightTheme: true, savedVideosList: []}

  changeTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  addSavedVideos = video => {
    const {savedVideosList} = this.state
    const prevVideo = savedVideosList.find(each => each.id === video.id)
    if (prevVideo === undefined) {
      this.setState(prevState => ({
        savedVideosList: [...prevState.savedVideosList, video],
      }))
    } else {
      const filteredList = savedVideosList.filter(each => each.id !== video.id)
      this.setState({savedVideosList: filteredList})
    }
  }

  render() {
    const {lightTheme, savedVideosList} = this.state
    return (
      <ThemeContext.Provider
        value={{
          lightTheme,
          changeTheme: this.changeTheme,
          savedVideosList,
          addSavedVideos: this.addSavedVideos,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemDetails}
          />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </ThemeContext.Provider>
    )
  }
}

export default App
