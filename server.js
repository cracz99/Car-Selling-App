const express=require('express');
const app=express();
const port=2000
const Razorpay=require('razorpay');
const cors=require('cors')
const shortid=require('shortid')
const corsop={
    origin:'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200
}
app.use(cors(corsop))

var instance = new Razorpay({
    key_id: 'rzp_test_GsENwbkeZCaN7L',
    key_secret: '91PQzBVmLwm1VFqEejCHZEgI',
  });       

app.use((req,res,next)=>{
    console.log(req.url,req.method);
    next();
})

app.use(express.json()); 

// app.post('/itemdata',(req,res)=>{
//         item=req.body;
//         console.log(item)
        
//         res.send('item data sent to server!')
// })



    app.post('/razorpay',async(req,res)=>{
            
        // res.send(req.body)
        const options={
            
            amount:parseInt(req.body.item.price)*100
            ,currency:'INR',
            receipt:shortid.generate()
            
    }
    try{
        const resp=await instance.orders.create(options)
        console.log(resp)
        res.json({
            id:resp.id,
            currency:resp.currency,
            amount:parseInt(resp.amount)

        })
    }   
    catch(Er)
    {
        console.log(Er)
    }
    
     
    })





app.listen(port,()=>{
    console.log('server is running on :',port);

})