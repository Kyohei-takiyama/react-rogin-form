import React,{useState} from 'react'
import './App.css';

function App() {

  const initialValues = {
    username: "",
    mailaddress: "",
    password:""
  }
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setSubmit] = useState(false);
  
  const handleChanged = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues)
  };

  const validate = values => {
    const errors = {}
    const regax = /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
      if(!values.username){
        errors.username = "ユーザ名を入れてください";
      }
      if(!values.mailaddress){
        errors.mailaddress = "メールアドレスを入れてください";
      } else if (!regax.test(values.mailaddress)) {
        errors.mailaddress="正しいメールアドレスを入力してください"
      }
      if(!values.password){
        errors.password = "パスワードを入れてください";
      } else if (values.password.length < 4) {
        errors.password = "4文字以上15文字以内"
      }
      else if (values.password.length > 15) {
        errors.password = "4文字以上15文字以内"
      }
    return errors;
  }

  const handleSubmit = e => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setSubmit(true);
  }

  return (
    <div className="form-container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>ログインフォーム</h1>
        <hr></hr>
        <div className="uiForm">
          <div className="formField">
            <label>ユーザ名</label>
            <input
              placeholder="ユーザ名"
              name="username"
              type="text"
              onChange={(e) => handleChanged(e)}
            ></input>
          </div>
          <p className="errorMessage">{formErrors.username}</p>
          <div className="formField">
            <label>メールアドレス</label>
            <input
              placeholder="メールアドレス"
              name="mailaddress"
              type="text"
              onChange={(e) => handleChanged(e)}
            ></input>
          </div>
          <p className="errorMessage">{formErrors.mailaddress}</p>
          <div className="formField">
            <label>パスワード</label>
            <input
              placeholder="パスワード"
              name="password"
              type="password"
              onChange={(e) => handleChanged(e)}
            ></input>
          </div>
          <p className="errorMessage">{formErrors.password}</p>
          <button className="submitButton">ログイン</button>
          {Object.keys(formErrors).length === 0 && isSubmit && (
            <div className='msgOk'>ログインに成功しました</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
