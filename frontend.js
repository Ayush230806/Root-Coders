const pages = {
    // PAGE 1: COMMAND CENTER [Source 13, 15]
    dashboard: `
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p class="text-slate-500 text-sm font-medium mb-1">Active Fleet [cite: 16]</p>
                <h3 class="text-3xl font-bold">14 <span class="text-xs text-green-500 font-normal">On Trip</span></h3>
            </div>
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p class="text-slate-500 text-sm font-medium mb-1">Maintenance Alerts [cite: 17]</p>
                <h3 class="text-3xl font-bold text-red-500">3 <span class="text-xs text-slate-400 font-normal">In Shop</span></h3>
            </div>
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p class="text-slate-500 text-sm font-medium mb-1">Utilization Rate [cite: 18]</p>
                <h3 class="text-3xl font-bold">82%</h3>
            </div>
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                <p class="text-slate-500 text-sm font-medium mb-1">Pending Cargo [cite: 19]</p>
                <h3 class="text-3xl font-bold">9</h3>
            </div>
        </div>
        <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
            <h4 class="text-lg font-bold mb-6">Recent Fleet Activity</h4>
            <canvas id="fleetChart" height="100"></canvas>
        </div>
    `,

    // PAGE 2: VEHICLE REGISTRY [Source 21, 23]
    registry: `
        <div class="flex justify-between items-center mb-6">
            <h3 class="text-xl font-bold">Asset Inventory</h3>
            <button class="bg-blue-600 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30">+ Add Vehicle [cite: 48]</button>
        </div>
        <div class="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <table class="w-full text-left">
                <thead class="bg-slate-50 border-b border-slate-100">
                    <tr>
                        <th class="p-5 text-xs font-bold text-slate-500 uppercase">Vehicle Name [cite: 23]</th>
                        <th class="p-5 text-xs font-bold text-slate-500 uppercase">License Plate [cite: 23]</th>
                        <th class="p-5 text-xs font-bold text-slate-500 uppercase">Max Load [cite: 23]</th>
                        <th class="p-5 text-xs font-bold text-slate-500 uppercase">Status [cite: 48]</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-50">
                    <tr>
                        <td class="p-5 font-semibold text-slate-700">Van-05</td>
                        <td class="p-5">GJ-05-AB-1234</td>
                        <td class="p-5 text-slate-500">500kg [cite: 48]</td>
                        <td class="p-5"><span class="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-bold">Available</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    // PAGE 3: TRIP DISPATCHER [Source 25, 27, 28]
    dispatcher: `
        <div class="max-w-2xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100">
            <h3 class="text-2xl font-bold mb-2">Create New Trip [cite: 27]</h3>
            <p class="text-slate-500 mb-8">System validates cargo weight against max capacity. </p>
            <form class="space-y-6">
                <div class="grid grid-cols-2 gap-6">
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Vehicle ID</label>
                        <select class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition">
                            <option>Van-05 (Available)</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Driver</label>
                        <select class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition">
                            <option>Alex (Valid License)</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-400 uppercase mb-2">Cargo Load (kg)</label>
                    <input type="number" placeholder="e.g. 450" class="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-blue-500 transition">
                </div>
                <button type="button" class="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-600 transition duration-300">
                    Dispatch Trip [cite: 29]
                </button>
            </form>
        </div>
    `,

    // PAGE 4: ANALYTICS [Source 42, 45]
    analytics: `
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h4 class="text-lg font-bold mb-4">Vehicle ROI Analysis [cite: 45]</h4>
                <div class="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl">
                    <p class="text-slate-400">ROI Chart Visualization [cite: 43]</p>
                </div>
            </div>
            <div class="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h4 class="text-lg font-bold mb-4">Operational Metrics [cite: 42]</h4>
                <ul class="space-y-6">
                    <li class="flex justify-between items-center">
                        <span class="text-slate-500">Fuel Efficiency [cite: 44]</span>
                        <span class="font-bold">12.5 km/L</span>
                    </li>
                    <li class="flex justify-between items-center">
                        <span class="text-slate-500">Total Operational Cost [cite: 36]</span>
                        <span class="font-bold text-blue-600">₹45,200</span>
                    </li>
                </ul>
                <button class="mt-8 w-full bg-slate-100 text-slate-700 py-3 rounded-xl font-bold hover:bg-slate-200 transition">
                    <i class="fas fa-file-pdf mr-2"></i> Export Monthly Health Audit [cite: 46]
                </button>
            </div>
        </div>
    `
};

function showPage(pageId) {
    const content = document.getElementById('content');
    const title = document.getElementById('page-title');
    
    content.innerHTML = pages[pageId];
    
    // Update Title [Source 9]
    title.innerText = pageId.charAt(0).toUpperCase() + pageId.slice(1).replace('dashboard', 'Command Center');

    // Update Nav Active State
    document.querySelectorAll('.nav-link').forEach(btn => btn.classList.remove('active-nav'));
    event?.target.closest('button').classList.add('active-nav');

    // Initialize Chart if on Dashboard [Source 13, 15]
    if (pageId === 'dashboard') initChart();
}

function initChart() {
    const ctx = document.getElementById('fleetChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
            datasets: [{
                label: 'Active Trips [cite: 16]',
                data: [5, 12, 19, 14, 16, 9],
                borderColor: '#2563eb',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(37, 99, 235, 0.05)'
            }]
        },
        options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
    });
}

// Load default page
window.onload = () => showPage('dashboard');