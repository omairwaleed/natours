import axios from 'axios';

const stripe = Stripe(
  'pk_test_51Q5S88AncD9HbH0iAAzUCp3VB8ZKZRL5m7uTaBrQRg7IvchqPDCas2OLqNdMGxumIqx0eVStcFlzFpkjGpwsdjvC00jHvgZsJe'
);
export const bookTour = async (tourId) => {
  try {
    const session = await axios({
      method: 'GET',
      url: `http://localhost:7000/api/v1/bookings/Checkout-session/${tourId}`,

      headers: {
        'content-type': 'application/json',
      },
    });
    console.log(session);
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (error) {
    alert(error);
  }
};
