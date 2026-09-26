import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

export default function Login({ defaultRole }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine initial role from props or state or default to Person
  const [role, setRole] = useState(() => {
    if (defaultRole) return defaultRole;
    if (location.pathname.includes('ngo')) return 'NGO';
    if (location.pathname.includes('bhangarwala')) return 'Bhangarwala';
    return 'Person';
  });

  const [isLoginMode, setIsLoginMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    orgName: '',
    email: '',
    phone: '',
    vehicleType: 'electric_trike',
    area: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'Person') {
      navigate('/home');
    } else if (role === 'NGO') {
      navigate('/ngo/dashboard');
    } else {
      navigate('/bhangarwala/requests');
    }
  };

  return (
    <div className="bg-[#f8faf9] font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-[1240px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[720px] border border-outline-variant/30">
        
        {/* Left Dark Hero Side Banner */}
        <div className="w-full lg:w-[42%] bg-gradient-to-br from-[#0a4213] via-[#0d631b] to-[#1b5e20] p-8 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Ambient Glows */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-emerald-400/10 blur-3xl pointer-events-none"></div>
          <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-emerald-300/15 blur-2xl pointer-events-none"></div>

          {/* Top Brand Logo */}
          <div className="relative z-10 flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center text-emerald-300 shadow-inner border border-white/20 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[26px]">recycling</span>
              </div>
              <span className="font-headline-md text-headline-md tracking-tight font-bold text-white">ReWaste</span>
            </Link>
          </div>

          {/* Center Card & Headline */}
          <div className="relative z-10 my-8 lg:my-auto flex flex-col items-start">
            <div className="w-full mb-8 relative rounded-xl overflow-hidden shadow-2xl border border-white/20 bg-black/20 backdrop-blur-md">
              <img
                className="w-full h-52 object-cover mix-blend-overlay hover:mix-blend-normal transition-all duration-700"
                src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
                alt="Circular recovery network"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a4213]/90 via-[#0a4213]/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-emerald-200">Exchange Network Active</span>
                </div>
                <span className="font-label-sm text-label-sm opacity-80">v2.4 Live</span>
              </div>
            </div>

            <span className="font-label-md text-label-md uppercase tracking-widest text-emerald-300 font-semibold mb-2">Decentralized Recovery Grid</span>
            <h1 className="font-display-lg text-headline-xl sm:text-display-lg text-white tracking-tight font-bold leading-tight mb-3">
              Turn waste into worth.
            </h1>
            <p className="font-body-md text-body-md text-emerald-100/90 max-w-md leading-relaxed">
              Powering verified circular exchanges between communities, grassroots aggregators, and certified industrial upcyclers.
            </p>
          </div>

          {/* Bottom Trust Gauge */}
          <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between border border-white/15">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center text-emerald-300">
                <span className="material-symbols-outlined text-[22px]">verified</span>
              </div>
              <div>
                <p className="font-label-md text-label-md font-semibold text-white">Chain-of-Custody Verified</p>
                <p className="font-body-sm text-body-sm text-emerald-200/80">Institutional grade batch tracking</p>
              </div>
            </div>
            <span className="font-headline-sm text-headline-sm font-bold text-emerald-300">94.8%</span>
          </div>
        </div>

        {/* Right Form Desk */}
        <div className="w-full lg:w-[58%] bg-white p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
          
          {/* Top Header Toggle */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold">Registration Desk</span>
            </div>
            <button
              type="button"
              onClick={() => setIsLoginMode(!isLoginMode)}
              className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors focus:outline-none"
            >
              {isLoginMode ? (
                <>Need an account? <span className="font-bold underline">Sign Up</span></>
              ) : (
                <>Already have an account? <span className="font-bold underline">Log in</span></>
              )}
            </button>
          </div>

          <div className="w-full max-w-[500px] mx-auto py-6">
            
            {/* Role Tab Switcher (Person / NGO / Bhangarwala) */}
            <div className="mb-6">
              <p className="font-label-md text-label-md text-on-surface-variant mb-2 font-medium">Select your operating entity</p>
              <div role="tablist" aria-label="Account Identity" className="grid grid-cols-3 gap-1 bg-[#f2f4f3] p-1.5 rounded-xl border border-gray-200/60">
                <button
                  type="button"
                  role="tab"
                  aria-selected={role === 'Person'}
                  onClick={() => setRole('Person')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 ${
                    role === 'Person'
                      ? 'bg-white text-primary shadow-sm font-bold border border-gray-100'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span>Person</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={role === 'NGO'}
                  onClick={() => setRole('NGO')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 ${
                    role === 'NGO'
                      ? 'bg-white text-primary shadow-sm font-bold border border-gray-100'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                  <span>NGO</span>
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={role === 'Bhangarwala'}
                  onClick={() => setRole('Bhangarwala')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 ${
                    role === 'Bhangarwala'
                      ? 'bg-white text-primary shadow-sm font-bold border border-gray-100'
                      : 'text-on-surface-variant hover:text-on-surface font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                  <span>Bhangarwala</span>
                </button>
              </div>
            </div>

            {/* Form Title & Subtitle */}
            <div className="mb-6">
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                {isLoginMode ? `Log in as ${role}` : `Create your ${role} account`}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {role === 'Person' && 'Join local resident recovery pools and log waste contributions.'}
                {role === 'NGO' && 'Establish institutional governance and material verification streams.'}
                {role === 'Bhangarwala' && 'Access direct residential scrap listings and instant payouts.'}
              </p>
            </div>

            {/* Dynamic Interactive Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* NGO Org Name */}
              {!isLoginMode && role === 'NGO' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="orgName">Organization Name</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">corporate_fare</span>
                    <input
                      id="orgName"
                      name="orgName"
                      type="text"
                      required
                      value={formData.orgName}
                      onChange={handleChange}
                      placeholder="e.g. Green Earth Foundation"
                      className="w-full h-11 pl-11 pr-4 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                    />
                  </div>
                </div>
              )}

              {/* Full Name */}
              {!isLoginMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="name">
                    {role === 'NGO' ? 'Representative Full Name' : 'Full Name'}
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">badge</span>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={role === 'Bhangarwala' ? 'e.g. Ramesh Kumar' : 'e.g. Ananya Sharma'}
                      className="w-full h-11 pl-11 pr-4 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="email">Email Address</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">alternate_email</span>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={role === 'NGO' ? 'contact@ngo.org' : 'name@example.com'}
                    className="w-full h-11 pl-11 pr-4 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                  />
                </div>
              </div>

              {/* Phone */}
              {!isLoginMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="phone">Phone Number</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">call</span>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full h-11 pl-11 pr-4 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                    />
                  </div>
                </div>
              )}

              {/* Bhangarwala Specific Fields */}
              {!isLoginMode && role === 'Bhangarwala' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="vehicleType">Vehicle Type</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">electric_rickshaw</span>
                      <select
                        id="vehicleType"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        className="w-full h-11 pl-11 pr-8 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
                      >
                        <option value="electric_trike">Electric Trike (350kg)</option>
                        <option value="mini_truck">Mini Truck / Tempo</option>
                        <option value="manual_cart">Manual Cart</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 text-outline pointer-events-none text-[20px]">expand_more</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="area">Operating Area</label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">location_on</span>
                      <input
                        id="area"
                        name="area"
                        type="text"
                        value={formData.area}
                        onChange={handleChange}
                        placeholder="e.g. Sector 54 Hub"
                        className="w-full h-11 pl-11 pr-4 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="password">Password</label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock</span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Minimum 8 characters"
                    className="w-full h-11 pl-11 pr-11 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 text-outline hover:text-on-surface focus:outline-none"
                    aria-label="Toggle password visibility"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Confirm Password (Signup only) */}
              {!isLoginMode && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-lg text-label-lg text-on-surface font-medium" htmlFor="confirmPassword">Confirm Password</label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock_reset</span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      className="w-full h-11 pl-11 pr-11 bg-[#f2f4f3] text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:shadow-sm transition-all placeholder:text-outline"
                    />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full h-12 bg-[#0d631b] hover:bg-[#0b4d16] active:bg-[#083a10] text-white font-label-lg text-label-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer font-semibold"
                >
                  <span>{isLoginMode ? `Log In as ${role}` : `Create ${role} Account`}</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>

            </form>
          </div>

          {/* Footer Security Badge */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 text-on-surface-variant font-body-sm text-body-sm">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-primary">eco</span>
              <span>Zero-emission operational ledger</span>
            </div>
            <span className="font-label-sm text-label-sm text-outline tracking-wider uppercase font-semibold">SECURE SSL 256-BIT</span>
          </div>

        </div>

      </div>
    </div>
  );
}
