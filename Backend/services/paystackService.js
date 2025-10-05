import axios from 'axios';

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET;

export const initializeTransaction = async ({ email, amount, metadata, tx_ref }) => {
    const response = await axios.post(
        'https://api.paystack.co/transaction/initialize',
        {
            email,
            amount,
            metadata,
            reference: tx_ref,
            callback_url: 'https://eazybins/here.com/paystack/callback'
        },
        {
            headers: {
                Authorization: `Bearer ${PAYSTACK_SECRET}`,
                'Content-Type': 'application/json'
            }
        }
    );
    return response.data;
};

export const verifyTransaction = async (reference) => {
    const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`
            }
        }
    );
    return response.data;
};