'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const subjectData = {
  ds: { name: 'Data Structures', department: 'CSE' },
  os: { name: 'Operating Systems', department: 'CSE' },
  cn: { name: 'Computer Networks', department: 'CSE' },
  dbms: { name: 'Database Management Systems', department: 'CSE' },
  se: { name: 'Software Engineering', department: 'CSE' }
}

export default function SubjectPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('notes')
  const [user, setUser] = useState<any>(null)
  const [files, setFiles] = useState<any[]>([])
  const [chatMessages, setChatMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const router = useRouter()

  const subject = subjectData[params.id as keyof typeof subjectData]

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (!userData) {
      router.push('/auth/login')
      return
    }
    setUser(JSON.parse(userData))
    
    // Load sample data
    setFiles([
      { id: 1, name: 'Unit 1 - Introduction.pdf', type: 'notes', uploadedBy: 'John Doe', date: '2024-01-15' },
      { id: 2, name: 'Anna University 2023.pdf', type: 'pyqs', uploadedBy: 'Jane Smith', date: '2024-01-10' },
      { id: 3, name: 'Reference Book.pdf', type: 'pdfs', uploadedBy: 'Mike Johnson', date: '2024-01-12' },
      { id: 4, name: 'Lecture Slides.pptx', type: 'ppts', uploadedBy: 'Sarah Wilson', date: '2024-01-14' }
    ])

    setChatMessages([
      { id: 1, user: 'Alice', message: 'Can someone explain binary trees?', time: '10:30 AM' },
      { id: 2, user: 'Bob', message: 'Sure! A binary tree is a tree data structure where each node has at most two children.', time: '10:32 AM' }
    ])
  }, [router])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && user) {
      const newFile = {
        id: files.length + 1,
        name: file.name,
        type: activeTab,
        uploadedBy: user.name,
        date: new Date().toISOString().split('T')[0]
      }
      setFiles([...files, newFile])
    }
  }

  const sendMessage = () => {
    if (newMessage.trim() && user) {
      const message = {
        id: chatMessages.length + 1,
        user: user.name,
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages([...chatMessages, message])
      setNewMessage('')
    }
  }

  if (!subject) return <div>Subject not found</div>
  if (!user) return <div>Loading...</div>

  const filteredFiles = files.filter(file => file.type === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="nav">
        <div className="container flex justify-between items-center">
          <Link href="/dashboard" className="nav-brand">StudyEase</Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="btn btn-secondary">← Back to Dashboard</Link>
            <span style={{ color: '#64748b' }}>{user.name}</span>
          </div>
        </div>
      </nav>

      <div className="container" style={{ paddingTop: '40px' }}>
        {/* Subject Header */}
        <div className="card" style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '8px' }}>
            {subject.name}
          </h1>
          <p style={{ color: '#64748b', fontSize: '18px' }}>
            {subject.department} Department
          </p>
        </div>

        {/* Tabs */}
        <div className="tabs">
          {[
            { id: 'notes', label: 'Notes', icon: '📝' },
            { id: 'pyqs', label: 'PYQs', icon: '📋' },
            { id: 'pdfs', label: 'PDFs', icon: '📄' },
            { id: 'ppts', label: 'PPTs', icon: '📊' },
            { id: 'chat', label: 'Discussion', icon: '💬' }
          ].map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        {activeTab !== 'chat' ? (
          <div className="card">
            <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '600' }}>
                {activeTab === 'notes' && 'Study Notes'}
                {activeTab === 'pyqs' && 'Previous Year Questions'}
                {activeTab === 'pdfs' && 'Reference Materials'}
                {activeTab === 'ppts' && 'Presentations'}
              </h2>
              <div>
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: 'none' }}
                  onChange={handleFileUpload}
                  accept={activeTab === 'ppts' ? '.ppt,.pptx' : '.pdf'}
                />
                <label htmlFor="fileUpload" className="btn btn-primary">
                  Upload File
                </label>
              </div>
            </div>

            <div className="grid">
              {filteredFiles.length === 0 ? (
                <div className="text-center" style={{ padding: '40px', color: '#64748b' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                  <p>No files uploaded yet. Be the first to contribute!</p>
                </div>
              ) : (
                filteredFiles.map(file => (
                  <div key={file.id} className="card" style={{ padding: '16px' }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                          {file.name}
                        </h3>
                        <p style={{ color: '#64748b', fontSize: '14px' }}>
                          Uploaded by {file.uploadedBy} on {file.date}
                        </p>
                      </div>
                      <button className="btn btn-primary">Download</button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          /* Chat Section */
          <div className="card">
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px' }}>
              Subject Discussion
            </h2>
            
            <div style={{ 
              height: '400px', 
              overflowY: 'auto', 
              border: '1px solid #e2e8f0', 
              borderRadius: '8px',
              padding: '16px',
              marginBottom: '16px',
              backgroundColor: '#f8fafc'
            }}>
              {chatMessages.map(msg => (
                <div key={msg.id} style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>
                    <strong>{msg.user}</strong> - {msg.time}
                  </div>
                  <div style={{ 
                    backgroundColor: '#ffffff',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                  }}>
                    {msg.message}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <input
                type="text"
                className="form-input"
                placeholder="Ask a question or share knowledge..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                style={{ flex: 1 }}
              />
              <button onClick={sendMessage} className="btn btn-primary">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}