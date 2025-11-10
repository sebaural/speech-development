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
      newErrors.name = 'Имя обязательно для заполнения'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Электронная почта обязательна для заполнения'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Пожалуйста, введите действительный адрес электронной почты'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Сообщение обязательно для заполнения'
    } else if (formData.message.length > 300) {
      newErrors.message = 'Сообщение должно содержать не более 300 символов'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const sanitizeInput = (input: string, fieldName: string): string => {
    if (fieldName === 'message') {
      // Remove HTML tags, script content, and potentially dangerous characters
      // Preserve all spaces and line breaks for natural text input
      return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/javascript:/gi, '') // Remove javascript: protocols  
        .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick=
        .replace(/[<>&"'`]/g, '') // Remove dangerous special characters
        .replace(/[{}[\]]/g, '') // Remove curly braces and square brackets
    }
    
    if (fieldName === 'name') {
      // Allow letters (Latin and Cyrillic), spaces, hyphens, apostrophes, and periods for names
      // Preserve spaces for full names like "John Smith" or "Анна Иванова"
      return input
        .replace(/[^a-zA-ZÀ-ÿа-яА-ЯёЁ\s\-'\.]/g, '') // Keep only safe characters including Russian and spaces
        .replace(/\s{2,}/g, ' ') // Replace multiple consecutive spaces with single space
    }
    
    if (fieldName === 'email') {
      // Basic email sanitization - remove dangerous characters but keep email format  
      return input
        .replace(/[<>&"'`]/g, '') // Remove dangerous characters
        .replace(/javascript:/gi, '') // Remove javascript: protocols
    }
    
    return input // Return input as-is for other fields
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
      const subject = encodeURIComponent(`Речь и Развитие - Сообщение от ${formData.name}`)
      const body = encodeURIComponent(
        `Имя: \n${formData.name}\n\n` +
        `Электронная почта: \n${formData.email}\n\n` +
        `Сообщение:\n\n${formData.message}`
      )
      
      const mailtoUrl = `mailto:sevomax@gmail.com?subject=${subject}&body=${body}`
      
      // Open default email client
      window.location.href = mailtoUrl
      
      // Show success message after a brief delay
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setIsSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Произошла ошибка при открытии почтового клиента. Пожалуйста, попробуйте снова.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
          Имя *
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
          placeholder="Введите ваше полное имя"
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
          Электронная почта *
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
          placeholder="Введите вашу электронную почту"
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
          Сообщение *
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
          placeholder="Введите ваше сообщение (максимум 300 символов)"
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
              Отправка...
            </span>
          ) : (
            'Отправить сообщение'
          )}
        </button>
      </div>
    </form>
  )
}
