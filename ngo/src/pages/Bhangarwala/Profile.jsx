import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, Footer } from '../../components/index.jsx';

export default function Profile() {
  const navigate = useNavigate();
  const [notice, setNotice] = useState('');
  const [fullName, setFullName] = useState('Ramesh Kumar');
  const [phone, setPhone] = useState('+91 98112 44321');
  const [vehicle, setVehicle] = useState('Electric Cargo Trike (Capacity 350 kg, Reg: DL-5S-9912)');
  const [area, setArea] = useState('Sector 54, Golf Course Extension Road & Riverside Hubs (Radius 5 km)');
  const [isOnline, setIsOnline] = useState(true);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotice('Bhangarwala profile updated successfully.');
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      <Navbar variant="Bhangarwala" />

      <main className="w-full pt-16 bg-[#f8faf9] flex-1">
        <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 flex flex-col gap-6">
            
            <div className="flex flex-col gap-1 pb-4 border-b border-gray-100">
              <h1 className="font-headline-lg text-2xl font-bold text-on-surface">Bhangarwala Partner Profile</h1>
              <p className="font-body-md text-sm text-on-surface-variant">
                Manage collector identity, vehicle parameters, and dispatch availability.
              </p>
            </div>

            {notice && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-medium text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                <span>{notice}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex items-center gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <img
                  alt="Ramesh Kumar Profile"
                  className="w-20 h-20 rounded-full object-cover shadow-sm ring-2 ring-emerald-600/30 shrink-0"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhhZitNYlppv5xZOz4jHI-OnvlD7HcJsYyHrR2elMY1Yw2Z2VvF9SEcGHatJOrqJzhiCnWwpfKFedF9aN5EW7RVnTGxTbI3HKW1EtMQ1VhsgdMJ4ojl1-h4FIgMG7yzfu9gvic4GfVVe96PXEPWtGOr1vCK1Kn8Zg28o3r_4EAPsj_yvHrorQEfa815yG2ClDdlCPpxDaeX25dqgMdReTzNtY4KvOPcua06NiGXXT1oQzwT9YPI_0RVA"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <label
                      htmlFor="avatar-input"
                      className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl font-label-lg text-xs font-bold bg-white text-on-surface hover:bg-gray-100 border border-gray-200 transition-colors shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">photo_camera</span>
                      <span>Change Avatar</span>
                      <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={() => {
                          setNotice('Avatar photo updated.');
                          setTimeout(() => setNotice(''), 3000);
                        }}
                      />
                    </label>
                  </div>
                  <span className="font-body-sm text-xs text-on-surface-variant">JPG, PNG, or WEBP up to 5MB. Headshot recommended.</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="full-name">Full Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 material-symbols-outlined text-outline text-[20px]">person</span>
                    <input
                      id="full-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-body-md text-sm text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="phone-number">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 material-symbols-outlined text-outline text-[20px]">call</span>
                    <input
                      id="phone-number"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-body-md text-sm text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="vehicle-type">Vehicle Type</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 material-symbols-outlined text-outline text-[20px]">electric_rickshaw</span>
                    <input
                      id="vehicle-type"
                      type="text"
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-body-md text-sm text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-sm font-semibold text-on-surface" htmlFor="area-note">Operating Area Note</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3 material-symbols-outlined text-outline text-[20px]">location_on</span>
                    <textarea
                      id="area-note"
                      rows={3}
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl font-body-md text-sm text-on-surface focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Dispatch Toggle */}
                <div className="flex items-center justify-between p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl">
                  <div className="flex flex-col">
                    <span className="font-label-lg text-sm font-bold text-on-surface">Available for Scrap Dispatches</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className={`w-2.5 h-2.5 rounded-full ${isOnline ? 'bg-emerald-600 animate-pulse' : 'bg-gray-400'}`}></span>
                      <span className={`font-body-sm text-xs font-semibold ${isOnline ? 'text-emerald-800' : 'text-gray-600'}`}>
                        {isOnline ? 'Online — Ready for pickups' : 'Offline — Dispatches paused'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOnline}
                    onClick={() => setIsOnline(!isOnline)}
                    className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out p-1 ${
                      isOnline ? 'bg-emerald-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition duration-200 ease-in-out ${
                        isOnline ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* TASK 1: Working Log Out Button */}
                <button
                  id="logout-btn"
                  type="button"
                  onClick={handleLogout}
                  className="h-11 px-6 inline-flex items-center gap-2 rounded-xl font-label-lg text-sm font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition-colors cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Log Out</span>
                </button>

                <button
                  id="save-profile-btn"
                  type="submit"
                  className="h-11 px-8 inline-flex items-center gap-2 rounded-xl font-label-lg text-sm font-bold text-white bg-[#0d631b] hover:bg-[#0b4d16] transition-colors shadow-sm cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
