import React, { useRef, useState, useEffect } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  
  useEffect(() => {
    if (showStatus) {
      const timer = setTimeout(() => {
        setShowStatus(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showStatus]);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_drq6ju8",
        "template_89d63r4",
        formRef.current,
        "6G61PBNeOH3w9iTpN"
      )
      .then(
        () => {
          setIsSending(false);
          setShowStatus(true); 
          formRef.current.reset(); 
        },
        (error) => {
          setIsSending(false);
          alert("Failed to send. Please try again.");
          console.error(error);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-base-200">
      <div className="w-full max-w-md bg-base-100 p-8 rounded-xl shadow-lg border border-base-300">
        <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>

          <input
            type="text"
            name="user_name"
            placeholder="Name"
            className="input input-bordered w-full"
            required
          />

          <input
            type="email"
            name="user_email"
            placeholder="Email"
            className="input input-bordered w-full"
            required
          />

          <textarea
            name="message"
            placeholder="Message"
            className="textarea textarea-bordered w-full h-24"
            required
          />

          <button
            type="submit"
            disabled={isSending}
            className="btn btn-primary w-full flex items-center justify-center gap-2"
          >
            {isSending ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Sending...
              </>
            ) : (
              "Send"
            )}
          </button>

          <div className="h-6"> 
            {showStatus && (
              <p className="text-success text-center text-sm font-medium ">
                ✓ Message sent successfully!
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;