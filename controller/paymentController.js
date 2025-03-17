
const { ObjectId } = require ('mongodb')
const SSLCommerzPayment = require('sslcommerz-lts')
const store_id = 'test67c884299e457'
const store_passwd = 'test67c884299e457@ssl'
const is_live = false //true for live, false for sandbox
const tran_id = new ObjectId().toString()
//console.log(tran_id)


function paymentController(req,res){
    //console.log(tran_id)  
    //console.log(req.body)

    const data = {
        total_amount: 100,
        currency: 'BDT',
        tran_id: tran_id, // use unique tran_id for each api call
        success_url: 'http://localhost:3030/success',
        fail_url: 'http://localhost:3030/fail',
        cancel_url: 'http://localhost:3030/cancel',
        ipn_url: 'http://localhost:3030/ipn',
        shipping_method: 'Courier',
        product_name: 'Computer.',
        product_category: 'Electronic',
        product_profile: 'general',
        cus_name: 'Customer Name',
        cus_email: 'customer@example.com',
        cus_add1: 'Dhaka',
        cus_add2: 'Dhaka',
        cus_city: 'Dhaka',
        cus_state: 'Dhaka',
        cus_postcode: '1000',
        cus_country: 'Bangladesh',
        cus_phone: '01711111111',
        cus_fax: '01711111111',
        ship_name: 'Customer Name',
        ship_add1: 'Dhaka',
        ship_add2: 'Dhaka',
        ship_city: 'Dhaka',
        ship_state: 'Dhaka',
        ship_postcode: 1000,
        ship_country: 'Bangladesh',
    };
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
    // sslcz.init(data).then(apiResponse => {
        
    //     let GatewayPageURL = apiResponse.GatewayPageURL
    //     //res.redirect(GatewayPageURL)
    //     //console.log('Redirecting to: ', GatewayPageURL)
    //     res.json( {GatewayPageURL});
    // });
    sslcz.init(data).then(apiResponse => {
        let GatewayPageURL = apiResponse.GatewayPageURL;
        res.json({ GatewayPageURL }); // ✅ Send structured JSON
    });
    
      

}


module.exports = paymentController





// const { ObjectId } = require('mongodb');
// const SSLCommerzPayment = require('sslcommerz-lts');

// const store_id = 'test67c884299e457';
// const store_passwd = 'test67c884299e457@ssl';
// const is_live = false; // true for live, false for sandbox

// function paymentController(req, res) {
//     const tran_id = new ObjectId().toString(); // Generate unique transaction ID

//     console.log('Transaction ID:', tran_id);
//     console.log('Request Body:', req.body);

//     const data = {
//         total_amount: 100,
//         currency: 'BDT',
//         tran_id: tran_id,
//         success_url: 'http://localhost:3030/success',
//         fail_url: 'http://localhost:3030/fail',
//         cancel_url: 'http://localhost:3030/cancel',
//         ipn_url: 'http://localhost:3030/ipn',
//         product_name: 'Computer',
//         product_category: 'Electronic',
//         product_profile: 'general',
//         cus_name: req.body.cus_name || 'Customer Name',
//         cus_email: req.body.cus_email || 'customer@example.com',
//         cus_phone: req.body.cus_phone || '01711111111',
//     };

//     const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    
//     sslcz.init(data)
//         .then(apiResponse => {
//             if (!apiResponse || !apiResponse.GatewayPageURL) {
//                 return res.status(500).json({ error: 'Failed to get GatewayPageURL', details: apiResponse });
//             }
//             res.json({ GatewayPageURL: apiResponse.GatewayPageURL });
//         })
//         .catch(error => {
//             console.error('SSLCommerz API Error:', error);
//             res.status(500).json({ error: 'SSLCommerz payment initiation failed', details: error.message });
//         });
// }

// module.exports = paymentController;
