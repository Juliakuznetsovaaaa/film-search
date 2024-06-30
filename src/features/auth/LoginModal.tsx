import React, { useState } from 'react';

interface LoginModalProps {
  onClose: () => void;
  onSuccessLogin: (token: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onSuccessLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = () => {
    // Здесь обычно будет запрос на сервер для аутентификации
    // В данном примере просто имитируем успешную аутентификацию
    const token = "mockToken123"; // Заглушка для токена

    // Сохраняем токен в localStorage
    localStorage.setItem('token', token);

    // Вызываем функцию успешной авторизации и передаем токен
    onSuccessLogin(token);

    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>×</span>
        <h2>аВтОрИзАцИя</h2>
        <input
          type="text"
          placeholder="лОгИн"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="пАрОлЬ"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>ВоЙтИ</button>
      </div>
    </div>
  );
};

export default LoginModal;