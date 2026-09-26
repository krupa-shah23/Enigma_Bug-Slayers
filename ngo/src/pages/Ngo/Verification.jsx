import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Verification(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm transition-colors bg-primary-container text-on-primary-container font-semibold rounded-lg" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="max-w-[1440px] mx-auto px-margin py-space-lg"><div className="flex flex-col w-full">
<div className="max-w-[1080px] w-full mx-auto space-y-space-xl">

<div className="space-y-space-xs">
<div className="flex items-center gap-space-sm text-primary">
<span className="material-symbols-outlined text-[20px]">verified_user</span>
<span className="font-label-md text-label-md uppercase tracking-wider text-primary">Compliance Clearance Node</span>
</div>
<h1 className="font-display-lg text-display-lg text-on-surface tracking-tight">NGO Profile &amp; Institutional Verification</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl">Submit statutory compliance documents for zero-landfill procurement authority.</p>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">

<section className="lg:col-span-7 bg-surface-container-lowest p-space-lg rounded-xl shadow-md space-y-space-lg">
<div className="flex flex-wrap items-center justify-between gap-space-sm">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Organization Statutory Verification</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Zero-landfill regulatory documentation &amp; credentialing</p>
</div>

<div className="inline-flex items-center gap-1.5 px-space-md py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm transition-all duration-300" id="verification-status">
<span className="w-2 h-2 rounded-full bg-secondary"></span>
<span id="status-text">Pending</span>
</div>
</div>
<div className="space-y-space-md">

<div className="space-y-space-xs">
<label className="block font-label-lg text-label-lg text-on-surface" htmlFor="org-name">Organization Name</label>
<div className="relative">
<input className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-colors" id="org-name" placeholder="Enter legal entity name" type="text" value="EcoAction India Foundation"/>
<span className="material-symbols-outlined absolute right-space-md top-3 text-[18px] text-outline">apartment</span>
</div>
</div>

<div className="space-y-space-xs">
<label className="block font-label-lg text-label-lg text-on-surface">Institutional Registration / 80G / 12A Certificate</label>
<div className="p-space-lg rounded-xl bg-surface-container-low text-center cursor-pointer hover:bg-surface-container transition-colors flex flex-col items-center justify-center space-y-space-sm group" id="dropzone">
<div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center text-primary group-hover:scale-105 transition-transform">
<span className="material-symbols-outlined text-[28px]">upload_file</span>
</div>
<div className="space-y-1">
<p className="font-label-lg text-label-lg text-on-surface">Drag &amp; drop NGO Registration / Tax Exemption PDF or Browse files (Max 10MB)</p>
<p className="font-body-sm text-body-sm text-outline">Supported format: Encrypted or standard PDF with stamp certification</p>
</div>
</div>

<div className="mt-space-sm p-space-md rounded-lg bg-surface-container flex items-center justify-between shadow-sm">
<div className="flex items-center gap-space-sm min-w-0">
<div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
<span className="material-symbols-outlined text-[20px]">picture_as_pdf</span>
</div>
<div className="min-w-0">
<p className="font-label-md text-label-md text-on-surface truncate">ecoaction_registration_cert_2024.pdf</p>
<p className="font-body-sm text-body-sm text-outline-variant font-medium">2.4 MB • Signed 80G / 12A Verified</p>
</div>
</div>
<div className="flex items-center gap-space-xs shrink-0">
<button className="p-space-xs text-outline hover:text-primary transition-colors" title="View PDF" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
<button className="p-space-xs text-outline hover:text-error transition-colors" title="Remove PDF" type="button">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
</div>
</div>
</div>

<div className="pt-space-sm flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md">
<button className="flex-1 h-11 px-space-lg rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-tertiary-container shadow-sm flex items-center justify-center gap-space-sm transition-all" type="button">
<span className="material-symbols-outlined text-[20px]">send</span>
<span>Submit Verification Documents</span>
</button>
<button className="h-11 px-space-md rounded-lg bg-secondary-fixed text-on-secondary-fixed font-label-lg text-label-lg hover:bg-secondary-fixed-dim transition-colors flex items-center justify-center gap-space-xs" id="simulate-approval-btn" type="button">
<span className="material-symbols-outlined text-[18px]">verified</span>
<span>Simulate Approval</span>
</button>
</div>
</section>

<section className="lg:col-span-5 bg-surface-container-lowest p-space-lg rounded-xl shadow-md space-y-space-lg">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">NGO Lead Profile</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">Primary account authority &amp; communication channel</p>
</div>

<div className="flex flex-col items-center justify-center p-space-lg rounded-xl bg-surface-container-low text-center space-y-space-md">
<div className="relative group">
<div className="w-28 h-28 rounded-full overflow-hidden shadow-md">
<img alt="NGO Profile Avatar" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/>
</div>
<div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center shadow">
<span className="material-symbols-outlined text-[14px]">shield</span>
</div>
</div>
<button className="h-9 px-space-md rounded-lg bg-surface-container-highest text-on-surface font-label-md text-label-md hover:bg-surface-container transition-colors flex items-center gap-space-xs" type="button">
<span className="material-symbols-outlined text-[16px]">photo_camera</span>
<span>Change Logo / Avatar</span>
</button>
</div>

<div className="space-y-space-xs">
<label className="block font-label-lg text-label-lg text-on-surface" htmlFor="lead-phone">Registered Contact Phone</label>
<div className="relative">
<input className="w-full h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest shadow-sm transition-colors" id="lead-phone" placeholder="+91 XXXXX XXXXX" type="text" value="+91 98112 04821"/>
<span className="material-symbols-outlined absolute right-space-md top-3 text-[18px] text-outline">call</span>
</div>
</div>

<div className="pt-space-md">
<button className="w-full h-11 px-space-lg rounded-lg bg-surface-container-low text-error hover:bg-error-container hover:text-on-error-container font-label-lg text-label-lg transition-colors flex items-center justify-center gap-space-sm" type="button">
<span className="material-symbols-outlined text-[20px]">logout</span>
<span>Logout</span>
</button>
</div>
</section>
</div>
</div>
</div>
</div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
