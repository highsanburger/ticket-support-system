import signupImg from "../assets/Images/signup.webp"
import Template from "../Components/core/Auth/Template"
import { useSelector } from "react-redux";

function Signup() {
  const {loading} = useSelector((state)=>state.auth);
  return (
    loading?(<div className=" h-[100vh] flex justify-center items-center"><div class="custom-loader"></div></div>):(
    <Template
      title="Join the best platform Ticket Care!"
      description1="Raise your tickets and get it done within 24hrs"
      description2="Best platfrom for Solving your issues :-)"
      image={signupImg}
      formType="signup"
    />
    )
  )
}

export default Signup