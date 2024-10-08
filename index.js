const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const emailExistence = require('email-existence');
const path = require('path');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
    res.send('Mailing from Us mexico');
});

let Name = '';
let Email = '';
let Message = '';
let Source= '';

app.post('/mails', async (req, res) => {
    Name = req.body.name;
    Email = req.body.email;
    Message = req.body.message;
    Source= req.body.source
    console.log(Name, Email, Message);

    // create nodemailer transporter object
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    try {
        // send email using nodemailer
        const emailRes = await transporter.sendMail({
            from: { name: Name, address: Email },
            to: process.env.EMAIL,
            replyTo: Email,
            subject: Source,
            html: `
                <p>${Message}</p>
                <h4>Message From: ${Name}</h4>
            `,
        });
        console.log('message sent');
        res.status(200).json({ message: 'Received the message and sent email!' }); // added a response message
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to send email');
    }
});



//Verification of Email
let email='';
app.post('/sendmail', async (req, res) => {
    email = req.body; // get the email from the request body
     console.log(email);
    // create nodemailer transporter object
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
        },
    });

    try {
        // send email using nodemailer
        const emailRes = await transporter.sendMail({
            from: { name: "InnovateZone", address: process.env.EMAIL },
            to: email.email,
            replyTo: process.env.EMAIL,
            subject: "Approval",
            html: `
            <p>Your account is Approved you can login now using this link</p>
            <p>https://innovate-zone.vercel.app/login</p>
            <h4>Message From: InnovateZone</h4>
            `,
        });
        console.log('message sent');
        res.status(200).json({ message: 'Received the message and sent email!' }); // added a response message
    } catch (error) {
        console.log(error);
        res.status(500).send('Failed to send email');
    }
});



//Blogging website
app.post("/api/blog/verify", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

 
    // Create the verification link with the token
    const verificationLink = `https://gitaujustus.vercel.app/login?token=axpbaogicex-pbvagqriogiceh`;
    try {
      // create nodemailer transporter object
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      // send email using nodemailer
      const emailRes = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Account Verification',
        html: `
          <p>Hello ${name},</p>
          <p>Thank you for registering on our website. Please click on the following link to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>
          <p>If you didn't register on our website, please ignore this email.</p>
        `,
      });
      console.log('Verification email sent');
      return res.status(200).json({ message: "Sign up successful. Verification email sent." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
});


//centri closet
app.post("/api/verify", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const token = req.body.verification;


    // Create the verification link with the token
    const verificationLink = `https://centri-closet.vercel.app/auth/account/verify/${token}`;
    try {
      // create nodemailer transporter object
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      // send email using nodemailer
      const emailRes = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Account Verification',
        html: `
          <p>Hello ${name},</p>
          <p>Thank you for registering on our website. Please click on the following link to verify your email:</p>
          <a href="${verificationLink}">${verificationLink}</a>
          <p>If you didn't register on our website, please ignore this email.</p>
        `,
      });
      console.log('Verification email sent');
      return res.status(200).json({ message: "Sign up successful. Verification email sent." });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
});


app.post("/api/sendresetPassword", async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;
  const token = req.body.resetToken;


    // Create the verification link with the token
    const ResetLink = `https://centri-closet.vercel.app/auth/account/reset_password/${token}`;
    try {
      // create nodemailer transporter object
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });

      // send email using nodemailer
      const emailRes = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset Request',
        html: `
          <p>Dear ${name},</p>
          <p>We have received a request to reset the password for your account on our website. If you did not initiate this request, please ignore this email.</p>
          <p>To proceed with the password reset, please click on the link below.</p>
          <a href="${ResetLink}">${ResetLink}</a>
          <p>If the link does not work, you can copy and paste it into your web browser's address bar.</p>
          <p>This link is valid for the next 24 hours. After that, you will need to initiate a new password reset request.</p>
          <p>If you have any questions or need assistance, please don't hesitate to contact our support team.</p>
          <p>Thank you for using our website!</p>
          <p>Best regards,</p>
          <p>Campus Closet</p>
          
        `,
      });
      console.log('Reset request email sent');
      return res.status(200).json({ message: "Reset Link sent successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
});


    //orders sent to the seller
