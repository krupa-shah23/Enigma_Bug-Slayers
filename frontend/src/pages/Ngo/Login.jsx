import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex items-center justify-center"><div className="min-h-screen" onSubmit={handleSubmit}><main className="w-full min-h-screen flex items-center justify-center bg-surface"><div className="flex flex-col w-full">
<div className="w-full max-w-7xl mx-auto my-auto p-4 sm:p-6 lg:p-8">
<div className="flex flex-col lg:flex-row w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest">

<div className="lg:w-2/5 relative flex flex-col justify-between p-8 sm:p-12 text-on-primary overflow-hidden bg-gradient-to-br from-primary via-primary-container to-tertiary">

<div className="absolute -top-24 -left-24 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="relative z-10 flex flex-col gap-6">
<div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md">
<span className="material-symbols-outlined text-primary-fixed text-headline-sm" style={{fontVariationSettings: "'FILL' 1"}}>recycling</span>
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
<span className="material-symbols-outlined text-primary-fixed" style={{fontVariationSettings: "'FILL' 1"}}>verified</span>
</div>
<div className="flex items-baseline gap-3">
<span className="font-display-lg text-display-lg text-on-primary">94.8%</span>
<span className="font-label-md text-label-md text-primary-fixed">+12.4% MoM</span>
</div>
<p className="font-body-sm text-body-sm text-on-primary-container">
              Average recovery purity verified across 4,200+ grassroots collection societies.
            </p>
<div className="w-full bg-surface-container-lowest/20 h-1.5 rounded-full overflow-hidden">
<div className="bg-primary-fixed h-full rounded-full w-[94.8%]"></div>
</div>
</div>
</div>

<div className="relative z-10 flex items-center gap-2 text-on-primary-container font-label-sm text-label-sm">
<span className="material-symbols-outlined text-headline-sm">hub</span>
<span>Decentralized Material Verification Network</span>
</div>
</div>

<div className="lg:w-3/5 p-8 sm:p-12 lg:p-14 bg-surface-container-lowest flex flex-col justify-center">
<div className="max-w-xl w-full mx-auto flex flex-col">

<div className="flex p-1 bg-surface-container rounded-lg mb-8">
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface text-center" type="button">
              Person
            </button>
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md bg-surface-container-lowest text-primary shadow-sm text-center font-bold" type="button">
              NGO
            </button>
<button className="flex-1 py-2 rounded-lg font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface text-center" type="button">
              Bhangarwala
            </button>
</div>

<div className="flex flex-col gap-1 mb-6">
<h2 className="font-headline-lg text-headline-lg text-on-surface" id="authHeading">
              Register NGO Organization
            </h2>
<p className="font-body-md text-body-md text-on-surface-variant" id="authSubheading">
              Establish institutional governance for local circular supply streams.
            </p>
</div>

<form className="flex flex-col gap-4" id="authForm">

<div className="flex flex-col gap-4" id="signupFields">
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface" htmlFor="orgName">Organization Name</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">corporate_fare</span>
<input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="orgName" placeholder="EcoAction India Foundation" type="text"/>
</div>
</div>
<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface" htmlFor="repName">Full Name</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">badge</span>
<input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="repName" placeholder="Rajesh Singhania" type="text"/>
</div>
</div>
</div>

<div className="flex flex-col gap-1.5">
<label className="font-label-md text-label-md text-on-surface" htmlFor="authEmail">Work or Personal Email</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">mail</span>
<input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="authEmail" placeholder="contact@ecoaction.org" type="email"/>
</div>
</div>

<div className="flex flex-col gap-1.5" id="phoneField">
<label className="font-label-md text-label-md text-on-surface" htmlFor="phoneNum">Phone Number</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">call</span>
<input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="phoneNum" placeholder="+91 98112 04821" type="tel"/>
</div>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="passwordGrid">
<div className="flex flex-col gap-1.5 col-span-1" id="mainPasswordContainer">
<label className="font-label-md text-label-md text-on-surface" htmlFor="authPassword">Create Password</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">lock</span>
<input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="authPassword" placeholder="••••••••" type="password"/>
</div>
</div>
<div className="flex flex-col gap-1.5 col-span-1" id="confirmPasswordContainer">
<label className="font-label-md text-label-md text-on-surface" htmlFor="confirmPassword">Confirm Password</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-headline-sm">lock_reset</span>
<input className="w-full bg-surface-container-low text-on-surface font-body-md text-body-md rounded-lg pl-10 pr-4 py-2.5 outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all placeholder:text-outline" id="confirmPassword" placeholder="••••••••" type="password"/>
</div>
</div>
</div>

<button className="mt-4 w-full h-11 bg-primary text-on-primary font-label-lg text-label-lg rounded-lg shadow-sm hover:bg-primary-container active:scale-[0.99] transition-all flex items-center justify-center gap-2" id="submitBtn" type="submit">
<span>Create NGO Partner Account</span>
<span className="material-symbols-outlined text-headline-sm">arrow_forward</span>
</button>
</form>

<div className="mt-6 flex justify-center text-center">
<button className="font-label-md text-label-md text-primary hover:underline" id="toggleAuthMode" type="button">
              Already have an account? Log in
            </button>
</div>

<div className="mt-10 pt-6 flex flex-wrap items-center justify-between gap-4 bg-surface-container-low/50 px-4 py-3 rounded-lg">
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-headline-sm text-primary">eco</span>
<span>Zero-emission operational ledger</span>
</div>
<div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
<span className="material-symbols-outlined text-headline-sm text-primary">shield</span>
<span>SECURE SSL 256-BIT</span>
</div>
</div>
</div>
</div>
</div>
</div>

</div></main><div aria-live="polite">{notice}</div></div></div>;
}
