import React, { createContext, useState, useEffect, useCallback } from 'react';

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
      // const response = await axios.post('/api/v1/auth/login', { email, password });
      // const { token, user } = response.data;
      
      let token, role, id, name;
      
      // Временное решение для демонстрации
      if (email === 'admin@example.com' && password === 'admin') {
        token = 'mock-admin-token';
        role = 'admin';
        id = 'admin-id';
        name = 'Administrator';
      } else if (email === 'user@example.com' && password === 'user') {
        token = 'mock-user-token';
        role = 'user';
        id = 'user-id';
        name = 'Regular User';
      } else {
        throw new Error('Неверные учетные данные');
      }
      
      localStorage.setItem('auth_token', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userId', id);
      localStorage.setItem('userName', name);
      
      setCurrentUser({ token, role, id, name });
      return { role };
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
      // const response = await axios.post('/api/v1/auth/register', { name: userName, email, password });
      
      // Временное решение для демонстрации
      console.log('Регистрация пользователя:', { userName, email });
      return { success: true, message: 'Регистрация успешна. Теперь вы можете войти.' };
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
      // const response = await axios.post('/api/v1/auth/reset-password', { email });
      
      // Временное решение для демонстрации
      console.log('Запрос на сброс пароля:', email);
      return { success: true, message: 'Инструкции по сбросу пароля отправлены на ваш email.' };
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