import loginImg from "../assets/Images/login.jpg"
import Template from "../Components/core/Auth/Template"
function Login() {
  
  
  return (
    <>
    {/* test login ID */}
    <Template
      title="Welcome Back"
      description1="Sign in to the page and Raise your tickets"
      description2="Login As Client or Admin"
      image={loginImg}
      formType="login"
    />
    </>
  )
}

export default Login