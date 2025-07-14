import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

function ContactForm() {
  const [state, handleSubmit] = useForm("xrblzava");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
    <form className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8 mb-8 flex flex-col gap-4" onSubmit={handleSubmit}>
      <label className="text-left font-semibold" htmlFor="email">
        Email Address
      </label>
      <input
        id="email"
        type="email" 
        name="email"
        required className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
      />
      <label className="text-left font-semibold" htmlFor="message">
        Message
      </label>
      <textarea
        id="message"
        name="message"
        required rows={4} 
        className="mt-1 w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400"
      />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
      <button type="submit" 
      disabled={state.submitting}
      className="mt-4 bg-cyan-500 text-white font-bold py-2 px-6 rounded hover:bg-cyan-600 transition">
        Submit
      </button>
    </form>
  );
}

function App() {
  return (
    <ContactForm />
  );
}

export default App;