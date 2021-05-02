const ServerErrors = ({ errors }) => (
  <div>
    {errors.map(error => (
      <p>{error}</p>  
    ))}
  </div>  
)

export default ServerErrors;
