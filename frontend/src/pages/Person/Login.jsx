import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-[#F5F7F6] font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-center"><div className="min-h-screen" onSubmit={handleSubmit}><main className="w-full"><div className="flex flex-col w-full">
<div className="w-full max-w-[1280px] mx-auto px-4 py-8 lg:py-12">
<div className="w-full bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden flex flex-col lg:flex-row min-h-[720px]">

<div className="w-full lg:w-[40%] bg-gradient-to-br from-primary-container via-primary to-[#1B5E20] p-8 lg:p-12 text-on-primary flex flex-col justify-between relative overflow-hidden">

<div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary-fixed opacity-10 blur-3xl pointer-events-none"></div>
<div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed opacity-15 blur-2xl pointer-events-none"></div>

<div className="relative z-10 flex items-center gap-3">
<div className="w-10 h-10 rounded-lg bg-surface-container-lowest/15 backdrop-blur-md flex items-center justify-center text-on-primary shadow-sm">
<span className="material-symbols-outlined text-[26px]">recycling</span>
</div>
<span className="font-headline-md text-headline-md tracking-tight font-bold text-on-primary">ReWaste</span>
</div>

<div className="relative z-10 my-10 lg:my-0 flex flex-col items-center lg:items-start text-center lg:text-left">
<div className="w-full max-w-[340px] mb-8 relative rounded-xl overflow-hidden shadow-2xl bg-on-primary/10 backdrop-blur-sm">
<img className="w-full h-56 object-cover mix-blend-luminosity hover:mix-blend-normal transition-all duration-700 ease-in-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXS04pxcdhMUguAwr5bcZZY9VCQAKuvAQ0O1CJHmOpAjORBk5Ixp93yCjMAxYbIwCOQ_DLZgEkj5Ktt7BjKyqI_GJ30pjgMNQHJmcnD5jQrsk2gh5DfmUJb5a94h-IpKg9vkIUo49VUVnYtCorAsF9UxwNThMz8QSiwwcbiSC7tJdqyuhAyKYxWQnE1S-cBqdx_H5Kxg6wjv7sflfp_at4TJsZ9U0AKjhd3NXN4ZkzwTuhPBjLR0tfDQ"/>
<div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
<div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-on-primary">
<div className="flex items-center gap-2">
<span className="w-2.5 h-2.5 rounded-full bg-primary-fixed animate-pulse"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary-container">Exchange Network Active</span>
</div>
<span className="font-label-sm text-label-sm opacity-80">v2.4 Live</span>
</div>
</div>
<p className="font-label-md text-label-md uppercase tracking-widest text-primary-fixed font-semibold mb-2">Decentralized Recovery Grid</p>
<h1 className="font-display-lg text-display-lg text-on-primary tracking-tight font-bold leading-tight mb-4">
            Turn waste into worth.
          </h1>
<p className="font-body-md text-body-md text-on-primary/80 max-w-sm">
            Powering verified circular exchanges between communities, grassroots aggregators, and certified industrial upcyclers.
          </p>
</div>

<div className="relative z-10 bg-surface-container-lowest/10 backdrop-blur-md rounded-lg p-4 flex items-center justify-between">
<div className="flex items-center gap-3">
<div className="w-9 h-9 rounded-full bg-primary-fixed/20 flex items-center justify-center text-primary-fixed">
<span className="material-symbols-outlined text-[20px]">format_image_left</span>
</div>
<div>
<p className="font-label-md text-label-md font-semibold text-on-primary">Chain-of-Custody Verified</p>
<p className="font-body-sm text-body-sm text-on-primary/70">Institutional grade batch tracking</p>
</div>
</div>
<span className="font-headline-sm text-headline-sm font-bold text-primary-fixed">100%</span>
</div>
</div>

<div className="w-full lg:w-[60%] bg-surface-container-lowest p-8 sm:p-12 lg:p-16 flex flex-col justify-between">

<div className="flex items-center justify-between pb-6">
<div className="flex items-center gap-2">
<span className="w-2 h-2 rounded-full bg-primary-container"></span>
<span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">Registration Desk</span>
</div>
<button className="font-label-lg text-label-lg text-primary-container hover:text-primary transition-colors focus:outline-none focus:underline" id="auth-toggle-btn" type="button">
            Already have an account? <span className="font-bold underline">Log in</span>
</button>
</div>

<div className="w-full max-w-[480px] mx-auto py-4">

<div className="mb-8">
<p className="font-label-md text-label-md text-on-surface-variant mb-2.5">Select your operating entity</p>
<div aria-label="Account Identity" className="grid grid-cols-3 gap-1 bg-surface-container-low p-1 rounded-xl" role="tablist">
<button aria-selected="true" className="role-tab flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 bg-surface-container-lowest text-primary-container shadow-sm font-semibold" role="tab" type="button">
<span className="material-symbols-outlined text-[18px]">person</span>
<span>Person</span>
</button>
<button aria-selected="false" className="role-tab flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 text-on-surface-variant hover:text-on-surface font-medium" role="tab" type="button">
<span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
<span>NGO</span>
</button>
<button aria-selected="false" className="role-tab flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg font-label-lg text-label-lg transition-all duration-200 text-on-surface-variant hover:text-on-surface font-medium" role="tab" type="button">
<span className="material-symbols-outlined text-[18px]">local_shipping</span>
<span>Bhangarwala</span>
</button>
</div>
</div>

<div className="mb-6">
<h2 className="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight" id="form-heading">Create your account</h2>
<p className="font-body-md text-body-md text-on-surface-variant mt-1" id="form-subheading">Get immediate onboarding for decentralized waste trade.</p>
</div>

<form className="space-y-4" id="signup-form">

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="name">Full Name</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">badge</span>
<input className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="name" name="name" placeholder="e.g. Ramesh Patel" required="" type="text"/>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="email">Work or Personal Email</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">alternate_email</span>
<input className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="email" name="email" placeholder="name@organization.in" required="" type="email"/>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="phone">Phone Number</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">call</span>
<input className="w-full h-11 pl-11 pr-4 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="phone" name="phone" placeholder="+91 98765 43210" required="" type="tel"/>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="password">Create Password</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock</span>
<input className="w-full h-11 pl-11 pr-11 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="password" name="password" placeholder="Minimum 8 characters" required="" type="password"/>
<button aria-label="Toggle password visibility" className="absolute right-3.5 text-outline hover:text-on-surface focus:outline-none" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-lg text-label-lg text-on-surface" htmlFor="confirm-password">Confirm Password</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">lock_reset</span>
<input className="w-full h-11 pl-11 pr-11 bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="confirm-password" name="confirm-password" placeholder="Re-enter your password" required="" type="password"/>
<button aria-label="Toggle password visibility" className="absolute right-3.5 text-outline hover:text-on-surface focus:outline-none" type="button">
<span className="material-symbols-outlined text-[20px]">visibility</span>
</button>
</div>
</div>

<div className="pt-4">
<button className="w-full h-11 bg-primary-container hover:bg-primary active:bg-tertiary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer" id="submit-btn" type="submit">
<span>Create Account</span>
<span className="material-symbols-outlined text-[18px]">arrow_forward</span>
</button>
</div>
</form>
</div>

<div className="flex items-center justify-between pt-6 text-on-surface-variant font-body-sm text-body-sm">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-[16px] text-primary-container">energy_savings_leaf</span>
<span>Zero-emission operational ledger</span>
</div>
<span className="font-label-sm text-label-sm text-outline">SECURE SSL 256-BIT</span>
</div>
</div>
</div>
</div>
</div>
</main><div aria-live="polite">{notice}</div></div></div>;
}
