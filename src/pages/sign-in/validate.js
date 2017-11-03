export default function (values) {
  const errors = {};

  if (!values.login) {
    errors.login = "Введите email или телефон";
  }

  if(!values.password) {
    errors.password = "Введите пароль";
  }

  if(values.password && values.password.length <= 6){
    errors.password = "Пароль должен содержать не менее 6 символов";
  }

  return errors;
}
