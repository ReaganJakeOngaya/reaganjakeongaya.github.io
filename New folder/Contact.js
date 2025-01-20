import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);  // New state for loading

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setFormStatus("Please fill in all the fields.");
      return;
    }

    setIsLoading(true);  // Set loading to true when the form is being submitted

    emailjs
      .send(
        "service_sw7fxnu",  // Replace with your Email.js Service ID
        "template_hhmg7bd",  // Replace with your Email.js Template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        "Mrso7_FykxfQLxVaR" // Replace with your Email.js User ID
      )
      .then(
        (result) => {
          console.log("Message sent: ", result.text);
          setFormStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setIsLoading(false);  // Set loading to false after the message is sent
        },
        (error) => {
          console.error("Failed to send message: ", error.text);
          setFormStatus("Failed to send message. Please try again.");
          setIsLoading(false);  // Set loading to false if there was an error
        }
      );
  };

  return (
    <section
      id={id}
      className="h-screen bg-gradient-to-r from-blue-700 via-blue-500 to-blue-300 px-6 py-14 flex items-center justify-center"
    >
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-8">
          Contact Me
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {formStatus && (
            <p
              className={`text-sm text-center px-4 py-2 border rounded-md ${
                formStatus.includes("successfully")
                  ? "text-green-600 border-green-500 bg-green-100"
                  : "text-red-600 border-red-500 bg-red-100"
              }`}
            >
              {formStatus}
            </p>
          )}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Full Name"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email Address"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              rows="4"
              className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 sm:text-sm resize-none"
            ></textarea>
          </div>
          <button
            type="submit"
            className={`w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-300 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={isLoading}  // Disable the button while loading
          >
            {isLoading ? (
              <span>Sending...</span>
            ) : (
              <span>Send Message</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
