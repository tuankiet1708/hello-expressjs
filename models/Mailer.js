const nodemailer = require('nodemailer');

const {
    MAIL_SERVICE,
    MAIL_USER,
    MAIL_PASS
} = process.env;

const option = {
    service: MAIL_SERVICE,
    auth: {
        user: MAIL_USER, // email hoặc username
        pass: MAIL_PASS // password
    }
};

const Mailer = {
    sendEmailAfterCreatingNewUser: (email) => {
        const transporter = nodemailer.createTransport(option);

        transporter.verify((error, success) => {
            // Nếu có lỗi.
            if (error) {
                console.log(error);
            } else { 
                //Nếu thành công.
                console.log('Kết nối thành công!');

                const mail = {
                    from: `"APP" ${MAIL_USER}`, // Địa chỉ email của người gửi
                    to: email, // Địa chỉ email của người gửi
                    subject: 'Tài khoản của bạn vừa được tạo thành công', // Tiêu đề mail
                    text: `Tài khoản mới của bạn vừa được tạo thành công. Thông tin email của bạn là: ${email}.`,
                    html: `
                        Chào bạn <b>${email}</b>,
                        <br/>
                        Chúc mừng tài khoản của bạn vừa được tạo thành công.
                        <br/>
                        <br/>
                        --
                        <br/>
                        Sent from <b>App</b>.
                    `
                };

                //Tiến hành gửi email
                transporter.sendMail(mail, (error, info) => {
                    if (error) { // nếu có lỗi
                        console.log(error);
                    } else { //nếu thành công
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        });
    }
}

module.exports = Mailer;