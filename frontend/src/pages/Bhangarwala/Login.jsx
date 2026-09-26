import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function BhangarwalaLogin() {
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const [isSignup, setIsSignup] = useState(false);
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
          role: 'bhangarwala',
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/bhangarwala/requests');
    } catch (err) {
      setErrorMsg(err.response?.data?.error?.message || err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-center items-center">
      <main className="w-full flex-1 flex items-center justify-center">
        <div className="flex flex-col w-full py-8 px-4 sm:px-6">
          <div className="max-w-4xl w-full mx-auto my-6 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row bg-surface-container-lowest">

            {/* Left Info Panel */}
            <div className="md:w-2/5 bg-gradient-to-br from-[#1b5e20] to-[#2e7d32] p-8 text-on-primary flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-6">
                  <span className="material-symbols-outlined text-primary-fixed text-headline-xl">cyclone</span>
                  <span className="font-headline-lg text-headline-lg tracking-tight text-surface-container-lowest">ReWaste</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-on-primary backdrop-blur-sm mb-6">
                  <span className="material-symbols-outlined text-label-sm text-primary-fixed">verified</span>
                  <span className="font-label-sm text-label-sm tracking-wider uppercase">Decentralized Recovery Grid</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-surface-container-lowest leading-tight mb-4">
                  Turn waste into worth.
                </h2>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="md:w-3/5 p-8 lg:p-10 bg-surface-container-lowest flex flex-col justify-between">
              <div>
                {/* Role Tabs */}
                <div className="bg-surface-container-low p-1 rounded-xl flex items-center mb-6">
                  <button
                    className="flex-1 py-1.5 px-3 rounded-lg text-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => navigate('/person/login')}
                  >
                    Person
                  </button>
                  <button
                    className="flex-1 py-1.5 px-3 rounded-lg text-center font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
                    type="button"
                    onClick={() => navigate('/ngo/login')}
                  >
                    NGO
                  </button>
                  <button className="flex-1 py-1.5 px-3 rounded-lg text-center font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm font-bold" type="button">
                    Bhangarwala
                  </button>
                </div>

                <div className="mb-6">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Registration Desk</span>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                    {isSignup ? 'Register as Bhangarwala Partner' : 'Log in as Bhangarwala Partner'}
                  </h1>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Connect directly to residential scrap listings and guaranteed spot payouts.
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
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Full Name</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">badge</span>
                        <input
                          className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors"
                          name="name"
                          placeholder="e.g. Ramesh Kumar"
                          required={isSignup}
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface mb-1">Email Address</label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">mail</span>
                      <input
                        className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors"
                        name="email"
                        placeholder="ramesh@ecotraders.in"
                        required
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {isSignup && (
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Phone Number</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">call</span>
                        <input
                          className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors"
                          name="phone"
                          placeholder="+91 98112 44321"
                          required={isSignup}
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}

                  <div className={`grid grid-cols-1 gap-4 ${isSignup ? 'sm:grid-cols-2' : ''}`}>
                    <div>
                      <label className="block font-label-md text-label-md text-on-surface mb-1">Password</label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">lock</span>
                        <input
                          className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors"
                          name="password"
                          placeholder="••••••••••••"
                          required
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {isSignup && (
                      <div>
                        <label className="block font-label-md text-label-md text-on-surface mb-1">Confirm Password</label>
                        <div className="relative">
                          <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-headline-sm">lock_reset</span>
                          <input
                            className="w-full bg-surface-container-low rounded-lg pl-10 pr-3 py-2 text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container transition-colors"
                            name="confirmPassword"
                            placeholder="••••••••••••"
                            required={isSignup}
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    className="w-full mt-2 h-10 px-5 bg-primary-container hover:bg-[#256628] text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    disabled={submitting}
                    type="submit"
                  >
                    <span>{submitting ? 'Processing...' : isSignup ? 'Create Bhangarwala Account' : 'Log In to Workspace'}</span>
                    <span className="material-symbols-outlined text-headline-sm">arrow_forward</span>
                  </button>
                </form>

                <div className="text-center mt-5">
                  <button
                    className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                    type="button"
                    onClick={() => {
                      setIsSignup(!isSignup);
                      setErrorMsg('');
                    }}
                  >
                    {isSignup ? <>Already have an account? <span className="font-semibold text-primary">Log in</span></> : <>New here? <span className="font-semibold text-primary">Sign up</span></>}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
