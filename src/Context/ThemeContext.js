import React from 'react'

const ThemeContext = React.createContext({
  lightTheme: true,
  changeTheme: () => {},
  savedVideosList: [],
  addSavedVideos: () => {},
})

export default ThemeContext
