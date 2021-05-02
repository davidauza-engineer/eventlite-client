const ServerErrors = ({ errors }) => (
  <div>
    {errors.map( (error, index) => (
      <p key={index}>{error}</p>
    ))}
  </div>  
)

export default ServerErrors;
