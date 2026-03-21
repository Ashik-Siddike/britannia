const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // Find "How to Apply" heading instead of an exact id since the id might be missing or different
    let headingPattern = '>How to Apply<';
    let headingIndex = html.indexOf(headingPattern);
    
    if (headingIndex !== -1) {
        // Find the start of the section backwards
        let sectionStart = html.lastIndexOf('<section', headingIndex);
        let sectionEnd = html.indexOf('</section>', headingIndex) + 10;
        
        let sectionHTML = html.substring(sectionStart, sectionEnd);
        
        // Find the ambient wrapper
        let wrapperPattern = '<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">';
        let wrapperIndex = sectionHTML.indexOf(wrapperPattern);
        
        if (wrapperIndex !== -1) {
            let insertPos = wrapperIndex + wrapperPattern.length;
            
            // New fancy floating ambient elements specifically tailored for How to Apply
            let newElements = `
                <!-- Extra Ambient Shapes injected by script -->
                
                <!-- Glowing corner blobs specific to this section -->
                <div class="absolute top-[10%] right-[5%] w-80 h-80 bg-gradient-to-tr from-blue-500/10 to-transparent rounded-full blur-[80px] animate-pulse"></div>
                <div class="absolute bottom-[20%] left-[5%] w-96 h-96 bg-gradient-to-bl from-red-500/10 to-transparent rounded-full blur-[80px] animate-pulse pointer-events-none" style="animation-delay: 2s;"></div>
                
                <!-- Floating Line Geometric Graphics -->
                <div class="absolute top-[25%] left-[10%] opacity-20 animate-float" style="animation-duration: 15s;">
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <polygon points="30,5 55,55 5,55" fill="none" stroke="#E53E3E" stroke-width="2" stroke-dasharray="8 8" className="opacity-40" />
                    </svg>
                </div>
                
                <div class="absolute bottom-[30%] right-[15%] opacity-20 animate-float-delayed" style="animation-duration: 20s; animation-delay: 4s;">
                    <svg width="90" height="90" viewBox="0 0 90 90">
                        <circle cx="45" cy="45" r="35" fill="none" stroke="#003473" stroke-width="2" stroke-dasharray="10 10" />
                        <circle cx="45" cy="45" r="20" fill="none" stroke="#E53E3E" stroke-width="1" opacity="0.6"/>
                    </svg>
                </div>
                
                <div class="absolute top-[50%] left-[45%] opacity-[0.15] animate-float" style="animation-duration: 25s; animation-delay: 1s;">
                    <svg width="40" height="40" viewBox="0 0 40 40">
                        <rect x="5" y="5" width="30" height="30" fill="none" stroke="#003473" stroke-width="2" transform="rotate(22 20 20)"/>
                    </svg>
                </div>
                
                <!-- Tiny floating dots -->
                <div class="absolute top-[15%] left-[8%] w-2 h-2 bg-blue-500 rounded-full opacity-30 animate-pulse"></div>
                <div class="absolute top-[85%] right-[20%] w-3 h-3 bg-red-500 rounded-full opacity-30 animate-pulse" style="animation-delay: 1s;"></div>
                <div class="absolute top-[35%] right-[10%] w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse" style="animation-delay: 2s;"></div>
                <div class="absolute bottom-[15%] left-[35%] w-2.5 h-2.5 bg-red-400 rounded-full opacity-30 animate-pulse" style="animation-delay: 1.5s;"></div>
                <div class="absolute top-[60%] right-[5%] w-1.5 h-1.5 bg-blue-500 rounded-full opacity-30 animate-pulse" style="animation-delay: 0.5s;"></div>
            `;
            
            sectionHTML = sectionHTML.slice(0, insertPos) + '\\n' + newElements + '\\n' + sectionHTML.slice(insertPos);
            html = html.substring(0, sectionStart) + sectionHTML + html.substring(sectionEnd);
            
            fs.writeFileSync('index.html', html);
            console.log('Added more premium ambient elements to "How to Apply" section.');
        } else {
            console.log('Ambient wrapper not found in section');
        }
    } else {
        console.log('How to Apply section not found');
    }
} catch (e) {
    console.error(e);
}
