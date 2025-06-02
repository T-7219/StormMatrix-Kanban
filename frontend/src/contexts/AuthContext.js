import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Проверяем, есть ли сохраненный токен при загрузке
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const userRole = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    const userName = localStorage.getItem('userName');
    
    if (token) {
      setCurrentUser({
        token,
        role: userRole,
        id: userId,
        name: userName
      });
    }
    setLoading(false);
  }, []);

  // Функция для входа пользователя
  const login = async (email, password) => {
    setError(null);
    try {
      // В реальном приложении здесь будет запрос к auth-service
      const response = await axios.post('/api/v1/auth/login', { email, password });
      const { token, user } = response.data;
            
      localStorage.setItem('auth_token', token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      
      setCurrentUser({ token, role: user.role, id: user.id, name: user.name });
      return { role: user.role };
    } catch (err) {
      setError(err.message || 'Произошла ошибка при входе');
      throw err;
    }
  };

  // Функция для регистрации пользователя
  const register = async (userName, email, password) => {
    setError(null);
    try {
      // В реальном приложении здесь будет запрос к auth-service
      const response = await axios.post('/api/v1/auth/register', { name: userName, email, password });
      return response.data;
    } catch (err) {
      setError(err.message || 'Произошла ошибка при регистрации');
      throw err;
    }
  };

  // Функция для восстановления пароля
  const resetPassword = async (email) => {
    setError(null);
    try {
      // В реальном приложении здесь будет запрос к auth-service
      const response = await axios.post('/api/v1/auth/reset-password', { email });
      return response.data;
    } catch (err) {
      setError(err.message || 'Произошла ошибка при запросе сброса пароля');
      throw err;
    }
  };

  // Функция для выхода пользователя
  const logout = useCallback(() => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    setCurrentUser(null);
  }, []);

  // Контекстное значение для предоставления компонентам
  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    resetPassword,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
