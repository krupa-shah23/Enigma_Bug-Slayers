import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function PersonLogin() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [role, setRole] = useState('Person');
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMsg('');

    if (isSignup && formData.password !== formData.confirmPassword) {
      setErrorMsg('Passwords do not match');
      return;
    }

    setSubmitting(true);
    try {
      if (isSignup) {
        await signup({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: 'person',
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/home');
    } catch (err) {
      setErrorMsg(err.response?.data?.error?.message || err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-center">
      <div className="min-h-screen">
        <main className="w-full">
          <div className="flex flex-col w-full">
            <div className="w-full max-w-[1280px] mx-auto px-4 py-8 lg:py-12">
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[720px]">
                
                {/* Left Brand Panel */}
                <div className="w-full lg:w-[40%] bg-gradient-to-br from-primary-container via-primary to-[#1B5E20] p-8 lg:p-12 text-on-primary flex flex-col justify-between relative overflow-hidden">
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest/15 backdrop-blur-md flex items-center justify-center text-on-primary shadow-sm">
                      <span className="material-symbols-outlined text-[26px]">recycling</span>
                    </div>
                    <span className="font-headline-md text-headline-md tracking-tight font-bold text-on-primary">ReWaste</span>
                  </div>

                  <div className="relative z-10 my-10 lg:my-0 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <p className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed font-semibold mb-2">Decentralized Recovery Grid</p>
                    <h1 className="font-display-lg text-display-lg text-on-primary tracking-tight font-bold leading-tight mb-4">
                      Turn waste into worth.
                    </h1>
                    <p className="font-body-md text-body-md text-on-primary/80 max-w-sm">
                      Powering verified circular exchanges between communities, grassroots aggregators, and certified industrial upcyclers.
                    </p>
                  </div>

                  <div className="relative z-10 bg-surface-container-lowest/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
                    <div>
                      <p className="font-label-md text-label-md font-semibold text-on-primary">Resident Portal</p>
                      <p className="font-body-sm text-body-sm text-on-primary/70">Society contributions & P2P exchanges</p>
                    </div>
                    <span className="font-headline-sm text-headline-sm font-bold text-primary-fixed">100%</span>
                  </div>
                </div>

                {/* Right Form Panel */}
                <div className="w-full lg:w-[60%] bg-surface-container-lowest p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
                  
                  <div className="flex items-center justify-between pb-6">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Registration Desk</span>
                    </div>
                    <button
                      className="font-label-lg text-label-lg text-primary-container hover:text-primary transition-colors focus:outline-none"
                      type="button"
                      onClick={() => {
                        setIsSignup(!isSignup);
                        setErrorMsg('');
                      }}
                    >
                      {isSignup ? <>Already have an account? <span className="font-bold underline">Log in</span></> : <>New here? <span className="font-bold underline">Sign up</span></>}
                    </button>
                  </div>

                  <div className="w-full max-w-[480px] mx-auto py-4">
                    
                    {/* Role selector */}
                    <div className="mb-8">
                      <p className="font-label-md text-label-md text-on-surface-variant mb-2.5">Select your operating entity</p>
                      <div className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-xl">
                        <button
                          className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 ${role === 'Person' ? 'bg-surface-container-lowest text-primary-container shadow-sm font-semibold' : 'text-on-surface-variant hover:text-on-surface font-medium'}`}
                          type="button"
                          onClick={() => setRole('Person')}
                        >
                          <span className="material-symbols-outlined text-[18px]">person</span>
                          <span>Person</span>
                        </button>
                        <button
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface font-medium transition-all duration-200"
                          type="button"
                          onClick={() => navigate('/ngo/login')}
                        >
                          <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
                          <span>NGO</span>
                        </button>
                        <button
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface font-medium transition-all duration-200"
                          type="button"
                          onClick={() => navigate('/bhangarwala/login')}
                        >
                          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
                          <span>Bhangarwala</span>
                        </button>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight">
                        {isSignup ? 'Create your Resident Account' : 'Log in as Resident'}
                      </h2>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                        {isSignup ? 'Get immediate onboarding for decentralized waste trade.' : 'Access real-time aggregation lots, tickets, and payments.'}
                      </p>
                    </div>

                    {errorMsg && (
                      <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                        <span className="material-symbols-outlined text-base">error</span>
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <form className="space-y-4" onSubmit={handleSubmit}>
                      {isSignup && (
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="name">Full Name</label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">badge</span>
                            <input
                              className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                              id="name"
                              name="name"
                              placeholder="e.g. Ramesh Patel"
                              required={isSignup}
                              type="text"
                              value={formData.name}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-lg text-label-lg text-on-surface" htmlFor="email">Email Address</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">alternate_email</span>
                          <input
                            className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                            id="email"
                            name="email"
                            placeholder="name@example.com"
                            required
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {isSignup && (
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="phone">Phone Number</label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">call</span>
                            <input
                              className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                              id="phone"
                              name="phone"
                              placeholder="+91 98765 43210"
                              required={isSignup}
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-lg text-label-lg text-on-surface" htmlFor="password">Password</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock</span>
                          <input
                            className="w-full h-11 pl-11 pr-11 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                            id="password"
                            name="password"
                            placeholder="Minimum 8 characters"
                            required
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <button
                            className="absolute right-3.5 text-outline hover:text-on-surface focus:outline-none"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showPassword ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                        </div>
                      </div>

                      {isSignup && (
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-lg text-label-lg text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock_reset</span>
                            <input
                              className="w-full h-11 pl-11 pr-11 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="Re-enter your password"
                              required={isSignup}
                              type={showPassword ? 'text' : 'password'}
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      )}

                      <div className="pt-4">
                        <button
                          className="w-full h-11 bg-primary-container hover:bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                          disabled={submitting}
                          type="submit"
                        >
                          <span>{submitting ? 'Processing...' : isSignup ? 'Create Account' : 'Log In'}</span>
                          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
