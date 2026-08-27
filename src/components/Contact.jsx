// src/components/Contact.jsx

import { useState } from 'react'
import { Arrow } from './ui.jsx'

const GOOGLE_APPS_SCRIPT_URL =
  import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
  

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)
    setError('')

    const form = event.currentTarget
    const formData = new FormData(form)

    const enquiry = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      service: formData.get('service'),
      message: formData.get('message'),
    }

    try {
      await fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify(enquiry),
      })

      setSent(true)
      form.reset()
    } catch (submitError) {
      setError('Could not send your enquiry. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="contact section-pad" id="contact">
      <div className="contact-intro">
        <div className="section-kicker">
          06 <span>—</span> Start a conversation
        </div>

        <h2>
          Let&apos;s build
          <br />
          <em>something.</em>
        </h2>

        <p>
          Tell us what you&apos;re working on.
          <br />
          Let&apos;s figure out the right digital solution.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {sent ? (
          <div className="success">
            <span>✓</span>
            <h3>Thanks for reaching out.</h3>
            <p>We&apos;ll be in touch soon.</p>
          </div>
        ) : (
          <>
            <div className="form-grid">
              <label>
                Name
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                />
              </label>

              <label>
                Phone / WhatsApp
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 98989 98989"
                />
              </label>

              <label>
                Business / Company
                <input
                  name="company"
                  type="text"
                  placeholder="Company name"
                />
              </label>
            </div>

            <label>
              What do you need?
              <select name="service" defaultValue="" required>
                <option value="" disabled>
                  Select an option
                </option>
                <option value="Website">Website</option>
                <option value="Digital Marketing">
                  Digital Marketing
                </option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="Not sure yet">Not sure yet</option>
              </select>
            </label>

            <label>
              Tell us about your project
              <textarea
                name="message"
                rows="4"
                placeholder="A little about what you&apos;re working on..."
              />
            </label>

            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}

            <button
              className="button button-accent"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send enquiry'} <Arrow />
            </button>
          </>
        )}
      </form>

      <div className="whatsapp">
        <span>Prefer WhatsApp?</span>

        <a
          href="https://wa.me/919043308815?text=Hi%20LUMORA%2C%20I%20would%20like%20to%20start%20a%20project."
          target="_blank"
          rel="noreferrer"
        >
          Chat with us <Arrow />
        </a>
      </div>
    </section>
  )
}