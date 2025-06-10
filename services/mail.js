import  nodemailer  from 'nodemailer';
import dotenv from 'dotenv'

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth :  {
        user : 'tejasshinde8022@gmail.com',
        pass : 'plce xxci lzlu wzuy'
        // user : process.env.EMAIL_USER,
        // pass : process.env.EMAIL_PASS
    }
});

export const sendMail = async (to,otp) => {
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to : to,
        subject : "Login Message",
        text : `your OTP is ${otp} \n do not share with anyone`
    }

    try {
        await transporter.sendMail(mailOptions);
        console.log('mail sent successfully');
    }
    catch(e) {
        console.log("error ",e);
    }
}

