import React, { useState } from 'react'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function ContactForm(): JSX.Element {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.length > 300) {
      newErrors.message = 'Message must be 300 characters or less'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sanitizeInput = (input: string, fieldName: string): string => {
    if (fieldName === 'message') {
      // Remove HTML tags, script content, and potentially dangerous characters
      // Preserve internal spaces and line breaks
      return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocols
        .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
        .replace(/[<>&"'`]/g, '') // Remove dangerous special characters
        .replace(/\{|\}/g, '') // Remove curly braces
        .replace(/\[|\]/g, '') // Remove square brackets
        .replace(/^\s+|\s+$/g, '') // Only trim leading/trailing whitespace, preserve internal spaces
    }
    
    if (fieldName === 'name') {
      // Allow letters, spaces, hyphens, apostrophes, and periods for names
      // Preserve internal spaces but clean up multiple consecutive spaces
      return input
        .replace(/[^a-zA-ZÀ-ÿ\s\-'\.]/g, '') // Keep letters, spaces, hyphens, apostrophes, periods
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .replace(/^\s+|\s+$/g, '') // Only trim leading/trailing whitespace
    }
    
    if (fieldName === 'email') {
      // Basic email sanitization - remove dangerous characters but keep email format
      // Email addresses don't typically have internal spaces, but preserve if entered
      return input
        .replace(/[<>&"'`]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/^\s+|\s+$/g, '') // Only trim leading/trailing whitespace
    }
    
    return input.replace(/^\s+|\s+$/g, '') // Only trim leading/trailing whitespace for other fields
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value, name)
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      // Create mailto URL with form data
      const subject = encodeURIComponent(`Contact Form Message from ${formData.name}`)
      const body = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n\n` +
        `Message:\n${formData.message}`
      )
      
      const mailtoUrl = `mailto:sevomax@yahoo.com?subject=${subject}&body=${body}`
      
      // Open default email client
      window.location.href = mailtoUrl
      
      // Show success message after a brief delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      alert('There was an error opening your email client. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="max-w-lg mx-auto p-6 bg-green-50 border border-green-200 rounded-lg">
        <div className="text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">Message Sent!</h3>
          <p className="text-green-700 mb-4">Thank you for your message. We'll get back to you soon.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="text-green-600 hover:text-green-800 underline font-medium"
          >
            Send another message
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Name *
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent ${
            errors.name ? 'border-red-300 bg-red-50' : 'border-slate-300'
          }`}
          placeholder="Enter your full name"
          aria-describedby={errors.name ? "name-error" : undefined}
          aria-invalid={!!errors.name}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-slate-300'
          }`}
          placeholder="Enter your email address"
          aria-describedby={errors.email ? "email-error" : undefined}
          aria-invalid={!!errors.email}
        />
        {errors.email && (
          <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleInputChange}
          maxLength={300}
          className={`w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-accent focus:border-accent resize-vertical ${
            errors.message ? 'border-red-300 bg-red-50' : 'border-slate-300'
          }`}
          placeholder="Enter your message (max 300 characters)"
          aria-describedby={errors.message ? "message-error" : "message-count"}
          aria-invalid={!!errors.message}
        />
        <div className="mt-1 flex justify-between items-start">
          <div className="flex-1">
            {errors.message && (
              <p id="message-error" className="text-sm text-red-600" role="alert">
                {errors.message}
              </p>
            )}
          </div>
          <p 
            id="message-count" 
            className={`text-sm ml-2 ${
              formData.message.length > 280 ? 'text-red-600' : 'text-slate-500'
            }`}
          >
            {formData.message.length}/300
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-accent hover:bg-accent-dark text-white font-medium py-3 px-6 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Message'
          )}
        </button>
      </div>
    </form>
  )
}
