const MODEL_EMISSIONS = {
    "gpt-4o": 2.68,
    "gpt-3.5-turbo": 0.274,
    "gpt-4": 34.1,
    "gpt-4-turbo": 8.8,
    "gpt-4o-mini": 0.159,
    "o1": 2.68,
    "o1-mini": 0.159,
    "auto": 8.8,
    "default": 0
};

/**
 * Calculates carbon footprint based on model usage
 */
function calculateCarbonFootprint(modelCounts) {
    let totalFootprint = 0;
    const detailedEmissions = {};
    
    for (const model in modelCounts) {
        const count = modelCounts[model];
        const emissionFactor = MODEL_EMISSIONS[model] || MODEL_EMISSIONS['default'];
        const modelEmission = count * emissionFactor;
        
        detailedEmissions[model] = {
            count: count,
            emissionPerUse: emissionFactor,
            totalEmission: modelEmission
        };
        
        totalFootprint += modelEmission;
    }
    
    return {
        totalFootprint: totalFootprint,
        detailedEmissions: detailedEmissions
    };
}

/**
 * Displays the carbon footprint results
 */
function displayCarbonFootprint(result) {
    const carbonResult = document.getElementById('carbonResult');
    const resultDiv = document.getElementById('result');
    
    let html = `<div class="result-summary">
        <p class="total-carbon"><i class="fas fa-globe-americas"></i> Empreinte Carbone Totale : <strong> ${(result.totalFootprint / 1000).toFixed(3)} Kg CO2 </strong></p>
    
        <!-- Add comparative examples -->
        <h3 class="equivalence-title"></i> Cela équivaut à :</h3>
        <ul class="equivalence-list">
            <li><i class="fas fa-car"></i> Faire environ <strong> ${(result.totalFootprint / 130).toFixed(0)} </strong> Kilomètres dans une voiture essence moyenne (130g/Km) </li>
            <li><i class="fas fa-mobile-alt"></i> Charger votre smartphone <strong> ${(result.totalFootprint / 0.25).toFixed(0)}</strong> fois (0,25g/recharge)</li>
            <li><i class="fas fa-ice-cream"></i> Manger <strong> ${(result.totalFootprint / 170).toFixed(0)}</strong> McFlurry (0.17 kg/McFlurry)</li>
            <li><i class="fas fa-hamburger"></i> Manger <strong> ${(result.totalFootprint / 2350).toFixed(0)}</strong> Big Mac (2,35 kg/Big Mac)</li>
        </ul>
    </div>`;
    
    html += `<div class="model-breakdown">
        <h3 class="breakdown-title"></i> Détail par Modèle :</h3>
        <ul class="model-list">`;
    
    for (const model in result.detailedEmissions) {
        const data = result.detailedEmissions[model];
        html += `<li><strong> ${model} </strong> : ${data.count} utilisations × ${data.emissionPerUse.toFixed(2)} g CO2 = ${(data.totalEmission / 1000).toFixed(6)} kg CO2</li>`;
    }
    
    html += `</ul>
    </div>`;
    
    html += `<div class="warning">
        <h3><i class="fas fa-info-circle"></i> Important :</h3>
        <p>Ces données sont des estimations basées sur des valeurs moyennes d'émissions. Les émissions réelles peuvent varier.</p>
    </div>`;
    
    carbonResult.innerHTML = html;
    resultDiv.classList.remove('hidden');
}