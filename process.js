const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // Find the section that was pasted
    const startIdx = html.indexOf('<!-- 6 & 7. "Why Study English in Malaysia?"');
    if (startIdx === -1) { 
        console.log('Section not found'); 
        process.exit(1); 
    }
    const endIdx = html.indexOf('</section>', startIdx) + 10;
    let section = html.substring(startIdx, endIdx);

    // 1. Add movement to ambient backgrounds
    const anims = ['animate-float', 'animate-float-delayed', 'animate-pulse', 'animate-tilt'];
    let i = 0;
    // We look for divs or svgs that represent ambient elements.
    section = section.replace(/(<(?:div|svg)[^>]*style="[^"]*position:\s*absolute;[^"]*")/g, (match) => {
        // skip the main wrapper
        if (match.includes('inset:') || match.includes('inset:0')) return match;
        
        // Choose a subtle animation
        const anim = anims[i % anims.length];
        i++;
        
        if (match.includes('class="')) {
            return match.replace(/class="/, 'class="' + anim + ' ');
        } else {
            return match.replace('<div ', '<div class="' + anim + '" ').replace('<svg ', '<svg class="' + anim + '" ');
        }
    });

    // 2. Add hover effect to the 6 grid cards
    // The cards have padding:50px 40px
    section = section.replace(/padding:\s*50px\s+40px;\s*background-color:\s*transparent;\s*cursor:\s*pointer;\s*transition:.*?(?=(?:border|position))/g, (match) => {
        return 'padding: 50px 40px; cursor: pointer; transition: all 0.3s ease; ';
    });

    // Replace the opening div of the card
    section = section.replace(/<div\s+style="padding:\s*50px\s+40px;/g, '<div class="group relative z-10 bg-transparent hover:!bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300" style="padding: 50px 40px;');

    // Add hover effect to the icon
    section = section.replace(/<div\s+style="width:70px;height:70px;/g, '<div class="group-hover:scale-110 transition-transform duration-300" style="width:70px;height:70px;');

    // Add hover effect to the title
    section = section.replace(/<h3\s+style="color:#1C2539;[^>]*>/g, (match) => {
        if(!match.includes('class=')) {
            return match.replace('<h3 ', '<h3 class="group-hover:text-[#DF0A0A] transition-colors duration-300" ');
        }
        return match;
    });

    html = html.substring(0, startIdx) + section + html.substring(endIdx);
    fs.writeFileSync('index.html', html);
    console.log('Processed section. Modifications applied successfully.');
} catch(e) {
    console.log(e);
}
