const PasswordResetPasswords = () => {
  return (
    <div>
      <form>
        <input type='password' name='password' placeholder='Enter your new password' />
        <input type='password' name='password_confirmation' placeholder='Confirm your new password' />
        <input type='submit' value='Reset password!' />
      </form>
    </div>  
  )
}

export default PasswordResetPasswords;
