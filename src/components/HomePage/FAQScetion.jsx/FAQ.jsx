import React from 'react'
import './FAQ.css'

function FAQ() {
    const faqs = [
        {
            question: "What is your return policy?",
            answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship internationally. Shipping charges and times may vary depending on the destination."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive an email with the tracking number and a link to track your order."
        },
        {
            question: "What is your return policy?",
            answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship internationally. Shipping charges and times may vary depending on the destination."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive an email with the tracking number and a link to track your order."
        },
        {
            question: "What is your return policy?",
            answer: "Our return policy lasts 30 days. If 30 days have gone by since your purchase, unfortunately we can’t offer you a refund or exchange."
        },
        {
            question: "Do you ship internationally?",
            answer: "Yes, we ship internationally. Shipping charges and times may vary depending on the destination."
        },
        {
            question: "How can I track my order?",
            answer: "Once your order is shipped, you will receive an email with the tracking number and a link to track your order."
        },
        // Add more FAQs as needed
    ];
    return (
        <div className='FAQ'>

            <div className="heading">
                <h1>FAQ</h1>
                <p>Problems trying to resolve the conflict between
                    the two major realms of Classical physics: Newtonian mechanics </p>
            </div>

            <div className='questions'>
                {faqs.map((faq, index) => (
                    <div key={index} className='question-card'>
                        <h3>{faq.question}</h3>
                        <p>{faq.answer}</p>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FAQ
