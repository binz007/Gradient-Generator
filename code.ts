figma.showUI(__html__);

// Function to generate a random grainy color gradient
function generateRandomGrainyGradient(numColors: number, color1: string, color2: string) {
    const gradientStops = [];

    for (let i = 0; i < numColors; i++) {
        const ratio = i / (numColors - 1);
        const r = Math.floor((1 - ratio) * parseInt(color1.slice(1, 3), 16) + ratio * parseInt(color2.slice(1, 3), 16));
        const g = Math.floor((1 - ratio) * parseInt(color1.slice(3, 5), 16) + ratio * parseInt(color2.slice(3, 5), 16));
        const b = Math.floor((1 - ratio) * parseInt(color1.slice(5, 7), 16) + ratio * parseInt(color2.slice(5, 7), 16));
        const hexColor = "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

        gradientStops.push({
            position: ratio,
            color: { r: r / 255, g: g / 255, b: b / 255, a: 1 },
        });
    }

    return gradientStops;
}

figma.ui.onmessage = (message) => {
    if (message.type === 'generate') {
        const { numColors, color1, color2 } = message;
        const gradientStops = generateRandomGrainyGradient(numColors, color1, color2);
        // Send the generated gradient stops back to Figma
        figma.ui.postMessage({ type: 'gradient', gradientStops });
    }
};
