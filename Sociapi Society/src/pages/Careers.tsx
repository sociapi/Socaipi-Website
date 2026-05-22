import React, { useEffect, useState } from 'react';
import { Briefcase, MapPin, Clock, Check, X, AlertCircle, Upload, ArrowLeft } from 'lucide-react';
import { CareerItem } from '../data/initialData';

interface CareersProps {
  careers: CareerItem[];
}

interface ApplicationData {
  id: string;
  submittedAt: string;
  fullName: string;
  email: string;
  whatsapp: string;
  department: string;
  semester: string;
  fromPeshawar: string;
  whySelect: string;
  experience: string;
  linkedin: string;
  instagram: string;
  heardAbout: string;
  role: string;
  resumeFileName: string;
  pictureFileName: string;
}

export const Careers: React.FC<CareersProps> = ({ careers }) => {
  const [selectedRole, setSelectedRole] = useState<CareerItem | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  
  // Application form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    whatsapp: '',
    department: '',
    semester: '',
    fromPeshawar: '',
    whySelect: '',
    experience: '',
    resumeFile: null as File | null,
    pictureFile: null as File | null,
    linkedin: '',
    instagram: '',
    heardAbout: ''
  });
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [applySuccess, setApplySuccess] = useState(false);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [showAdminLog, setShowAdminLog] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('sociapiApplications');
    if (stored) {
      try {
        setApplications(JSON.parse(stored));
      } catch {
        setApplications([]);
      }
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setShowAdminLog(params.get('admin') === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sociapiApplications', JSON.stringify(applications));
  }, [applications]);

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.fullName || !formData.email || !formData.whatsapp || !formData.department || 
        !formData.semester || !formData.fromPeshawar || !formData.whySelect || !formData.experience ||
        !formData.linkedin || !formData.instagram || !formData.heardAbout || 
        !formData.resumeFile || !formData.pictureFile) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      // Create FormData for file upload
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('whatsapp', formData.whatsapp);
      data.append('department', formData.department);
      data.append('semester', formData.semester);
      data.append('fromPeshawar', formData.fromPeshawar);
      data.append('whySelect', formData.whySelect);
      data.append('experience', formData.experience);
      data.append('linkedin', formData.linkedin);
      data.append('instagram', formData.instagram);
      data.append('heardAbout', formData.heardAbout);
      data.append('role', selectedRole?.title || '');
      data.append('resumeFile', formData.resumeFile);
      data.append('pictureFile', formData.pictureFile);

      // Send to FormSubmit endpoint
      const response = await fetch('https://formsubmit.co/sociapisociety@gmail.com', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Also try to send to Google Sheets via Apps Script
        try {
          await fetch('https://script.google.com/macros/d/1JmK-qZl9100KDNAzmwy1W3k1EBnyAAVFvy6eDrLCmwE/usercoderun', {
            method: 'POST',
            body: JSON.stringify({
              fullName: formData.fullName,
              email: formData.email,
              whatsapp: formData.whatsapp,
              department: formData.department,
              semester: formData.semester,
              fromPeshawar: formData.fromPeshawar,
              whySelect: formData.whySelect,
              experience: formData.experience,
              linkedin: formData.linkedin,
              instagram: formData.instagram,
              heardAbout: formData.heardAbout,
              role: selectedRole?.title || ''
            }),
            mode: 'no-cors'
          });
        } catch (err) {
          console.log('Google Sheets sync attempted');
        }

        setApplySuccess(true);
        setFormData({
          fullName: '',
          email: '',
          whatsapp: '',
          department: '',
          semester: '',
          fromPeshawar: '',
          whySelect: '',
          experience: '',
          resumeFile: null,
          pictureFile: null,
          linkedin: '',
          instagram: '',
          heardAbout: ''
        });
        setUploadProgress(0);

        setApplications((prev) => [
          {
            id: `${Date.now()}`,
            submittedAt: new Date().toLocaleString(),
            fullName: formData.fullName,
            email: formData.email,
            whatsapp: formData.whatsapp,
            department: formData.department,
            semester: formData.semester,
            fromPeshawar: formData.fromPeshawar,
            whySelect: formData.whySelect,
            experience: formData.experience,
            linkedin: formData.linkedin,
            instagram: formData.instagram,
            heardAbout: formData.heardAbout,
            role: selectedRole?.title || '',
            resumeFileName: formData.resumeFile?.name || '',
            pictureFileName: formData.pictureFile?.name || ''
          },
          ...prev
        ]);

        setTimeout(() => {
          setApplySuccess(false);
          setIsApplyModalOpen(false);
          setSelectedRole(null);
        }, 4000);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, fileType: 'resume' | 'picture') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fieldName = fileType === 'resume' ? 'resumeFile' : 'pictureFile';
    setFormData(prev => ({
      ...prev,
      [fieldName]: file
    }));

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 20;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 150);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-8 py-28 space-y-12 relative z-10">
      
      {/* Title */}
      <div className="space-y-4 text-center max-w-2xl mx-auto">
        <span className="text-[10px] text-[#7bd355] uppercase tracking-widest font-bold font-mono">Roster Enrollment // careers</span>
        <h1 className="text-4xl md:text-5xl font-futuristic font-black tracking-tight text-[#e8ecee]">
          JOIN THE <span className="text-[#7bd355] glow-text">COMMAND STACK</span>
        </h1>
        <p className="text-xs text-[#939596] leading-relaxed">
          Unlock exclusive technical access, leadership certification, and developer bootcamps by volunteering with the Sociapi Society.
        </p>
        <p className="text-[10px] text-[#7bd355] uppercase tracking-wider font-semibold">
          Applications are submitted.
        </p>
        
        {/* Highlighted Open Volunteer positions list */}
        <div className="glass-panel p-4.5 rounded-xl border border-[#7bd355]/20 max-w-3xl mx-auto">
          <span className="block text-[9px] uppercase tracking-widest font-mono text-[#7bd355] mb-2 font-bold">★ Active Open Volunteer Positions</span>
          <div className="flex flex-wrap justify-center gap-2">
            {['Organizer', 'Graphic Designers', 'Media Team', 'Outreach Team', 'Decor Team', 'Technical Team', 'Logistics Team', 'Finance Team', 'HR Team'].map((pos, pIdx) => (
              <span key={pIdx} className="text-[10px] bg-[#333333] border border-[#517642]/30 text-[#e8ecee] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
                {pos}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Roster Positions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {careers.map((role) => (
          <div 
            key={role.id}
            className="glass-panel p-6 rounded-2xl border border-[#333333] hover:border-[#7bd355]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2.5 py-0.5 rounded">
                  {role.type}
                </span>
                <Briefcase className="w-4 h-4 text-[#939596]" />
              </div>

              <div>
                <h3 className="font-futuristic font-bold text-sm text-[#e8ecee] tracking-wide mt-1">{role.title}</h3>
                <span className="block text-[10px] text-[#939596] mt-0.5">{role.department} Department</span>
              </div>

              <p className="text-xs text-[#939596] leading-relaxed line-clamp-3">
                {role.description}
              </p>

              <div className="flex items-center space-x-4 text-[10px] text-[#939596] pt-3 border-t border-[#333333]">
                <span className="flex items-center"><MapPin className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {role.location}</span>
                <span className="flex items-center"><Clock className="w-3.5 h-3.5 text-[#7bd355] mr-1" /> {role.duration}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedRole(role)}
              className="mt-6 w-full py-3 bg-[#333333] hover:bg-[#7bd355] hover:text-[#121212] border border-[#7bd355]/20 text-[#7bd355] font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all"
            >
              Analyze Role Details
            </button>
          </div>
        ))}
      </div>

      {/* ROLE DETAIL & REQUIREMENTS DIALOG */}
      {selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/90 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-[#1e1e1e] border border-[#7bd355]/30 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 overflow-hidden">
            
            <button
              onClick={() => setSelectedRole(null)}
              className="absolute top-4 right-4 p-1.5 rounded-full bg-[#121212]/80 border border-[#939596]/10 text-[#939596] hover:text-[#7bd355]"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <span className="text-[9px] uppercase tracking-widest font-bold text-[#7bd355] bg-[#517642]/20 px-2 py-0.5 rounded">
                {selectedRole.type} Listing
              </span>
              <h2 className="text-xl font-futuristic font-bold text-[#e8ecee] mt-2">{selectedRole.title}</h2>
              <span className="text-[10px] text-[#939596]">{selectedRole.department} Department • {selectedRole.duration}</span>
            </div>

            <div className="space-y-2 border-t border-[#333333] pt-4">
              <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Mission Parameters</h4>
              <p className="text-xs text-[#939596] leading-relaxed">
                {selectedRole.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Requirements</h4>
                <ul className="space-y-2 text-xs text-[#939596]">
                  {selectedRole.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-[#7bd355]">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-[10px] uppercase font-bold tracking-widest text-[#e8ecee]">Roster Benefits</h4>
                <ul className="space-y-2 text-xs text-[#939596]">
                  {selectedRole.benefits.map((ben, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-[#7bd355] shrink-0 mt-0.5" />
                      <span>{ben}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-[#333333] flex items-center justify-between">
              <span className="text-[10px] text-[#939596]">Hiring Status: Open</span>
              <button
                onClick={() => setIsApplyModalOpen(true)}
                className="px-6 py-3 rounded-xl bg-[#7bd355] text-[#121212] hover:bg-[#517642] hover:text-[#e8ecee] text-xs font-bold uppercase tracking-widest transition-all"
              >
                Enlist Seat
              </button>
            </div>

          </div>
        </div>
      )}

      {/* APPLY APPLICATION MODAL */}
      {isApplyModalOpen && selectedRole && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121212]/95 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#1e1e1e] border border-[#7bd355]/40 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6 my-8 overflow-y-auto">
            
            <div className="flex items-center justify-between">
              <h3 className="font-futuristic font-bold text-xs uppercase tracking-widest text-[#7bd355]">Recruitment Form</h3>
              <button
                onClick={() => {
                  setIsApplyModalOpen(false);
                  setSelectedRole(null);
                }}
                className="p-1 rounded-full hover:bg-[#333333] text-[#939596] hover:text-[#7bd355]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {applySuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#7bd355]/10 border border-[#7bd355] flex items-center justify-center mx-auto text-[#7bd355]">
                  ✓
                </div>
                <h4 className="font-futuristic font-bold text-[#e8ecee]">Application Submitted!</h4>
                <p className="text-xs text-[#939596]">
                  Thank you! Your application has been received. We'll contact you soon on WhatsApp or Email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-5 text-xs">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Name *</label>
                  <small className="block text-[8px] text-[#939596]">First and last name</small>
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Muhammad Ali"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="e.g. student@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  />
                </div>

                {/* WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="whatsapp"
                    placeholder="+92 300 1234567"
                    value={formData.whatsapp}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  />
                </div>

                {/* Department & University */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Department & University *</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Computer Science, Islamia University"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  />
                </div>

                {/* Semester */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Semester *</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  >
                    <option value="">Select Semester</option>
                    <option value="1st">1st Semester</option>
                    <option value="2nd">2nd Semester</option>
                    <option value="3rd">3rd Semester</option>
                    <option value="4th">4th Semester</option>
                    <option value="5th">5th Semester</option>
                    <option value="6th">6th Semester</option>
                    <option value="7th">7th Semester</option>
                    <option value="8th">8th Semester</option>
                  </select>
                </div>

                {/* Are you from Peshawar? */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Are you from Peshawar? *</label>
                  <select
                    name="fromPeshawar"
                    value={formData.fromPeshawar}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Why should we select you? */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Why should we select you? *</label>
                  <textarea
                    name="whySelect"
                    placeholder="Tell us what makes you a great fit for this role..."
                    value={formData.whySelect}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  />
                </div>

                {/* Any Experience? */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Any Experience? *</label>
                  <small className="block text-[8px] text-[#939596]">If you have any experience, write it. If not, write "no".</small>
                  <textarea
                    name="experience"
                    placeholder="Describe any relevant experience..."
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows={3}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  />
                </div>

                {/* Resume Upload */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Resume *</label>
                  <small className="block text-[8px] text-[#939596]">Upload 1 supported file. Max 10 MB.</small>
                  <div className="relative border border-dashed border-[#333333] rounded-lg p-4 text-center hover:border-[#7bd355]/40 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'resume')}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-[#939596] mx-auto mb-1" />
                    <span className="block text-[9px] text-[#939596]">
                      {formData.resumeFile ? formData.resumeFile.name : 'Click or drag to upload'}
                    </span>
                  </div>
                </div>

                {/* Picture Upload */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Upload Picture *</label>
                  <small className="block text-[8px] text-[#939596]">The picture will be used for a social media poster. You can select any photo in which you feel comfortable.</small>
                  <div className="relative border border-dashed border-[#333333] rounded-lg p-4 text-center hover:border-[#7bd355]/40 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'picture')}
                      required
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-[#939596] mx-auto mb-1" />
                    <span className="block text-[9px] text-[#939596]">
                      {formData.pictureFile ? formData.pictureFile.name : 'Click or drag to upload image'}
                    </span>
                  </div>
                </div>

                {/* Social Media Handles */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">LinkedIn *</label>
                    <input
                      type="url"
                      name="linkedin"
                      placeholder="https://linkedin.com/in/username"
                      value={formData.linkedin}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Instagram *</label>
                    <input
                      type="url"
                      name="instagram"
                      placeholder="https://instagram.com/username"
                      value={formData.instagram}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Where did you hear about us? */}
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-wider text-[#939596] font-bold">Where did you hear about us? *</label>
                  <select
                    name="heardAbout"
                    value={formData.heardAbout}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#121212] border border-[#333333] rounded-lg py-2.5 px-3 text-[#e8ecee] focus:border-[#7bd355] focus:outline-none"
                  >
                    <option value="">Select Option</option>
                    <option value="Social Media">Social Media</option>
                    <option value="University">University</option>
                    <option value="Friend">Friend</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#7bd355] hover:bg-[#517642] text-[#121212] hover:text-[#e8ecee] font-bold text-xs uppercase tracking-widest rounded-xl transition-all"
                >
                  Submit Application
                </button>

              </form>
            )}

          </div>
        </div>
      )}

      {showAdminLog && applications.length > 0 && (
        <div className="bg-[#111111] border border-[#333333] rounded-3xl p-6 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-lg font-futuristic font-bold text-[#e8ecee]">Applicant Log</h2>
              <p className="text-[10px] text-[#939596]">Admin-only application records stored locally in your browser.</p>
            </div>
            <span className="text-[10px] uppercase tracking-widest text-[#7bd355] font-bold">{applications.length} submission{applications.length === 1 ? '' : 's'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.slice(0, 6).map((application) => (
              <div key={application.id} className="bg-[#161616] border border-[#333333] rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-bold text-[#e8ecee]">{application.fullName}</h3>
                    <span className="text-[10px] text-[#939596]">{application.role}</span>
                  </div>
                  <span className="text-[9px] text-[#7bd355] uppercase">{application.semester}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9px] text-[#939596]">
                  <span>Email: {application.email}</span>
                  <span>WhatsApp: {application.whatsapp}</span>
                  <span>LinkedIn: {application.linkedin}</span>
                  <span>Instagram: {application.instagram}</span>
                </div>
                <div className="text-[9px] text-[#939596] space-y-1">
                  <p><span className="font-bold text-[#e8ecee]">From:</span> {application.department}</p>
                  <p><span className="font-bold text-[#e8ecee]">Peshawar:</span> {application.fromPeshawar}</p>
                </div>
              </div>
            ))}
          </div>

          {applications.length > 6 && (
            <div className="text-[10px] text-[#939596]">Showing the 6 most recent entries. Add <span className="text-[#7bd355]">?admin=true</span> to the page URL to view this admin-only panel.</div>
          )}
        </div>
      )}

    </div>
  );
};
