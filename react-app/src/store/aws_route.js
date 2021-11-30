export const uploadFile = (fileForm) => async (dispatch) => {
    const {
        user_id,
        /* all,
           other,
           form,
           fields, */
           file // this is the file for uploading
    } = fileForm;

    const form = new FormData();
    // repeat as necessary  for each required form field
    form.append('file', file);

    const res = await fetch('/api/add_image/', {
        method: "POST",
        body: form
    });
};
