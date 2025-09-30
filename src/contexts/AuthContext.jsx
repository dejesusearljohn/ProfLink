import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing authentication on app load
  useEffect(() => {
    const storedAuth = localStorage.getItem('proflink_auth')
    const storedUser = localStorage.getItem('proflink_user')
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (email, password) => {
    // Simple authentication logic - in real app, this would call an API
    if (email && password) {
      const userData = {
        email,
        name: email.split('@')[0], // Use email prefix as name for demo
        loginTime: new Date().toISOString()
      }
      
      setIsAuthenticated(true)
      setUser(userData)
      
      // Persist authentication state
      localStorage.setItem('proflink_auth', 'true')
      localStorage.setItem('proflink_user', JSON.stringify(userData))
      
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)
    
    // Clear authentication state
    localStorage.removeItem('proflink_auth')
    localStorage.removeItem('proflink_user')
  }

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}