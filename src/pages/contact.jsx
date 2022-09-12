import './contact.css';
import emailjs from 'emailjs-com';
import { useRef } from 'react';

export default function Contact() {
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm('shev', 'template_6srp76u', form.current, 'T8-CYX_mR1oTZ4hng')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
          e.target.reset();
      };

    return <div className="form-container">
        <form className="form" ref={form} onSubmit={sendEmail}>
            <h2>GET IN TOUCH</h2>  
            <input type="text" id='name' placeholder='contact name' name='name' required/>
            <input type="email" id='email' placeholder='email address' name='email' required/>
            <input type="text" id='phone' placeholder='contact number' name='number' required />
            <input type="text" id='subject' placeholder='subject' name='subject' required />
            <textarea name="message" id="message" rows="4" placeholder='your message' required></textarea>
            <button type="submit">Submit</button>
        </form>
    </div>
}