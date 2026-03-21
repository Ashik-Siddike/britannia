const fs = require('fs');

try {
    let html = fs.readFileSync('index.html', 'utf8');

    // 1. Top Bar Fix
    html = html.replace(/<div class="bg-\[[^\]]+\] text-white text-xs py-2 hidden md:block"|<div class="bg-britBlue text-white text-[^"]*"/g, 
        '<div class="bg-[#003473] text-white text-xs py-2 hidden md:block"');

    // 2. Navbar Fixes
    html = html.replace(/<span\s+class="absolute bottom-0 left-0 w-full h-0\.5 [^"]*"><\/span>/g,
        '<span class="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#003473] to-[#E53E3E]"></span>');
    html = html.replace(/<span\s+class="absolute bottom-0 left-0 w-0 h-0\.5 bg-gradient-to-r [^"]*"><\/span>/g,
        '<span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#003473] to-[#E53E3E] group-hover:w-full transition-all duration-300"></span>');

    // 3. Ambient Background Elements logic
    const sections = html.split(/<section/i);
    for (let i = 1; i < sections.length; i++) {
        let text = sections[i];
        let originalText = text;
        
        let prevHTML = sections[i-1];
        let startComment = prevHTML.lastIndexOf('<!--');
        let sectionName = startComment !== -1 ? prevHTML.substring(startComment).toLowerCase() : '';
        
        if(!text.includes('class="absolute inset-0 overflow-hidden pointer-events-none z-0')) {
            let inject = '';
            if(i === 1 || sectionName.includes('hero')) {
                inject += '\\n<div class="absolute top-20 -left-20 w-96 h-96 bg-[#003473]/10 blur-3xl rounded-full"></div>';
                inject += '\\n<div class="absolute bottom-10 -right-20 w-96 h-96 bg-[#E53E3E]/10 blur-3xl rounded-full"></div>';
                inject += '\\n<div class="absolute top-[30%] left-[10%] opacity-30 animate-float">';
                inject += '\\n<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="5" y="5" width="30" height="30" border="2" stroke="#003473" stroke-width="2" transform="rotate(20 20 20)"/></svg></div>';
            } else if (sectionName.includes('about')) {
                inject += '\\n<span class="text-[120px] lg:text-[180px] font-bold text-[#003473]/5 absolute top-10 -left-10 whitespace-nowrap select-none">About Us</span>';
                inject += '\\n<div class="absolute top-10 left-10 flex flex-col gap-2 opacity-30">';
                inject += '\\n<div class="flex gap-2"><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full scale-110"></div><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div></div>';
                inject += '\\n<div class="flex gap-2"><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div></div>';
                inject += '\\n<div class="flex gap-2"><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full scale-110"></div></div></div>';
                inject += '\\n<div class="absolute top-20 right-0 w-96 h-96 bg-[#003473]/10 blur-3xl rounded-full"></div>';
            } else if (sectionName.includes('why study') || sectionName.includes('features')) {
                inject += '\\n<span class="text-[120px] lg:text-[180px] font-bold text-[#003473]/5 absolute top-20 right-0 whitespace-nowrap select-none">SUCCESS</span>';
                inject += '\\n<div class="absolute top-1/4 right-[5%] flex flex-col gap-2 opacity-20">';
                inject += '\\n<div class="flex gap-2"><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div></div>';
                inject += '\\n<div class="flex gap-2"><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#E53E3E] rounded-full"></div><div class="w-1.5 h-1.5 bg-[#003473] rounded-full"></div></div></div>';
            } else if (sectionName.includes('courses')) {
                inject += '\\n<span class="text-[120px] lg:text-[180px] font-bold text-white/5 absolute top-10 left-10 whitespace-nowrap select-none">SUCCESS</span>';
                inject += '\\n<div class="absolute bottom-10 right-10 w-96 h-96 bg-[#E53E3E]/10 blur-3xl rounded-full"></div>';
                inject += '\\n<div class="absolute top-1/4 left-10 opacity-30 animate-float-delayed"><svg width="60" height="60" viewBox="0 0 60 60"><circle cx="30" cy="30" r="28" fill="none" stroke="white" stroke-width="2" stroke-dasharray="4 4" class="opacity-30"/></svg></div>';
            } else if (sectionName.includes('partner')) {
                inject += '\\n<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none text-blue-400/30 text-2xl">';
                inject += '\\n<div class="absolute top-10 left-[10%] animate-float">✨</div>';
                inject += '\\n<div class="absolute bottom-10 left-[30%] animate-float-delayed">⭐</div>';
                inject += '\\n<div class="absolute top-[40%] right-[20%] animate-float">💫</div></div>';
            } else if (sectionName.includes('reviews')) {
                inject += '\\n<span class="text-[120px] lg:text-[180px] font-bold text-[#003473]/5 absolute top-10 right-10 whitespace-nowrap select-none">WINNERS</span>';
                inject += '\\n<div class="absolute bottom-0 right-0 w-96 h-96 bg-[#5EADE9]/10 blur-3xl rounded-full"></div>';
                inject += '\\n<div class="absolute inset-0 z-0 overflow-hidden pointer-events-none text-blue-400/30 text-2xl">';
                inject += '\\n<div class="absolute top-[20%] left-[5%] animate-float">⭐</div>';
                inject += '\\n<div class="absolute bottom-[20%] right-[10%] animate-float-delayed">✨</div></div>';
            } else if (sectionName.includes('teachers')) {
                inject += '\\n<span class="text-[100px] lg:text-[150px] font-bold text-[#003473]/5 absolute top-10 left-0 whitespace-nowrap select-none">TEACHERS</span>';
                inject += '\\n<div class="absolute top-20 left-0 w-96 h-96 bg-[#003473]/10 blur-3xl rounded-full"></div>';
                inject += '\\n<div class="absolute bottom-20 right-0 w-96 h-96 bg-[#E53E3E]/10 blur-3xl rounded-full"></div>';
            } else if (sectionName.includes('social') || sectionName.includes('footer')) {
                inject += '\\n<span class="text-[100px] lg:text-[150px] font-bold text-[#003473]/5 absolute top-10 right-0 whitespace-nowrap select-none">CONNECT</span>';
                inject += '\\n<div class="absolute top-0 left-0 w-96 h-96 bg-[#003473]/10 blur-3xl rounded-full"></div>';
            }

            if(inject !== '') {
                const openBracket = text.indexOf('>');
                let sectionAttr = text.substring(0, openBracket);
                if(!sectionAttr.includes('relative')) {
                    if(sectionAttr.includes('class="')) {
                        sectionAttr = sectionAttr.replace('class="', 'class="relative overflow-hidden ');
                    } else {
                        sectionAttr += ' class="relative overflow-hidden"';
                    }
                }
                const newSectionHeader = sectionAttr + '>';
                const wrapperHTML = '\\n<!-- Background Ambient Injected -->' + '\\n<div class="absolute inset-0 overflow-hidden pointer-events-none z-0">' + inject + '\\n</div>';
                text = newSectionHeader + wrapperHTML + text.substring(openBracket + 1);
            }
        }
        
        text = text.replace(/(<div[^>]*class="[^"]*(?:max-w-\[1400px\]|max-w-7xl|container)[^"]*")/g, (m) => {
            if(!m.includes('relative')) m = m.replace(/class="/, 'class="relative ');
            if(!m.includes('z-10')) m = m.replace(/class="/, 'class="z-10 ');
            return m;
        });

        sections[i] = text;
    }

    html = sections.join('<section');
    
    html = html.replace(/bg-gradient-to-t from-\[#083291\]\/60 via-\[#083291\]\/20 to-transparent/g, 
        'bg-gradient-to-t from-[#083291]/60 to-transparent');
    
    fs.writeFileSync('index.html', html);
    console.log('Script ran successfully!');

} catch(e) {
    console.error(e);
}
