import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.css';
import TextField from '../../TextField';
import Button from '../../Button';
import useForm from '../../../hooks/useForm';
import { validateEmailOrPhone, validatePassword } from '../../../validators';
import Alert from '../../Alert';

/**
 * Login form
 *
 * @component
 */
function LoginForm({ className, submit, submitButtonSpinning }) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const rootClassNames = classNames('login-form', className);

  const onSubmit = (formData) => {
    submit({
      email: formData.emailOrPhone.value,
      password: formData.password.value,
    });
  };

  return (
    <main className={rootClassNames}>
      <h1 className="login-form__title">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Alert className="login-form__warning">
          This is NOT the Netflix website.
        </Alert>
        <Alert className="login-form__warning">
          Do NOT enter your Netflix credentials.
        </Alert>
        <TextField
          className="login-form__text-field"
          label="Email or phone number"
          {...register('emailOrPhone', { validate: validateEmailOrPhone })}
          error={errors.emailOrPhone}
        />
        <TextField
          className="login-form__text-field"
          label="Password"
          type="password"
          {...register('password', { validate: validatePassword })}
          error={errors.password}
        />
        <Button
          className="login-form__button"
          type="submit"
          loading={submitButtonSpinning}
        >
          Sign In
        </Button>
      </form>
    </main>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  /**
   * Called on form submit: submit({email: string, password: string})
   */
  submit: PropTypes.func.isRequired,
  /**
   * Add a spinner inside the submit button
   */
  submitButtonSpinning: PropTypes.bool,
};

LoginForm.defaultProps = {
  className: '',
  submitButtonSpinning: false,
};

export default LoginForm;
