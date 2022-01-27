module.exports = () => {
    const presets = [
        [
            "@babel/env", 
            { 
                targets: { chrome: 97 },
                useBuiltIns: "usage",
                corejs: "^3.20.3"  // <----- specify version of corejs used
            }
        ]
    ];
    
    return { presets };
    };