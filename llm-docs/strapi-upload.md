## Creating a Document with File Uploads via REST API

Since your payload includes both regular fields **and** file fields (`resume`, `cover_letter`), you need to handle this in **two steps**:

---

### Step 1: Upload the Files First

Use the `/api/upload` endpoint to upload each file. You must send `multipart/form-data`. [[REST API Upload](https://docs.strapi.io/cms/api/rest/upload)]

**Example (Node.js):**

```js
import { FormData } from 'formdata-node';
import fetch, { blobFrom } from 'node-fetch';

// Upload resume
const resumeFile = await blobFrom('./resume.pdf', 'application/pdf');
const resumeForm = new FormData();
resumeForm.append('files', resumeFile, 'resume.pdf');

const resumeResponse = await fetch('http://localhost:1337/api/upload', {
  method: 'POST',
  body: resumeForm,
});
const [uploadedResume] = await resumeResponse.json();

// Upload cover letter
const coverFile = await blobFrom('./cover_letter.pdf', 'application/pdf');
const coverForm = new FormData();
coverForm.append('files', coverFile, 'cover_letter.pdf');

const coverResponse = await fetch('http://localhost:1337/api/upload', {
  method: 'POST',
  body: coverForm,
});
const [uploadedCoverLetter] = await coverResponse.json();
```

Each upload response will include an `id` for the uploaded file, which you'll use in the next step.

---

### Step 2: Create the Document with File References

Once you have the file IDs, send a `POST` request to your collection endpoint, referencing the uploaded files by their `id`. [[REST API create](https://docs.strapi.io/cms/api/rest#create)]

```js
const response = await fetch('http://localhost:1337/api/career-enquiries', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: {
      first_name: 'John',
      last_name: 'Doe',
      phone: '+1234567890',
      email: 'john@example.com',
      message: 'I am interested in this position.',
      resume: uploadedResume.id,
      cover_letter: uploadedCoverLetter.id,
    },
  }),
});

const result = await response.json();
console.log(result);
```

---

### Key Points

- **Files cannot be sent directly** in the document creation request body — they must be uploaded separately via `POST /api/upload` first. [[REST API Upload](https://docs.strapi.io/cms/api/rest/upload)]
- The upload endpoint returns file objects containing an `id`, which you then reference in your document's media fields.
- The document creation request uses `application/json` with a `data` wrapper containing all your fields. [[REST API create](https://docs.strapi.io/cms/api/rest#create)]