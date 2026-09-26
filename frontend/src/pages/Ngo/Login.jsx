import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function NgoLogin() {
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
          role: 'ngo',
        });
      } else {
        await login(formData.email, formData.password);
      }
      navigate('/ngo/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.error?.message || err.message || 'Authentication failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center">
      <main className="w-full min-h-screen flex items-center justify-center bg-surface">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto my-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest">

              {/* Left Panel */}
              <div className="lg:w-2/5 relative flex flex-col justify-between p-8 sm:p-12 text-on-primary overflow-hidden bg-gradient-to-br from-primary via-primary-container to-tertiary">
                <div className="relative z-10 flex flex-col gap-6">
                  <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md">
                    <span className="material-symbols-outlined text-primary-fixed text-headline-sm" style={{ fontVariationSettings: "'FILL' 1" }}>recycling</span>
                    <span className="font-label-md text-label-md tracking-wide text-primary-fixed uppercase">ReWaste Ecosystem</span>
                  </div>
                  <div className="flex flex-col gap-3">
                    <h1 className="font-headline-xl text-headline-xl text-on-primary">
                      Turn waste into worth.
                    </h1>
                    <p className="font-body-lg text-body-lg text-on-primary-container max-w-md">
                      Powering verified circular exchanges between communities, grassroots aggregators, and certified industrial upcyclers.
                    </p>
                  </div>
                </div>

                <div className="relative z-10 my-8">
                  <div className="p-6 rounded-xl bg-surface-container-lowest/10 backdrop-blur-md shadow-sm flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed">Verified Aggregator Impact</span>
                      <span className="material-symbols-outlined text-primary-fixed" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                    <div className="flex items-baseline gap-3">
                      <span className="font-display-lg text-display-lg text-on-primary">94.8%</span>
                      <span className="font-label-md text-label-md text-primary-fixed">+12.4% MoM</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center gap-2 text-on-primary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-headline-sm">hub</span>
                  <span>Decentralized Material Verification Network</span>
                </div>
              </div>

              {/* Right Panel */}
              <div className="lg:w-3/5 p-8 sm:p-12 lg:p-14 bg-surface-container-lowest flex flex-col justify-center">
                <div className="max-w-xl w-full mx-auto flex flex-col">

                  {/* Role Switcher */}
                  <div className="flex p-1 bg-surface-container rounded-lg mb-8">
                    <button
                      className="flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface text-center"
                      type="button"
                      onClick={() => navigate('/person/login')}
                    >
                      Person
                    </button>
                    <button className="flex-1 py-2 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm text-center font-bold" type="button">
                      NGO
                    </button>
                    <button
                      className="flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface text-center"
                      type="button"
                      onClick={() => navigate('/bhangarwala/login')}
                    >
                      Bhangarwala
                    </button>
                  </div>

                  <div className="flex flex-col gap-1 mb-6">
                    <h2 className="font-headline-lg text-headline-lg text-on-surface">
                      {isSignup ? 'Register NGO Organization' : 'Log in to your NGO workspace'}
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {isSignup ? 'Establish institutional governance for local circular supply streams.' : 'Access contracts, collection verification, payments, and events.'}
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">error</span>
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    {isSignup && (
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md text-on-surface" htmlFor="name">Full / Representative Name</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">badge</span>
                          <input
                            className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                            id="name"
                            name="name"
                            placeholder="Rajesh Singhania"
                            required={isSignup}
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-label-md text-on-surface" htmlFor="email">Email Address</label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">mail</span>
                        <input
                          className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                          id="email"
                          name="email"
                          placeholder="contact@ecoaction.org"
                          required
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    {isSignup && (
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md text-on-surface" htmlFor="phone">Phone Number</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">call</span>
                          <input
                            className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                            id="phone"
                            name="phone"
                            placeholder="+91 98112 04821"
                            required={isSignup}
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    )}

                    <div className={`grid grid-cols-1 gap-4 ${isSignup ? 'sm:grid-cols-2' : ''}`}>
                      <div className="flex flex-col gap-1.5">
                        <label className="font-label-md text-label-md text-on-surface" htmlFor="password">Password</label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">lock</span>
                          <input
                            className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                            id="password"
                            name="password"
                            placeholder="••••••••"
                            required
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {isSignup && (
                        <div className="flex flex-col gap-1.5">
                          <label className="font-label-md text-label-md text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">lock_reset</span>
                            <input
                              className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline"
                              id="confirmPassword"
                              name="confirmPassword"
                              placeholder="••••••••"
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
                      className="mt-4 w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:bg-primary-container transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      disabled={submitting}
                      type="submit"
                    >
                      <span>{submitting ? 'Processing...' : isSignup ? 'Create NGO Partner Account' : 'Log In to NGO Workspace'}</span>
                      <span className="material-symbols-outlined text-headline-sm">arrow_forward</span>
                    </button>
                  </form>

                  <div className="mt-6 flex justify-center text-center">
                    <button
                      className="font-label-md text-label-md text-primary hover:underline"
                      type="button"
                      onClick={() => {
                        setIsSignup(!isSignup);
                        setErrorMsg('');
                      }}
                    >
                      {isSignup ? 'Already have an account? Log in' : 'New here? Create an NGO account'}
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
