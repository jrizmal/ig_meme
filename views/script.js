const forms = document.getElementsByClassName("meme-form")

for (const formElem of forms) {
    formElem.addEventListener('submit', (e) => {
        // on form submission, prevent default
        e.preventDefault();

        // construct a FormData object, which fires the formdata event
        new FormData(formElem);
    });

    // formdata handler to retrieve data

    formElem.addEventListener('formdata', (e) => {
        console.log('formdata fired');

        // Get the form data from the event object
        let data = e.formData;
        for (var value of data.values()) {
            console.log(value);
        }

        // submit the data via XHR
        var request = new XMLHttpRequest();
        request.open("POST", "/rate");
        request.send(data);
    });
}