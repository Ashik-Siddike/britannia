const fs = require('fs');
const https = require('https');

async function buildAbout() {
    console.log("Reading index.html...");
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Extract Header & Navbar components
    const headerEndToken = '<!-- 3. Hero Section -->';
    const headerHtml = html.substring(0, html.indexOf(headerEndToken));

    // 2. Extract Footer components
    const footerStartToken = '<!-- 12. Social Media Grid -->';
    let footerHtml = html.substring(html.indexOf(footerStartToken));
    
    // We already have the mobile bottom bar injected just before '<!-- 3. Hero Section -->'
    // So the headerHtml has the exact navbar + mobile structures.

    // 3. Prepare the new About page specific empty block
    const aboutMainContent = `
    <!-- MAIN CONTENT SCALED CLONE -->
    <main class="w-full bg-white relative z-10 pt-0 pb-10">
        <!-- Add About Page Hero Here -->
        <section id="about-hero" class="relative h-[450px] w-full flex items-center justify-center bg-[#001D3D] overflow-hidden">
            <!-- Background Image Placeholder (Fallback) -->
            <img src="assets/images/placeholder.jpg" alt="About Britannia Background" class="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-overlay">
            
            <!-- Ambient Geometry Elements -->
            <div class="absolute inset-0 z-[1] overflow-hidden pointer-events-none opacity-20">
                <svg class="absolute top-1/4 left-1/4 animate-float" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" fill="none" stroke="white" stroke-width="2"/></svg>
                <svg class="absolute bottom-1/4 right-1/4 animate-float-delayed" width="80" height="80" viewBox="0 0 100 100"><polygon points="50,2 98,98 2,98" fill="none" stroke="white" stroke-width="2"/></svg>
                <svg class="absolute top-1/2 right-1/12 animate-float" width="60" height="60" viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" fill="none" stroke="white" stroke-width="2" transform="rotate(20 50 50)"/></svg>
            </div>
            
            <div class="relative z-10 text-center px-4">
                <h1 class="text-white text-5xl md:text-7xl font-bold tracking-tight shadow-sm drop-shadow-lg" data-aos="fade-up">About Britannia</h1>
            </div>

            <!-- Wave divider at the bottom -->
            <div class="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 translate-y-[2px]">
                <svg class="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C89.47,76.53,178.61,42.71,268.41,40.1,286.32,39.5,304.14,45.41,321.39,56.44Z" fill="#ffffff"></path>
                </svg>
            </div>
        </section>

        <!-- 2. Approved By (Trusted By) Section -->
        <!-- Will append properly from target HTML -->
        <section id="approved-by" class="bg-white py-12 px-4 shadow-[inset_0_-1px_0_0_#f3f4f6] relative z-20">
            <div class="max-w-7xl mx-auto flex flex-col items-center">
                <p class="text-[#E53E3E] text-xs font-bold tracking-[0.2em] uppercase mb-8">Approved By</p>
                <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                    <img src="assets/images/education_malaysia.png" alt="Education Malaysia" class="h-10 md:h-14 object-contain">
                    <img src="assets/images/ielts.png" alt="IELTS" class="h-8 md:h-12 object-contain">
                    <img src="assets/images/approved1.png" alt="Ministry" class="h-10 md:h-14 object-contain">
                    <img src="assets/images/approved2.png" alt="ALHE" class="h-8 md:h-12 object-contain">
                    <img src="assets/images/hrdcorp.png" alt="HRDCorp" class="h-10 md:h-14 object-contain">
                </div>
            </div>
        </section>

        <!-- Main Text Layout Container-->
        <section id="about-content" class="py-20 relative bg-[#F8F9FA]">
            <!-- Wait, we will scrape the exact DOM for this next text content -->
        </section>

    </main>
`;

    fs.writeFileSync('about.html', headerHtml + aboutMainContent + footerHtml);
    console.log("Successfully generated about.html shell and Hero chunk.");
    
    // Now let's fetch the target page to get the exact words for the main content
    console.log("Fetching live DOM...");
    https.get('https://britannia.edu.my/en/about-britannia', (resp) => {
        let data = '';
        resp.on('data', (chunk) => { data += chunk; });
        resp.on('end', () => {
             // Save a raw dump so we can analyze it safely
             fs.writeFileSync('.system_generated/about_target_raw.html', data);
             console.log("Saved target raw DOM.");
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

buildAbout();
