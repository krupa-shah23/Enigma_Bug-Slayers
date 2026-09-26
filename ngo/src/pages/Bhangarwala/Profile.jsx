import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Profile(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest border-b border-outline-variant"><div className="h-16 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md"><div className="flex items-center gap-space-sm shrink-0"><img alt="Clean minimalist geometric logo for ReWaste featuring a modern circular loop recycling leaf icon with bold typography 'ReWaste' in emerald forest green #2E7D32, vector style, flat design, white background. Design context: - Primary color: #2e7d32 - Font: epilogue - Mode: light - Roundness: rounded-md . The logo should be visually consistent with these brand tokens." className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></div><Navbar variant="Bhangarwala" className="hidden md:flex items-center gap-space-sm"><Link className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/requests">Requests</Link><Link className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/active-job">Active Job<span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-label-sm font-label-sm bg-secondary-container text-on-secondary-container">LIVE</span></Link><Link className="px-space-md py-space-xs rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors" to="/bhangarwala/history">History</Link><Link className="px-space-md py-space-xs rounded-lg transition-colors bg-primary-container text-on-primary font-label-lg" to="/bhangarwala/profile">Profile</Link></Navbar><div className="flex items-center gap-space-md shrink-0"><button aria-label="Notifications" className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors" type="button"><span className="material-symbols-outlined text-[22px]">notifications</span><span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary-container"></span></button><span className="px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant font-semibold">Bhangarwala</span><img alt="Profile" className="w-8 h-8 rounded-full object-cover ring-1 ring-outline-variant" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/></div></div></header><main className="w-full pt-16 flex-1 bg-surface"><div className="flex flex-col w-full">
<div className="max-w-2xl w-full mx-auto py-space-xl px-gutter">

<div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-lg flex flex-col gap-space-lg">

<div className="flex flex-col gap-space-xs">
<h1 className="font-headline-lg text-headline-lg text-on-surface">Bhangarwala Partner Profile</h1>
<p className="font-body-md text-body-md text-on-surface-variant">Manage collector identity, vehicle parameters, and dispatch availability.</p>
</div>

<div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-lg">
<img alt="Ramesh Kumar Profile Photo" className="w-20 h-20 rounded-full object-cover shadow-sm shrink-0" id="avatar-preview" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/>
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm">
<label className="cursor-pointer inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-lg font-label-lg text-label-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors shadow-sm" htmlFor="avatar-input">
<span className="material-symbols-outlined text-[18px]">photo_camera</span>
<span>Change Avatar</span>
</label>
<input accept="image/png, image/jpeg, image/webp" className="hidden" id="avatar-input" type="file"/>
</div>
<span className="font-body-sm text-body-sm text-on-surface-variant">JPG, PNG, or WEBP up to 5MB. Clean frontal headshot recommended.</span>
</div>
</div>

<div className="flex flex-col gap-space-md">

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="full-name">Full Name</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">person</span>
<input className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all" id="full-name" name="fullName" type="text" value="Ramesh Kumar"/>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="phone-number">Phone Number</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">call</span>
<input className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all" id="phone-number" name="phoneNumber" type="tel" value="+91 98112 44321"/>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="vehicle-type">Vehicle Type</label>
<div className="relative">
<span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px]">electric_rickshaw</span>
<input className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all" id="vehicle-type" name="vehicleType" type="text" value="Electric Cargo Trike (Capacity 350 kg, Reg: DL-5S-9912)"/>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="area-note">Area Note</label>
<div className="relative">
<span className="absolute left-3 top-3 material-symbols-outlined text-outline text-[20px]">location_on</span>
<textarea className="w-full pl-10 pr-space-md py-2.5 bg-surface-container-low rounded-lg font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:shadow-sm transition-all resize-none" id="area-note" name="areaNote" rows="3">Sector 54, Golf Course Extension Road &amp; Riverside Hubs (Radius 5 km)</textarea>
</div>
</div>

<div className="flex items-center justify-between p-space-md bg-surface-container rounded-lg">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface">Available for Scrap Dispatches</span>
<div className="flex items-center gap-1.5 mt-0.5">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse" id="status-dot"></span>
<span className="font-body-sm text-body-sm text-primary font-semibold" id="status-indicator-text">Online - Ready for pickups</span>
</div>
</div>
<button aria-checked="true" className="relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out bg-primary" id="status-toggle-btn" role="switch" type="button">
<span className="sr-only">Toggle Dispatch Availability</span>
<span className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-surface-container-lowest shadow-sm transition duration-200 ease-in-out translate-x-6 top-1 left-0.5 relative" id="toggle-knob"></span>
</button>
</div>
</div>

<div className="flex items-center justify-between pt-space-xs">

<button className="h-10 px-space-md inline-flex items-center gap-space-xs rounded-lg font-label-lg text-label-lg text-error bg-error-container/20 hover:bg-error-container/40 transition-colors" id="logout-btn" type="button">
<span className="material-symbols-outlined text-[18px]">logout</span>
<span>Logout</span>
</button>

<button className="h-10 px-space-lg inline-flex items-center gap-space-xs rounded-lg font-label-lg text-label-lg text-on-primary bg-primary-container hover:bg-primary transition-colors shadow-sm" id="save-profile-btn" type="button">
<span className="material-symbols-outlined text-[18px]">check</span>
<span>Save Changes</span>
</button>
</div>
</div>
</div>

</div></main><footer className="w-full bg-surface-container-low border-t border-outline-variant py-space-lg"><div className="max-w-7xl mx-auto px-gutter text-center font-body-sm text-body-sm text-on-surface-variant">© 2025 ReWaste Materials Ledger. All rights reserved. | Operational Circular Network</div></footer><div aria-live="polite">{notice}</div></div></div>;
}