app.post("/api/notifyOwner",async (req,res)=>{
    const buyerDetails= req.body.buyerDetails;
    const email=buyerDetails[0][0].email;
    const name=buyerDetails[0][0].full_name;
    const PageLink = `https://centri-closet.vercel.app/`;
        try {
      // create nodemailer transporter object
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        },
      });
      
    // send email using nodemailer
    const emailRes = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Campus Closet - Your Item Has Been Ordered!',
        html: `
        <p>Hello ${name},</p>
        <p>Your item has been ordered!</p>
        <p>Thank you for selling on our website. A customer has placed an order for your product. Please check your dashboard or account for more details about the order.</p>
        <p>If you have any questions or need further assistance, please feel free to contact us.</p>
        <p>Thank you for being a part of our marketplace!</p>
        <p>${PageLink}</p>
        `,
      });
    //   console.log('Verification email sent');
      return res.status(200).json({ message: "Notification was sent successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });      
    }
    })


    // Poulet
    // Send notifications to parents
    app.post("/api/feedback-to-parents", async (req, res) => {
      const { first_name, email, adoption_type } = req.body; // Destructuring the body directly
      console.log(first_name, email, adoption_type);
        console.log(email);
        
        if (!email) {
          return res.status(400).json({ error: "Email is required" });
        }
    
      try {
        // create nodemailer transporter object
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
          },
        });
    
        // Construct the email message based on the adoption type
        let message = `
          <p>Dear ${first_name},</p>
          <p>We wanted to inform you that your child has been successfully adopted. We appreciate your trust in us during this process.</p>
        `;
    
        if (adoption_type === "open") {
          message += `
            <p>As the adoption is of an open type, you have the option to keep in touch with your child. We encourage you to coordinate with the adoptive family to establish a connection that works best for everyone involved.</p>
          `;
        } else if (adoption_type === "closed") {
          message += `
            <p>As the adoption is of a closed type, please note that there will be no ongoing contact with your child. We understand that this may be a difficult time, and we want to assure you that your child will be well cared for in their new home.</p>
          `;
        }
    
        message += `
          <p>Thank you for your selflessness and courage in giving your child the opportunity for a bright future.</p>
          <p>Best regards,</p>
          <p>The Adoption Agency Team</p>
        `;
    
        // send email using nodemailer
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: 'Update on Your Child’s Adoption',
          html: message,
        });
    
        console.log('Notification email sent');
        return res.status(200).json({ message: "Notification was sent successfully." });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
      }
    });
    


     // Send notifications to parents
    app.post("/api/feedback-to-parents", async (req, res) => {
      const { first_name, email, adoption_type } = req.body; // Destructuring the body directly
      console.log(first_name, email, adoption_type);
        console.log(email);
        
        if (!email) {
          return res.status(400).json({ error: "Email is required" });
        }
    
      try {
        // create nodemailer transporter object
        let transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS,
          },
        });
    
        // Construct the email message based on the adoption type
        let message = `
          <p>Dear ${first_name},</p>
          <p>We wanted to inform you that your child has been successfully adopted. We appreciate your trust in us during this process.</p>
        `;
    
        if (adoption_type === "open") {
          message += `
            <p>As the adoption is of an open type, you have the option to keep in touch with your child. We encourage you to coordinate with the adoptive family to establish a connection that works best for everyone involved.</p>
          `;
        } else if (adoption_type === "closed") {
          message += `
            <p>As the adoption is of a closed type, please note that there will be no ongoing contact with your child. We understand that this may be a difficult time, and we want to assure you that your child will be well cared for in their new home.</p>
          `;
        }
    
        message += `
          <p>Thank you for your selflessness and courage in giving your child the opportunity for a bright future.</p>
          <p>Best regards,</p>
          <p>The Adoption Agency Team</p>
        `;
    
        // send email using nodemailer
        await transporter.sendMail({
          from: process.env.EMAIL,
          to: email,
          subject: 'Update on Your Child’s Adoption',
          html: message,
        });
    
        console.log('Notification email sent');
        return res.status(200).json({ message: "Notification was sent successfully." });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error });
      }
    });







// Send notifications to parents about child verification status
app.post("/api/notify-verification-status", async (req, res) => {
  const { parent_first_name, parent_email, status } = req.body;


  if (!parent_email || !status) {
    return res.status(400).json({ error: "Parent email and status are required" });
  }

  try {
    // Create nodemailer transporter object
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Construct the email message based on the verification status
    let subject, message;

    if (status === "available") {
      subject = "Child Verification Successful - Awaiting Adoption";
      message = `
        <p>Dear ${parent_first_name},</p>
        <p>We are pleased to inform you that your child has been successfully verified in our system. They are now awaiting adoption.</p>
        <p>This means that your child's profile is now visible to potential adoptive families. We will keep you updated on any developments in the adoption process.</p>
        <p>If you have any questions or need more information, please don't hesitate to contact us.</p>
        <p>Thank you for your patience and trust in our process.</p>
        <p>Best regards,</p>
        <p>The Adoption Agency Team</p>
      `;
    } else if (status === "rejected") {
      subject = "Important Information About Your Child's Verification";
      message = `
        <p>Dear ${parent_first_name},</p>
        <p>We regret to inform you that your child's verification in our system has been unsuccessful.</p>
        <p>We understand this may be disappointing news. For more detailed information about this decision and to discuss your options moving forward, please contact our administrative team.</p>
        <p>We are here to support you and answer any questions you may have during this process.</p>
        <p>Best regards,</p>
        <p>The Adoption Agency Team</p>
      `;
    } else {
      console.log("Invalid status provided");
      return res.status(400).json({ error: "Invalid status provided" });
    }

    // Send email using nodemailer
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: parent_email,
      subject: subject,
      html: message,
    });

    console.log('Notification email sent');
    return res.status(200).json({ message: "Notification was sent successfully." });
  } catch (error) {
    console.error("ghhhhhhhhhhhhhhh", error);
    return res.status(500).json({ error: "An error occurred while sending the notification" });
  }
});





















// send notification to guardian users
app.post("/api/guardians/notify", async (req, res) => {
  const { name, email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    // Create a nodemailer transporter object
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    // Construct the email message
    let message = `
      <p>Dear ${name},</p>
      <p>We are pleased to inform you that an agent has been successfully assigned to your task. The agent will respond to your task as soon as possible.</p>
      <p>If you have any further questions or need additional information, please do not hesitate to contact us.</p>
      <p>Thank you for your trust in our services.</p>
      <p>Best regards,</p>
      <p>The Agent Placement Service</p>
    `;

    // Send the email using nodemailer
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Task Assignment Notification',
      html: message,
    });

    console.log('Notification email sent');
    return res.status(200).json({ message: "Notification was sent successfully." });
  } catch (error) {
    console.error('Error sending notification to guardian:', error);
    return res.status(500).json({ error: "Failed to send notification to guardian" });
  }
});





    



app.listen(port, (err, res) => {
    if (err) {
        console.log(err);
        return res.status(500).send(err.message);
    } else {
        console.log('[INFO] Server Running on port:', port);
    }
});

