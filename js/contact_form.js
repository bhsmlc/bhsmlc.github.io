async function contact_form() {
    (() => {
        emailjs.init({
            publicKey: "KmcmLb-vXYnkkpxWH"
        })
    })()
    let form = document.getElementById("contact-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let data = new FormData(form);
        data = Object.fromEntries(data);
        let message = `Sender name: ${data["name"]}\nSender email: ${data["email"]}\n\n${data["message"]}`;
        const templateParams = {
            name: "",
            email: "",
            subject: "",
            message: message
        }
        emailjs.send('service_pngpajc', 'template_yxs9rht', templateParams)
                    .then(() => {
                        form.reset();
                        alert('Successfully sent!');
                    }, (error) => {
                        alert('Send failed...', error);
                    });
    });
}
contact_form()

// Future to-do: add recaptcha