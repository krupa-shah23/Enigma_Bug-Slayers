import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [fullName, setFullName] = useState('Ananya Sharma');
  const [phone, setPhone] = useState('+91 98765 43210');

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice('Profile changes saved successfully.');
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Person" />

      <main className="w-full pt-16 bg-[#F5F7F6] flex-1">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            
            <div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
              <div className="flex items-center gap-2 text-on-surface-variant font-label-md text-sm">
                <span className="hover:text-primary transition-colors cursor-pointer">Account</span>
                <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
                <span className="text-primary font-bold">Resident Profile</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full font-label-sm text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
                <span>Verified Identity</span>
              </div>
            </div>

            <div className="max-w-2xl mx-auto mb-8 text-left">
              <h1 className="font-headline-xl text-3xl text-on-surface font-bold tracking-tight">Resident Profile</h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage your account credentials and contact details.</p>
            </div>

            {notice && (
              <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{notice}</span>
              </div>
            )}

            <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6" id="profile-form">
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 border-b border-gray-100">
                  <div className="relative shrink-0 w-24 h-24 rounded-full overflow-hidden shadow-inner bg-gray-100 border border-gray-200">
                    <img
                      alt="Ananya Sharma"
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      id="avatar-preview"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <input
                        accept="image/png, image/jpeg"
                        className="hidden"
                        id="avatar-input"
                        type="file"
                        onChange={() => {
                          setNotice('Avatar photo uploaded successfully.');
                          setTimeout(() => setNotice(''), 3000);
                        }}
                      />
                      <label
                        htmlFor="avatar-input"
                        className="inline-flex items-center gap-2 h-10 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-on-surface font-label-lg text-sm font-semibold transition-colors cursor-pointer shadow-xs active:scale-95"
                      >
                        <span className="material-symbols-outlined text-[18px] text-primary">photo_camera</span>
                        <span>Change Avatar</span>
                      </label>
                    </div>
                    <p className="font-body-sm text-xs text-on-surface-variant">JPG or PNG, max 2MB</p>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-lg text-sm font-semibold text-on-surface flex items-center justify-between" htmlFor="full-name">
                      <span>Full Name</span>
                      <span className="font-label-sm text-xs text-outline font-normal">Editable</span>
                    </label>
                    <input
                      id="full-name"
                      name="full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 text-on-surface font-body-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-lg text-sm font-semibold text-on-surface flex items-center justify-between" htmlFor="phone-number">
                      <span>Phone Number</span>
                      <span className="font-label-sm text-xs text-outline font-normal">Primary Contact</span>
                    </label>
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 text-on-surface font-body-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="email-address">Email Address</label>
                      <span className="inline-flex items-center gap-1 font-label-sm text-xs text-outline bg-gray-100 px-2.5 py-0.5 rounded-full font-medium">
                        <span className="material-symbols-outlined text-[13px]">lock</span>
                        Read-only
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <input
                        id="email-address"
                        name="email-address"
                        type="email"
                        readOnly
                        value="ananya.sharma@greenvalley.org"
                        className="w-full h-11 px-4 pr-10 rounded-xl bg-gray-100 border border-gray-200 text-on-surface-variant font-body-md text-sm cursor-not-allowed select-all focus:outline-none"
                      />
                      <span className="material-symbols-outlined absolute right-3 text-outline text-[20px] pointer-events-none select-none">lock</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-100">
                  
                  {/* TASK 1: Working Log Out Button */}
                  <button
                    id="logout-btn"
                    type="button"
                    onClick={handleLogout}
                    className="w-full sm:w-auto order-2 sm:order-1 h-11 px-6 rounded-xl font-label-lg text-sm font-bold text-red-700 bg-red-50 hover:bg-red-100 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs border border-red-200"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    <span>Log Out</span>
                  </button>

                  <button
                    id="save-btn"
                    type="submit"
                    className="w-full sm:w-auto order-1 sm:order-2 h-11 px-8 rounded-xl font-label-lg text-sm font-bold text-white bg-[#0d631b] hover:bg-[#0b4d16] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">check</span>
                    <span>Save Changes</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
