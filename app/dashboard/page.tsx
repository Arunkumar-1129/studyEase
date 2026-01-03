'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const subjectsByDepartment = {
  'Computer Science Engineering (CSE)': [
    { id: 'ds', name: 'Data Structures', semester: 3 },
    { id: 'os', name: 'Operating Systems', semester: 4 },
    { id: 'cn', name: 'Computer Networks', semester: 5 },
    { id: 'dbms', name: 'Database Management Systems', semester: 4 },
    { id: 'se', name: 'Software Engineering', semester: 6 },
    { id: 'ai', name: 'Artificial Intelligence', semester: 7 },
    { id: 'ml', name: 'Machine Learning', semester: 8 }
  ],
  'Electronics & Communication Engineering (ECE)': [
    { id: 'calculus', name: 'Calculus', semester: 1 },
    { id: 'cprog', name: 'C Programming', semester: 1 },
    { id: 'appdesign', name: 'Application Design', semester: 1 },
    { id: 'complex', name: 'Complex Variables and Transforms', semester: 2 },
    { id: 'circuit', name: 'Circuit Analysis', semester: 2 },
    { id: 'ds', name: 'Data Structures', semester: 2 },
    { id: 'logical', name: 'Logical Thinking', semester: 2 },
    { id: 'linear', name: 'Linear Algebra', semester: 3 },
    { id: 'analog', name: 'Analog Circuits', semester: 3 },
    { id: 'digital', name: 'Digital Systems', semester: 3 },
    { id: 'java', name: 'Java', semester: 3 }
  ],
  'Mechanical Engineering (ME)': [
    { id: 'thermo', name: 'Thermodynamics', semester: 4 },
    { id: 'fluid', name: 'Fluid Mechanics', semester: 5 },
    { id: 'heat', name: 'Heat Transfer', semester: 6 },
    { id: 'design', name: 'Machine Design', semester: 7 }
  ]
}

export default function Dashboard() {
  const [user, setUser] = useState<any>(null)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    const parsedUser = JSON.parse(userData)
    setUser(parsedUser)
    setSelectedDepartment(parsedUser.department || '')
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }

  if (!user) return <div>Loading...</div>

  const subjects = subjectsByDepartment[selectedDepartment as keyof typeof subjectsByDepartment] || []

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="nav">
        <div className="container flex justify-between items-center">
          <Link href="/dashboard" className="nav-brand">StudyEase</Link>
          <div className="flex items-center gap-4">
            <span style={{ color: '#64748b' }}>Welcome, {user.name}</span>
            <button onClick={handleLogout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Department Selection */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
            Select Department
          </h2>
          <div className="grid grid-2">
            {Object.keys(subjectsByDepartment).map((dept) => (
              <button
                key={dept}
                onClick={() => setSelectedDepartment(dept)}
                className={`card ${selectedDepartment === dept ? 'bg-primary text-white' : 'bg-white'}`}
                style={{
                  border: selectedDepartment === dept ? '2px solid #2563eb' : '2px solid #e2e8f0',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                  {dept}
                </h3>
                <p style={{ 
                  color: selectedDepartment === dept ? '#e2e8f0' : '#64748b',
                  fontSize: '14px' 
                }}>
                  {subjectsByDepartment[dept as keyof typeof subjectsByDepartment]?.length || 0} subjects available
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Subject Selection */}
        {selectedDepartment && (
          <div className="card">
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '16px' }}>
              {selectedDepartment} - Subjects
            </h2>
            <div className="grid grid-3">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subject/${subject.id}`}
                  className="card"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    border: '2px solid #e2e8f0',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#2563eb'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#e2e8f0'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '12px' }}>📚</div>
                  <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>
                    {subject.name}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '14px' }}>
                    Semester {subject.semester}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}