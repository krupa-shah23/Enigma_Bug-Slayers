import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/index.jsx';

export default function Events(){
  const [notice,setNotice]=useState('');
  const handleSubmit=(event)=>{event.preventDefault();setNotice('Submitted successfully.');};
  return <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between"><div className="min-h-screen" onSubmit={handleSubmit}><header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div className="h-16 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter"><div className="flex items-center gap-space-lg"><Link className="flex items-center gap-space-sm" to="/ngo/dashboard"><img alt="ReWaste Logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1W6N7O6ZgE2Tll6drrzyraadVHbqUPUs8qfNIeNKws4onwuYsxxdedp7BeTkIs0Txon3umt_QP8qOaEmZSI73-IZdcgoiddIyqPPoI3BmnPY5RLnNxVE2-Jq3nOjW7HpKVgbvuMfi79kkCrl4z176MqkLjcsk8ddgs1xFVpTIMFCOv0Zsk5iD1GqxWAiT4V7UoagrTSXG5WqIrbzsQSPHTF-dKjat2b_25Db6lusmuKF9auSZJEzc90UlGt"/><span className="font-headline-sm text-headline-sm text-primary tracking-tight">ReWaste</span></Link></div><Navbar variant="Ngo" className="hidden lg:flex items-center gap-space-xs"><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/dashboard">Dashboard</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/societies">Societies</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/contracts">Contracts</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/collections">Collections</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/events">Events</Link><Link className="px-space-md py-space-sm rounded-lg text-on-surface-variant font-label-lg text-label-lg hover:text-on-surface hover:bg-surface-container transition-colors" to="/ngo/verification">Profile</Link></Navbar><div className="flex items-center gap-space-md"><button className="relative p-space-sm rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" type="button"><span className="material-symbols-outlined text-[20px]">notifications</span><span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-secondary-container"></span></button><div className="flex items-center gap-space-sm pl-space-xs"><img alt="Profile" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1XIkgjCwvtpBzXxmJsFdrIqD2_RlkOCMXhqXRZs9RIuajcPmKGc5TFExGvzrsb5x4KLvrfXrUAs14IBZHmLmBRkVqeWPkdmnPZKpssyA0pzx_lGvis1EODHQd4Ywb0tOmt1X4wOWKnPWWRaqePFMdTm75Ie5fT83SQhkbX48Y7yJZadNAWONrR3ToUQ6rPuGG-T9Jt-ZfOubQRKq0fj1mpiRpa8p7yFhAP2O75hESg7pubaBMMmXdNLCnyY"/><span className="hidden sm:inline-flex items-center px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-secondary font-semibold">NGO Partner</span></div></div></div></header><main className="w-full pt-16 bg-surface flex-1"><div className="flex flex-col w-full">

<div className="fixed bottom-6 right-6 z-50 transform translate-y-24 opacity-0 transition-all duration-300 pointer-events-none flex items-center gap-space-sm px-space-md py-space-sm rounded-xl bg-inverse-surface text-inverse-on-surface shadow-xl" id="statusToast">
<span className="material-symbols-outlined text-primary-fixed text-[20px]" id="toastIcon">check_circle</span>
<span className="font-body-md text-body-md" id="toastMessage">Event updated successfully.</span>
</div>

<div className="w-full max-w-[1440px] mx-auto px-margin py-space-xl">
<div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
<div className="max-w-3xl">
<div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm uppercase tracking-wider mb-space-xs">
<span className="material-symbols-outlined text-[16px]">campaign</span>
<span>Grassroots Community Engagement</span>
</div>
<h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">Society Circular Events &amp; Workshops</h1>
<p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
          Organize grassroots collection drives, community upcycling workshops, and sustainability sessions.
        </p>
</div>

<div className="flex items-center gap-space-sm">
<div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-sm rounded-lg shadow-sm">
<span className="material-symbols-outlined text-primary text-[20px]">calendar_month</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Scheduled</span>
<span className="font-headline-sm text-headline-sm text-on-surface" id="scheduledEventsCounter">3 Drives</span>
</div>
</div>
<div className="flex items-center gap-space-xs bg-surface-container px-space-md py-space-sm rounded-lg shadow-sm">
<span className="material-symbols-outlined text-secondary text-[20px]">group</span>
<div className="flex flex-col">
<span className="font-label-sm text-label-sm text-on-surface-variant">Total RSVPs</span>
<span className="font-headline-sm text-headline-sm text-on-surface">99 Confirmed</span>
</div>
</div>
</div>
</div>

<div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter mt-space-xl items-start">

<section className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm relative overflow-hidden">

<div className="absolute -top-12 -right-12 w-32 h-32 bg-primary-container/10 rounded-full blur-2xl pointer-events-none"></div>
<div className="flex items-center justify-between pb-space-md mb-space-lg">
<div className="flex items-center gap-space-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
<span className="material-symbols-outlined text-[24px]">add_circle</span>
</div>
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Publish New Event</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Target specific residential zones &amp; hubs</p>
</div>
</div>
<span className="font-label-sm text-label-sm px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant">NGO Portal</span>
</div>
<form className="flex flex-col gap-space-md" id="createEventForm">

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="eventTitle">
              Event Title <span className="text-error">*</span>
</label>
<input className="w-full h-10 px-space-md bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all placeholder:text-outline" id="eventTitle" placeholder="e.g. Diwali E-Waste &amp; Appliance Collection Drive" required="" type="text"/>
</div>

<div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="eventType">
                Event Type <span className="text-error">*</span>
</label>
<div className="relative">
<select className="w-full h-10 pl-space-md pr-10 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all appearance-none cursor-pointer" id="eventType" required="">
<option value="drive">Collection Drive</option>
<option value="workshop">Workshop</option>
<option value="green_event">Green Event</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="eventSociety">
                Target Society
              </label>
<div className="relative">
<select className="w-full h-10 pl-space-md pr-10 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all appearance-none cursor-pointer" id="eventSociety">
<option value="all">All Affiliated Societies</option>
<option value="crestview">Crestview Towers</option>
<option value="green_valley">Green Valley Heights</option>
<option value="palms">The Palms Enclave</option>
<option value="maple">Maple Wood Cooperative</option>
</select>
<span className="material-symbols-outlined absolute right-3 top-2.5 text-on-surface-variant pointer-events-none text-[20px]">expand_more</span>
</div>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="eventDateTime">
              Date &amp; Time <span className="text-error">*</span>
</label>
<div className="relative flex items-center">
<input className="w-full h-10 pl-space-md pr-10 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all placeholder:text-outline" id="eventDateTime" placeholder="2025-11-08 10:00 AM" required="" type="text" value="2025-11-20 09:30 AM"/>
<span className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none text-[20px]">schedule</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="eventLocation">
              Staging Bay / Location <span className="text-error">*</span>
</label>
<div className="relative flex items-center">
<input className="w-full h-10 pl-space-md pr-10 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all placeholder:text-outline" id="eventLocation" placeholder="e.g. Community Clubhouse &amp; Staging Bay" required="" type="text"/>
<span className="material-symbols-outlined absolute right-3 text-on-surface-variant pointer-events-none text-[20px]">location_on</span>
</div>
</div>

<div className="flex flex-col gap-space-xs">
<label className="font-label-md text-label-md text-on-surface" htmlFor="eventDescription">
              Description &amp; Instructions
            </label>
<textarea className="w-full p-space-md bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface transition-all resize-none placeholder:text-outline" id="eventDescription" placeholder="Community-wide collection drive for decommissioned electronics and small household appliances. Sorting bins available on site." rows="3"></textarea>
</div>

<div className="pt-space-xs">
<button className="w-full h-10 px-space-md rounded-lg bg-primary-container text-on-primary font-label-lg text-label-lg flex items-center justify-center gap-space-xs hover:bg-primary transition-colors shadow-sm cursor-pointer" type="submit">
<span className="material-symbols-outlined text-[18px]">add</span>
<span>+ Publish Event</span>
</button>
</div>
</form>
</section>

<section className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm">
<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg">
<div>
<h2 className="font-headline-md text-headline-md text-on-surface">Organized Events Roster</h2>
<p className="font-body-sm text-body-sm text-on-surface-variant">Live record of grassroots collection and engagement sessions</p>
</div>
<span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
<span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Synced with Ledger
          </span>
</div>

<div className="w-full overflow-x-auto">
<table className="w-full text-left min-w-[560px]">
<thead>
<tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant">
<th className="py-space-sm px-space-md rounded-l-lg">Title</th>
<th className="py-space-sm px-space-md">Type</th>
<th className="py-space-sm px-space-md">Date</th>
<th className="py-space-sm px-space-md">RSVP Count</th>
<th className="py-space-sm px-space-md rounded-r-lg text-right">Actions</th>
</tr>
</thead>
<tbody className="font-body-md text-body-md text-on-surface" id="eventsTableBody">

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">Diwali E-Waste Clearance Drive</span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">apartment</span>
                      Crestview Towers
                    </span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-primary font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Drive
                  </span>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<span className="font-label-md text-label-md text-on-surface">Nov 02, 2025</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">09:00 AM</span>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">how_to_reg</span>
<span className="font-label-md text-label-md text-on-surface">48 Attending</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="inline-flex items-center gap-space-xs justify-end">
<button className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
                      Edit
                    </button>
<button className="h-8 px-3 rounded-lg bg-surface-container-low hover:bg-error-container hover:text-error text-on-surface-variant font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
                      Cancel
                    </button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">Plastic Grading &amp; Upcycling Masterclass</span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">apartment</span>
                      Green Valley Heights
                    </span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-secondary font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                    Workshop
                  </span>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<span className="font-label-md text-label-md text-on-surface">Nov 09, 2025</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">02:00 PM</span>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">how_to_reg</span>
<span className="font-label-md text-label-md text-on-surface">32 Attending</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="inline-flex items-center gap-space-xs justify-end">
<button className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
                      Edit
                    </button>
<button className="h-8 px-3 rounded-lg bg-surface-container-low hover:bg-error-container hover:text-error text-on-surface-variant font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
                      Cancel
                    </button>
</div>
</td>
</tr>

<tr className="hover:bg-surface-container-low/60 transition-colors group">
<td className="py-space-md px-space-md">
<div className="flex flex-col">
<span className="font-label-lg text-label-lg text-on-surface group-hover:text-primary transition-colors">Compost Distribution Gala</span>
<span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
<span className="material-symbols-outlined text-[14px]">domain</span>
                      All Affiliated Societies
                    </span>
</div>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary-fixed text-on-primary-fixed font-semibold">
<span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    Green Event
                  </span>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<span className="font-label-md text-label-md text-on-surface">Nov 15, 2025</span>
<span className="block font-body-sm text-body-sm text-on-surface-variant">11:00 AM</span>
</td>
<td className="py-space-md px-space-md whitespace-nowrap">
<div className="flex items-center gap-1.5">
<span className="material-symbols-outlined text-[16px] text-secondary">how_to_reg</span>
<span className="font-label-md text-label-md text-on-surface">19 Attending</span>
</div>
</td>
<td className="py-space-md px-space-md text-right whitespace-nowrap">
<div className="inline-flex items-center gap-space-xs justify-end">
<button className="h-8 px-3 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
                      Edit
                    </button>
<button className="h-8 px-3 rounded-lg bg-surface-container-low hover:bg-error-container hover:text-error text-on-surface-variant font-label-sm text-label-sm transition-colors cursor-pointer" type="button">
                      Cancel
                    </button>
</div>
</td>
</tr>
</tbody>
</table>
</div>

<div className="mt-space-lg pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm bg-surface-container-low rounded-lg p-space-md">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-primary text-[20px]">verified</span>
<span className="font-body-sm text-body-sm text-on-surface-variant">
              Automated notifications are dispatched to registered residents upon publication.
            </span>
</div>
<span className="font-label-sm text-label-sm text-outline">Showing 3 of 3 active entries</span>
</div>
</section>
</div>
</div>


</div></main><footer className="w-full bg-surface-container-lowest shadow-[0_-1px_8px_rgba(0,0,0,0.03)] py-space-lg mt-auto"><div className="max-w-[1440px] mx-auto px-margin flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant"><p>© 2025 ReWaste Materials Ledger. All rights reserved.</p><p className="font-label-sm text-label-sm text-outline">Operational Circular Network</p></div></footer><div aria-live="polite">{notice}</div></div></div>;
}
