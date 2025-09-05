import { Elements } from "@stripe/react-stripe-js";
import SectionTitle from "../../compoment/SectionTitle";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GETWAT_PK);

export default function StripePayment() {
  return (
    <div>
        <SectionTitle title='Payment' subtitle='Plase pay to eat'></SectionTitle>
   <div>
    <Elements stripe={stripePromise}>
      <CheckoutForm></CheckoutForm>
    </Elements>
   </div>
    </div>
  )
}

