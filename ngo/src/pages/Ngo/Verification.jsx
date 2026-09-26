import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Verification() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [status, setStatus] = useState('Pending');
  const [pdfFile, setPdfFile] = useState('ecoaction_registration_cert_2024.pdf');
  const [orgName, setOrgName] = useState('EcoAction India Foundation');
  const [phone, setPhone] = useState('+91 98112 04821');

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const handleSimulateApproval = () => {
    setStatus('Verified');
    setNotice('Status updated: NGO Compliance Approved ✓');
    setTimeout(() => setNotice(''), 4000);
  };

  const handleSubmitDocs = () => {
    setNotice('Verification documents submitted for compliance review.');
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Ngo" />

      <main className="w-full pt-16 bg-[#f8faf9] flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col w-full space-y-8">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span className="uppercase tracking-wider">Compliance Clearance Node</span>
              </div>
              <h1 className="font-headline-xl text-3xl font-bold text-on-surface tracking-tight">
                NGO Profile & Institutional Verification
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">
                Submit statutory compliance documents for zero-landfill procurement authority.
              </p>
            </div>

            {notice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{notice}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <section className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <h2 className="font-headline-md text-xl font-bold text-on-surface">Organization Statutory Verification</h2>
                    <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Zero-landfill regulatory documentation & credentialing</p>
                  </div>

                  <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold ${
                    status === 'Verified' ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${status === 'Verified' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                    <span>{status}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block font-label-lg text-sm font-semibold text-on-surface" htmlFor="org-name">Organization Name</label>
                    <div className="relative">
                      <input
                        id="org-name"
                        type="text"
                        value={orgName}
                        onChange={(e) => setOrgName(e.target.value)}
                        className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 text-on-surface font-body-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors"
                      />
                      <span className="material-symbols-outlined absolute right-4 top-3 text-[18px] text-outline">apartment</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-label-lg text-sm font-semibold text-on-surface">Institutional Registration / 80G / 12A Certificate</label>
                    
                    <label className="block p-6 rounded-2xl border-2 border-dashed border-gray-300 hover:border-primary bg-gray-50 hover:bg-emerald-50/30 text-center cursor-pointer transition-all group">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-primary flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                        <span className="material-symbols-outlined text-[28px]">upload_file</span>
                      </div>
                      <p className="font-label-lg text-sm font-bold text-on-surface">Upload PDF Certificate (Max 10MB)</p>
                      <p className="font-body-sm text-xs text-outline mt-1">Encrypted or standard PDF with stamp certification</p>
                      <input
                        type="file"
                        accept=".pdf"
                        className="sr-only"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setPdfFile(e.target.files[0].name);
                            setNotice(`Uploaded ${e.target.files[0].name}`);
                            setTimeout(() => setNotice(''), 3000);
                          }
                        }}
                      />
                    </label>

                    {pdfFile && (
                      <div className="mt-3 p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
                          </div>
                          <div className="min-w-0">
                            <p className="font-label-md text-xs font-bold text-on-surface truncate">{pdfFile}</p>
                            <p className="font-body-sm text-[11px] text-emerald-800 font-medium">2.4 MB • Signed 80G / 12A Verified</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setPdfFile('');
                              setNotice('File removed.');
                              setTimeout(() => setNotice(''), 3000);
                            }}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            title="Remove PDF"
                          >
                            <span className="material-symbols-outlined text-[20px]">close</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleSubmitDocs}
                    className="flex-1 h-11 px-6 rounded-xl bg-[#0d631b] hover:bg-[#0b4d16] text-white font-label-lg text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">send</span>
                    <span>Submit Verification Documents</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSimulateApproval}
                    className="h-11 px-5 rounded-xl bg-emerald-100 text-emerald-900 border border-emerald-300 font-label-lg text-sm font-bold hover:bg-emerald-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                    <span>Simulate Approval</span>
                  </button>
                </div>
              </section>

              <section className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm space-y-6">
                <div>
                  <h2 className="font-headline-md text-xl font-bold text-on-surface">NGO Lead Profile</h2>
                  <p className="font-body-sm text-xs text-on-surface-variant mt-0.5">Primary account authority & communication channel</p>
                </div>

                <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 border border-gray-100 text-center space-y-4">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden shadow-md ring-2 ring-emerald-600/30">
                      <img
                        alt="NGO Profile Avatar"
                        className="w-full h-full object-cover"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"
                      />
                    </div>
                    <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center shadow">
                      <span className="material-symbols-outlined text-[14px]">shield</span>
                    </div>
                  </div>
                  <label className="h-9 px-4 rounded-xl bg-white border border-gray-200 text-on-surface font-label-md text-xs font-bold hover:bg-gray-100 transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
                    <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                    <span>Change Logo / Avatar</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="sr-only"
                      onChange={() => {
                        setNotice('Logo updated.');
                        setTimeout(() => setNotice(''), 3000);
                      }}
                    />
                  </label>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-label-lg text-sm font-semibold text-on-surface" htmlFor="lead-phone">Registered Contact Phone</label>
                  <div className="relative">
                    <input
                      id="lead-phone"
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 text-on-surface font-body-md text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-colors"
                    />
                    <span className="material-symbols-outlined absolute right-4 top-3 text-[18px] text-outline">call</span>
                  </div>
                </div>

                {/* TASK 1: Working Log Out Button for NGO */}
                <div className="pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full h-11 px-6 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 font-label-lg text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[20px]">logout</span>
                    <span>Log Out</span>
                  </button>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
