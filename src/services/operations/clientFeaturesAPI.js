import { apiConnector } from "../apiConnector";
import { clientEndpoints } from "../apis";
import { toast } from "react-hot-toast";
// import rzplogo from "../../assets/Images/rzp.png";





const { TICKET_PAYMENT_API, TICKET_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API } = clientEndpoints;




function loadScript (src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}


export async function buyTicket (token, tickets, userDetails, navigate, dispatch) {
    // console.log("buyticket -> tickets",process.env.REACT_APP_BASE_URL)
    const toastId = toast.loading("Please wait while we redirect you to payment gateway", {
      position: "bottom-center",
      autoClose: false,
    });
    try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
        toast.error("Razorpay SDK failed to load. Are you online?");
        return;
        }
    const orderResponse = await apiConnector("POST", TICKET_PAYMENT_API, {tickets},{
        Authorisation: `Bearer ${token}`,
    })
    if(!orderResponse.data.success){
        toast.error(orderResponse.data.message)
        console.log("buyticket -> orderResponse", orderResponse)
        toast.dismiss(toastId);
        return
    }
    console.log("buyticket -> orderResponse", orderResponse)
    const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        currency: orderResponse.data.currency,
        amount: orderResponse.data.amount.toString(),
        order_id: orderResponse.data.orderId,
        name: "Study Notion",
        description: "Thank you for purchasing the ticket",
        // image: rzplogo,
        prefill: {
            name: userDetails?.firstName + " " + userDetails?.lastName,
            email: userDetails?.email,
        },
        handler: async function (response) {
            console.log("buyticket -> response", response)
            sendPaymentSuccessEmail(response,orderResponse.data.amount,token);
            verifypament(response,tickets,token,navigate,dispatch);
        },
        theme: {
            color: "#686CFD",
        },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
        toast.error("Payment Failed");
    });
    toast.dismiss(toastId);

    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Something went wrong");
        console.log("buyticket -> error", error)
    }
}



async function sendPaymentSuccessEmail (response,amount,token) {
    // const data = {
    //     amount,
    //     paymentId: response.razorpay_payment_id,
    //     orderId: response.razorpay_order_id,
    //     signature: response.razorpay_signature,
    // };
    const res = await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,{
        amount,
        paymentId:response.razorpay_payment_id,
        orderId:response.razorpay_order_id,
    }, {
        Authorisation: `Bearer ${token}`,
    });
    if (!res.success) {
        console.log(res.message);
        toast.error(res.message);
    }
}

async function verifypament (response,tickets,token,navigate,dispatch,) {
    const toastId = toast.loading("Please wait while we verify your payment");
    console.log("verifypayment -> tickets", tickets.tickets);
    try{
        // const data = {
        //     amount: response.amount.toString(),
        //     paymentId: response.razorpay_payment_id,
        //     orderId: response.razorpay_order_id,
        //     signature: response.razorpay_signature,
        // };
        const res = await apiConnector("POST", TICKET_VERIFY_API,{
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            tickets:tickets.tickets || tickets,
        }, {
            Authorisation: `Bearer ${token}`,
        });
        console.log("verifypament -> res", res)
        if (!res.data.success) {
            toast.error(res.message);
            return;
        }

        toast.success("Payment Successfull");
        navigate("/dashboard/enrolled-tickets");
      
    }
    catch(err){
        toast.error("Payment Failed");
        console.log(err);
    }
    toast.dismiss(toastId);
}


