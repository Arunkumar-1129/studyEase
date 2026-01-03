'use client'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="nav">
        <div className="container flex justify-between items-center">
          <Link href="/" className="nav-brand">
            StudyEase
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container">
        <div className="text-center" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', marginBottom: '24px', color: '#1e293b' }}>
            Your Academic Success Hub
          </h1>
          <p style={{ fontSize: '20px', color: '#64748b', marginBottom: '48px', maxWidth: '600px', margin: '0 auto 48px' }}>
            Access notes, previous year questions, and connect with peers - all organized by department and subject.
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/auth/login" className="btn btn-primary" style={{ fontSize: '18px', padding: '16px 32px' }}>
              Login
            </Link>
            <Link href="/auth/signup" className="btn btn-secondary" style={{ fontSize: '18px', padding: '16px 32px' }}>
              Sign Up
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-3" style={{ marginTop: '80px', marginBottom: '80px' }}>
          <div className="card text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Organized Resources</h3>
            <p style={{ color: '#64748b' }}>Notes, PDFs, PPTs organized by department and subject for easy access.</p>
          </div>
          
          <div className="card text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Previous Year Questions</h3>
            <p style={{ color: '#64748b' }}>University-wise PYQs to help you prepare effectively for exams.</p>
          </div>
          
          <div className="card text-center">
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h3 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>Subject Discussions</h3>
            <p style={{ color: '#64748b' }}>Dedicated chat spaces for each subject to clarify doubts with peers.</p>
          </div>
        </div>
      </div>
    </div>
  )
}