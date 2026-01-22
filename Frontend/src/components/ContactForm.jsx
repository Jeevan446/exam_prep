import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          alert("Email sent successfully ✅");
          formRef.current.reset();
        },
        (error) => {
          console.log(error.text);
          alert("Email not sent ❌");
        }
      );
  };

  return (
    <form ref={formRef} onSubmit={sendEmail}>
      <input type="text" name="user_name" placeholder="Name" required />
      <input type="email" name="user_email" placeholder="Email" required />
      <textarea name="message" placeholder="Message" required />
      <button type="submit">Send</button>
    </form>
  );
};

export default ContactForm;
