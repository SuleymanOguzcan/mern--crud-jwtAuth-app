import React, { useState } from 'react';
import Alert from './Alert';
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/loginUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();

      if (json.success) {
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('name', json.name);
        localStorage.setItem('success', json.success);
        props.showAlert("Giriş Başarılı", "success");

        // Otomatik çıkışı başlatmak için bir süre belirleyin (örneğin, 10 dakika)
        const logoutTimeout = 10 * 60 * 1000; // 10 dakika (milisaniye cinsinden)
        setTimeout(() => {
          localStorage.clear(); // Token ve diğer bilgileri temizle
          props.showAlert("Otomatik Çıkış", "info");
          navigate("/login"); // Çıkış yapıldıktan sonra giriş sayfasına yönlendir
        }, logoutTimeout);

        navigate("/"); // Giriş yapıldıktan sonra ana sayfaya yönlendir
      } else {
        props.showAlert("Geçersiz Kimlik Bilgileri", "warning");
      }

    } catch (error) {
      props.showAlert(`Veritabanına bağlanılamadı ${error}`, "warning");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="display-4 text-center">Giriş</div>
            <Alert alert={alert} />
            <br />
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label"><i className="fa-solid fa-envelope-circle-check"></i> E-posta adresi</label>
                <input type="email" value={credentials.email} onChange={onChange} className="form-control" id="email" name="email" aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label"><i className="fa-solid fa-key"></i> Şifre</label>
                <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} minLength={5} required />
              </div>
              <p>daha önce kayıt olduysan giriş yap!</p>
              <div className="d-grid gap-2 col-6 mx-auto">
                <button type="submit" className="btn btn-success">Giriş</button>
              </div>
            </form>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
