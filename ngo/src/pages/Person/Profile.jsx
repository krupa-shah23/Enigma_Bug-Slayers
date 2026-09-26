import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Profile(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-gray-200"><div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between"><div className="flex items-center gap-space-sm"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZimPwqvNO5WBOD_Rr6DrxoFMG9U7zp-_fA8lYNGY_YUTus1BXwWVvqCq2vAkd1inpXBz7YGFuKubvo8a2k-YT6CEQst72AhHKNbk4Wov6WvbuvA_1JPsy564A0qOyka9DCmxpACzZ8OsJmOiTcvhVN8WirT4gjLSAaC1jNGwZHBweKLc4cOBIwvuml0rB5HGeCFdZwTwvsFkXyDjUlmBiMv4h54GnAgwiEpoFSVeDDqJHmQWBy0rbew"/><span className="font-headline-md text-headline-md tracking-tight text-primary font-bold hidden sm:inline-block">ReWaste</span></div><Navbar variant="Person" className="hidden md:flex items-center gap-gutter"><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/home">Home</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/societies">All Societies</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/my-society">My Society</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/exchange">Exchange</Link><Link className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary-container transition-colors py-1" to="/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button aria-label="Notifications" className="p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-headline-md">notifications</span></button><span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-space-sm py-0.5 rounded-full font-label-sm text-label-sm">Person</span><div className="flex items-center"><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDPgf1R8-C9KtO74b0DTwy8-hSJibHRzegzP7HZ2l7U_XyJaXe2XIJV1NvvNf8Yb3YyWBe-t9mtW_W0aaYglDw8zqDhXx2Qn3j9fP6s2nNL4cdjJsbeidTrZ-jbDDNjjjBy-_3Th_O8c8oKoTm_ihFtdU5TTYi8csrr-mD2LddOyEHyHzscf2nQOqnKgG8M790yl9XYy0F8BkDRzJL-g5Ia0Vn3M_hcoSDyK3EJqGaCI4BQTt25MJQJHQ"/></div></div></div></header><main className="w-full pt-16 bg-[#F5F7F6]"><div className="flex flex-col w-full">
<div className="w-full max-w-7xl mx-auto px-6 py-10">

<div className="max-w-2xl mx-auto mb-6 flex items-center justify-between">
<div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md">
<span className="hover:text-primary transition-colors cursor-pointer">Account</span>
<span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
<span className="text-primary font-headline-sm">Resident Profile</span>
</div>
<div className="flex items-center gap-1.5 px-3 py-1 bg-surface-container rounded-full text-on-surface-variant font-label-sm text-label-sm">
<span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
<span>Verified Identity</span>
</div>
</div>

<div className="max-w-2xl mx-auto mb-8 text-left">
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Resident Profile</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-1">Manage your account credentials and contact details.</p>
</div>

<div className="max-w-2xl mx-auto bg-surface-container-lowest rounded-xl shadow-sm p-6 sm:p-8">
<form className="flex flex-col gap-6" id="profile-form">

<div className="flex flex-col sm:flex-row sm:items-center gap-6 pb-6 bg-surface-container-low/40 p-5 rounded-xl">
<div className="relative shrink-0 w-24 h-24 rounded-full overflow-hidden shadow-inner bg-surface-container">
<img alt="Ananya Sharma" className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" id="avatar-preview" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/>
<div className="absolute inset-0 bg-black/10 pointer-events-none"></div>
</div>
<div className="flex flex-col gap-2">
<div className="flex items-center gap-3">
<input accept="image/png, image/jpeg" className="hidden" id="avatar-input" type="file"/>
<button className="inline-flex items-center gap-2 h-10 px-4 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer shadow-sm active:scale-95" type="button">
<span className="material-symbols-outlined text-[18px] text-primary">photo_camera</span>
<span>Change Avatar</span>
</button>
</div>
<p className="font-body-sm text-body-sm text-on-surface-variant">JPG or PNG, max 2MB</p>
</div>
</div>

<div className="flex flex-col gap-5">

<div className="flex flex-col gap-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="full-name">
<span>Full Name</span>
<span className="font-label-sm text-label-sm text-outline">Editable</span>
</label>
<div className="relative">
<input className="w-full h-11 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-lg text-body-lg shadow-sm focus:outline-none focus:bg-surface-bright focus:shadow-md transition-all" id="full-name" name="full-name" placeholder="Enter full name" type="text" value="Ananya Sharma"/>
</div>
</div>

<div className="flex flex-col gap-2">
<label className="font-label-lg text-label-lg text-on-surface flex items-center justify-between" htmlFor="phone-number">
<span>Phone Number</span>
<span className="font-label-sm text-label-sm text-outline">Primary Contact</span>
</label>
<div className="relative">
<input className="w-full h-11 px-4 rounded-lg bg-surface-container-lowest text-on-surface font-body-lg text-body-lg shadow-sm focus:outline-none focus:bg-surface-bright focus:shadow-md transition-all" id="phone-number" name="phone-number" placeholder="+91 00000 00000" type="tel" value="+91 98765 43210"/>
</div>
</div>

<div className="flex flex-col gap-2">
<div className="flex items-center justify-between">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="email-address">Email Address</label>
<span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-outline bg-surface-container px-2 py-0.5 rounded-full">
<span className="material-symbols-outlined text-[13px]">lock</span>
                Read-only
              </span>
</div>
<div className="relative flex items-center">
<input aria-readonly="true" className="w-full h-11 px-4 pr-10 rounded-lg bg-surface-container-low text-on-surface-variant font-body-lg text-body-lg cursor-not-allowed select-all focus:outline-none" id="email-address" name="email-address" readonly="" tabIndex="-1" type="email" value="ananya.sharma@greenvalley.org"/>
<span className="material-symbols-outlined absolute right-3 text-outline text-[20px] pointer-events-none select-none">lock</span>
</div>
</div>
</div>

<div className="pt-6 mt-2 flex flex-col sm:flex-row items-center justify-between gap-4">

<button className="w-full sm:w-auto order-2 sm:order-1 h-10 px-6 rounded-lg font-label-lg text-label-lg text-error bg-error-container/20 hover:bg-error-container/40 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm" id="logout-btn" type="button">
<span className="material-symbols-outlined text-[18px]">logout</span>
<span>Log Out</span>
</button>

<button className="w-full sm:w-auto order-1 sm:order-2 h-10 px-8 rounded-lg font-label-lg text-label-lg text-on-primary bg-primary-container hover:bg-primary active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm" id="save-btn" type="submit">
<span className="material-symbols-outlined text-[18px]">check</span>
<span>Save Changes</span>
</button>
</div>
</form>
</div>
</div>

</div></main><footer className="w-full bg-white border-t border-gray-200 mt-auto"><div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-body-sm text-body-sm"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><div className="flex items-center gap-gutter"><span className="font-label-md text-label-md text-outline">Operational Circular Network</span></div></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
