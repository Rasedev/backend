function emailThemplate(token){
    return `<img alt=logo src=https://i.ibb.co/ctM9gHh/OREBI.png ><h2 style="font-family:'DM Sans',sans-serif;font-weight:700">OREBI ECOMMERCE</h2><p style="font-family:'DM Sans',sans-serif;font-size:18px;color:#767676">Please Verify Your Email Address. </p><a href="http://localhost:3000/api/v1/authentication/emailverification/${token}"style="font-family:'DM Sans',sans-serif;font-size:20px;color:#767676;text-decoration:none;color:#fff;background:#262626;padding:20px;border:none;margin-top:10px;display:inline-block;border-radius:5px;cursor:pointer;">Click For Verification</a> `
}

module.exports = emailThemplate;