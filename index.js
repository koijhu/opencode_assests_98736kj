const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('*', (req, res) => {
    const baseUrl = "https://meowcare.art";
    
    // req.url contains everything after the domain
    let path = req.url;

    // 1. Clean double slashes (except the one in http://)
    // We use a placeholder to protect the protocol
    let cleanPath = path.replace(/:\/\//g, "___PROTECT___");
    cleanPath = cleanPath.replace(/\/\//g, "/");
    cleanPath = cleanPath.replace(/___PROTECT___/g, "://");

    // 2. Construct final URL
    const finalUrl = baseUrl.replace(/\/$/, "") + cleanPath;

    // 3. Perform a TRUE 302 Redirect
    console.log(`Redirecting to: ${finalUrl}`);
    res.redirect(302, finalUrl);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});